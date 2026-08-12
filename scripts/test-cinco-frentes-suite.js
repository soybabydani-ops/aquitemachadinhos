/**
 * AQUITEM ACHADINHOS — TESTE GERAL DAS 5 NOVAS FRENTES DE CRESCIMENTO
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
  console.log("🛠️ INICIANDO TESTES DAS 5 FRENTES DE CRESCIMENTO");
  console.log("=======================================================\n");

  // 1. SUPABASE REST
  console.log("1. Testando Tabelas no Supabase REST...");
  try {
    const t1 = await fetchJson(`${SUPABASE_REST}/eventos_grandes_shows?select=count`, SUPABASE_ANON);
    const t2 = await fetchJson(`${SUPABASE_REST}/cupons_bugs_relampago?select=count`, SUPABASE_ANON);
    const t3 = await fetchJson(`${SUPABASE_REST}/consultas_beneficios_calendarios?select=count`, SUPABASE_ANON);
    const t4 = await fetchJson(`${SUPABASE_REST}/barretos_guia_estrategico?select=count`, SUPABASE_ANON);
    const t5 = await fetchJson(`${SUPABASE_REST}/looks_country_achadinhos?select=count`, SUPABASE_ANON);

    assert(Array.isArray(t1) && t1[0].count >= 6, `eventos_grandes_shows ativa (${t1[0]?.count} shows)`);
    assert(Array.isArray(t2) && t2[0].count >= 6, `cupons_bugs_relampago ativa (${t2[0]?.count} bugs de preço)`);
    assert(Array.isArray(t3) && t3[0].count >= 5, `consultas_beneficios_calendarios ativa (${t3[0]?.count} benefícios)`);
    assert(Array.isArray(t4) && t4[0].count >= 6, `barretos_guia_estrategico ativa (${t4[0]?.count} guias)`);
    assert(Array.isArray(t5) && t5[0].count >= 7, `looks_country_achadinhos ativa (${t5[0]?.count} looks)`);
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. ARQUIVOS HTML GERADOS
  console.log("\n2. Testando Presença de Arquivos Estáticos...");
  const pShows = path.join(REPO_ROOT, 'eventos', 'shakira-em-sao-paulo-como-chegar-hoteis.html');
  const pBugs = path.join(REPO_ROOT, 'cupons-ativos', 'bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre.html');
  const pBeneficios = path.join(REPO_ROOT, 'consultas', 'calendario-de-pagamentos-bolsa-familia-2026.html');
  const pBarretos = path.join(REPO_ROOT, 'barretos-2026', 'biometria-facial-festa-do-peao-barretos.html');
  const pLooks = path.join(REPO_ROOT, 'looks', 'chapeu-pralana-barretos-promocao.html');

  assert(fs.existsSync(pShows), "Página de Show gerada");
  assert(fs.existsSync(pBugs), "Página de Bug de Preço gerada");
  assert(fs.existsSync(pBeneficios), "Página de Benefício gerada");
  assert(fs.existsSync(pBarretos), "Página de Barretos gerada");
  assert(fs.existsSync(pLooks), "Página de Looks Country gerada");

  // 3. TÍTULOS E METADATA
  console.log("\n3. Testando Títulos e Tags de Conversão...");
  const cShows = fs.readFileSync(pShows, 'utf8');
  const cBugs = fs.readFileSync(pBugs, 'utf8');
  const cBeneficios = fs.readFileSync(pBeneficios, 'utf8');
  const cBarretos = fs.readFileSync(pBarretos, 'utf8');
  const cLooks = fs.readFileSync(pLooks, 'utf8');

  assert(cShows.includes("GUIA DE VIAGEM: Como ir e onde se hospedar para o show"), "Título de Show validado");
  assert(cBugs.includes("BUG DETECTADO:"), "Título de Bug de Preço validado");
  assert(cBeneficios.includes("CONSULTA ATUALIZADA: Veja as datas de liberação e regras para o"), "Título de Benefícios validado");
  assert(cBarretos.includes("URGENTE: Passagens de Ônibus e Vagas de Camping para Barretos Quase Esgotadas"), "Título de Barretos validado");
  assert(cLooks.includes("ALERTA DE PREÇO: Itens de Moda Country e Chapéus para Barretos"), "Título de Looks validado");

  // 4. MONETIZAÇÃO ADSTERRA & PROPELLERADS
  console.log("\n4. Testando Injeção de Monetização...");
  assert(cShows.includes("5975392") && cShows.includes("11558154"), "Shows monetizado com Adsterra e PropellerAds");
  assert(cBugs.includes("5975392") && cBugs.includes("11558154"), "Bugs monetizado com Adsterra e PropellerAds");
  assert(cBeneficios.includes("5975392") && cBeneficios.includes("11558154"), "Benefícios monetizado com Adsterra e PropellerAds");
  assert(cBarretos.includes("5975392") && cBarretos.includes("11558154"), "Barretos monetizado com Adsterra e PropellerAds");
  assert(cLooks.includes("5975392") && cLooks.includes("11558154"), "Looks monetizado com Adsterra e PropellerAds");

  // 5. SITEMAP & TOTAL
  console.log("\n5. Testando Sitemap.xml...");
  const sitemap = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemap.includes("/eventos/shakira-em-sao-paulo-como-chegar-hoteis"), "Show no sitemap");
  assert(sitemap.includes("/cupons-ativos/bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre"), "Bug no sitemap");
  assert(sitemap.includes("/consultas/calendario-de-pagamentos-bolsa-familia-2026"), "Benefício no sitemap");
  assert(sitemap.includes("/barretos-2026/biometria-facial-festa-do-peao-barretos"), "Barretos no sitemap");
  assert(sitemap.includes("/looks/chapeu-pralana-barretos-promocao"), "Look no sitemap");

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
