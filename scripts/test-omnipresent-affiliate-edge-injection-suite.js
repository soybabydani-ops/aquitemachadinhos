/**
 * AQUITEM ACHADINHOS — TESTE DO PROTOCOLO DE INJEÇÃO MASSIVA & ROTEAMENTO DE AFILIADOS POR BORDA DINÂMICA
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_ROOT = path.join(__dirname, '..');
const SUPABASE_ANON = "process.env.SUPABASE_ANON_KEY || ''";

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

async function runEdgeInjectionTests() {
  console.log("\n=======================================================");
  console.log("📌 TESTES: OMNIPRESENT AFFILIATE EDGE INJECTION (v6.0)");
  console.log("=======================================================\n");

  // 1. SCRIPT DE RASTREAMENTO & BORDA GEO-IP
  console.log("1. Testando Motor de Rastreamento de Afiliados por Borda...");
  const pTracker = path.join(REPO_ROOT, 'assets', 'affiliate-tracker.raw.js');
  assert(fs.existsSync(pTracker), "Arquivo assets/affiliate-tracker.raw.js existe");

  const cTracker = fs.readFileSync(pTracker, 'utf8');
  assert(cTracker.includes("detectGeoTarget"), "Função de detecção Geo-IP de borda presente");
  assert(cTracker.includes("GLOBAL_OFFERS"), "Portfólio Global (USD/EUR) configurado");
  assert(cTracker.includes("BR_OFFERS"), "Portfólio Nacional (BRL) configurado");
  assert(cTracker.includes("preloadAffiliateDomains"), "Preconnect/DNS-prefetch dinâmico de domínios configurado");
  assert(cTracker.includes("runAutoHyperlinking"), "Motor de Auto-Hyperlinking contextual ativo");
  assert(cTracker.includes("luxury-carousel"), "Blindagem contra mutação no Carrossel Luxuoso ativa");

  // 2. SUPABASE LOGS & WEBHOOK TELEGRAM
  console.log("\n2. Testando Tabela de Logs e Trigger do Telegram no Supabase...");
  const restUrl = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1/cliques_afiliados_logs?select=id,plataforma_afiliado,moeda,comissao_estimada_usd_brl&limit=1";
  
  await new Promise((resolve) => {
    https.get(restUrl, {
      headers: {
        'apikey': SUPABASE_ANON,
        'Authorization': `Bearer ${SUPABASE_ANON}`
      }
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        assert(res.statusCode === 200, "Tabela cliques_afiliados_logs respondeu HTTP 200 OK");
        resolve();
      });
    }).on('error', (e) => {
      assert(false, `Falha na requisição Supabase: ${e.message}`);
      resolve();
    });
  });

  // 3. BLINDAGEM ANTI-REGRESSÃO
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
  else process.exit(0);
}

runEdgeInjectionTests().catch(console.error);
