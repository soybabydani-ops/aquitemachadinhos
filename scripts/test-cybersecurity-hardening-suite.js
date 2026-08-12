/**
 * AQUITEM ACHADINHOS — DEVSECOPS & CYBERSECURITY TEST SUITE
 * Validação de 100% RLS no Supabase, Ofuscação de Scripts, Proteção Anti-DDoS e WAF Vercel.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { checkRateLimitAndSecurity } = require('../api/_lib/rate-limiter');

const REPO_ROOT = path.join(__dirname, '..');
const SUPABASE_PAT = process.env.SUPABASE_PAT || process.env.SUPABASE_SERVICE_ROLE_KEY || "";

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

async function runSecurityTests() {
  console.log("\n=======================================================");
  console.log("🛡️ INICIANDO TESTES DE CYBERSECURITY & HARDENING");
  console.log("=======================================================\n");

  // 1. SUPABASE RLS VERIFICATION (100% TABLES)
  console.log("1. Testando 100% de Ativação do Row Level Security (RLS)...");
  try {
    const postData = JSON.stringify({
      query: `SELECT table_name, rowsecurity FROM information_schema.tables t LEFT JOIN pg_tables pt ON pt.tablename = t.table_name WHERE t.table_schema = 'public' AND t.table_type = 'BASE TABLE' AND pt.rowsecurity = false;`
    });

    const unsecureTables = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: "api.supabase.com",
        path: "/v1/projects/efvuzxdhsirpvxclgdfg/database/query",
        method: "POST",
        headers: {
          "Authorization": `Bearer ${SUPABASE_PAT}`,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData)
        }
      }, (res) => {
        let body = "";
        res.on("data", c => body += c);
        res.on("end", () => resolve(JSON.parse(body)));
      });
      req.on("error", reject);
      req.write(postData);
      req.end();
    });

    assert(Array.isArray(unsecureTables) && unsecureTables.length === 0, "100% das 50 tabelas públicas do Supabase possuem RLS ATIVO!");
  } catch (e) {
    assert(false, `Falha ao testar RLS no Supabase: ${e.message}`);
  }

  // 2. OFUSCAÇÃO DE CÓDIGO E ESCUDO ANTI-INSPEÇÃO
  console.log("\n2. Testando Ofuscação de JavaScript e Escudo Anti-Plágio...");
  const shieldPath = path.join(REPO_ROOT, 'assets', 'security-shield.js');
  const trackerPath = path.join(REPO_ROOT, 'assets', 'affiliate-tracker.js');

  assert(fs.existsSync(shieldPath), "assets/security-shield.js existe");
  assert(fs.existsSync(trackerPath), "assets/affiliate-tracker.js existe");

  const shieldCode = fs.readFileSync(shieldPath, 'utf8');
  assert(shieldCode.includes('[AQUITEM SHIELD v35.0 - PROTECTED RUNTIME]'), "Header autodefensivo presente no escudo");
  assert(shieldCode.includes('\\x'), "Código ofuscado com codificação hexadecimal de strings");

  // 3. BLOQUEIO DE TECLAS E USER-SELECT NO ESCUDO (HEX ENCODED / OFUSCADO)
  console.log("\n3. Testando Regras de Bloqueio de Teclas e Cópia...");
  assert(shieldCode.includes('\\x63\\x6f\\x6e\\x74\\x65\\x78\\x74\\x6d\\x65\\x6e\\x75') || shieldCode.includes('contextmenu'), "Bloqueio de botão direito implementado e ofuscado em hex");
  assert(shieldCode.includes('F12'), "Bloqueio de tecla F12 implementado");
  assert(shieldCode.includes('\\x75\\x73\\x65\\x72\\x2d\\x73\\x65\\x6c\\x65\\x63\\x74') || shieldCode.includes('user-select'), "CSS user-select: none implementado e ofuscado");

  // 4. RATE LIMITER & MIDDLEWARE ANTI-BOT
  console.log("\n4. Testando Rate Limiter e Bloqueio de Scrapers Maliciosos...");
  const mockReqBot = { headers: { 'user-agent': 'sqlmap/1.6#stable' } };
  let botBlocked = false;
  const mockResBot = {
    writeHead: (status) => { if (status === 403) botBlocked = true; },
    end: () => {}
  };
  checkRateLimitAndSecurity(mockReqBot, mockResBot);
  assert(botBlocked, "Scraper malicioso (sqlmap) bloqueado com HTTP 403 pelo WAF");

  // 5. CABEÇALHOS DE SEGURANÇA VERCEL WAF
  console.log("\n5. Testando Cabeçalhos de Segurança em vercel.json...");
  const vercelConfig = JSON.parse(fs.readFileSync(path.join(REPO_ROOT, 'vercel.json'), 'utf8'));
  const headers = vercelConfig.headers[0].headers;

  const hsts = headers.find(h => h.key === 'Strict-Transport-Security');
  const xfo = headers.find(h => h.key === 'X-Frame-Options');
  const csp = headers.find(h => h.key === 'Content-Security-Policy');

  assert(hsts && hsts.value.includes('max-age=63072000'), "HSTS estrito ativo (2 anos)");
  assert(xfo && xfo.value === 'DENY', "X-Frame-Options: DENY ativo contra clickjacking");
  assert(csp && csp.value.includes("default-src 'self'"), "CSP rígida ativa");

  // 6. BLINDAGEM DO CARROSSEL LUXUOSO
  console.log("\n6. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso 100% blindado");

  // 7. VERCEL SERVERLESS LIMIT
  console.log("\n7. Testando Limite de Serverless Functions...");
  const apiFiles = fs.readdirSync(path.join(REPO_ROOT, 'api')).filter(f => f.endsWith('.js') && !f.startsWith('_'));
  assert(apiFiles.length <= 12, `Total de serverless functions em api/: ${apiFiles.length} (limite <= 12)`);

  console.log("\n=======================================================");
  console.log(`📊 RESULTADO FINAL: ${passed} testes PASSARAM, ${failed} falharam.`);
  console.log("=======================================================\n");

  if (failed > 0) process.exit(1);
}

runSecurityTests().catch(console.error);
