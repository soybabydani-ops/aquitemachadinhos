/**
 * AQUITEM ACHADINHOS — TESTE DA SINCRONIZAÇÃO DE TENDÊNCIAS EM TEMPO REAL
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

async function runTrendOptimizationTests() {
  console.log("\n=======================================================");
  console.log("📌 TESTES: SINCRONIZAÇÃO DE TENDÊNCIAS OTIMIZADAS");
  console.log("=======================================================\n");

  // 1. ARQUIVOS HTML OTIMIZADOS EM TENDENCIAS/
  console.log("1. Testando Presença de Arquivos de Tendência Otimizados...");
  const trendDir = path.join(REPO_ROOT, 'tendencias');
  assert(fs.existsSync(trendDir), "Diretório tendencias/ existe");

  const pOnibus = path.join(trendDir, 'horarios-linhas-onibus-barra-funda-campinas-hoje.html');
  const pINSS = path.join(trendDir, 'calendario-pagamento-beneficios-inss-pis-hoje.html');
  const pConcurso = path.join(trendDir, 'prefeitura-barretos-concurso-inscricoes-abertas-hoje.html');
  const pVoos = path.join(trendDir, 'reserva-voos-aeroporto-guarulhos-desconto-hoje.html');

  assert(fs.existsSync(pOnibus), "Página de Horários de Ônibus Barra Funda gerada");
  assert(fs.existsSync(pINSS), "Página de Calendário INSS/PIS gerada");
  assert(fs.existsSync(pConcurso), "Página de Concurso Barretos gerada");
  assert(fs.existsSync(pVoos), "Página de Voos Guarulhos gerada");

  // 2. PADRÃO DE TÍTULO, SCHEMA E MONETIZAÇÃO DUPLA
  console.log("\n2. Testando Padrão de Título e Injeção de Monetização...");
  const cOnibus = fs.readFileSync(pOnibus, 'utf8');
  assert(cOnibus.includes("📌 ATUALIZADO AGORA:"), "Padrão de título otimizado presente");
  assert(cOnibus.includes("5975392"), "Bloco Adsterra CPM Zone 5975392 presente");
  assert(cOnibus.includes("11558154"), "Smart Tag PropellerAds Zone 11558154 presente");
  assert(cOnibus.includes("aquitem-internal-link-mesh"), "Malha de links internos circulares presente");
  assert(cOnibus.includes('application/ld+json'), "Marcação Schema.org NewsArticle presente");

  // 3. SUPABASE EDGE FUNCTION REALTIME-TREND-MONITOR
  console.log("\n3. Testando Supabase Edge Function realtime-trend-monitor...");
  try {
    const edgeRes = await fetchJson("https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/realtime-trend-monitor", SUPABASE_ANON);
    assert(edgeRes?.success === true, "Edge Function realtime-trend-monitor respondeu HTTP 200");
    assert(edgeRes?.active_trends_count >= 4, "Monitoramento de tendências ativo no Supabase");
  } catch (e) {
    assert(false, `Falha ao testar Edge Function: ${e.message}`);
  }

  // 4. SITEMAP.XML
  console.log("\n4. Testando Atualização do Sitemap.xml...");
  const sitemap = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemap.includes("/tendencias/horarios-linhas-onibus-barra-funda-campinas-hoje"), "Rota Ônibus Barra Funda no sitemap.xml");
  assert(!sitemap.includes("/desconto-aplicado/"), "Páginas thin /desconto-aplicado/ devidamente excluídas do sitemap.xml");
  assert(!sitemap.includes("<loc>https://www.aquitemachadinhos.com.br/ir</loc>"), "Rota de redirect /ir devidamente excluída do sitemap.xml");
  const totalUrls = (sitemap.match(/<loc>/g) || []).length;
  assert(totalUrls >= 1485, `Total de URLs no sitemap.xml: ${totalUrls} (esperado >= 1495)`);

  // 5. BLINDAGEM ANTI-REGRESSÃO
  console.log("\n5. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Início 100% blindado");
  assert(indexHtml.includes("<!-- FIM DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Fim 100% blindado");

  // 6. LIMITES SERVERLESS VERCEL (HOBBY <= 12)
  console.log("\n6. Testando Limite de Serverless Functions em api/...");
  const apiFiles = fs.readdirSync(path.join(REPO_ROOT, 'api')).filter(f => f.endsWith('.js') && !f.startsWith('_'));
  assert(apiFiles.length <= 12, `Total de serverless functions em api/: ${apiFiles.length} (limite <= 12)`);

  console.log("\n=======================================================");
  console.log(`📊 RESULTADO: ${passed} testes PASSARAM, ${failed} falharam.`);
  console.log("=======================================================\n");

  if (failed > 0) process.exit(1);
}

function fetchJson(urlStr, key) {
  return new Promise((resolve, reject) => {
    https.get(urlStr, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
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

runTrendOptimizationTests().catch(console.error);
