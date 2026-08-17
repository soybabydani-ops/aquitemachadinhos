/**
 * AQUITEM ACHADINHOS — TESTE DA OPEN-DATA AUTHORITY FACTORY & DATASETS (DA 95+)
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

async function runOpenDataAuthorityTests() {
  console.log("\n=======================================================");
  console.log("🏭 TESTES: OPEN-DATA AUTHORITY FACTORY & DATASETS (DA 95+)");
  console.log("=======================================================\n");

  // 1. GEOJSON COBERTURA MUNICIPAL (/data/municipios-cobertura.geojson)
  console.log("1. Testando GeoJSON de Cobertura Municipal...");
  const geojsonPath = path.join(REPO_ROOT, 'data', 'municipios-cobertura.geojson');
  assert(fs.existsSync(geojsonPath), "Arquivo /data/municipios-cobertura.geojson existe");
  
  const geojsonData = JSON.parse(fs.readFileSync(geojsonPath, 'utf8'));
  assert(geojsonData.type === "FeatureCollection", "Tipo FeatureCollection confirmado");
  assert(geojsonData.metadata?.source_provider === "https://www.aquitemachadinhos.com.br", "Source Provider oficial injetado nos metadados");
  assert(Array.isArray(geojsonData.features) && geojsonData.features.length === 64, "64 pontos georreferenciados no GeoJSON");
  assert(geojsonData.features[0]?.properties?.authoritative_url?.includes("aquitemachadinhos.com.br"), "URL autoritativa presente nas propriedades de cada cidade");

  // 2. CSV DE INDICADORES DE MOBILIDADE (/data/indicadores-mobilidade-municipais.csv)
  console.log("\n2. Testando CSV de Indicadores de Mobilidade...");
  const csvPath = path.join(REPO_ROOT, 'data', 'indicadores-mobilidade-municipais.csv');
  assert(fs.existsSync(csvPath), "Arquivo /data/indicadores-mobilidade-municipais.csv existe");

  const csvContent = fs.readFileSync(csvPath, 'utf8');
  assert(csvContent.includes("# Source Provider: https://www.aquitemachadinhos.com.br"), "Cabeçalho de citação e proveniência presente no CSV");
  assert(csvContent.includes("aeroporto_referencia"), "Coluna de aeroportos presente no CSV");

  // 3. SCHEMA.ORG DATASET JSON-LD (/data/schema-open-dataset.jsonld)
  console.log("\n3. Testando Schema.org Dataset JSON-LD para Google Dataset Search...");
  const jsonldPath = path.join(REPO_ROOT, 'data', 'schema-open-dataset.jsonld');
  assert(fs.existsSync(jsonldPath), "Arquivo /data/schema-open-dataset.jsonld existe");

  const jsonldData = JSON.parse(fs.readFileSync(jsonldPath, 'utf8'));
  assert(jsonldData["@type"] === "Dataset", "Tipo Schema.org @type: Dataset confirmado");
  assert(jsonldData.creator?.url === "https://www.aquitemachadinhos.com.br", "Creator URL apontando para o domínio oficial");

  // 4. DOCUMENTAÇÃO DEVELOPERS-API.MD
  console.log("\n4. Testando Documentação Técnica DEVELOPERS-API.md...");
  const devMdPath = path.join(REPO_ROOT, 'DEVELOPERS-API.md');
  assert(fs.existsSync(devMdPath), "Arquivo DEVELOPERS-API.md gerado");
  const devMd = fs.readFileSync(devMdPath, 'utf8');
  assert(devMd.includes("https://www.aquitemachadinhos.com.br/data/municipios-cobertura.geojson"), "Link para GeoJSON documentado com backlink autoritativo");
  assert(devMd.includes("https://www.aquitemachadinhos.com.br/luxo-vip"), "Link para Alto Luxo CJ documentado com backlink autoritativo");

  // 5. SUPABASE EDGE FUNCTION OPEN-DATA-AUTHORITY-EXPORTER
  console.log("\n5. Testando Supabase Edge Function open-data-authority-exporter...");
  try {
    const edgeRes = await fetchJson("https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/open-data-authority-exporter", SUPABASE_ANON);
    assert(edgeRes?.status === "active", "Edge Function open-data-authority-exporter ativa com status active");
    assert(edgeRes?.source_provider === "https://www.aquitemachadinhos.com.br", "Source Provider verificado na resposta da Edge Function");
    assert(edgeRes?.datasets?.geojson?.includes("municipios-cobertura.geojson"), "Dataset GeoJSON referenciado na API");
  } catch (e) {
    assert(false, `Falha ao testar Edge Function Open Data: ${e.message}`);
  }

  // 6. BLINDAGEM ANTI-REGRESSÃO
  console.log("\n6. Testando Blindagem Anti-Regressão...");
  const indexHtml = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexHtml.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Início 100% blindado");
  assert(indexHtml.includes("<!-- FIM DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso Fim 100% blindado");

  // 7. LIMITES SERVERLESS VERCEL (HOBBY <= 12)
  console.log("\n7. Testando Limite de Serverless Functions em api/...");
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

runOpenDataAuthorityTests().catch(console.error);
