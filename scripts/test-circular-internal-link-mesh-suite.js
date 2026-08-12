/**
 * AQUITEM ACHADINHOS — TESTE DA MALHA DE RELEVÂNCIA INTERNA CIRCULAR & CACHE HEADERS
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

function getHtmlFilesRecursive(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (!['node_modules', '.vercel', '.git'].includes(file)) {
        results = results.concat(getHtmlFilesRecursive(filePath));
      }
    } else if (file.endsWith('.html') && file !== '404.html') {
      results.push(filePath);
    }
  });
  return results;
}

async function runCircularMeshTests() {
  console.log("\n=======================================================");
  console.log("🌐 TESTES: MALHA DE RELEVÂNCIA INTERNA CIRCULAR & CACHE");
  console.log("=======================================================\n");

  // 1. INJEÇÃO DA MALHA EM TODAS AS PÁGINAS HTML
  console.log("1. Testando Injeção da Malha de Links Internos Circulares...");
  const htmlFiles = getHtmlFilesRecursive(REPO_ROOT);

  let meshCount = 0;
  for (const hf of htmlFiles) {
    const content = fs.readFileSync(hf, 'utf8');
    if (content.includes('aquitem-internal-link-mesh')) {
      meshCount++;
    }
  }

  assert(meshCount >= 1400, `Total de páginas com a malha interna circular injetada: ${meshCount} (esperado >= 1400)`);

  // 2. CONTEÚDO E ÂNCORAS DA MALHA (4 COLUNAS ESTRATÉGICAS)
  console.log("\n2. Testando Âncoras e Interconexão das Verticais...");
  const samplePage = path.join(REPO_ROOT, 'aluguel-carros', 'index.html');
  const sampleContent = fs.readFileSync(samplePage, 'utf8');

  assert(sampleContent.includes('/pacotes-viagem'), "Link para Turismo VIP /pacotes-viagem presente na malha");
  assert(sampleContent.includes('/cursos'), "Link para Educação /cursos presente na malha");
  assert(sampleContent.includes('/luxo-vip'), "Link para Alto Luxo CJ /luxo-vip presente na malha");
  assert(sampleContent.includes('/infoprodutos/clube-invest-v3'), "Link para Clube Invest v3 presente na malha");
  assert(sampleContent.includes('/estudante/como-pagar-meia-entrada-festa-do-peao-barretos'), "Link para Carteirinha Estudantil presente na malha");
  assert(sampleContent.includes('/concursos/barretos-inscricoes-abertas'), "Link para Concursos Municipais presente na malha");
  assert(sampleContent.includes('/sobre'), "Link institucional E-E-A-T /sobre presente na malha");

  // 3. CABEÇALHOS DE CACHE EM VERCEL.JSON
  console.log("\n3. Testando Configuração de Cache Imutável em vercel.json...");
  const vercelJson = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'vercel.json'), 'utf8'));
  const headers = vercelJson.headers || [];

  const assetCache = headers.find(h => h.source && h.source.includes('/assets/'));
  assert(assetCache && assetCache.headers.some(x => x.key === 'Cache-Control' && x.value.includes('immutable')), "Cache-Control: public, max-age=31536000, immutable configurado para /assets/");

  // 4. EDGE FUNCTION HIGH-FREQUENCY-INDEX-DISPATCHER (MULTI-ENDPOINT)
  console.log("\n4. Testando Supabase Edge Function high-frequency-index-dispatcher...");
  try {
    const edgeRes = await postJson("https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/high-frequency-index-dispatcher", {}, SUPABASE_ANON);
    assert(edgeRes?.success === true, "Edge Function high-frequency-index-dispatcher respondeu HTTP 200");
    assert(edgeRes?.urls_dispatched >= 25, `Lote de URLs de alta prioridade da malha submetidas: ${edgeRes?.urls_dispatched}`);
  } catch (e) {
    assert(false, `Falha ao testar Edge Function de Indexação: ${e.message}`);
  }

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

runCircularMeshTests().catch(console.error);
