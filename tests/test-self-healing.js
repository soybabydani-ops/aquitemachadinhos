// ============================================================
// AQUITEM — Self-Healing & Autonomous Auto-Correction Tests
// ============================================================

const { normalizeSlug, getGeoData } = require('../api/_lib/geo-enrich');
const { evaluateStore, evaluateListing } = require('../api/_lib/quality-evaluator');

function runSelfHealingTests() {
  console.log('====================================================');
  console.log('🛡️ TESTANDO ENGINE DE AUTOCORREÇÃO E AUTO-CURA (SELF-HEALING)');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, msg) {
    if (condition) {
      console.log(`  ✅ PASS: ${msg}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${msg}`);
      failed++;
    }
  }

  // 1. Teste de Normalização Inteligente de Slugs de Cidades
  console.log('🗺️ [1/4] Testando Fuzzy Slug Normalizer...');
  assert(normalizeSlug('São Paulo') === 'sao-paulo', 'Auto-corrigiu acento e espaço: "São Paulo" -> "sao-paulo"');
  assert(normalizeSlug('RIBEIRÃO PRETO-SP') === 'ribeirao-preto', 'Auto-corrigiu maiúsculas e sufixo: "RIBEIRÃO PRETO-SP" -> "ribeirao-preto"');
  assert(normalizeSlug('  olímpia  ') === 'olimpia', 'Auto-corrigiu espaços e acento: "  olímpia  " -> "olimpia"');
  assert(normalizeSlug('Barretos---SP') === 'barretos', 'Auto-corrigiu múltiplos hífens: "Barretos---SP" -> "barretos"');

  // 2. Teste de Recuperação Geográfica de Emergência
  console.log('\n🧭 [2/4] Testando Fallback Geográfico...');
  const geoUnknown = getGeoData('cidade-inexistente-123');
  assert(geoUnknown.nome.includes('Cidade Inexistente 123'), 'Gerou dados socioeconômicos dinâmicos para cidade desconhecida sem travar');
  assert(geoUnknown.populacao > 0, 'Sintetizou população estimada padrão');

  // 3. Teste de Higienização e Auto-Formatação de Dados
  console.log('\n🧹 [3/4] Testando Sanitização e Auto-Formatação...');
  const dirtyStore = evaluateStore({
    nome: '<script>console.log(1)</script> Mercado Bom Preço',
    whatsapp: '+55 (17) 99264-1746',
    cidade: 'Barretos',
    descricao: '<b>Supermercado</b> com as melhores ofertas e produtos frescos.'
  });

  assert(dirtyStore.approved === true, 'Aprovou loja após auto-higienização');
  assert(!dirtyStore.data.nome.includes('<script>'), 'Removeu tags maliciosas <script> do nome');
  assert(!dirtyStore.data.descricao.includes('<b>'), 'Removeu tags HTML da descrição');
  assert(dirtyStore.data.whatsapp === '17992641746', 'Normalizou número de WhatsApp para formato numérico limpo');

  // 4. Teste de Auto-Preenchimento Semântico de Categoria
  console.log('\n🏷️ [4/4] Testando Auto-Preenchimento Semântico de Categoria...');
  const missingCatStore = evaluateStore({
    nome: 'Oficina Mecânica São Cristóvão',
    whatsapp: '17992641746',
    cidade: 'Barretos',
    descricao: 'Conserto de motores, troca de óleo e balanceamento de rodas.'
  });

  assert(missingCatStore.data.categoria === 'servicos', 'Auto-detectou categoria: servicos');
  assert(missingCatStore.data.subcategoria === 'Mecânica Automotiva', 'Auto-detectou subcategoria: Mecânica Automotiva');
  assert(missingCatStore.data.tags.includes('troca de oleo'), 'Injetou tags SEO automaticamente');

  console.log('\n====================================================');
  console.log(`📊 RESULTADO DOS TESTES: ${passed} PASSOU | ${failed} FALHOU`);
  console.log('====================================================\n');

  if (failed > 0) process.exit(1);
}

runSelfHealingTests();
