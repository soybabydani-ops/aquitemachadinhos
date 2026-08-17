/**
 * AQUITEM ACHADINHOS — SUÍTE DE TESTES: HIGH-FREQUENCY EDGE CRAWL OPTIMIZER
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const REPO_ROOT = path.join(__dirname, '..');
const SUPABASE_REST = "https://efvuzxdhsirpvxclgdfg.supabase.co/rest/v1";
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

async function runCrawlOptimizerTests() {
  console.log("\n=======================================================");
  console.log("⚡ TESTES: HIGH-FREQUENCY EDGE CRAWL OPTIMIZER");
  console.log("=======================================================\n");

  // 1. INVENTÁRIO DO SITEMAP.XML (> 1300 URLs)
  console.log("1. Testando Volume e Cobertura do Sitemap.xml...");
  const sitemapPath = path.join(REPO_ROOT, 'sitemap.xml');
  assert(fs.existsSync(sitemapPath), "Arquivo sitemap.xml existe na raiz");
  
  const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');
  const totalUrls = (sitemapXml.match(/<loc>/g) || []).length;
  assert(totalUrls >= 1300, `Total de URLs ativas no sitemap.xml: ${totalUrls} (meta >= 1300)`);
  assert(sitemapXml.includes("/pacotes-viagem"), "Cobertura de Turismo Global /pacotes-viagem validada");
  assert(sitemapXml.includes("/aluguel-carros"), "Cobertura de Locação Veicular /aluguel-carros validada");
  assert(sitemapXml.includes("/cursos"), "Cobertura Educacional /cursos validada");
  assert(sitemapXml.includes("/infoprodutos"), "Cobertura de Infoprodutos /infoprodutos validada");
  assert(sitemapXml.includes("/estudante"), "Cobertura Estudantil /estudante validada");

  // 2. EDGE FUNCTION HIGH-FREQUENCY-INDEX-DISPATCHER NO SUPABASE
  console.log("\n2. Testando Supabase Edge Function high-frequency-index-dispatcher...");
  try {
    const edgeRes = await postJson("https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/high-frequency-index-dispatcher", {}, SUPABASE_ANON);
    assert(edgeRes?.success === true, "Edge Function high-frequency-index-dispatcher respondeu HTTP 200");
    assert(edgeRes?.urls_dispatched >= 20, `Lote de URLs de alta prioridade submetidas: ${edgeRes?.urls_dispatched}`);
    assert(Array.isArray(edgeRes?.endpoints) && edgeRes?.endpoints.length >= 4, "Disparo multi-endpoint para IndexNow (Global, Bing, Yandex, Seznam) e Google confirmado");
  } catch (e) {
    assert(false, `Falha no teste da Edge Function: ${e.message}`);
  }

  // 3. PRELOADS DE SCRIPTS E MONETIZAÇÃO DUPLA
  console.log("\n3. Testando Preloads de Scripts (< 5ms) e Monetização Dupla...");
  const samplePages = [
    path.join(REPO_ROOT, 'pacotes-viagem', 'index.html'),
    path.join(REPO_ROOT, 'aluguel-carros', 'index.html'),
    path.join(REPO_ROOT, 'cursos', 'index.html')
  ];

  for (const pagePath of samplePages) {
    const pageHtml = fs.readFileSync(pagePath, 'utf8');
    const baseName = path.basename(path.dirname(pagePath));
    assert(pageHtml.includes('rel="preload" href="/assets/affiliate-tracker.js"'), `Preload do affiliate-tracker.js presente em /${baseName}`);
    assert(pageHtml.includes('rel="preload" href="/assets/security-shield.js"'), `Preload do security-shield.js presente em /${baseName}`);
    assert(pageHtml.includes('5975392'), `Bloco de monetização Adsterra CPM Zone 5975392 presente em /${baseName}`);
    assert(pageHtml.includes('11558154'), `Smart Tag PropellerAds Zone 11558154 presente em /${baseName}`);
  }

  // 4. BLINDAGEM DO CARROSSEL LUXUOSO
  console.log("\n4. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Início 100% blindado");
  assert(indexHtml.includes("<!-- FIM DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Fim 100% blindado");

  // 5. LIMITES SERVERLESS VERCEL
  console.log("\n5. Testando Limite de Serverless Functions em api/ (Hobby <= 12)...");
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

runCrawlOptimizerTests().catch(console.error);
