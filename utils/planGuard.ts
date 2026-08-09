/**
 * planGuard.ts — Aqui Tem Achadinhos v3.5
 * ─────────────────────────────────────────
 * ETAPA 2: Lógica de validação e travas de limite (Clean Code)
 * Roda no cliente (browser) e replica as funções SQL do banco.
 * O banco é a fonte de verdade — esse é o fallback UX.
 */

// ── Tipos ────────────────────────────────────────────────────
export type PlanoId = 'gratis' | 'destaque' | 'pro'
export type StatusAprovacao = 'pendente' | 'aprovado' | 'rejeitado'

export interface Plano {
  id:                PlanoId
  nome:              string
  preco_mensal:      number
  limite_fotos:      number   // -1 = ilimitado
  limite_ofertas:    number   // -1 = ilimitado
  nivel_prioridade:  number
  tem_relatorio:     boolean
  tem_campanhas:     boolean
  tem_suporte_prio:  boolean
  tem_selo_destaque: boolean
}

export interface ValidacaoResult {
  permitido:        boolean
  erro?:            string      // mensagem amigável PT-BR
  atual?:           number
  limite?:          number
  ilimitado?:       boolean
  upgrade_sugerido?: PlanoId
}

// ── Planos locais (espelho do banco — sempre sincronizado) ───
export const PLANOS: Record<PlanoId, Plano> = {
  gratis: {
    id: 'gratis', nome: 'Grátis', preco_mensal: 0,
    limite_fotos: 3, limite_ofertas: 1, nivel_prioridade: 1,
    tem_relatorio: false, tem_campanhas: false,
    tem_suporte_prio: false, tem_selo_destaque: false,
  },
  destaque: {
    id: 'destaque', nome: 'Destaque', preco_mensal: 79,
    limite_fotos: 10, limite_ofertas: 5, nivel_prioridade: 2,
    tem_relatorio: true, tem_campanhas: false,
    tem_suporte_prio: false, tem_selo_destaque: true,
  },
  pro: {
    id: 'pro', nome: 'Pro', preco_mensal: 149,
    limite_fotos: 20, limite_ofertas: -1, nivel_prioridade: 3,
    tem_relatorio: true, tem_campanhas: true,
    tem_suporte_prio: true, tem_selo_destaque: true,
  },
}

const UPGRADE: Record<PlanoId, PlanoId | null> = {
  gratis: 'destaque', destaque: 'pro', pro: null,
}

// ── Guard: limite de fotos ───────────────────────────────────
/**
 * Valida se a empresa pode fazer upload de mais uma foto.
 * @param planoId  - Plano atual da empresa
 * @param totalAtual - Número de fotos já cadastradas
 */
export function validarLimiteFotos(
  planoId: PlanoId,
  totalAtual: number
): ValidacaoResult {
  const plano = PLANOS[planoId]
  if (!plano) return { permitido: false, erro: 'Plano inválido.' }

  if (plano.limite_fotos === -1) return { permitido: true, ilimitado: true }

  if (totalAtual >= plano.limite_fotos) {
    const proximo = UPGRADE[planoId]
    return {
      permitido: false,
      erro: `Limite de ${plano.limite_fotos} foto(s) atingido no plano ${plano.nome}. `
          + (proximo ? `Faça upgrade para o plano ${PLANOS[proximo].nome} e adicione mais fotos.` : ''),
      atual: totalAtual,
      limite: plano.limite_fotos,
      upgrade_sugerido: proximo ?? undefined,
    }
  }

  return { permitido: true, atual: totalAtual, limite: plano.limite_fotos }
}

// ── Guard: limite de ofertas ─────────────────────────────────
/**
 * Valida se a empresa pode criar mais uma oferta ativa.
 */
export function validarLimiteOfertas(
  planoId: PlanoId,
  ofertasAtivas: number
): ValidacaoResult {
  const plano = PLANOS[planoId]
  if (!plano) return { permitido: false, erro: 'Plano inválido.' }

  // Pro = ilimitado
  if (plano.limite_ofertas === -1) return { permitido: true, ilimitado: true }

  if (ofertasAtivas >= plano.limite_ofertas) {
    const proximo = UPGRADE[planoId]
    return {
      permitido: false,
      erro: `Limite de ${plano.limite_ofertas} oferta(s) ativa(s) atingido no plano ${plano.nome}. `
          + (proximo ? `Faça upgrade para ${PLANOS[proximo].nome}.` : ''),
      atual: ofertasAtivas,
      limite: plano.limite_ofertas,
      upgrade_sugerido: proximo ?? undefined,
    }
  }

  return { permitido: true, atual: ofertasAtivas, limite: plano.limite_ofertas }
}

// ── Guard: visibilidade pública ──────────────────────────────
/**
 * ETAPA 2 item 3: impede empresa 'pendente' de aparecer publicamente.
 */
export function podeAparecer(status: StatusAprovacao): boolean {
  return status === 'aprovado'
}

// ── Guard: acesso a relatórios ───────────────────────────────
export function temAcessoRelatorio(planoId: PlanoId): boolean {
  return PLANOS[planoId]?.tem_relatorio ?? false
}

// ── Guard: acesso a campanhas sazonais ───────────────────────
export function temAcessoCampanhas(planoId: PlanoId): boolean {
  return PLANOS[planoId]?.tem_campanhas ?? false
}

// ── Interceptor: envolve qualquer ação com validação ─────────
/**
 * Decorator genérico: executa fn() somente se a validação passar.
 * Exibe toast de erro e sugestão de upgrade se falhar.
 */
export async function comValidacao<T>(
  resultado: ValidacaoResult,
  fn: () => Promise<T>,
  onErro?: (msg: string, upgrade?: PlanoId) => void
): Promise<T | null> {
  if (!resultado.permitido) {
    const msg = resultado.erro ?? 'Ação não permitida no seu plano atual.'
    if (onErro) {
      onErro(msg, resultado.upgrade_sugerido)
    } else {
      console.warn('[planGuard]', msg)
    }
    return null
  }
  return fn()
}
