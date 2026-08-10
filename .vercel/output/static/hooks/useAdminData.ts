/**
 * useAdminData.ts — Aqui Tem Achadinhos v3.5
 * Cache SWR (stale-while-revalidate) para dados administrativos.
 * Zero dependências externas — funciona como módulo ES6 no browser.
 *
 * Carregamento < 50ms na segunda visita (dados do cache em memória).
 * Revalidação automática em background sem bloquear a UI.
 */

// ── Tipos ────────────────────────────────────────────────────
export interface Store {
  id: string; nome: string; categoria: string | null
  status: 'ativo' | 'pendente' | 'rejeitado'
  plano: 'gratis' | 'destaque' | 'pro'
  destaque: boolean; owner_id: string | null
  cidade: string; city_slug: string; criado_em: string
  [key: string]: unknown
}

export interface AdminState {
  stores:      Store[]
  isLoading:   boolean
  isStale:     boolean
  lastFetched: number | null
  error:       string | null
}

// ── Cache SWR ─────────────────────────────────────────────────
const SWR_TTL    = 30_000   // 30s → fresco
const STALE_TTL  = 300_000  // 5min → stale mas servível

interface CacheEntry<T> { data: T; ts: number }
const _cache = new Map<string, CacheEntry<unknown>>()

export function swrGet<T>(key: string): { data: T; fresh: boolean } | null {
  const e = _cache.get(key) as CacheEntry<T> | undefined
  if (!e) return null
  return { data: e.data, fresh: Date.now() - e.ts < SWR_TTL }
}
export function swrSet<T>(key: string, data: T) { _cache.set(key, { data, ts: Date.now() }) }
export function swrInvalidate(prefix: string) { _cache.forEach((_, k) => { if (k.startsWith(prefix)) _cache.delete(k) }) }

// ── Exponential Backoff ───────────────────────────────────────
export interface RetryOpts {
  maxRetries?: number     // padrão: 3
  baseDelay?:  number     // padrão: 1000ms → 1s, 2s, 4s
  retryIf?:    (err: Error) => boolean
}

export async function withRetry<T>(fn: () => Promise<T>, opts: RetryOpts = {}): Promise<T> {
  const { maxRetries = 3, baseDelay = 1000, retryIf = (e) => !!(e as any)._isNetwork } = opts
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try { return await fn() } catch (err) {
      const e = err as Error
      if (attempt >= maxRetries || !retryIf(e)) throw e
      const delay = baseDelay * Math.pow(2, attempt - 1)
      console.warn(`[useAdminData] retry ${attempt}/${maxRetries} em ${delay}ms —`, e.message)
      await new Promise(r => setTimeout(r, delay))
    }
  }
  throw new Error('withRetry: não deveria chegar aqui')
}

// ── Mapeador de erros Supabase → PT-BR ───────────────────────
const ERR: Record<string, string> = {
  '23505':   'Esta empresa já está cadastrada.',
  '23503':   'Categoria inválida.',
  '23502':   'Campo obrigatório não preenchido.',
  '42501':   'Sem permissão. Faça login novamente.',
  'PGRST301':'Sessão expirada. Faça login novamente.',
}
export function mapError(data: Record<string, unknown>, status: number): string {
  const code = String(data?.code ?? '')
  if (ERR[code]) return ERR[code]
  const raw  = String(data?.message ?? data?.error ?? '')
  if (/duplicate|unique/i.test(raw))    return ERR['23505']
  if (/foreign key/i.test(raw))         return ERR['23503']
  if (/not.null|null value/i.test(raw)) return ERR['23502']
  if (/permission|policy|rls/i.test(raw)) return ERR['42501']
  if (/jwt|expired|token/i.test(raw))   return ERR['PGRST301']
  return raw || `Erro HTTP ${status}`
}

// ── Store reativo ─────────────────────────────────────────────
type Sub<T> = (s: T) => void

export class AdminDataStore {
  private state: AdminState = { stores: [], isLoading: false, isStale: false, lastFetched: null, error: null }
  private subs = new Set<Sub<AdminState>>()
  private key  = 'admin:stores'

  constructor(private url: string, private token: string) {}

  private get headers() {
    return { apikey: this.token, Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' }
  }

  subscribe(fn: Sub<AdminState>): () => void {
    this.subs.add(fn); fn({ ...this.state })
    return () => this.subs.delete(fn)
  }
  private notify() { this.subs.forEach(s => s({ ...this.state })) }

  /** Carrega lojas com SWR: < 50ms se cache quente */
  async load(): Promise<Store[]> {
    const cached = swrGet<Store[]>(this.key)
    if (cached) {
      this.setState({ stores: cached.data, isLoading: !cached.fresh, isStale: !cached.fresh, error: null })
      if (!cached.fresh) this.revalidate() // background
      return cached.data
    }
    return this.fetch()
  }

  private async revalidate() {
    try { await this.fetch(true) } catch (_) {}
  }

  private async fetch(bg = false): Promise<Store[]> {
    if (!bg) this.setState({ isLoading: true, error: null })
    const doFetch = () => fetch(
      `${this.url}/rest/v1/stores?select=*&order=criado_em.desc`,
      { headers: this.headers }
    ).then(async res => {
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        const err  = Object.assign(new Error(mapError(data, res.status)), { _isNetwork: res.status >= 500 })
        throw err
      }
      return res.json() as Promise<Store[]>
    }).catch(e => { if (!e._isNetwork) e._isNetwork = true; throw e })

    try {
      const stores = await withRetry(doFetch, { maxRetries: 3, baseDelay: 1000, retryIf: e => !!(e as any)._isNetwork })
      swrSet(this.key, stores)
      this.setState({ stores, isLoading: false, isStale: false, lastFetched: Date.now(), error: null })
      return stores
    } catch (e) {
      const msg = (e as Error).message
      this.setState({ isLoading: false, error: msg })
      throw e
    }
  }

  /** PATCH com retry 1s→2s→4s + audit + cache invalidation */
  async patch(id: string, payload: Partial<Store>, before?: Partial<Store>): Promise<boolean> {
    const doFetch = () => fetch(
      `${this.url}/rest/v1/stores?id=eq.${encodeURIComponent(id)}`,
      { method: 'PATCH', headers: { ...this.headers, Prefer: 'return=representation' }, body: JSON.stringify(payload) }
    ).then(async res => {
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        const err  = Object.assign(new Error(mapError(data, res.status)), { _isNetwork: res.status >= 500 })
        throw err
      }
      return true
    })

    try {
      await withRetry(doFetch, { maxRetries: 3, baseDelay: 1000, retryIf: e => !!(e as any)._isNetwork })
      swrInvalidate('admin:')
      // Atualização optimista local
      this.setState({ stores: this.state.stores.map(s => s.id === id ? { ...s, ...payload } : s) })
      this.audit('UPDATE', 'stores', id, before ?? null, payload)
      return true
    } catch (e) {
      console.error('[AdminDataStore.patch]', (e as Error).message)
      return false
    }
  }

  /** DELETE com audit */
  async delete(id: string, before: Store): Promise<boolean> {
    try {
      const res = await fetch(`${this.url}/rest/v1/stores?id=eq.${encodeURIComponent(id)}`,
        { method: 'DELETE', headers: this.headers })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      swrInvalidate('admin:')
      this.setState({ stores: this.state.stores.filter(s => s.id !== id) })
      this.audit('DELETE', 'stores', id, before, null)
      return true
    } catch (e) { console.error('[AdminDataStore.delete]', e); return false }
  }

  private audit(action: string, table: string, id: string, before: unknown, after: unknown) {
    fetch(`${this.url}/rest/v1/admin_audit_logs`, {
      method: 'POST',
      headers: { ...this.headers, Prefer: 'return=minimal' },
      body: JSON.stringify({ acao: action, tabela_afetada: table, registro_id: id,
        payload_antigo: before, payload_novo: after, criado_em: new Date().toISOString() })
    }).catch(() => {})
  }

  private setState(partial: Partial<AdminState>) {
    this.state = { ...this.state, ...partial }
    this.notify()
  }
  getState(): AdminState { return { ...this.state } }
}
