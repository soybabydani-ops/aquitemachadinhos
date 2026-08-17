/**
 * AQUITEM ACHADINHOS — TESTE GERAL: HIGH-TICKET LUXO, B2B INVESTIMENTOS & HEDGE GLOBAL
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

async function runB2bTests() {
  console.log("\n=======================================================");
  console.log("💎 TESTES DE ALTO LUXO, B2B IMOBILIÁRIO & HEDGE GLOBAL");
  console.log("=======================================================\n");

  // 1. SUPABASE REST
  console.log("1. Testando Tabelas High-Ticket no Supabase REST...");
  try {
    const t1 = await fetchJson(`${SUPABASE_REST}/high_ticket_luxo_trafego?select=count`, SUPABASE_ANON);
    const t2 = await fetchJson(`${SUPABASE_REST}/investimentos_imobiliarios_b2b?select=count`, SUPABASE_ANON);
    const t3 = await fetchJson(`${SUPABASE_REST}/global_hedge_infrastructure?select=count`, SUPABASE_ANON);
    const t4 = await fetchJson(`${SUPABASE_REST}/logistica_pesada_corporativa?select=count`, SUPABASE_ANON);

    assert(Array.isArray(t1) && t1[0].count >= 6, `high_ticket_luxo_trafego ativa (${t1[0]?.count} rotas premium)`);
    assert(Array.isArray(t2) && t2[0].count >= 5, `investimentos_imobiliarios_b2b ativa (${t2[0]?.count} ativos comerciais)`);
    assert(Array.isArray(t3) && t3[0].count >= 3, `global_hedge_infrastructure ativa (${t3[0]?.count} serviços de hedge)`);
    assert(Array.isArray(t4) && t4[0].count >= 4, `logistica_pesada_corporativa ativa (${t4[0]?.count} rotas cargueiras)`);
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. ARQUIVOS HTML ESTÁTICOS
  console.log("\n2. Testando Presença de Arquivos Estáticos...");
  const pLuxo = path.join(REPO_ROOT, 'luxo', 'fretamento-jato-executivo-sao-paulo-catarina-trancoso.html');
  const pInvest = path.join(REPO_ROOT, 'investimentos', 'pontos-comerciais-e-terrenos-em-sao-paulo.html');
  const pHedge = path.join(REPO_ROOT, 'hedge', 'corporate-jet-insurance-fleet-liability.html');
  const pCargo = path.join(REPO_ROOT, 'logistica-pesada', 'sao-paulo-fretamento-industrial.html');

  assert(fs.existsSync(pLuxo), "Página de Jato Privado para Trancoso gerada");
  assert(fs.existsSync(pInvest), "Página de Investimento B2B em SP gerada");
  assert(fs.existsSync(pHedge), "Página de Seguro de Frotas Hedge gerada");
  assert(fs.existsSync(pCargo), "Página de Carga Aérea Pesada gerada");

  // 3. METADATA E TÍTULOS DE ALTA CONVERSÃO
  console.log("\n3. Testando Títulos e Tags...");
  const cLuxo = fs.readFileSync(pLuxo, 'utf8');
  const cInvest = fs.readFileSync(pInvest, 'utf8');
  const cHedge = fs.readFileSync(pHedge, 'utf8');

  assert(cLuxo.includes("ULTRA-VIP: Fretamento de Jato Executivo e Transfer Privado"), "Título de Alto Luxo validado");
  assert(cInvest.includes("INVESTIMENTO INDUSTRIAL: Áreas Disponíveis e Viabilidade"), "Título de Investimentos B2B validado");
  assert(cHedge.includes("INSTITUTIONAL HEDGE:"), "Título de Hedge Global validado");

  // 4. MONETIZAÇÃO ADSTERRA & PROPELLERADS
  console.log("\n4. Testando Injeção de Monetização...");
  assert(cLuxo.includes("5975392") && cLuxo.includes("11558154"), "Luxo monetizado com Adsterra e PropellerAds");
  assert(cInvest.includes("5975392") && cInvest.includes("11558154"), "Investimentos monetizado com Adsterra e PropellerAds");
  assert(cHedge.includes("5975392") && cHedge.includes("11558154"), "Hedge monetizado com Adsterra e PropellerAds");

  // 5. EDGE FUNCTION LEAD B2B
  console.log("\n5. Testando Edge Function de Leads B2B...");
  const edgePath = path.join(REPO_ROOT, 'supabase', 'functions', 'high-ticket-lead-engine', 'index.ts');
  assert(fs.existsSync(edgePath), "Edge Function high-ticket-lead-engine existe");

  // 6. SITEMAP
  console.log("\n6. Testando Sitemap...");
  const sitemap = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemap.includes("/luxo/fretamento-jato-executivo-sao-paulo-catarina-trancoso"), "Rota de Luxo no sitemap");
  assert(sitemap.includes("/investimentos/pontos-comerciais-e-terrenos-em-sao-paulo"), "Rota de Investimento no sitemap");
  assert(sitemap.includes("/hedge/corporate-jet-insurance-fleet-liability"), "Rota de Hedge no sitemap");
  assert(sitemap.includes("/logistica-pesada/sao-paulo-fretamento-industrial"), "Rota de Carga no sitemap");

  // 7. BLINDAGEM ANTI-REGRESSÃO
  console.log("\n7. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso 100% blindado");

  // 8. SERVERLESS FUNCTIONS LIMIT
  console.log("\n8. Testando Limite de Serverless Functions...");
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

runB2bTests().catch(console.error);
