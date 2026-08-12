/**
 * AQUITEM ACHADINHOS — TESTE GERAL DA DASHBOARD ANALÍTICA EM TEMPO REAL
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

async function runDashboardTests() {
  console.log("\n=======================================================");
  console.log("📊 TESTES DA DASHBOARD ANALÍTICA EM TEMPO REAL");
  console.log("=======================================================\n");

  // 1. ARQUIVO DA DASHBOARD E METATAGS NOINDEX
  console.log("1. Testando Arquivo da Dashboard e Proteção Zero-Footprint...");
  const dashPath = path.join(REPO_ROOT, 'admin-analytics-dashboard-v3.html');
  assert(fs.existsSync(dashPath), "admin-analytics-dashboard-v3.html existe");

  const dashContent = fs.readFileSync(dashPath, 'utf8');
  assert(dashContent.includes('name="robots" content="noindex, nofollow'), "Meta tag noindex, nofollow presente");
  assert(dashContent.includes('unauthorizedScreen'), "Tela 404 anti-invasão presente");
  assert(dashContent.includes('MASTER_KEY_HASH'), "Autenticação por chave estática implementada");

  // 2. VERIFICAR QUE NÃO CONSTA NO SITEMAP
  console.log("\n2. Testando Blindagem no sitemap.xml...");
  const sitemap = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(!sitemap.includes('admin-analytics-dashboard-v3'), "Dashboard NÃO CONSTA no sitemap.xml (Invisível para robôs)");

  // 3. SUPABASE REST TELEMETRIA
  console.log("\n3. Testando Telemetria de Cliques no Supabase REST...");
  try {
    const logs = await fetchJson(`${SUPABASE_REST}/cliques_afiliados_logs?order=criado_em.desc&limit=10`, SUPABASE_ANON);
    assert(Array.isArray(logs) && logs.length > 0, `cliques_afiliados_logs retornando ${logs.length} eventos em tempo real`);
    assert(logs[0]?.plataforma_afiliado !== undefined, "Coluna plataforma_afiliado ativa e populada");
    assert(logs[0]?.comissao_estimada_usd_brl !== undefined, "Coluna comissao_estimada_usd_brl ativa e populada");
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 4. REWRITE VERCEL
  console.log("\n4. Testando Rewrite de Rota em vercel.json...");
  const vercelConfig = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'vercel.json'), 'utf8'));
  const hasRewrite = vercelConfig.rewrites.some(r => r.source === '/admin-analytics-dashboard-v3');
  assert(hasRewrite, "Rewrite /admin-analytics-dashboard-v3 configurado em vercel.json");

  // 5. BLINDAGEM ANTI-REGRESSÃO
  console.log("\n5. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso 100% blindado");

  // 6. SERVERLESS FUNCTIONS LIMIT
  console.log("\n6. Testando Limite de Serverless Functions...");
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

runDashboardTests().catch(console.error);
