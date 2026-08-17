/**
 * AQUITEM ACHADINHOS — TESTE GERAL OMNICHANNEL & FACELESS SHORTS ENGINE
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

async function runTests() {
  console.log("\n=======================================================");
  console.log("🛠️ TESTES DO FACELESS SHORTS ENGINE & OMNICHANNEL");
  console.log("=======================================================\n");

  // 1. SUPABASE REST
  console.log("1. Testando Tabelas de Roteiros no Supabase REST...");
  try {
    const t1 = await fetchJson(`${SUPABASE_REST}/automacao_youtube_roteiros?select=count`, SUPABASE_ANON);
    const t2 = await fetchJson(`${SUPABASE_REST}/automacao_videos_roteiros?select=count`, SUPABASE_ANON);

    assert(Array.isArray(t1) && t1[0].count >= 6, `automacao_youtube_roteiros ativa (${t1[0]?.count} roteiros prontos)`);
    assert(Array.isArray(t2) && t2[0].count >= 6, `automacao_videos_roteiros ativa (${t2[0]?.count} vídeos sincronizados)`);
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. PINTEREST CATALOG XML
  console.log("\n2. Testando Pinterest Catalog XML Feed...");
  const pinterestPath = path.join(REPO_ROOT, 'pinterest-catalog.xml');
  assert(fs.existsSync(pinterestPath), "Arquivo pinterest-catalog.xml existe na raiz");
  const pinterestXml = fs.readFileSync(pinterestPath, 'utf8');
  assert(pinterestXml.includes('<g:id>'), "Tags g:id presentes no feed Pinterest");
  assert(pinterestXml.includes('https://www.aquitemachadinhos.com.br'), "URLs canônicas no feed Pinterest");
  assert(pinterestXml.includes('<g:price>'), "Preços formatados no feed Pinterest");

  // 3. GOOGLE IMAGENS SEO
  console.log("\n3. Testando ImageObject Schema e Google Imagens SEO...");
  const bugFile = path.join(REPO_ROOT, 'cupons-ativos', 'bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre.html');
  const bugContent = fs.readFileSync(bugFile, 'utf8');
  assert(bugContent.includes('"@type": "ImageObject"'), "ImageObject Schema presente nas páginas de produtos");
  assert(bugContent.includes('⚠️ BUG DE PREÇO - CLIQUE AQUI'), "Badge visual de urgência presente");

  // 4. EDGE FUNCTION
  console.log("\n4. Testando Supabase Edge Function...");
  const edgeFnPath = path.join(REPO_ROOT, 'supabase', 'functions', 'faceless-shorts-generator', 'index.ts');
  assert(fs.existsSync(edgeFnPath), "Edge Function faceless-shorts-generator existe");

  console.log("\n=======================================================");
  console.log(`📊 RESULTADO: ${passed} testes PASSARAM, ${failed} falharam.`);
  console.log("=======================================================\n");

  if (failed > 0) process.exit(1);
}

function fetchJson(url, key) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`,
        'Range-Unit': 'items',
        'Prefer': 'count=exact'
      }
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

runTests().catch(console.error);
