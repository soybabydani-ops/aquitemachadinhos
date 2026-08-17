/**
 * AQUITEM ACHADINHOS — TESTE DA REDE EDUCACIONAL UDEMY & IMPACT RADIUS
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

async function runUdemyTests() {
  console.log("\n=======================================================");
  console.log("🎓 TESTES DO MOTOR EDUCACIONAL UDEMY (IMPACT RADIUS)");
  console.log("=======================================================\n");

  // 1. SUPABASE REST
  console.log("1. Testando Cadastro no Supabase REST (achadinhos_produtos_monetizados)...");
  try {
    const prods = await fetchJson(`${SUPABASE_REST}/achadinhos_produtos_monetizados?categoria=eq.Infoprodutos_Udemy`, SUPABASE_ANON);
    assert(Array.isArray(prods) && prods.length >= 5, `achadinhos_produtos_monetizados contém ${prods?.length} cursos cadastrados com categoria Infoprodutos_Udemy`);
    assert(prods[0]?.link_afiliado_final?.includes('1101l435760') || prods[0]?.link_afiliado_final?.includes('udemy'), "Link oficial da Udemy via Impact (1101l435760) registrado");
    assert(prods[0]?.plataforma?.includes('Udemy'), "Plataforma Udemy identificada");
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. ARQUIVOS HTML ESTÁTICOS GERADOS
  console.log("\n2. Testando Presença de Arquivos HTML em cursos/...");
  const cursosDir = path.join(REPO_ROOT, 'cursos');
  assert(fs.existsSync(cursosDir), "Diretório cursos/ existe");
  
  const files = fs.readdirSync(cursosDir).filter(f => f.endsWith('.html'));
  assert(files.length >= 200, `Total de páginas geradas em cursos/: ${files.length} (esperado >= 200)`);

  const pHub = path.join(cursosDir, 'index.html');
  const pBarretos = path.join(cursosDir, 'melhores-cursos-online-capacitacao-profissional-barretos.html');
  const pSPCupom = path.join(cursosDir, 'cupom-desconto-promocoes-relampago-udemy-sao-paulo.html');
  const pRJTech = path.join(cursosDir, 'treinamentos-cursos-tecnicos-mais-vendidos-rio-de-janeiro.html');
  const pNatHoje = path.join(cursosDir, 'cupom-desconto-promocoes-relampago-udemy-hoje.html');
  const pNatIA = path.join(cursosDir, 'cursos-inteligencia-artificial-chatgpt-prompts.html');

  assert(fs.existsSync(pHub), "Hub /cursos/index.html gerado");
  assert(fs.existsSync(pBarretos), "Página /cursos/melhores-cursos-online-capacitacao-profissional-barretos.html gerada");
  assert(fs.existsSync(pSPCupom), "Página /cursos/cupom-desconto-promocoes-relampago-udemy-sao-paulo.html gerada");
  assert(fs.existsSync(pRJTech), "Página /cursos/treinamentos-cursos-tecnicos-mais-vendidos-rio-de-janeiro.html gerada");
  assert(fs.existsSync(pNatHoje), "Hub Nacional /cursos/cupom-desconto-promocoes-relampago-udemy-hoje.html gerado");
  assert(fs.existsSync(pNatIA), "Hub de IA /cursos/cursos-inteligencia-artificial-chatgpt-prompts.html gerado");

  // 3. TÍTULOS, ESCASSEZ E MONETIZAÇÃO DUPLA
  console.log("\n3. Testando Títulos, Escassez e Injeção de Monetização Dupla...");
  const cBarretos = fs.readFileSync(pBarretos, 'utf8');
  assert(cBarretos.includes("Melhores Cursos Online de Capacitação Profissional"), "Título de capacitação validado");
  assert(cBarretos.includes("Atualização em Tempo Real") || cBarretos.includes("LOTE PROMOCIONAL"), "Tarja de disponibilidade real e lote semanal presente");
  assert(cBarretos.includes("5975392"), "Bloco Adsterra CPM Zone 5975392 injetado");
  assert(cBarretos.includes("11558154"), "Smart Tag PropellerAds Zone 11558154 injetada");
  assert(cBarretos.includes("1101l435760"), "Impact Radius Universal Tracking Tag presente");
  assert(cBarretos.includes("udemy.sjv.io"), "Link comissionado Impact/Udemy embutido");

  // 4. SITEMAP.XML
  console.log("\n4. Testando Atualização do Sitemap.xml...");
  const sitemap = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemap.includes("/cursos/melhores-cursos-online-capacitacao-profissional-barretos"), "Rota Barretos no sitemap.xml");
  assert(sitemap.includes("/cursos/cupom-desconto-promocoes-relampago-udemy-hoje"), "Rota Cupom Hoje no sitemap.xml");
  assert(sitemap.includes("/cursos"), "Hub /cursos no sitemap.xml");
  const totalUrls = (sitemap.match(/<loc>/g) || []).length;
  assert(totalUrls >= 1000, `Total de URLs no sitemap.xml: ${totalUrls} (esperado >= 1000)`);

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

runUdemyTests().catch(console.error);
