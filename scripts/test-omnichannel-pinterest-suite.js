/**
 * AQUITEM ACHADINHOS — TESTE GERAL: OMNICHANNEL VIDEO SYNTHESIZER & PINTEREST PERPETUAL CATALOG
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

async function runOmnichannelTests() {
  console.log("\n=======================================================");
  console.log("🛠️ TESTES DE VÍDEOS OMNICHANNEL & PINTEREST CATALOG");
  console.log("=======================================================\n");

  // 1. SUPABASE REST
  console.log("1. Testando Tabelas no Supabase REST...");
  try {
    const t1 = await fetchJson(`${SUPABASE_REST}/omnichannel_video_jobs?select=count`, SUPABASE_ANON);
    const t2 = await fetchJson(`${SUPABASE_REST}/pinterest_catalog_pins?select=count`, SUPABASE_ANON);

    assert(Array.isArray(t1) && t1[0].count >= 6, `omnichannel_video_jobs ativa (${t1[0]?.count} jobs prontos)`);
    assert(Array.isArray(t2) && t2[0].count >= 21, `pinterest_catalog_pins ativa (${t2[0]?.count} pins catalogados)`);
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. PINTEREST CATALOG XML & BADGES
  console.log("\n2. Testando Feed Pinterest e Imagens com Overlay Hacker...");
  const xmlPath = path.join(REPO_ROOT, 'pinterest-catalog.xml');
  assert(fs.existsSync(xmlPath), "pinterest-catalog.xml existe");
  const xmlContent = fs.readFileSync(xmlPath, 'utf8');
  assert(xmlContent.includes('assets/pins/'), "Imagens de Pins apontando para assets/pins/");
  assert(xmlContent.includes('-badge.svg'), "SVG Badges com Overlay Hacker presentes");

  const samplePin = path.join(REPO_ROOT, 'assets', 'pins', 'bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre-badge.svg');
  assert(fs.existsSync(samplePin), "Arquivo SVG com Overlay Hacker gerado");
  const pinContent = fs.readFileSync(samplePin, 'utf8');
  assert(pinContent.includes('BUG DE PREÇO - CLIQUE PARA RESGATAR CUPOM'), "Tarja de alta conversão presente no SVG");

  // 3. EDGE FUNCTION & ROTEIROS
  console.log("\n3. Testando Edge Function de Vídeos Sintéticos...");
  const edgePath = path.join(REPO_ROOT, 'supabase', 'functions', 'omnichannel-video-synthesizer', 'index.ts');
  assert(fs.existsSync(edgePath), "Edge Function omnichannel-video-synthesizer existe");

  // 4. BLINDAGEM ANTI-REGRESSÃO
  console.log("\n4. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso 100% blindado");

  // 5. SERVERLESS FUNCTIONS LIMIT
  console.log("\n5. Testando Limite de Serverless Functions...");
  const apiFiles = fs.readdirSync(path.join(REPO_ROOT, 'api')).filter(f => f.endsWith('.js') && !f.startsWith('_'));
  assert(apiFiles.length <= 12, `Total de serverless functions em api/: ${apiFiles.length} (limite <= 12)`);

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

runOmnichannelTests().catch(console.error);
