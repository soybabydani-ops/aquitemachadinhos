/**
 * AQUITEM ACHADINHOS — TESTE GERAL: ENERGY REVOLUTION SYSTEM (CLICKBANK USD)
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

async function runClickBankTests() {
  console.log("\n=======================================================");
  console.log("⚡ TESTES DO ENERGY REVOLUTION SYSTEM (CLICKBANK USD)");
  console.log("=======================================================\n");

  // 1. SUPABASE REST
  console.log("1. Testando Cadastro no Supabase REST...");
  try {
    const prods = await fetchJson(`${SUPABASE_REST}/achadinhos_produtos_monetizados?categoria=eq.Infoprodutos_ClickBank_USD`, SUPABASE_ANON);
    assert(Array.isArray(prods) && prods.length >= 2, `achadinhos_produtos_monetizados contém ${prods?.length} infoprodutos ClickBank cadastrados`);
    assert(prods[0]?.link_afiliado_final?.includes('3c970xyjyfi6b8lztkll2u0r75'), "Link oficial do ClickBank (shield: 3c970xyjyfi6b8lztkll2u0r75) registrado");
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. ARQUIVOS HTML ESTÁTICOS
  console.log("\n2. Testando Presença de Arquivos Estáticos...");
  const pBills = path.join(REPO_ROOT, 'energy-system', 'how-to-lower-electricity-bills-at-home-legally.html');
  const pDiscount = path.join(REPO_ROOT, 'energy-system', 'special-discount-code-energy-revolution-system.html');
  const pReviews = path.join(REPO_ROOT, 'energy-system', 'ancient-invention-blueprints-power-on-demand-reviews.html');
  const pTesla = path.join(REPO_ROOT, 'energy-system', 'tesla-forbidden-blueprint-power-grid-independence.html');
  const pHub = path.join(REPO_ROOT, 'energy-system', 'index.html');

  assert(fs.existsSync(pBills), "Página How to Lower Electricity Bills gerada");
  assert(fs.existsSync(pDiscount), "Página Special Discount Code gerada");
  assert(fs.existsSync(pReviews), "Página Ancient Invention Reviews gerada");
  assert(fs.existsSync(pTesla), "Página Tesla Forbidden Blueprint gerada");
  assert(fs.existsSync(pHub), "Hub /energy-system/index.html gerado");

  // 3. TÍTULOS E ESCASSEZ
  console.log("\n3. Testando Títulos e Cronômetro de Escassez...");
  const cBills = fs.readFileSync(pBills, 'utf8');
  assert(cBills.includes("FLASH SALE: How to Lower Electricity Bills"), "Título de Flash Sale validado");
  assert(cBills.includes("countdownTimer"), "Cronômetro regressivo de escassez em JS puro presente");
  assert(cBills.includes("3c970xyjyfi6b8lztkll2u0r75"), "Link ClickBank oficial 3c970xyjyfi6b8lztkll2u0r75 embutido no CTA");

  // 4. MONETIZAÇÃO ADSTERRA & PROPELLERADS
  console.log("\n4. Testando Injeção de Monetização...");
  assert(cBills.includes("5975392") && cBills.includes("11558154"), "ClickBank Energy monetizado com Adsterra e PropellerAds");

  // 5. SITEMAP
  console.log("\n5. Testando Sitemap.xml...");
  const sitemap = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemap.includes("/energy-system/how-to-lower-electricity-bills-at-home-legally"), "Rota ClickBank Energy no sitemap");
  assert(sitemap.includes("/energy-system"), "Hub /energy-system no sitemap");

  // 6. BLINDAGEM ANTI-REGRESSÃO
  console.log("\n6. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso 100% blindado");

  // 7. VERCEL SERVERLESS LIMIT
  console.log("\n7. Testando Limite de Serverless Functions...");
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

runClickBankTests().catch(console.error);
