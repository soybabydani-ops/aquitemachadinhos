/**
 * AQUITEM ACHADINHOS — TESTE GERAL DE INFOPRODUTOS HOTMART (FINANÇAS & INVESTIMENTOS)
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

async function runHotmartTests() {
  console.log("\n=======================================================");
  console.log("🎓 TESTES DE INFOPRODUTOS HOTMART & FINANÇAS");
  console.log("=======================================================\n");

  // 1. SUPABASE REST
  console.log("1. Testando Cadastro no Supabase REST...");
  try {
    const prods = await fetchJson(`${SUPABASE_REST}/achadinhos_produtos_monetizados?categoria=eq.Infoprodutos_Financas`, SUPABASE_ANON);
    assert(Array.isArray(prods) && prods.length >= 2, `achadinhos_produtos_monetizados contém ${prods?.length} infoprodutos cadastrados`);
    assert(prods[0]?.link_afiliado_final?.includes('S107130565O'), "Link oficial da Hotmart (S107130565O) registrado");
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. ARQUIVOS HTML ESTÁTICOS
  console.log("\n2. Testando Presença de Arquivos Estáticos...");
  const pClube = path.join(REPO_ROOT, 'infoprodutos', 'clube-invest-v3.html');
  const pTreina = path.join(REPO_ROOT, 'infoprodutos', 'treinamento-liberdade-financeira-investimentos.html');
  const pHub = path.join(REPO_ROOT, 'infoprodutos', 'index.html');

  assert(fs.existsSync(pClube), "Página /infoprodutos/clube-invest-v3.html gerada");
  assert(fs.existsSync(pTreina), "Página /infoprodutos/treinamento-liberdade-financeira-investimentos.html gerada");
  assert(fs.existsSync(pHub), "Hub /infoprodutos/index.html gerado");

  // 3. TÍTULOS E ESCASSEZ
  console.log("\n3. Testando Títulos e Cronômetro de Escassez...");
  const cClube = fs.readFileSync(pClube, 'utf8');
  assert(cClube.includes("INSCRIÇÕES ABERTAS: Clube Invest v3"), "Título de Infoproduto validado");
  assert(cClube.includes("countdownTimer"), "Cronômetro regressivo de escassez em JS puro presente");
  assert(cClube.includes("S107130565O"), "Link Hotmart oficial S107130565O embutido no CTA");

  // 4. MONETIZAÇÃO ADSTERRA & PROPELLERADS
  console.log("\n4. Testando Injeção de Monetização...");
  assert(cClube.includes("5975392") && cClube.includes("11558154"), "Infoproduto monetizado com Adsterra e PropellerAds");

  // 5. SITEMAP
  console.log("\n5. Testando Sitemap.xml...");
  const sitemap = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemap.includes("/infoprodutos/clube-invest-v3"), "Rota /infoprodutos/clube-invest-v3 no sitemap");
  assert(sitemap.includes("/infoprodutos"), "Hub /infoprodutos no sitemap");

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

runHotmartTests().catch(console.error);
