/**
 * AQUITEM ACHADINHOS — TESTE GERAL DE DESTINOS GLOBAIS & MALAS DE VIAGEM
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

async function runTests() {
  console.log("\n=======================================================");
  console.log("🛠️ INICIANDO TESTES DE DESTINOS GLOBAIS E MALAS");
  console.log("=======================================================\n");

  // 1. SUPABASE REST
  console.log("1. Testando Tabelas no Supabase REST...");
  try {
    const t1 = await fetchJson(`${SUPABASE_REST}/global_destinos_turisticos?select=count`, SUPABASE_ANON);
    const t2 = await fetchJson(`${SUPABASE_REST}/travel_gear_achadinhos?select=count`, SUPABASE_ANON);

    assert(Array.isArray(t1) && t1[0].count >= 48, `global_destinos_turisticos ativa (${t1[0]?.count} destinos)`);
    assert(Array.isArray(t2) && t2[0].count >= 8, `travel_gear_achadinhos ativa (${t2[0]?.count} produtos)`);
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. ARQUIVOS HTML MULTILÍNGUES GERADOS
  console.log("\n2. Testando Presença de Arquivos Estáticos Multilíngues...");
  const pPt = path.join(REPO_ROOT, 'destinos', 'orlando-passagens-hoteis-baratos.html');
  const pEn = path.join(REPO_ROOT, 'en', 'destinations', 'orlando-cheap-flights-hotel-deals.html');
  const pEs = path.join(REPO_ROOT, 'es', 'destinos', 'orlando-vuelos-baratos-hoteles.html');
  const pGear = path.join(REPO_ROOT, 'malas-e-viagem', 'kit-malas-viagem-rigidas-360-tsa-amazon-promocao.html');

  assert(fs.existsSync(pPt), "Página PT de Orlando gerada");
  assert(fs.existsSync(pEn), "Página EN de Orlando gerada");
  assert(fs.existsSync(pEs), "Página ES de Orlando gerada");
  assert(fs.existsSync(pGear), "Página de Malas gerada");

  // 3. HREFLANG E METADATA
  console.log("\n3. Testando Tags Hreflang e SEO Internacional...");
  const cPt = fs.readFileSync(pPt, 'utf8');
  assert(cPt.includes('hreflang="pt-BR"'), "Hreflang pt-BR presente");
  assert(cPt.includes('hreflang="en"'), "Hreflang en presente");
  assert(cPt.includes('hreflang="es"'), "Hreflang es presente");
  assert(cPt.includes('hreflang="x-default"'), "Hreflang x-default presente");

  // 4. MONETIZAÇÃO ADSTERRA & PROPELLERADS
  console.log("\n4. Testando Injeção de Monetização...");
  assert(cPt.includes("5975392") && cPt.includes("11558154"), "Destino PT monetizado");
  const cGear = fs.readFileSync(pGear, 'utf8');
  assert(cGear.includes("5975392") && cGear.includes("11558154"), "Malas monetizado");

  // 5. SITEMAP
  console.log("\n5. Testando Sitemap.xml...");
  const sitemap = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemap.includes("/destinos/orlando-passagens-hoteis-baratos"), "Destino PT no sitemap");
  assert(sitemap.includes("/en/destinations/orlando-cheap-flights-hotel-deals"), "Destino EN no sitemap");
  assert(sitemap.includes("/es/destinos/orlando-vuelos-baratos-hoteles"), "Destino ES no sitemap");
  assert(sitemap.includes("/malas-e-viagem/kit-malas-viagem-rigidas-360-tsa-amazon-promocao"), "Malas no sitemap");

  // 6. BLINDAGEM ANTI-REGRESSÃO
  console.log("\n6. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso blindado");

  // 7. VERCEL SERVERLESS LIMIT
  console.log("\n7. Testando Limite de Serverless Functions...");
  const apiFiles = fs.readdirSync(path.join(REPO_ROOT, 'api')).filter(f => f.endsWith('.js') && !f.startsWith('_'));
  assert(apiFiles.length <= 12, `Total de serverless functions em api/: ${apiFiles.length} (limite <= 12)`);

  console.log("\n=======================================================");
  console.log(`📊 RESULTADO FINAL: ${passed} testes PASSARAM, ${failed} falharam.`);
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
