/**
 * AQUITEM ACHADINHOS — TESTE DA REDE DE TURISMO GLOBAL EXPEDIA (PACOTES VIP & CRUZEIROS)
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

async function runExpediaTests() {
  console.log("\n=======================================================");
  console.log("✈️ TESTES DO MOTOR DE TURISMO GLOBAL EXPEDIA VIP");
  console.log("=======================================================\n");

  // 1. SUPABASE REST
  console.log("1. Testando Cadastro no Supabase REST (achadinhos_produtos_monetizados)...");
  try {
    const prods = await fetchJson(`${SUPABASE_REST}/achadinhos_produtos_monetizados?categoria=eq.Turismo_Global_High_Ticket`, SUPABASE_ANON);
    assert(Array.isArray(prods) && prods.length >= 5, `achadinhos_produtos_monetizados contém ${prods?.length} pacotes cadastrados com categoria Turismo_Global_High_Ticket`);
    assert(prods[0]?.link_afiliado_final?.includes('Kfv4vlu'), "Link oficial Expedia (Kfv4vlu) registrado");
    assert(prods[0]?.plataforma?.includes('Expedia'), "Plataforma Expedia identificada");
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. ARQUIVOS HTML ESTÁTICOS GERADOS
  console.log("\n2. Testando Presença de Arquivos HTML em pacotes-viagem/...");
  const tourismDir = path.join(REPO_ROOT, 'pacotes-viagem');
  assert(fs.existsSync(tourismDir), "Diretório pacotes-viagem/ existe");
  
  const files = fs.readdirSync(tourismDir).filter(f => f.endsWith('.html'));
  assert(files.length >= 150, `Total de páginas geradas em pacotes-viagem/: ${files.length} (esperado >= 150)`);

  const pHub = path.join(tourismDir, 'index.html');
  const pCruzeiro = path.join(tourismDir, 'pacotes-cruzeiros-maritimos-resorts-all-inclusive-promocao.html');
  const pOrlando = path.join(tourismDir, 'bugs-passagens-aereas-internacionais-orlando.html');
  const pParis = path.join(tourismDir, 'bugs-passagens-aereas-internacionais-paris.html');
  const pCruiseEN = path.join(tourismDir, 'exclusive-cruise-line-packages-resort-discounts.html');
  const pBarretos = path.join(tourismDir, 'melhores-hoteis-boutique-resorts-luxo-barretos.html');

  assert(fs.existsSync(pHub), "Hub /pacotes-viagem/index.html gerado");
  assert(fs.existsSync(pCruzeiro), "Página de Cruzeiros All-Inclusive gerada");
  assert(fs.existsSync(pOrlando), "Página de Voo Orlando gerada");
  assert(fs.existsSync(pParis), "Página de Voo Paris gerada");
  assert(fs.existsSync(pCruiseEN), "Página de Cruzeiros Internacionais (EN) gerada");
  assert(fs.existsSync(pBarretos), "Página de Hotéis Boutique Barretos gerada");

  // 3. TÍTULOS, TARJA DE URGÊNCIA, HREFLANG E MONETIZAÇÃO DUPLA
  console.log("\n3. Testando Títulos, Tarja de Urgência e Injeção de Monetização...");
  const cCruzeiro = fs.readFileSync(pCruzeiro, 'utf8');
  assert(cCruzeiro.includes("Pacotes de Cruzeiros Marítimos e Resorts All-Inclusive"), "Título de cruzeiros all-inclusive validado");
  assert(cCruzeiro.includes("EXCLUSIVE DEALS - SECURE YOUR BOOKING BEFORE DISMISSAL"), "Tarja de transparência Expedia VIP presente");
  assert(cCruzeiro.includes("countdownTimer"), "Cronômetro regressivo de escassez (loop 5-12min) presente");
  assert(cCruzeiro.includes("5975392"), "Bloco Adsterra CPM Zone 5975392 injetado");
  assert(cCruzeiro.includes("11558154"), "Smart Tag PropellerAds Zone 11558154 injetada");
  assert(cCruzeiro.includes("Kfv4vlu"), "Link oficial Expedia comissionado embutido");
  assert(cCruzeiro.includes('hreflang="pt-BR"') && cCruzeiro.includes('hreflang="en"'), "Tags Hreflang internacionais presentes");

  // 4. SITEMAP.XML
  console.log("\n4. Testando Atualização do Sitemap.xml...");
  const sitemap = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemap.includes("/pacotes-viagem/pacotes-cruzeiros-maritimos-resorts-all-inclusive-promocao"), "Rota Cruzeiros no sitemap.xml");
  assert(sitemap.includes("/pacotes-viagem/bugs-passagens-aereas-internacionais-orlando"), "Rota Orlando no sitemap.xml");
  assert(sitemap.includes("/pacotes-viagem"), "Hub /pacotes-viagem no sitemap.xml");
  const totalUrls = (sitemap.match(/<loc>/g) || []).length;
  assert(totalUrls >= 1300, `Total de URLs no sitemap.xml: ${totalUrls} (esperado >= 1300)`);

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

runExpediaTests().catch(console.error);
