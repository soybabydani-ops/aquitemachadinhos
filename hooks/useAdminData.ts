/**
 * useAdminData.ts — AQUI TEM ACHADINHOS v3.5
 * Hook de gerenciamento de dados admin com estratégia SWR (stale-while-revalidate).
 *
 * Implementação pura (sem React/Vue) — funciona como módulo ES6 no browser.
 * Pode ser importado diretamente em app.js ou usado como referência para
 * qualquer framework front-end.
 *
 * @pattern Observer/Reactive Store + SWR Cache
 */

// ──────────────────────────────────────────────
// TIPOS
// ──────────────────────────────────────────────

export interface Store {
  id: string
  nome: string
  categoria: string | null
  subcategoria?: string | null
  status: 'ativo' | 'pendente' | 'rejeitado'
  plano: 'gratis' | 'destaque' | 'pro'
  destaque: boolean
  whatsapp: string
  cidade: string
  city_slug: string
  bairro?: string
  criado_em: string
  [key: string]: unknown
}

export interface AdminDataState {
  stores: Store[]
  isLoading: boolean
  isStale: boolean
  lastFetched: number | null
  error: string | null
}

export interface CacheEntry<T> {
  data: T
  fetchedAt: number
}

export type Subscriber<T> = (state: T) => void

// ──────────────────────────────────────────────
// CONFIGURAÇÃO
// ──────────────────────────────────────────────

const SWR_TTL_MS = 30_000       // 30s — fresco
const STALE_TTL_MS = 300_000    // 5min — stale (mas ainda serve)

// ──────────────────────────────────────────────
// CACHE STORE (Singleton)
// ──────────────────────────────────────────────

class SwrCache {
  private cache = new Map<string, CacheEntry<unknown>>()

  set<T>(key: string, data: T): void {
    this.cache.set(key, { data, fetchedAt: Date.now() })
  }

  get<T>(key: string): { data: T; isFresh: boolean; isStale: boolean } | null {
    const entry = this.cache.get(key) as CacheEntry<T> | undefined
    if (!entry) return null
    const age = Date.now() - entry.fetchedAt
    return {
      data: entry.data,
      isFresh: age < SWR_TTL_MS,
      isStale: age >= SWR_TTL_MS && age < STALE_TTL_MS,
    }
  }

  invalidate(keyPrefix: string): void {
    for (const key of this.cache.keys()) {
      if (key.startsWith(keyPrefix)) this.cache.delete(key)
    }
  }

  invalidateAll(): void {
    this.cache.clear()
  }
}

export const swrCache = new SwrCache()

// ──────────────────────────────────────────────
// RETRY COM EXPONENTIAL BACKOFF
// ──────────────────────────────────────────────

export interface RetryOptions {
  maxRetries?: number
  baseDelayMs?: number
  shouldRetry?: (error: Error, attempt: number) => boolean
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    maxRetries = 3,
    baseDelayMs = 1000,
    shouldRetry = (err) => {
      // Retry em erros de rede ou 5xx
      const httpStatus = (err as { _httpStatus?: number })._httpStatus ?? 0
      return httpStatus === 0 || httpStatus >= 500
    },
  } = options

  let lastError!: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fn()
    } catch (err) {
      lastError = err as Error
      if (attempt >= maxRetries || !shouldRetry(lastError, attempt)) {
        throw lastError
      }
      const delay = baseDelayMs * Math.pow(2, attempt - 1)
      console.warn(
        `[useAdminData] Retry ${attempt}/${maxRetries} em ${delay}ms —`,
        lastError.message
      )
      await sleep(delay)
    }
  }

  throw lastError
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ──────────────────────────────────────────────
// SUPABASE ERROR MAPPER
// ──────────────────────────────────────────────

const ERROR_MAP: Record<string, string> = {
  '23505': 'Esta empresa já está cadastrada com esse nome ou WhatsApp.',
  '23503': 'Categoria inválida ou não encontrada. Tente outra opção.',
  '23502': 'Há campos obrigatórios não preenchidos. Revise o formulário.',
  '42501': 'Sem permissão para realizar esta ação. Faça login novamente.',
  '23514': 'Valor fora do intervalo permitido para este campo.',
  'PGRST301': 'Sessão expirada. Faça login novamente.',
  'PGRST116': 'Nenhum resultado encontrado.',
  '22001': 'Um dos campos excede o tamanho máximo permitido.',
}

export function mapSupabaseError(data: Record<string, unknown>, status: number): string {
  const code = String(data?.code ?? '')
  if (ERROR_MAP[code]) return ERROR_MAP[code]

  const raw = String(data?.message ?? data?.error ?? data?.hint ?? '')
  if (/duplicate|unique/i.test(raw)) return ERROR_MAP['23505']
  if (/foreign key|violates/i.test(raw)) return ERROR_MAP['23503']
  if (/not.null|null value/i.test(raw)) return ERROR_MAP['23502']
  if (/permission|policy|rls/i.test(raw)) return ERROR_MAP['42501']
  if (/jwt|expired|token/i.test(raw)) return ERROR_MAP['PGRST301']

  return raw || `Erro HTTP ${status}`
}

// ──────────────────────────────────────────────
// ADMIN DATA HOOK (Reactive Store Pattern)
// ──────────────────────────────────────────────

export class AdminDataStore {
  private state: AdminDataState = {
    stores: [],
    isLoading: false,
    isStale: false,
    lastFetched: null,
    error: null,
  }

  private subscribers: Set<Subscriber<AdminDataState>> = new Set()
  private readonly cacheKey = 'admin:stores'

  constructor(
    private supabaseUrl: string,
    private authToken: string
  ) {}

  private notify(): void {
    this.subscribers.forEach((sub) => sub({ ...this.state }))
  }

  /** Subscreve a mudanças de estado. Retorna função de unsubscribe. */
  subscribe(fn: Subscriber<AdminDataState>): () => void {
    this.subscribers.add(fn)
    fn({ ...this.state }) // Emit inicial
    return () => this.subscribers.delete(fn)
  }

  private getHeaders(): Record<string, string> {
    return {
      apikey: this.authToken,
      Authorization: `Bearer ${this.authToken}`,
      'Content-Type': 'application/json',
    }
  }

  /** Carrega stores com estratégia SWR */
  async loadStores(): Promise<Store[]> {
    const cached = swrCache.get<Store[]>(this.cacheKey)

    if (cached) {
      // Serve cache imediatamente
      this.state = {
        ...this.state,
        stores: cached.data,
        isLoading: !cached.isFresh, // Loading = true só se stale (revalidando)
        isStale: !cached.isFresh,
        error: null,
      }
      this.notify()

      if (cached.isFresh) return cached.data

      // Stale: revalida em background sem bloquear o caller
      this.revalidateInBackground()
      return cached.data
    }

    // Cache miss — fetch bloqueante
    return this.fetchStores()
  }

  private async revalidateInBackground(): Promise<void> {
    try {
      const fresh = await this.fetchStores(/* background */ true)
      console.log(`[AdminDataStore] Revalidado: ${fresh.length} lojas`)
    } catch (err) {
      console.warn('[AdminDataStore] Falha na revalidação em background:', err)
    }
  }

  private async fetchStores(background = false): Promise<Store[]> {
    if (!background) {
      this.state = { ...this.state, isLoading: true, error: null }
      this.notify()
    }

    const fetch_ = () =>
      fetch(
        `${this.supabaseUrl}/rest/v1/stores?select=*&order=criado_em.desc`,
        { headers: this.getHeaders() }
      ).then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          const err = new Error(mapSupabaseError(data, res.status)) as Error & { _httpStatus: number }
          err._httpStatus = res.status
          throw err
        }
        return res.json() as Promise<Store[]>
      })

    try {
      const stores = await withRetry(fetch_, {
        maxRetries: 3,
        baseDelayMs: 1000,
      })

      swrCache.set(this.cacheKey, stores)
      this.state = {
        ...this.state,
        stores,
        isLoading: false,
        isStale: false,
        lastFetched: Date.now(),
        error: null,
      }
      this.notify()
      return stores
    } catch (err) {
      const msg = (err as Error).message || 'Erro ao carregar dados'
      this.state = { ...this.state, isLoading: false, error: msg }
      this.notify()
      throw err
    }
  }

  /** Atualiza uma store e invalida o cache */
  async patchStore(
    id: string,
    payload: Partial<Store>,
    beforeState?: Partial<Store>
  ): Promise<boolean> {
    const doFetch = () =>
      fetch(
        `${this.supabaseUrl}/rest/v1/stores?id=eq.${encodeURIComponent(id)}`,
        {
          method: 'PATCH',
          headers: { ...this.getHeaders(), Prefer: 'return=representation' },
          body: JSON.stringify(payload),
        }
      ).then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          const err = new Error(mapSupabaseError(data, res.status)) as Error & { _httpStatus: number }
          err._httpStatus = res.status
          throw err
        }
        return true
      })

    try {
      await withRetry(doFetch, { maxRetries: 3, baseDelayMs: 1000 })

      // Invalidar cache e atualizar estado local otimisticamente
      swrCache.invalidate('admin:stores')
      this.state = {
        ...this.state,
        stores: this.state.stores.map((s) =>
          s.id === id ? { ...s, ...payload } : s
        ),
      }
      this.notify()

      // Audit log (fire-and-forget)
      this.sendAuditLog('UPDATE', 'stores', id, beforeState ?? null, payload)

      return true
    } catch (err) {
      console.error('[AdminDataStore] patchStore falhou:', err)
      return false
    }
  }

  /** Deleta uma store e invalida o cache */
  async deleteStore(id: string, beforeState: Store): Promise<boolean> {
    try {
      const res = await fetch(
        `${this.supabaseUrl}/rest/v1/stores?id=eq.${encodeURIComponent(id)}`,
        { method: 'DELETE', headers: this.getHeaders() }
      )

      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      swrCache.invalidate('admin:stores')
      this.state = {
        ...this.state,
        stores: this.state.stores.filter((s) => s.id !== id),
      }
      this.notify()

      this.sendAuditLog('DELETE', 'stores', id, beforeState, null)
      return true
    } catch (err) {
      console.error('[AdminDataStore] deleteStore falhou:', err)
      return false
    }
  }

  /** Registra trilha de auditoria (fire-and-forget) */
  private sendAuditLog(
    action: 'UPDATE' | 'DELETE' | 'CREATE',
    table: string,
    recordId: string,
    before: unknown,
    after: unknown
  ): void {
    fetch(`${this.supabaseUrl}/rest/v1/admin_audit_log`, {
      method: 'POST',
      headers: { ...this.getHeaders(), Prefer: 'return=minimal' },
      body: JSON.stringify({
        action,
        table_name: table,
        record_id: recordId,
        before_data: before,
        after_data: after,
        performed_at: new Date().toISOString(),
        user_agent: navigator.userAgent.slice(0, 80),
      }),
    }).catch(() => { /* audit é best-effort */ })
  }

  getState(): AdminDataState {
    return { ...this.state }
  }

  invalidateCache(): void {
    swrCache.invalidate('admin:')
  }
}

// ──────────────────────────────────────────────
// VALIDAÇÃO DE SCHEMA (Zod-style)
// ──────────────────────────────────────────────

interface FieldRule {
  required?: boolean
  maxLen?: number
  pattern?: RegExp
  label: string
}

const STORE_SCHEMA: Record<string, FieldRule> = {
  nome:        { required: true,  maxLen: 100, label: 'Nome da empresa' },
  whatsapp:    { required: true,  maxLen: 20,  label: 'WhatsApp', pattern: /^[\d\s\-\+\(\)]+$/ },
  categoria:   { required: false, maxLen: 50,  label: 'Categoria' },
  descricao_curta: { required: false, maxLen: 300, label: 'Descrição curta' },
  bairro:      { required: false, maxLen: 80,  label: 'Bairro' },
  instagram:   { required: false, maxLen: 100, label: 'Instagram', pattern: /^(@?[\w\.]+)?$/ },
  site:        { required: false, maxLen: 200, label: 'Site' },
}

export interface ValidationResult {
  ok: boolean
  errors: string[]
  data: Record<string, unknown>
}

export function validateStorePayload(obj: Record<string, unknown>): ValidationResult {
  const errors: string[] = []
  const sanitized: Record<string, unknown> = {}

  for (const [key, rule] of Object.entries(STORE_SCHEMA)) {
    const raw = obj[key]
    const val = typeof raw === 'string' ? raw.trim().replace(/[<>]/g, '') : ''

    if (rule.required && !val) {
      errors.push(`${rule.label} é obrigatório.`)
    } else if (val) {
      if (rule.maxLen && val.length > rule.maxLen) {
        errors.push(`${rule.label} deve ter no máximo ${rule.maxLen} caracteres.`)
      }
      if (rule.pattern && !rule.pattern.test(val)) {
        errors.push(`${rule.label} contém caracteres inválidos.`)
      }
    }

    sanitized[key] = val || obj[key]
  }

  // Copiar campos não validados (mas sanitizados)
  for (const [key, val] of Object.entries(obj)) {
    if (!(key in STORE_SCHEMA)) {
      sanitized[key] = typeof val === 'string' ? val.trim().replace(/[<>]/g, '') : val
    }
  }

  return { ok: errors.length === 0, errors, data: sanitized }
}
