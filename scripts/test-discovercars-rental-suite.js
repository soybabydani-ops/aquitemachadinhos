/**
 * AQUITEM ACHADINHOS — TESTE DA REDE LOGÍSTICA DISCOVER CARS (ALUGUEL DE VEÍCULOS)
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

async function runDiscoverCarsTests() {
  console.log("\n=======================================================");
  console.log("🚗 TESTES DO MOTOR DE LOGÍSTICA VEICULAR DISCOVER CARS");
  console.log("=======================================================\n");

  // 1. SUPABASE REST
  console.log("1. Testando Cadastro no Supabase REST (achadinhos_produtos_monetizados)...");
  try {
    const prods = await fetchJson(`${SUPABASE_REST}/achadinhos_produtos_monetizados?categoria=eq.Locacao_Veiculos_High_Ticket`, SUPABASE_ANON);
    assert(Array.isArray(prods) && prods.length >= 5, `achadinhos_produtos_monetizados contém ${prods?.length} registros de locação cadastrados com categoria Locacao_Veiculos_High_Ticket`);
    assert(prods[0]?.link_afiliado_final?.includes('Aquitemachadinhos'), "Link oficial Discover Cars (Aquitemachadinhos) registrado");
    assert(prods[0]?.plataforma?.includes('Discover Cars'), "Plataforma Discover Cars identificada");
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. ARQUIVOS HTML ESTÁTICOS GERADOS
  console.log("\n2. Testando Presença de Arquivos HTML em aluguel-carros/...");
  const rentalDir = path.join(REPO_ROOT, 'aluguel-carros');
  assert(fs.existsSync(rentalDir), "Diretório aluguel-carros/ existe");
  
  const files = fs.readdirSync(rentalDir).filter(f => f.endsWith('.html'));
  assert(files.length >= 150, `Total de páginas geradas em aluguel-carros/: ${files.length} (esperado >= 150)`);

  const pHub = path.join(rentalDir, 'index.html');
  const pGRU = path.join(rentalDir, 'aluguel-carros-blindados-utilitarios-sao-paulo-guarulhos.html');
  const pBarretos = path.join(rentalDir, 'como-conseguir-desconto-locacao-veiculos-festa-peao-barretos.html');
  const pTokyo = path.join(rentalDir, 'luxury-car-hire-suv-rentals-tokyo-haneda.html');
  const pFleet = path.join(rentalDir, 'compare-save-business-fleet-car-rentals.html');
  const pMIA = path.join(rentalDir, 'best-car-rental-deals-free-cancellation-mia-airport.html');

  assert(fs.existsSync(pHub), "Hub /aluguel-carros/index.html gerado");
  assert(fs.existsSync(pGRU), "Página de Blindados GRU gerada");
  assert(fs.existsSync(pBarretos), "Página da Festa do Peão Barretos gerada");
  assert(fs.existsSync(pTokyo), "Página de Tóquio Haneda (EN) gerada");
  assert(fs.existsSync(pFleet), "Página de Business Fleet (EN) gerada");
  assert(fs.existsSync(pMIA), "Página do Aeroporto de Miami MIA (EN) gerada");

  // 3. TÍTULOS, TARJA DE URGÊNCIA E MONETIZAÇÃO DUPLA
  console.log("\n3. Testando Títulos, Tarja de Urgência e Injeção de Monetização...");
  const cGRU = fs.readFileSync(pGRU, 'utf8');
  assert(cGRU.includes("Aluguel de Carros Blindados e Utilitários de Última Hora"), "Título de carros blindados validado");
  assert(cGRU.includes("PREÇOS CLAROS, SEM TAXAS OCULTAS — CANCELAMENTO GRÁTIS ATÉ 48H"), "Tarja de transparência Discover Cars em PT presente");
  assert(cGRU.includes("Atualização em Tempo Real") || cGRU.includes("LOTE PROMOCIONAL"), "Tarja de disponibilidade real e lote semanal presente");
  assert(cGRU.includes("5975392"), "Bloco Adsterra CPM Zone 5975392 injetado");
  assert(cGRU.includes("11558154"), "Smart Tag PropellerAds Zone 11558154 injetada");
  assert(cGRU.includes("Aquitemachadinhos"), "Link oficial Discover Cars comissionado embutido");

  const cTokyo = fs.readFileSync(pTokyo, 'utf8');
  assert(cTokyo.includes("CLEAR PRICES, NO SURPRISES - FREE CANCELLATION UP TO 48H"), "Tarja de transparência Discover Cars em EN presente");
  assert(cTokyo.includes("Luxury Car Hire and SUV Rentals Online in Tokyo Haneda"), "Título em EN validado");

  // 4. SITEMAP.XML
  console.log("\n4. Testando Atualização do Sitemap.xml...");
  const sitemap = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemap.includes("/aluguel-carros/aluguel-carros-blindados-utilitarios-sao-paulo-guarulhos"), "Rota GRU no sitemap.xml");
  assert(sitemap.includes("/aluguel-carros/luxury-car-hire-suv-rentals-tokyo-haneda"), "Rota Tóquio no sitemap.xml");
  assert(sitemap.includes("/aluguel-carros"), "Hub /aluguel-carros no sitemap.xml");
  const totalUrls = (sitemap.match(/<loc>/g) || []).length;
  assert(totalUrls >= 1150, `Total de URLs no sitemap.xml: ${totalUrls} (esperado >= 1150)`);

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

runDiscoverCarsTests().catch(console.error);
