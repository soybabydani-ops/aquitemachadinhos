/**
 * planGuard.test.ts — Aqui Tem Achadinhos v3.5
 * ──────────────────────────────────────────────
 * ETAPA 5: Script de testes automatizados (Jest-compatible)
 * Execução: npx jest planGuard.test.ts --verbose
 *
 * Cobre:
 *  ✅ Usuário grátis tentando burlar enviando 4 fotos
 *  ✅ Plano Pro criando ofertas ilimitadas
 *  ✅ Empresa pendente oculta do público
 *  ✅ Todos os limites de cada plano
 *  ✅ Mensagens de erro amigáveis
 *  ✅ Sugestões de upgrade corretas
 */

import {
  validarLimiteFotos,
  validarLimiteOfertas,
  podeAparecer,
  temAcessoRelatorio,
  temAcessoCampanhas,
  PLANOS,
} from './planGuard'

// ════════════════════════════════════════════════════
// BLOCO 1 — Plano GRÁTIS (limite: 3 fotos, 1 oferta)
// ════════════════════════════════════════════════════
describe('Plano GRÁTIS', () => {

  test('✅ Permite upload se tem menos de 3 fotos (0 atual)', () => {
    const r = validarLimiteFotos('gratis', 0)
    expect(r.permitido).toBe(true)
    expect(r.limite).toBe(3)
  })

  test('✅ Permite upload com 2 fotos (ainda dentro do limite)', () => {
    const r = validarLimiteFotos('gratis', 2)
    expect(r.permitido).toBe(true)
  })

  // 🔴 CASO CRÍTICO: burla do limite de fotos
  test('🔴 BLOQUEIA ao tentar enviar 4ª foto (limite é 3)', () => {
    const r = validarLimiteFotos('gratis', 3)
    expect(r.permitido).toBe(false)
    expect(r.erro).toContain('3')           // menciona o limite
    expect(r.erro).toContain('Grátis')      // menciona o plano
    expect(r.upgrade_sugerido).toBe('destaque')  // sugere upgrade correto
  })

  test('🔴 BLOQUEIA mesmo com 10 fotos (tentativa de burla via API)', () => {
    const r = validarLimiteFotos('gratis', 10)
    expect(r.permitido).toBe(false)
    expect(r.upgrade_sugerido).toBe('destaque')
  })

  test('✅ Permite 1ª oferta', () => {
    const r = validarLimiteOfertas('gratis', 0)
    expect(r.permitido).toBe(true)
  })

  test('🔴 BLOQUEIA 2ª oferta (limite é 1)', () => {
    const r = validarLimiteOfertas('gratis', 1)
    expect(r.permitido).toBe(false)
    expect(r.erro).toContain('1')
    expect(r.upgrade_sugerido).toBe('destaque')
  })

  test('🔒 Não tem acesso a relatórios', () => {
    expect(temAcessoRelatorio('gratis')).toBe(false)
  })

  test('🔒 Não tem acesso a campanhas', () => {
    expect(temAcessoCampanhas('gratis')).toBe(false)
  })
})

// ════════════════════════════════════════════════════
// BLOCO 2 — Plano DESTAQUE (10 fotos, 5 ofertas)
// ════════════════════════════════════════════════════
describe('Plano DESTAQUE', () => {

  test('✅ Permite até 10 fotos', () => {
    expect(validarLimiteFotos('destaque', 9).permitido).toBe(true)
  })

  test('🔴 BLOQUEIA 11ª foto', () => {
    const r = validarLimiteFotos('destaque', 10)
    expect(r.permitido).toBe(false)
    expect(r.upgrade_sugerido).toBe('pro')
  })

  test('✅ Permite até 5 ofertas ativas', () => {
    expect(validarLimiteOfertas('destaque', 4).permitido).toBe(true)
  })

  test('🔴 BLOQUEIA 6ª oferta', () => {
    const r = validarLimiteOfertas('destaque', 5)
    expect(r.permitido).toBe(false)
    expect(r.upgrade_sugerido).toBe('pro')
    expect(r.erro).toContain('Pro')
  })

  test('✅ Tem acesso a relatórios', () => {
    expect(temAcessoRelatorio('destaque')).toBe(true)
  })

  test('🔒 Não tem acesso a campanhas', () => {
    expect(temAcessoCampanhas('destaque')).toBe(false)
  })
})

// ════════════════════════════════════════════════════
// BLOCO 3 — Plano PRO (20 fotos, ILIMITADAS ofertas)
// ════════════════════════════════════════════════════
describe('Plano PRO', () => {

  test('✅ Ofertas ILIMITADAS — 0 ativas', () => {
    const r = validarLimiteOfertas('pro', 0)
    expect(r.permitido).toBe(true)
    expect(r.ilimitado).toBe(true)
  })

  test('✅ Ofertas ILIMITADAS — 999 ativas (stress test)', () => {
    const r = validarLimiteOfertas('pro', 999)
    expect(r.permitido).toBe(true)
    expect(r.ilimitado).toBe(true)
  })

  test('✅ Permite até 20 fotos', () => {
    expect(validarLimiteFotos('pro', 19).permitido).toBe(true)
  })

  test('🔴 BLOQUEIA 21ª foto (limite é 20)', () => {
    const r = validarLimiteFotos('pro', 20)
    expect(r.permitido).toBe(false)
    expect(r.upgrade_sugerido).toBeUndefined() // já é o plano máximo
  })

  test('✅ Tem acesso a relatórios', () => {
    expect(temAcessoRelatorio('pro')).toBe(true)
  })

  test('✅ Tem acesso a campanhas', () => {
    expect(temAcessoCampanhas('pro')).toBe(true)
  })
})

// ════════════════════════════════════════════════════
// BLOCO 4 — Visibilidade pública (status_aprovacao)
// ════════════════════════════════════════════════════
describe('Visibilidade pública', () => {

  // 🔴 CASO CRÍTICO: empresa pendente deve ser INVISÍVEL
  test('🔴 Empresa PENDENTE NÃO aparece publicamente', () => {
    expect(podeAparecer('pendente')).toBe(false)
  })

  test('🔴 Empresa REJEITADA NÃO aparece publicamente', () => {
    expect(podeAparecer('rejeitado')).toBe(false)
  })

  test('✅ Empresa APROVADA aparece publicamente', () => {
    expect(podeAparecer('aprovado')).toBe(true)
  })
})

// ════════════════════════════════════════════════════
// BLOCO 5 — Integridade dos dados dos planos
// ════════════════════════════════════════════════════
describe('Integridade dos planos', () => {

  test('Prioridade: Pro > Destaque > Grátis', () => {
    expect(PLANOS.pro.nivel_prioridade).toBeGreaterThan(PLANOS.destaque.nivel_prioridade)
    expect(PLANOS.destaque.nivel_prioridade).toBeGreaterThan(PLANOS.gratis.nivel_prioridade)
  })

  test('Pro tem limite_ofertas = -1 (ilimitado)', () => {
    expect(PLANOS.pro.limite_ofertas).toBe(-1)
  })

  test('Preços corretos: grátis=0, destaque=79, pro=149', () => {
    expect(PLANOS.gratis.preco_mensal).toBe(0)
    expect(PLANOS.destaque.preco_mensal).toBe(79)
    expect(PLANOS.pro.preco_mensal).toBe(149)
  })

  test('Selos: apenas destaque e pro têm selo visual', () => {
    expect(PLANOS.gratis.tem_selo_destaque).toBe(false)
    expect(PLANOS.destaque.tem_selo_destaque).toBe(true)
    expect(PLANOS.pro.tem_selo_destaque).toBe(true)
  })

  test('Limites de fotos crescem com o plano', () => {
    expect(PLANOS.pro.limite_fotos).toBeGreaterThan(PLANOS.destaque.limite_fotos)
    expect(PLANOS.destaque.limite_fotos).toBeGreaterThan(PLANOS.gratis.limite_fotos)
  })
})

// ════════════════════════════════════════════════════
// BLOCO 6 — Mensagens de erro amigáveis
// ════════════════════════════════════════════════════
describe('Qualidade das mensagens de erro', () => {

  test('Erro de foto menciona o limite numérico', () => {
    const r = validarLimiteFotos('gratis', 3)
    expect(r.erro).toMatch(/\d+/)
  })

  test('Erro de oferta menciona upgrade específico', () => {
    const r = validarLimiteOfertas('gratis', 1)
    expect(r.erro?.toLowerCase()).toContain('destaque')
  })

  test('Erro de foto destaque menciona Pro', () => {
    const r = validarLimiteFotos('destaque', 10)
    expect(r.erro?.toLowerCase()).toContain('pro')
  })

  test('Plano inválido retorna erro genérico', () => {
    const r = validarLimiteFotos('invalido' as any, 0)
    expect(r.permitido).toBe(false)
    expect(r.erro).toBeTruthy()
  })
})
