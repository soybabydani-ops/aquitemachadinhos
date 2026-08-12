/**
 * AQUITEM ACHADINHOS — TESTE DA REDE CJ AFFILIATE HIGH-TICKET (LUXO GLOBAL & SUÍTES PRESIDENCIAIS)
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

async function runCJLuxuryTests() {
  console.log("\n=======================================================");
  console.log("💎 TESTES DA REDE HIGH-TICKET CJ AFFILIATE (LUXO GLOBAL)");
  console.log("=======================================================\n");

  // 1. SUPABASE REST
  console.log("1. Testando Cadastro no Supabase REST (achadinhos_produtos_monetizados)...");
  try {
    const prods = await fetchJson(`${SUPABASE_REST}/achadinhos_produtos_monetizados?categoria=eq.Premium_Luxo_CJ_USD`, SUPABASE_ANON);
    assert(Array.isArray(prods) && prods.length >= 5, `achadinhos_produtos_monetizados contém ${prods?.length} produtos cadastrados com categoria Premium_Luxo_CJ_USD`);
    assert(prods[0]?.link_afiliado_final?.includes('anrdoezrs.net') || prods[0]?.link_afiliado_final?.includes('jdoqocy.com'), "Link nativo comissionado da CJ Affiliate registrado");
    assert(prods[0]?.plataforma?.includes('CJ Affiliate'), "Plataforma CJ Affiliate identificada");
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. ARQUIVOS HTML ESTÁTICOS GERADOS
  console.log("\n2. Testando Presença de Arquivos HTML em luxo-vip/...");
  const luxuryDir = path.join(REPO_ROOT, 'luxo-vip');
  assert(fs.existsSync(luxuryDir), "Diretório luxo-vip/ existe");
  
  const files = fs.readdirSync(luxuryDir).filter(f => f.endsWith('.html'));
  assert(files.length >= 140, `Total de páginas geradas em luxo-vip/: ${files.length} (esperado >= 140)`);

  const pHub = path.join(luxuryDir, 'index.html');
  const pSPHeliponto = path.join(luxuryDir, 'reservas-suites-presidenciais-resorts-luxo-heliponto-sao-paulo.html');
  const pTUMI = path.join(luxuryDir, 'melhores-malas-bordo-alta-resistencia-samsonite-tumi-promocao.html');
  const pVillasEN = path.join(luxuryDir, 'last-minute-luxury-villas-5-star-hotel-allocation-open-now.html');
  const pDubai = path.join(luxuryDir, 'luxury-5star-hotels-presidential-suites-dubai.html');
  const pBarretos = path.join(luxuryDir, 'suites-presidenciais-hoteis-5-estrelas-heliponto-barretos.html');

  assert(fs.existsSync(pHub), "Hub /luxo-vip/index.html gerado");
  assert(fs.existsSync(pSPHeliponto), "Página de Suítes com Heliponto SP gerada");
  assert(fs.existsSync(pTUMI), "Página de Malas Samsonite & TUMI gerada");
  assert(fs.existsSync(pVillasEN), "Página de Luxury Villas (EN) gerada");
  assert(fs.existsSync(pDubai), "Página de Dubai Palm Jumeirah (EN) gerada");
  assert(fs.existsSync(pBarretos), "Página de Suítes Barretos gerada");

  // 3. TÍTULOS, GATILHOS E MONETIZAÇÃO DUPLA
  console.log("\n3. Testando Títulos, Tags e Injeção de Monetização...");
  const cSP = fs.readFileSync(pSPHeliponto, 'utf8');
  assert(cSP.includes("Reservas de Suítes Presidenciais e Resorts de Luxo com Heliponto"), "Título de Suítes com Heliponto validado");
  assert(cSP.includes("5975392"), "Bloco Adsterra CPM Zone 5975392 injetado");
  assert(cSP.includes("11558154"), "Smart Tag PropellerAds Zone 11558154 injetada");
  assert(cSP.includes("anrdoezrs.net") || cSP.includes("jdoqocy.com"), "Link comissionado CJ Affiliate embutido no HTML");
  assert(cSP.includes('hreflang="pt-BR"') && cSP.includes('hreflang="en"'), "Tags Hreflang internacionais presentes");

  // 4. SITEMAP.XML
  console.log("\n4. Testando Atualização do Sitemap.xml...");
  const sitemap = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemap.includes("/luxo-vip/reservas-suites-presidenciais-resorts-luxo-heliponto-sao-paulo"), "Rota Suítes SP no sitemap.xml");
  assert(sitemap.includes("/luxo-vip/luxury-5star-hotels-presidential-suites-dubai"), "Rota Dubai no sitemap.xml");
  assert(sitemap.includes("/luxo-vip"), "Hub /luxo-vip no sitemap.xml");
  const totalUrls = (sitemap.match(/<loc>/g) || []).length;
  assert(totalUrls >= 1450, `Total de URLs no sitemap.xml: ${totalUrls} (esperado >= 1450)`);

  // 5. BLINDAGEM ANTI-REGRESSÃO
  console.log("\n5. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Início 100% blindado");
  assert(indexHtml.includes("<!-- FIM DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Fim 100% blindado");

  // 6. DASHBOARD ZERO-FOOTPRINT
  console.log("\n6. Testando Blindagem do Painel Administrativo...");
  const dashHtml = fs.readFileSync(path.join(REPO_ROOT, 'admin-analytics-dashboard-v3.html'), 'utf8');
  assert(dashHtml.includes("noindex, nofollow"), "Dashboard protegido por noindex, nofollow");
  assert(!sitemap.includes("admin-analytics-dashboard-v3"), "Dashboard devidamente excluído do sitemap.xml");

  // 7. VERCEL SERVERLESS LIMIT
  console.log("\n7. Testando Limite de Serverless Functions (Hobby <= 12)...");
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

runCJLuxuryTests().catch(console.error);
