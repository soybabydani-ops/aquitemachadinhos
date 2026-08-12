/**
 * AQUITEM ACHADINHOS — TESTE DO PROTOCOLO DE BACKLINK SYNDICATION & OPEN DATA FEEDS (DA 90+)
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_ROOT = path.join(__dirname, '..');
const SUPABASE_REST = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
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

async function runBacklinkSyndicationTests() {
  console.log("\n=======================================================");
  console.log("🚀 TESTES: PROTOCOLO DE DATA FEEDS & BACKLINK MAGNETS (DA 90+)");
  console.log("=======================================================\n");

  // 1. FEED RSS 2.0 XML (/feeds/achadinhos-global.xml)
  console.log("1. Testando Feed RSS 2.0 XML Global...");
  const rssPath = path.join(REPO_ROOT, 'feeds', 'achadinhos-global.xml');
  assert(fs.existsSync(rssPath), "Arquivo /feeds/achadinhos-global.xml existe");
  
  const rssContent = fs.readFileSync(rssPath, 'utf8');
  assert(rssContent.includes('<rss version="2.0"'), "Estrutura XML RSS 2.0 válida");
  assert(rssContent.includes('https://www.aquitemachadinhos.com.br/pacotes-viagem'), "Link canônico de Turismo VIP presente no feed");
  assert(rssContent.includes('https://www.aquitemachadinhos.com.br/aluguel-carros'), "Link canônico de Aluguel de Carros presente no feed");
  assert(rssContent.includes('https://www.aquitemachadinhos.com.br/luxo-vip'), "Link canônico de Alto Luxo CJ presente no feed");
  assert(rssContent.includes('https://www.aquitemachadinhos.com.br/cursos'), "Link canônico de Cursos Udemy presente no feed");

  // 2. CATÁLOGO DE DADOS ABERTOS JSON (/data/ofertas-turismo-municipais.json)
  console.log("\n2. Testando Catálogo JSON de Dados Abertos...");
  const jsonPath = path.join(REPO_ROOT, 'data', 'ofertas-turismo-municipais.json');
  assert(fs.existsSync(jsonPath), "Arquivo /data/ofertas-turismo-municipais.json existe");

  const jsonData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  assert(jsonData.schema_version === "2.0.0", "Versão do schema 2.0.0 confirmada");
  assert(Array.isArray(jsonData.municipios_atendidos_64) && jsonData.municipios_atendidos_64.length === 64, "64 municípios mapeados no catálogo aberto");
  assert(jsonData.municipios_atendidos_64[0]?.urls_canônicas?.aluguel_carros?.includes('aquitemachadinhos.com.br'), "URLs canônicas de mobilidade geradas corretamente");

  // 3. DOCUMENTAÇÃO OPEN-DATA-INDEX.MD
  console.log("\n3. Testando Documentação Aberta em Markdown...");
  const mdPath = path.join(REPO_ROOT, 'OPEN-DATA-INDEX.md');
  assert(fs.existsSync(mdPath), "Arquivo OPEN-DATA-INDEX.md gerado");
  const mdContent = fs.readFileSync(mdPath, 'utf8');
  assert(mdContent.includes('https://www.aquitemachadinhos.com.br/pacotes-viagem'), "Backlinks ancorados para Turismo VIP presentes no Markdown");
  assert(mdContent.includes('https://www.aquitemachadinhos.com.br/luxo-vip'), "Backlinks ancorados para Alto Luxo CJ presentes no Markdown");

  // 4. SUPABASE EDGE FUNCTION ONESIGNAL PUSH NOTIFIER
  console.log("\n4. Testando Supabase Edge Function onesignal-push-notifier...");
  try {
    const pushPayload = {
      title: "💎 [ALERTA VIP] Teste de Tráfego OneSignal",
      message: "Verificação da entrega de notificações push.",
      url: "https://www.aquitemachadinhos.com.br/luxo-vip"
    };
    const pushRes = await postJson("https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/onesignal-push-notifier", pushPayload, SUPABASE_ANON);
    assert(pushRes?.success === true, "Edge Function onesignal-push-notifier respondeu HTTP 200");
    assert(pushRes?.app_id === "1760660e-db11-41d8-bdf9-2b2b24c943b7", "App ID oficial do OneSignal confirmado");
  } catch (e) {
    assert(false, `Falha ao testar Edge Function OneSignal: ${e.message}`);
  }

  // 5. CABEÇALHOS DE MIME TYPE EM VERCEL.JSON
  console.log("\n5. Testando MIME Types de Feeds em vercel.json...");
  const vercelJson = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'vercel.json'), 'utf8'));
  const headers = vercelJson.headers || [];
  const feedHeader = headers.find(h => h.source && h.source.includes('/feeds/'));
  assert(feedHeader && feedHeader.headers.some(x => x.key === 'Content-Type' && x.value.includes('application/rss+xml')), "Content-Type: application/rss+xml configurado para /feeds/");

  // 6. BLINDAGEM ANTI-REGRESSÃO
  console.log("\n6. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Início 100% blindado");
  assert(indexHtml.includes("<!-- FIM DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Fim 100% blindado");

  // 7. LIMITES SERVERLESS VERCEL (HOBBY <= 12)
  console.log("\n7. Testando Limite de Serverless Functions em api/...");
  const apiFiles = fs.readdirSync(path.join(REPO_ROOT, 'api')).filter(f => f.endsWith('.js') && !f.startsWith('_'));
  assert(apiFiles.length <= 12, `Total de serverless functions em api/: ${apiFiles.length} (limite <= 12)`);

  console.log("\n=======================================================");
  console.log(`📊 RESULTADO: ${passed} testes PASSARAM, ${failed} falharam.`);
  console.log("=======================================================\n");

  if (failed > 0) process.exit(1);
}

function postJson(urlStr, data, key) {
  return new Promise((resolve, reject) => {
    const u = new URL(urlStr);
    const postData = JSON.stringify(data);
    const options = {
      hostname: u.hostname,
      port: 443,
      path: u.pathname + u.search,
      method: 'POST',
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { resolve({ raw: body, status: res.statusCode }); }
      });
    });

    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

runBacklinkSyndicationTests().catch(console.error);
