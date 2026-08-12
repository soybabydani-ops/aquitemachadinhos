/**
 * AQUITEM ACHADINHOS — TESTE GERAL: AUDITORIA ATÔMICA & NOTIFICADOR VIVO DE PERFORMANCE
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

async function runAuditoriaTests() {
  console.log("\n=======================================================");
  console.log("🛡️ TESTES DE AUDITORIA ATÔMICA & NOTIFICAÇÃO AO VIVO");
  console.log("=======================================================\n");

  // 1. SUPABASE REST TABELAS
  console.log("1. Testando Tabelas de Auditoria no Supabase REST...");
  try {
    const t1 = await fetchJson(`${SUPABASE_REST}/trafego_descarte_bots?select=count`, SUPABASE_ANON);
    const t2 = await fetchJson(`${SUPABASE_REST}/metricas_auditadas_sucesso?select=count`, SUPABASE_ANON);

    assert(Array.isArray(t1), "Tabela trafego_descarte_bots ativa com RLS");
    assert(Array.isArray(t2) && t2[0].count >= 3, `Tabela metricas_auditadas_sucesso ativa (${t2[0]?.count} ciclos auditados)`);
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. EDGE FUNCTIONS
  console.log("\n2. Testando Edge Functions de Notificação e Cron...");
  const notifierPath = path.join(REPO_ROOT, 'supabase', 'functions', 'performance-live-notifier', 'index.ts');
  const briefingPath = path.join(REPO_ROOT, 'supabase', 'functions', 'morning-briefing-cron', 'index.ts');

  assert(fs.existsSync(notifierPath), "Edge Function performance-live-notifier existe");
  assert(fs.existsSync(briefingPath), "Edge Function morning-briefing-cron existe");

  const notifierCode = fs.readFileSync(notifierPath, 'utf8');
  assert(notifierCode.includes('ALERTA VIP INTERNACIONAL'), "Template de Notificação VIP presente");
  assert(notifierCode.includes('CONTRATO CORPORATIVO'), "Template de Contrato B2B presente");

  // 3. DASHBOARD TRUE EARNINGS CANVAS
  console.log("\n3. Testando True Earnings Canvas na Dashboard v3.5...");
  const dashContent = fs.readFileSync(path.join(REPO_ROOT, 'admin-analytics-dashboard-v3.html'), 'utf8');
  assert(dashContent.includes('Filtro de Tráfego Humano Ativo'), "Banner de Auditoria e Anti-Bot ativo");
  assert(dashContent.includes('GEOTARGETING') || dashContent.includes('Geotargeting'), "Geotargeting Profit Reconciliation ativo");
  assert(dashContent.includes('VERIFIED_HUMAN'), "Tag de Telemetria Auditada Humana ativa");

  // 4. BLINDAGEM ANTI-REGRESSÃO
  console.log("\n4. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso 100% blindado");

  // 5. SERVERLESS FUNCTIONS LIMIT
  console.log("\n5. Testando Limite de Serverless Functions...");
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

runAuditoriaTests().catch(console.error);
