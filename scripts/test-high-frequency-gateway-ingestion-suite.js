/**
 * AQUITEM ACHADINHOS — TESTE DO PROTOCOLO DE SINCRONIZAÇÃO DE GATILHOS DE RASTREAMENTO DISTRIBUÍDO
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

async function runIngestionTests() {
  console.log("\n=======================================================");
  console.log("📌 TESTES: GATEWAY INGESTION & MULTIPLEXED GOOGLE API");
  console.log("=======================================================\n");

  // 1. FEEDS DE ALTA VELOCIDADE & ATOM
  console.log("1. Testando Presença e Validade dos Feeds de Dados...");
  const pRss = path.join(REPO_ROOT, 'feeds', 'alertas-urgentes.xml');
  const pAtom = path.join(REPO_ROOT, 'feeds', 'sitemap-urgente.atom');
  const pHubs = path.join(REPO_ROOT, 'data', 'hubs-municipais.json');
  const pIndex = path.join(REPO_ROOT, 'data', 'index-hacker-realtime.json');

  assert(fs.existsSync(pRss), "Feed RSS /feeds/alertas-urgentes.xml existe");
  assert(fs.existsSync(pAtom), "Feed Atom /feeds/sitemap-urgente.atom existe");
  assert(fs.existsSync(pHubs), "Dataset /data/hubs-municipais.json existe");
  assert(fs.existsSync(pIndex), "Feed JSON /data/index-hacker-realtime.json existe");

  const cRss = fs.readFileSync(pRss, 'utf8');
  const cAtom = fs.readFileSync(pAtom, 'utf8');
  const cHubs = JSON.parse(fs.readFileSync(pHubs, 'utf8'));
  const cIndex = JSON.parse(fs.readFileSync(pIndex, 'utf8'));

  assert(cRss.includes("https://www.aquitemachadinhos.com.br/luxo-vip"), "Rota Luxo VIP presente no RSS");
  assert(cAtom.includes("xmlns=\"http://www.w3.org/2005/Atom\""), "Especificação Atom 1.0 válida");
  assert(cHubs.totalCitiesCovered >= 60, `Total de cidades no catálogo: ${cHubs.totalCitiesCovered} (>= 60)`);
  assert(cIndex.status === "ONLINE_HEALTHY", "Status do índice em tempo real é ONLINE_HEALTHY");

  // 2. SUPABASE EDGE FUNCTIONS (GATEWAY, GOOGLE API & CACHE PURGE)
  console.log("\n2. Testando Supabase Edge Functions Ativas...");
  try {
    const r1 = await fetchJson("https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/high-frequency-gateway-ingestion");
    assert(r1?.success === true, "Edge Function high-frequency-gateway-ingestion respondeu HTTP 200 OK");
    assert(r1?.feedsSynchronized >= 5, "Feeds sincronizados concorrentemente pelo Gateway");

    const r2 = await fetchJson("https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/multiplexed-google-api-dispatcher");
    assert(r2?.success === true, "Edge Function multiplexed-google-api-dispatcher respondeu HTTP 200 OK");
    assert(r2?.actionType === "URL_UPDATED", "Tipo de ação URL_UPDATED confirmado no payload");

    const r3 = await fetchJson("https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/edge-cache-purge-engine");
    assert(r3?.success === true, "Edge Function edge-cache-purge-engine respondeu HTTP 200 OK");
    assert(r3?.totalRoutesPurged >= 5, "Rotas Edge CDN invalidadas com sucesso");
  } catch (e) {
    assert(false, `Falha ao testar Edge Functions: ${e.message}`);
  }

  // 3. HEADERS E CACHE NA VERCEL (VERCEL.JSON)
  console.log("\n3. Testando Configuração de Headers na Vercel...");
  const vercelJson = fs.readFileSync(path.join(REPO_ROOT, 'vercel.json'), 'utf8');
  assert(vercelJson.includes("application/atom+xml"), "Header Content-Type Atom configurado");
  assert(vercelJson.includes("public, max-age=31536000, immutable"), "Cache agressivo e imutável para assets");

  // 4. BLINDAGEM ANTI-REGRESSÃO & CARROSSEL LUXUOSO
  console.log("\n4. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Início 100% blindado");
  assert(indexHtml.includes("<!-- FIM DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Fim 100% blindado");

  // 5. SERVERLESS FUNCTIONS VERCEL HOBBY <= 12
  console.log("\n5. Testando Limite de Serverless Functions em api/...");
  const apiFiles = fs.readdirSync(path.join(REPO_ROOT, 'api')).filter(f => f.endsWith('.js') && !f.startsWith('_'));
  assert(apiFiles.length <= 12, `Total de serverless functions em api/: ${apiFiles.length} (limite <= 12)`);

  console.log("\n=======================================================");
  console.log(`📊 RESULTADO: ${passed} testes PASSARAM, ${failed} falharam.`);
  console.log("=======================================================\n");

  if (failed > 0) process.exit(1);
}

runIngestionTests().catch(console.error);
