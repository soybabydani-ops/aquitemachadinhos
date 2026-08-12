/**
 * AQUITEM ACHADINHOS — TESTE GERAL: DOCUMENTO DO ESTUDANTE (MONETIZZE)
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

async function runMonetizzeTests() {
  console.log("\n=======================================================");
  console.log("🎓 TESTES DE MEIA-ENTRADA & CARTEIRINHA ESTUDANTE (MONETIZZE)");
  console.log("=======================================================\n");

  // 1. SUPABASE REST
  console.log("1. Testando Cadastro no Supabase REST...");
  try {
    const prods = await fetchJson(`${SUPABASE_REST}/achadinhos_produtos_monetizados?categoria=eq.Utilidade_Estudantil`, SUPABASE_ANON);
    assert(Array.isArray(prods) && prods.length >= 2, `achadinhos_produtos_monetizados contém ${prods?.length} registros estudantis cadastrados`);
    assert(prods[0]?.link_afiliado_final?.includes('AEK25825577'), "Link oficial da Monetizze (AEK25825577) registrado");
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. ARQUIVOS HTML ESTÁTICOS
  console.log("\n2. Testando Presença de Arquivos Estáticos...");
  const pBarretos = path.join(REPO_ROOT, 'estudante', 'como-pagar-meia-entrada-festa-do-peao-barretos.html');
  const pDigital = path.join(REPO_ROOT, 'estudante', 'carteirinha-estudante-digital-emitida-na-hora.html');
  const pQr = path.join(REPO_ROOT, 'estudante', 'documento-nacional-estudante-fesn-qr-code.html');
  const pHub = path.join(REPO_ROOT, 'estudante', 'index.html');

  assert(fs.existsSync(pBarretos), "Página de Meia-Entrada Barretos gerada");
  assert(fs.existsSync(pDigital), "Página de Carteirinha Digital na Hora gerada");
  assert(fs.existsSync(pQr), "Página de Documento Oficial FESN gerada");
  assert(fs.existsSync(pHub), "Hub /estudante/index.html gerado");

  // 3. TÍTULOS E ESCASSEZ
  console.log("\n3. Testando Títulos e Cronômetro de Escassez...");
  const cBarretos = fs.readFileSync(pBarretos, 'utf8');
  assert(cBarretos.includes("MEIA-ENTRADA LEGAL: Como Pagar Meia-Entrada na Festa do Peão de Barretos"), "Título do Estudante Barretos validado");
  assert(cBarretos.includes("countdownTimer"), "Cronômetro regressivo de escassez em JS puro presente");
  assert(cBarretos.includes("AEK25825577"), "Link Monetizze oficial AEK25825577 embutido no CTA");

  // 4. MONETIZAÇÃO ADSTERRA & PROPELLERADS
  console.log("\n4. Testando Injeção de Monetização...");
  assert(cBarretos.includes("5975392") && cBarretos.includes("11558154"), "Estudante monetizado com Adsterra e PropellerAds");

  // 5. SITEMAP
  console.log("\n5. Testando Sitemap.xml...");
  const sitemap = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemap.includes("/estudante/como-pagar-meia-entrada-festa-do-peao-barretos"), "Rota Barretos Meia-Entrada no sitemap");
  assert(sitemap.includes("/estudante"), "Hub /estudante no sitemap");

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

runMonetizzeTests().catch(console.error);
