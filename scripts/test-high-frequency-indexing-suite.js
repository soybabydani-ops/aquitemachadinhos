/**
 * AQUITEM ACHADINHOS — TESTE GERAL DO MOTOR DE INDEXAÇÃO DE ALTA FREQUÊNCIA
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

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

async function runIndexTests() {
  console.log("\n=======================================================");
  console.log("🛠️ TESTES DO MOTOR DE INDEXAÇÃO & PAYLOAD MUTATION");
  console.log("=======================================================\n");

  // 1. ARQUIVOS DO MOTOR
  console.log("1. Testando Presença dos Scripts de Indexação...");
  const edgeFn = path.join(REPO_ROOT, 'supabase', 'functions', 'high-frequency-index-dispatcher', 'index.ts');
  const batchScript = path.join(REPO_ROOT, 'scripts', 'high-frequency-index-dispatcher.js');
  const optScript = path.join(REPO_ROOT, 'scripts', 'optimize-payload-meta-tags.js');

  assert(fs.existsSync(edgeFn), "Edge Function high-frequency-index-dispatcher existe");
  assert(fs.existsSync(batchScript), "scripts/high-frequency-index-dispatcher.js existe");
  assert(fs.existsSync(optScript), "scripts/optimize-payload-meta-tags.js existe");

  // 2. METATAGS ROBOTS E PRELOADS SUB-10MS
  console.log("\n2. Testando Meta-Tags Robots e Preloads de Alta Velocidade...");
  const samplePage = path.join(REPO_ROOT, 'destinos', 'orlando-passagens-hoteis-baratos.html');
  const sampleContent = fs.readFileSync(samplePage, 'utf8');

  assert(sampleContent.includes('max-snippet:-1'), "Meta-tag robots max-snippet:-1 injetada");
  assert(sampleContent.includes('dns-prefetch'), "DNS prefetch injetado");
  assert(sampleContent.includes('preconnect'), "Preconnect CDN injetado");
  assert(sampleContent.includes('/assets/security-shield.js'), "Security shield preloaded");

  // 3. SITEMAP DE ALTA DENSIDADE
  console.log("\n3. Testando Densidade do Sitemap...");
  const sitemap = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  const total = (sitemap.match(/<url>/g) || []).length;
  assert(total >= 750, `Sitemap com alta densidade (${total} URLs indexáveis)`);

  // 4. BLINDAGEM ANTI-REGRESSÃO
  console.log("\n4. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso blindado");

  // 5. SERVERLESS FUNCTIONS LIMIT
  console.log("\n5. Testando Limite de Serverless Functions...");
  const apiFiles = fs.readdirSync(path.join(REPO_ROOT, 'api')).filter(f => f.endsWith('.js') && !f.startsWith('_'));
  assert(apiFiles.length <= 12, `Total de serverless functions em api/: ${apiFiles.length} (limite <= 12)`);

  console.log("\n=======================================================");
  console.log(`📊 RESULTADO: ${passed} testes PASSARAM, ${failed} falharam.`);
  console.log("=======================================================\n");

  if (failed > 0) process.exit(1);
}

runIndexTests().catch(console.error);
