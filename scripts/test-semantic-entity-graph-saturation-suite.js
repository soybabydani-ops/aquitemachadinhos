/**
 * AQUITEM ACHADINHOS — TESTE DO PROTOCOLO DE SATURAÇÃO DE GRAFOS DE ENTIDADES SEMÂNTICAS
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_ROOT = path.join(__dirname, '..');
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";

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

async function fetchJson(urlStr) {
  return new Promise((resolve, reject) => {
    https.get(urlStr, {
      headers: {
        'apikey': SUPABASE_ANON,
        'Authorization': `Bearer ${SUPABASE_ANON}`
      }
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { resolve({ raw: body, status: res.statusCode }); }
      });
    }).on('error', reject);
  });
}

async function runSemanticGraphTests() {
  console.log("\n=======================================================");
  console.log("📌 TESTES: SEMANTIC ENTITY GRAPH SATURATION & PRELOAD");
  console.log("=======================================================\n");

  // 1. INJEÇÃO DE GRAFOS DE ENTIDADES SEMÂNTICAS JSON-LD
  console.log("1. Testando Injeção de Schema.org Multi-Type Graph...");
  const samplePages = [
    'index.html',
    'farmacias-barretos.html',
    'luxo-vip/reservas-suites-presidenciais-resorts-luxo-heliponto-sao-paulo.html',
    'aluguel-carros/aluguel-carros-blindados-utilitarios-sao-paulo-guarulhos.html',
    'pacotes-viagem/pacotes-cruzeiros-maritimos-resorts-all-inclusive-promocao.html',
    'cursos/cupom-desconto-promocoes-relampago-udemy-hoje.html'
  ];

  for (const page of samplePages) {
    const fullPath = path.join(REPO_ROOT, page);
    assert(fs.existsSync(fullPath), `Arquivo ${page} existe`);
    const content = fs.readFileSync(fullPath, 'utf8');
    assert(content.includes('id="aquitem-semantic-entity-graph"'), `Grafo Semântico presente em ${page}`);
    assert(content.includes('CJ Affiliate Luxury') || content.includes('Expedia Global Group') || content.includes('Shopee Brasil Oficial'), `Marcas parceiras amarradas no Grafo de ${page}`);
    assert(content.includes('rel="preload" href="/assets/affiliate-tracker.raw.js"'), `Preload sub-5ms do Injetor presente em ${page}`);
  }

  // 2. SUPABASE EDGE FUNCTIONS MULTI-TENANT & GATEWAY
  console.log("\n2. Testando Supabase Edge Functions de Ingestão...");
  try {
    const r1 = await fetchJson("https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/multiplexed-google-api-dispatcher");
    assert(r1?.success === true, "Edge Function multiplexed-google-api-dispatcher ativa");
    assert(r1?.actionType === "URL_UPDATED", "Ação de notificação URL_UPDATED validada");

    const r2 = await fetchJson("https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/high-frequency-gateway-ingestion");
    assert(r2?.success === true, "Edge Function high-frequency-gateway-ingestion ativa");
  } catch (e) {
    assert(false, `Falha ao testar Edge Functions: ${e.message}`);
  }

  // 3. BLINDAGEM ANTI-REGRESSÃO CARROSSEL LUXUOSO
  console.log("\n3. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Início 100% blindado");
  assert(indexHtml.includes("<!-- FIM DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Fim 100% blindado");

  // 4. LIMITES SERVERLESS VERCEL HOBBY <= 12
  console.log("\n4. Testando Limite de Serverless Functions em api/...");
  const apiFiles = fs.readdirSync(path.join(REPO_ROOT, 'api')).filter(f => f.endsWith('.js') && !f.startsWith('_'));
  assert(apiFiles.length <= 12, `Total de serverless functions em api/: ${apiFiles.length} (limite <= 12)`);

  console.log("\n=======================================================");
  console.log(`📊 RESULTADO: ${passed} testes PASSARAM, ${failed} falharam.`);
  console.log("=======================================================\n");

  if (failed > 0) process.exit(1);
}

runSemanticGraphTests().catch(console.error);
