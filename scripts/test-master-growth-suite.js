/**
 * AQUITEM ACHADINHOS — MASTER GROWTH VERIFICATION SUITE
 * Validação Integral dos 4 Módulos:
 * 1. Desapegos & Adoção de Pets & Doações
 * 2. Radar de Trânsito & Mobilidade (RMSP & Rodovias)
 * 3. Central de Concursos Municipais (64 Cidades)
 * 4. Alertas Meteorológicos de Emergência (64 Cidades)
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

async function runMasterTests() {
  console.log("\n=======================================================");
  console.log("🛠️ INICIANDO BATERIA MASTER DE TESTES DE EXPANSÃO");
  console.log("=======================================================\n");

  // 1. SUPABASE REST TABLES
  console.log("1. Testando Tabelas e Contagens no Supabase REST...");
  try {
    const r1 = await fetchJson(`${SUPABASE_REST}/comunidade_utilidade_publica?select=count`, SUPABASE_ANON);
    const r2 = await fetchJson(`${SUPABASE_REST}/radar_transito_rodovias?select=count`, SUPABASE_ANON);
    const r3 = await fetchJson(`${SUPABASE_REST}/concursos_municipais_editais?select=count`, SUPABASE_ANON);
    const r4 = await fetchJson(`${SUPABASE_REST}/alertas_meteorologicos_emergencia?select=count`, SUPABASE_ANON);

    assert(Array.isArray(r1) && r1[0].count >= 200, `comunidade_utilidade_publica ativa (${r1[0]?.count} registros)`);
    assert(Array.isArray(r2) && r2[0].count >= 10, `radar_transito_rodovias ativa (${r2[0]?.count} rodovias)`);
    assert(Array.isArray(r3) && r3[0].count >= 64, `concursos_municipais_editais ativa (${r3[0]?.count} editais)`);
    assert(Array.isArray(r4) && r4[0].count >= 64, `alertas_meteorologicos_emergencia ativa (${r4[0]?.count} alertas)`);
  } catch (e) {
    assert(false, `Falha na consulta ao Supabase REST: ${e.message}`);
  }

  // 2. ARQUIVOS HTML PROGRAMÁTICOS GERADOS
  console.log("\n2. Testando Presença de Arquivos Estáticos...");
  const pDesapegos = path.join(REPO_ROOT, 'utilidade-publica', 'barretos', 'doacoes-e-desapegos.html');
  const pTransito = path.join(REPO_ROOT, 'alerta-transito', 'rodovia-presidente-dutra-travada.html');
  const pTransitoHub = path.join(REPO_ROOT, 'alerta-transito', 'index.html');
  const pConcursos = path.join(REPO_ROOT, 'concursos', 'barretos-inscricoes-abertas.html');
  const pConcursosHub = path.join(REPO_ROOT, 'concursos', 'index.html');
  const pClima = path.join(REPO_ROOT, 'alerta-clima', 'barretos-alerta-meteorologico.html');
  const pClimaHub = path.join(REPO_ROOT, 'alerta-clima', 'index.html');

  assert(fs.existsSync(pDesapegos), "Página /utilidade-publica/barretos/doacoes-e-desapegos.html gerada");
  assert(fs.existsSync(pTransito), "Página /alerta-transito/rodovia-presidente-dutra-travada.html gerada");
  assert(fs.existsSync(pTransitoHub), "Hub /alerta-transito/index.html gerado");
  assert(fs.existsSync(pConcursos), "Página /concursos/barretos-inscricoes-abertas.html gerada");
  assert(fs.existsSync(pConcursosHub), "Hub /concursos/index.html gerado");
  assert(fs.existsSync(pClima), "Página /alerta-clima/barretos-alerta-meteorologico.html gerada");
  assert(fs.existsSync(pClimaHub), "Hub /alerta-clima/index.html gerado");

  // 3. TÍTULOS SEO E METATAGS
  console.log("\n3. Testando Títulos de Alto Impacto SEO...");
  const cDesapegos = fs.readFileSync(pDesapegos, 'utf8');
  const cTransito = fs.readFileSync(pTransito, 'utf8');
  const cConcursos = fs.readFileSync(pConcursos, 'utf8');
  const cClima = fs.readFileSync(pClima, 'utf8');

  assert(cDesapegos.includes("<title>⚠️ COMUNIDADE LOCAL: Achados, Perdidos e Doações em Barretos - Atualizado Agora</title>"), "Título de Desapegos/Doações validado");
  assert(cTransito.includes("⚠️ ALERTA TRÂNSITO: Situação agora na Rodovia Presidente Dutra"), "Título de Trânsito validado");
  assert(cConcursos.includes("<title>📝 CONCURSO PÚBLICO: Inscrições e Vagas Abertas na Prefeitura de Barretos - Edital 2026</title>"), "Título de Concursos validado");
  assert(cClima.includes("<title>🚨 ALERTA METEOROLÓGICO:"), "Título de Alerta Clima validado");

  // 4. MONETIZAÇÃO ADSTERRA & PROPELLERADS & AFILIADOS
  console.log("\n4. Testando Monetização e Injeção de Anúncios e Afiliados...");
  assert(cDesapegos.includes("5975392") && cDesapegos.includes("11558154"), "Desapegos monetizado com Adsterra e PropellerAds");
  assert(cTransito.includes("5975392") && cTransito.includes("11558154"), "Trânsito monetizado com Adsterra e PropellerAds");
  assert(cConcursos.includes("5975392") && cConcursos.includes("11558154"), "Concursos monetizado com Adsterra e PropellerAds");
  assert(cClima.includes("5975392") && cClima.includes("11558154"), "Clima monetizado com Adsterra e PropellerAds");
  assert(cConcursos.includes("1760660e-db11-41d8-bdf9-2b2b24c943b7"), "OneSignal Web Push SDK integrado em Concursos");

  // 5. SITEMAP.XML E INDEXNOW
  console.log("\n5. Testando Sitemap.xml e Cobertura...");
  const sitemapContent = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemapContent.includes("https://www.aquitemachadinhos.com.br/alerta-transito"), "Rota /alerta-transito no sitemap");
  assert(sitemapContent.includes("https://www.aquitemachadinhos.com.br/concursos"), "Rota /concursos no sitemap");
  assert(sitemapContent.includes("https://www.aquitemachadinhos.com.br/alerta-clima"), "Rota /alerta-clima no sitemap");

  // 6. BLINDAGEM DO CARROSSEL LUXUOSO
  console.log("\n6. Testando Blindagem Anti-Regressão...");
  const indexContent = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexContent.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso blindado e 100% intacto");

  // 7. LIMITE DE SERVERLESS FUNCTIONS
  console.log("\n7. Testando Limite de Funções Serverless Vercel...");
  const apiFiles = fs.readdirSync(path.join(REPO_ROOT, 'api')).filter(f => f.endsWith('.js') && !f.startsWith('_'));
  assert(apiFiles.length <= 12, `Total de serverless functions em api/ é ${apiFiles.length} (limite <= 12)`);

  console.log("\n=======================================================");
  console.log(`📊 RESULTADO MASTER: ${passed} testes PASSARAM, ${failed} falharam.`);
  console.log("=======================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
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

runMasterTests().catch(console.error);
