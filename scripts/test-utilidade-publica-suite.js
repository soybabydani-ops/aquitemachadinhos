/**
 * AQUITEM ACHADINHOS — TEST SUITE: UTILIDADE PÚBLICA & COMUNIDADE
 * Validação ponta a ponta: Supabase, Templates HTML, Monetização Adsterra/PropellerAds,
 * Afiliados Contextuais, Sitemap e IndexNow.
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

async function runTests() {
  console.log("\n=======================================================");
  console.log("🛠️ INICIANDO BATERIA DE TESTES DE UTILIDADE PÚBLICA");
  console.log("=======================================================\n");

  // TESTE 1: Supabase Tables
  console.log("1. Testando Conectividade e Registros no Supabase REST...");
  try {
    const res1 = await fetchJson(`${SUPABASE_REST}/comunidade_achados_perdidos?select=count`, SUPABASE_ANON);
    const res2 = await fetchJson(`${SUPABASE_REST}/comunidade_doacoes?select=count`, SUPABASE_ANON);
    assert(Array.isArray(res1) && res1[0].count > 0, `Tabela comunidade_achados_perdidos ativa com ${res1[0]?.count} registros.`);
    assert(Array.isArray(res2) && res2[0].count > 0, `Tabela comunidade_doacoes ativa com ${res2[0]?.count} registros.`);
  } catch (e) {
    assert(false, `Falha ao conectar no Supabase REST: ${e.message}`);
  }

  // TESTE 2: Arquivos Estáticos Gerados
  console.log("\n2. Testando Integridade dos Arquivos HTML Programáticos...");
  const barretosAchados = path.join(REPO_ROOT, 'utilidade-publica', 'barretos', 'achados-e-perdidos.html');
  const barretosDoacoes = path.join(REPO_ROOT, 'utilidade-publica', 'barretos', 'doacoes.html');
  const spAchados = path.join(REPO_ROOT, 'utilidade-publica', 'sao-paulo', 'achados-e-perdidos.html');
  const hubIndex = path.join(REPO_ROOT, 'utilidade-publica', 'index.html');
  const cidadeDynamic = path.join(REPO_ROOT, 'utilidade-publica', 'cidade.html');

  assert(fs.existsSync(barretosAchados), "Arquivo /utilidade-publica/barretos/achados-e-perdidos.html existe");
  assert(fs.existsSync(barretosDoacoes), "Arquivo /utilidade-publica/barretos/doacoes.html existe");
  assert(fs.existsSync(spAchados), "Arquivo /utilidade-publica/sao-paulo/achados-e-perdidos.html existe");
  assert(fs.existsSync(hubIndex), "Arquivo /utilidade-publica/index.html existe");
  assert(fs.existsSync(cidadeDynamic), "Arquivo /utilidade-publica/cidade.html existe");

  // TESTE 3: Verificação de Meta-Tags de Alto Impacto
  console.log("\n3. Testando Meta-Tags e SEO Local...");
  const contentBarretos = fs.readFileSync(barretosAchados, 'utf8');
  assert(contentBarretos.includes("<title>⚠️ ACHADOS E PERDIDOS: Documentos e Objetos em Barretos (SP) - Atualizado Agora</title>"), "Título agressivo de alto impacto pSEO presente em Barretos");
  assert(contentBarretos.includes("https://www.aquitemachadinhos.com.br/utilidade-publica/barretos/achados-e-perdidos"), "Canonical tag correta");
  assert(contentBarretos.includes('"@type":"ItemList"'), "Schema.org ItemList JSON-LD estruturado presente");

  // TESTE 4: Verificação de Monetização Dupla (Adsterra & PropellerAds)
  console.log("\n4. Testando Monetização Dupla (Adsterra Zone 5975392 & PropellerAds Zone 11558154)...");
  assert(contentBarretos.includes("5975392"), "Adsterra Zone ID 5975392 injetado no HTML");
  assert(contentBarretos.includes("11558154"), "PropellerAds Zone ID 11558154 injetado no <head>");
  assert(contentBarretos.includes("sw-check-permissions-fec45.js"), "Service worker do PropellerAds vinculado");

  // TESTE 5: Produtos Afiliados Contextuais
  console.log("\n5. Testando Produtos Afiliados Contextuais no Rodapé...");
  assert(contentBarretos.includes("30n7ohzzU6"), "Link de afiliado oficial Shopee presente");
  assert(contentBarretos.includes("B0hmLsxcH"), "Link de afiliado oficial Amazon presente");
  assert(contentBarretos.includes("1U3rtgV"), "Link de afiliado oficial Mercado Livre presente");
  assert(contentBarretos.includes("/ir.html?url="), "Roteamento de afiliados através do rastreador /ir.html");

  // TESTE 6: Formulário Inteligente Custo Zero
  console.log("\n6. Testando Formulário Inteligente Custo Zero com Supabase...");
  assert(contentBarretos.includes("handleFormSubmit(event)"), "Handler de submissão do formulário comunitário presente");
  assert(contentBarretos.includes("comunidade_achados_perdidos"), "Conexão direta ao endpoint de inserção do Supabase");

  // TESTE 7: Sitemap e IndexNow
  console.log("\n7. Testando Sitemap.xml e Protocolo IndexNow...");
  const sitemapContent = fs.readFileSync(path.join(REPO_ROOT, 'sitemap.xml'), 'utf8');
  assert(sitemapContent.includes("https://www.aquitemachadinhos.com.br/utilidade-publica/barretos/achados-e-perdidos"), "Barretos Achados presente no sitemap.xml");
  assert(sitemapContent.includes("https://www.aquitemachadinhos.com.br/utilidade-publica/sao-paulo/doacoes"), "São Paulo Doações presente no sitemap.xml");
  assert(sitemapContent.includes("<priority>0.90</priority>"), "Prioridade 0.90 atribuída às rotas de utilidade pública");

  // TESTE 8: Anti-Regressão Carrossel Luxuoso
  console.log("\n8. Testando Blindagem Anti-Regressão...");
  const indexContent = fs.readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');
  assert(indexContent.includes("<!-- INÍCIO DO CARROSSEL LUXUOSO - NÃO TOCAR -->"), "Carrossel Luxuoso 100% blindado e intocado");

  console.log("\n=======================================================");
  console.log(`📊 RESULTADO FINAL: ${passed} testes PASSARAM, ${failed} falharam.`);
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
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

runTests().catch(console.error);
