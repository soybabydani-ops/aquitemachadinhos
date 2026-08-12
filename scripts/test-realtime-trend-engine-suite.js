/**
 * AQUITEM ACHADINHOS — TESTE DO PROTOCOLO DE QUERY HIJACKING & TENDÊNCIAS AO VIVO
 */

const fs = require('fs');
const path = require('path');

const REPO_ROOT = path.join(__dirname, '..');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ ERRO: ${message}`);
    failed++;
  }
}

async function runTrendEngineTests() {
  console.log("\n=======================================================");
  console.log("🚨 TESTES: REAL-TIME QUERY HIJACKING & TENDÊNCIAS");
  console.log("=======================================================\n");

  // 1. ARQUIVOS HTML GERADOS EM TENDENCIAS/
  console.log("1. Testando Presença de Arquivos HTML em tendencias/...");
  const trendDir = path.join(REPO_ROOT, 'tendencias');
  assert(fs.existsSync(trendDir), "Diretório tendencias/ existe");
  
  const files = fs.readdirSync(trendDir).filter(f => f.endsWith('.html'));
  assert(files.length >= 8, `Total de páginas geradas em tendencias/: ${files.length} (esperado >= 8)`);

  const pHub = path.join(trendDir, 'index.html');
  const pBarretos = path.join(trendDir, 'bug-passagens-onibus-sp-barretos-atualizado-agora.html');
  const pShopee = path.join(trendDir, 'cupom-desconto-shopee-shein-frete-gratis-hoje.html');
  const pExpedia = path.join(trendDir, 'desconto-reserva-hoteis-expedia-viracopos-hoje.html');
  const pCars = path.join(trendDir, 'aluguel-carros-urgente-guarulhos-sem-taxas.html');

  assert(fs.existsSync(pHub), "Hub /tendencias/index.html gerado");
  assert(fs.existsSync(pBarretos), "Página de Tendência Barretos gerada");
  assert(fs.existsSync(pShopee), "Página de Tendência Shopee/Shein gerada");
  assert(fs.existsSync(pExpedia), "Página de Tendência Expedia gerada");
  assert(fs.existsSync(pCars), "Página de Tendência Discover Cars gerada");

  // 2. TÍTULOS DE ALTA URGÊNCIA, TAGS E MONETIZAÇÃO DUPLA
  console.log("\n2. Testando Títulos de Urgência e Injeção de Monetização...");
  const cBarretos = fs.readFileSync(pBarretos, 'utf8');
  assert(cBarretos.includes("🚨 ATUALIZADO AGORA:"), "Título de urgência em tempo real validado");
  assert(cBarretos.includes("5975392"), "Bloco Adsterra CPM Zone 5975392 injetado");
  assert(cBarretos.includes("11558154"), "Smart Tag PropellerAds Zone 11558154 injetada");
  assert(cBarretos.includes("aquitem-internal-link-mesh"), "Malha de links internos circulares presente");
  assert(cBarretos.includes('application/ld+json'), "Marcação Schema.org presente");

  // 3. SITEMAP.XML
  console.log("\n3. Testando Atualização do Sitemap.xml...");
  const sitemap = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemap.includes("/tendencias/bug-passagens-onibus-sp-barretos-atualizado-agora"), "Rota Tendência Barretos no sitemap.xml");
  assert(sitemap.includes("/tendencias"), "Hub /tendencias no sitemap.xml");
  const totalUrls = (sitemap.match(/<loc>/g) || []).length;
  assert(totalUrls >= 1485, `Total de URLs no sitemap.xml: ${totalUrls} (esperado >= 1485)`);

  // 4. BLINDAGEM ANTI-REGRESSÃO
  console.log("\n4. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Início 100% blindado");
  assert(indexHtml.includes("<!-- FIM DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Fim 100% blindado");

  // 5. LIMITES SERVERLESS VERCEL (HOBBY <= 12)
  console.log("\n5. Testando Limite de Serverless Functions em api/...");
  const apiFiles = fs.readdirSync(path.join(REPO_ROOT, 'api')).filter(f => f.endsWith('.js') && !f.startsWith('_'));
  assert(apiFiles.length <= 12, `Total de serverless functions em api/: ${apiFiles.length} (limite <= 12)`);

  console.log("\n=======================================================");
  console.log(`📊 RESULTADO: ${passed} testes PASSARAM, ${failed} falharam.`);
  console.log("=======================================================\n");

  if (failed > 0) process.exit(1);
}

runTrendEngineTests().catch(console.error);
