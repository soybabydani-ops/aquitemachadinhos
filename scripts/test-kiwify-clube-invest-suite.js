/**
 * AQUITEM ACHADINHOS — TESTE GERAL: CLUBE INVEST (KIWIFY)
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

async function runKiwifyTests() {
  console.log("\n=======================================================");
  console.log("💰 TESTES DE INTELIGÊNCIA FINANCEIRA & CLUBE INVEST (KIWIFY)");
  console.log("=======================================================\n");

  // 1. SUPABASE REST
  console.log("1. Testando Cadastro no Supabase REST...");
  try {
    const prods = await fetchJson(`${SUPABASE_REST}/achadinhos_produtos_monetizados?categoria=eq.Infoprodutos_Kiwify`, SUPABASE_ANON);
    assert(Array.isArray(prods) && prods.length >= 2, `achadinhos_produtos_monetizados contém ${prods?.length} infoprodutos Kiwify cadastrados`);
    assert(prods[0]?.link_afiliado_final?.includes('StKTBKWy'), "Link oficial da Kiwify (StKTBKWy) registrado");
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. ARQUIVOS HTML ESTÁTICOS
  console.log("\n2. Testando Presença de Arquivos Estáticos...");
  const pIndep = path.join(REPO_ROOT, 'clube-invest', 'como-destravar-independencia-financeira.html');
  const pMetodo = path.join(REPO_ROOT, 'clube-invest', 'metodo-clube-invest-oficial-desconto.html');
  const pPouco = path.join(REPO_ROOT, 'clube-invest', 'como-comecar-investir-pouco-dinheiro-passo-a-passo.html');
  const pPedro = path.join(REPO_ROOT, 'clube-invest', 'treinamento-financas-pedro-henrique-etelvino.html');
  const pHub = path.join(REPO_ROOT, 'clube-invest', 'index.html');

  assert(fs.existsSync(pIndep), "Página de Independência Financeira gerada");
  assert(fs.existsSync(pMetodo), "Página de Método Oficial gerada");
  assert(fs.existsSync(pPouco), "Página de Investir com Pouco Dinheiro gerada");
  assert(fs.existsSync(pPedro), "Página Pedro Henrique Etelvino gerada");
  assert(fs.existsSync(pHub), "Hub /clube-invest/index.html gerado");

  // 3. TÍTULOS E ESCASSEZ
  console.log("\n3. Testando Títulos e Cronômetro de Escassez...");
  const cIndep = fs.readFileSync(pIndep, 'utf8');
  assert(cIndep.includes("VAGAS ABERTAS: Como Destravar a Independência Financeira"), "Título do Clube Invest validado");
  assert(cIndep.includes("countdownTimer"), "Cronômetro regressivo de escassez em JS puro presente");
  assert(cIndep.includes("StKTBKWy"), "Link Kiwify oficial StKTBKWy embutido no CTA");

  // 4. MONETIZAÇÃO ADSTERRA & PROPELLERADS
  console.log("\n4. Testando Injeção de Monetização...");
  assert(cIndep.includes("5975392") && cIndep.includes("11558154"), "Clube Invest monetizado com Adsterra e PropellerAds");

  // 5. SITEMAP
  console.log("\n5. Testando Sitemap.xml...");
  const sitemap = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemap.includes("/clube-invest/como-destravar-independencia-financeira"), "Rota Clube Invest no sitemap");
  assert(sitemap.includes("/clube-invest"), "Hub /clube-invest no sitemap");

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

runKiwifyTests().catch(console.error);
