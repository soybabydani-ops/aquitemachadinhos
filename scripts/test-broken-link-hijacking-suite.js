/**
 * AQUITEM ACHADINHOS — TESTE DO PROTOCOLO DE BROKEN LINK HIJACKING & CONTINGÊNCIA (DA 95+)
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

async function runBrokenLinkHijackingTests() {
  console.log("\n=======================================================");
  console.log("🎯 TESTES: BROKEN LINK HIJACKING & CONTINGÊNCIA (DA 95+)");
  console.log("=======================================================\n");

  // 1. RADAR DE DOMÍNIOS EXPIRADOS NO SUPABASE REST
  console.log("1. Testando Radar de Domínios Expirados no Supabase...");
  try {
    const rows = await fetchJson(`${SUPABASE_REST}/dominios_expirados_radar`, SUPABASE_ANON);
    assert(Array.isArray(rows) && rows.length >= 4, `Tabela dominios_expirados_radar contém ${rows?.length} domínios históricos mapeados`);
    assert(rows[0]?.dominio?.includes('barretos') || rows[0]?.palavra_chave?.includes('barretos'), "Domínio de Barretos monitorado com sucesso");
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. ARQUIVOS HTML DE CONTINGÊNCIA GERADOS
  console.log("\n2. Testando Presença de Arquivos HTML em contingencia/...");
  const contDir = path.join(REPO_ROOT, 'contingencia');
  assert(fs.existsSync(contDir), "Diretório contingencia/ existe");
  
  const pHub = path.join(contDir, 'index.html');
  const pBarretos = path.join(contDir, 'mapa-historico-pousadas-barretos-festa-peao.html');
  const pGramado = path.join(contDir, 'guia-antigo-pousadas-gramado-serra-gaucha.html');
  const pBuzios = path.join(contDir, 'turismo-buzios-hospedagens-historico.html');
  const pCampinas = path.join(contDir, 'rodoviaria-campinas-horarios-tarifas-antigas.html');

  assert(fs.existsSync(pHub), "Hub /contingencia/index.html gerado");
  assert(fs.existsSync(pBarretos), "Página de Pousadas Barretos gerada");
  assert(fs.existsSync(pGramado), "Página de Pousadas Gramado gerada");
  assert(fs.existsSync(pBuzios), "Página de Turismo Búzios gerada");
  assert(fs.existsSync(pCampinas), "Página de Rodoviária Campinas gerada");

  // 3. TÍTULOS, MALHA INTERNA E MONETIZAÇÃO DUPLA
  console.log("\n3. Testando Títulos, Tags e Malha Interna Circular...");
  const cBarretos = fs.readFileSync(pBarretos, 'utf8');
  assert(cBarretos.includes("Guia Histórico e Mapa de Pousadas e Hotéis"), "Título histórico de Barretos validado");
  assert(cBarretos.includes("5975392"), "Bloco Adsterra CPM Zone 5975392 injetado");
  assert(cBarretos.includes("11558154"), "Smart Tag PropellerAds Zone 11558154 injetada");
  assert(cBarretos.includes("aquitem-internal-link-mesh"), "Malha de links internos circulares presente");
  assert(cBarretos.includes('application/ld+json'), "Marcação Schema.org presente");

  // 4. BLINDAGEM ANTI-REGRESSÃO
  console.log("\n4. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Início 100% blindado");
  assert(indexHtml.includes("<!-- FIM DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Fim 100% blindado");

  // 5. LIMITES SERVERLESS VERCEL (HOBBY <= 12)
  console.log("\n5. Testando Limite de Serverless Functions em api/...");
  const apiFiles = fs.readdirSync(path.join(REPO_ROOT, 'api')).filter(f => f.endsWith('.js') && !f.startsWith('_'));
  assert(apiFiles.length <= 12, `Total de serverless functions em api/: ${apiFiles.length} (limite <= 12)`);

  console.log("\n=======================================================");
  console.log(`📊 RESULTADO: ${passed} testes PASSARAM, ${failed} falharam.`);
  console.log("=======================================================\n");

  if (failed > 0) process.exit(1);
}

function fetchJson(urlStr, key) {
  return new Promise((resolve, reject) => {
    https.get(urlStr, {
      headers: {
        'apikey': key,
        'Authorization': `Bearer ${key}`
      }
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { resolve({ raw: body, status: res.statusCode }); }
      });
    }).on('error', reject);
  });
}

runBrokenLinkHijackingTests().catch(console.error);
