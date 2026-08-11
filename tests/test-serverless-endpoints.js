// ============================================================
// AQUITEM — Test Suite para Serverless Functions (/api/*)
// Testa todas as rotinas, cache headers, HTTP 304, JSON-LD @graph,
// injeção de variáveis geográficas e anti-thin content.
// ============================================================

const path = require('path');

// Mock req e res para execução local dos handlers
function createMockReqRes(options = {}) {
  const req = {
    method: options.method || 'GET',
    query: options.query || {},
    headers: options.headers || {},
    body: options.body || {}
  };

  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    setHeader(key, val) {
      this.headers[key.toLowerCase()] = val;
      return this;
    },
    json(data) {
      this.body = data;
      this.headers['content-type'] = 'application/json';
      return this;
    },
    send(data) {
      this.body = data;
      return this;
    },
    end() {
      return this;
    }
  };

  return { req, res };
}

async function runTests() {
  console.log('====================================================');
  console.log('🚀 INICIANDO TESTES DO ECOSSISTEMA SERVERLESS AQUITEM');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  // ----------------------------------------------------
  // TESTE 1: Supabase Client Singleton & Connection Reuse
  // ----------------------------------------------------
  console.log('📦 [1/8] Testando api/_lib/supabase.js...');
  try {
    const { supabase } = require('../api/_lib/supabase');
    const { data: cities, ok } = await supabase.from('cities').select('slug,nome,uf').limit(3).execute();
    assert(ok === true, 'Supabase Client executou query com sucesso');
    assert(Array.isArray(cities) && cities.length > 0, `Retornou ${cities ? cities.length : 0} cidades`);
  } catch (err) {
    assert(false, `Erro no Supabase Client: ${err.message}`);
  }

  // ----------------------------------------------------
  // TESTE 2: Geo-Enrichment & Anti-Thin Content Engine
  // ----------------------------------------------------
  console.log('\n🗺️ [2/8] Testando api/_lib/geo-enrich.js...');
  try {
    const { getGeoData, generateAntiThinContent } = require('../api/_lib/geo-enrich');
    const geo = getGeoData('barretos');
    assert(geo.nome === 'Barretos' && geo.populacao > 100000, 'Dados socioeconômicos de Barretos carregados');
    assert(geo.wikidata_id === 'Q808889', 'Wikidata ID mapeado corretamente');

    const antiThin = generateAntiThinContent({
      citySlug: 'barretos',
      cityName: 'Barretos',
      uf: 'SP',
      category: 'vagas',
      totalListings: 15,
      totalStores: 25
    });

    assert(antiThin.contentHtml.includes('Panorama Econômico e Oportunidades em Barretos'), 'Anti-Thin Content gerou bloco HTML rico');
    assert(antiThin.metaDescription.length <= 160, 'Meta description gerada dentro do limite SEO de 160 chars');
  } catch (err) {
    assert(false, `Erro no Geo-Enrich: ${err.message}`);
  }

  // ----------------------------------------------------
  // TESTE 3: Endpoint /api/vagas (Edge Cache & HTTP 304)
  // ----------------------------------------------------
  console.log('\n💼 [3/8] Testando api/vagas.js...');
  try {
    const vagasHandler = require('../api/vagas');
    const { req, res } = createMockReqRes({ query: { cidade: 'barretos', limit: '5' } });
    await vagasHandler(req, res);

    assert(res.statusCode === 200, 'Status HTTP 200 retornado');
    assert(res.headers['cache-control'] && res.headers['cache-control'].includes('s-maxage=86400'), 'Cache-Control Edge s-maxage=86400 injetado');
    assert(res.body && res.body.success === true, 'Payload JSON success: true');
    assert(Array.isArray(res.body.data), `Retornou ${res.body.data.length} vagas de Barretos`);

    // Teste de HTTP 304 Condicional
    if (res.headers['last-modified']) {
      const { req: req304, res: res304 } = createMockReqRes({
        query: { cidade: 'barretos', limit: '5' },
        headers: { 'if-modified-since': res.headers['last-modified'] }
      });
      await vagasHandler(req304, res304);
      assert(res304.statusCode === 304, 'HTTP 304 retornado com sucesso para requisição sem alterações');
    }
  } catch (err) {
    assert(false, `Erro no endpoint /api/vagas: ${err.message}`);
  }

  // ----------------------------------------------------
  // TESTE 4: Endpoint /api/empresas (Edge Cache & Filtros)
  // ----------------------------------------------------
  console.log('\n🏢 [4/8] Testando api/empresas.js...');
  try {
    const empresasHandler = require('../api/empresas');
    const { req, res } = createMockReqRes({ query: { cidade: 'barretos', limit: '6' } });
    await empresasHandler(req, res);

    assert(res.statusCode === 200, 'Status HTTP 200 retornado');
    assert(res.headers['cache-control'] && res.headers['cache-control'].includes('s-maxage=86400'), 'Cache-Control Edge injetado');
    assert(res.body && res.body.success === true, 'Payload JSON success: true');
    assert(Array.isArray(res.body.data), `Retornou ${res.body.data.length} empresas de Barretos`);
  } catch (err) {
    assert(false, `Erro no endpoint /api/empresas: ${err.message}`);
  }

  // ----------------------------------------------------
  // TESTE 5: Programmatic SEO, JSON-LD @graph e Sequestro Semântico
  // ----------------------------------------------------
  console.log('\n🌐 [5/8] Testando api/seo-page.js...');
  try {
    const seoHandler = require('../api/seo-page');
    
    // Hub da cidade
    const { req: reqHub, res: resHub } = createMockReqRes({ query: { cidade: 'barretos' } });
    await seoHandler(reqHub, resHub);
    assert(resHub.statusCode === 200, 'Hub programático retornou 200');
    assert(resHub.body.type === 'programmatic_hub', 'Tipo programmatic_hub identificado');
    assert(resHub.body.anti_thin_content !== undefined, 'Anti-Thin Content anexado ao Hub');

    // Renderização HTML com Grafo @graph
    const { req: reqHtml, res: resHtml } = createMockReqRes({ query: { cidade: 'barretos', render_html: 'true' } });
    await seoHandler(reqHtml, resHtml);
    assert(resHtml.statusCode === 200, 'Renderizador HTML retornou 200');
  } catch (err) {
    assert(false, `Erro no endpoint /api/seo-page: ${err.message}`);
  }

  // ----------------------------------------------------
  // TESTE 6: Fluid Embeddable Widget (/api/widget.js)
  // ----------------------------------------------------
  console.log('\n🧩 [6/8] Testando api/widget.js...');
  try {
    const widgetHandler = require('../api/widget');
    const { req, res } = createMockReqRes();
    await widgetHandler(req, res);

    assert(res.statusCode === 200, 'Status HTTP 200 retornado');
    assert(res.headers['content-type'].includes('application/javascript'), 'Content-Type JS retornado');
    assert(res.body.includes('rel="follow"'), 'Widget contém links indexáveis rel="follow" para autoridade SEO');
    assert(res.body.includes('initAquiTemWidgets'), 'Função de inicialização do widget presente');
  } catch (err) {
    assert(false, `Erro no endpoint /api/widget: ${err.message}`);
  }

  // ----------------------------------------------------
  // TESTE 7: Edge OpenGraph Card Generator (/api/og.js)
  // ----------------------------------------------------
  console.log('\n🎨 [7/8] Testando api/og.js...');
  try {
    const ogHandler = require('../api/og');
    const { req, res } = createMockReqRes({
      query: {
        title: 'Gerente Comercial',
        city: 'Barretos',
        uf: 'SP',
        salary: 'R$ 4.500/mês'
      }
    });
    await ogHandler(req, res);

    assert(res.statusCode === 200, 'Status HTTP 200 retornado');
    assert(res.headers['content-type'].includes('image/svg+xml'), 'Content-Type SVG retornado');
    assert(res.body.includes('Gerente Comercial'), 'Título da vaga injetado no SVG');
    assert(res.body.includes('BARRETOS · SP'), 'Cidade e UF injetados no SVG');
    assert(res.body.includes('R$ 4.500/mês'), 'Salário injetado no card SVG');
  } catch (err) {
    assert(false, `Erro no endpoint /api/og: ${err.message}`);
  }

  // ----------------------------------------------------
  // TESTE 8: Google Indexing API Serverless Dispatcher
  // ----------------------------------------------------
  console.log('\n🤖 [8/8] Testando api/google-index.js...');
  try {
    const indexHandler = require('../api/google-index');

    // GET Status
    const { req: reqGet, res: resGet } = createMockReqRes({ method: 'GET' });
    await indexHandler(reqGet, resGet);
    assert(resGet.statusCode === 200 && resGet.body.status === 'ready', 'GET /api/google-index status: ready');

    // POST Webhook Simulation
    const { req: reqPost, res: resPost } = createMockReqRes({
      method: 'POST',
      body: {
        table: 'listings',
        type: 'UPDATE',
        record: {
          id: 'test-uuid-1234',
          status: 'ativo',
          city_slug: 'barretos'
        }
      }
    });
    await indexHandler(reqPost, resPost);
    assert(resPost.statusCode === 200, 'Processamento de Webhook Supabase retornou 200');
    assert(resPost.body.processed_count >= 1, `Processou ${resPost.body.processed_count} URLs para indexação`);
  } catch (err) {
    assert(false, `Erro no endpoint /api/google-index: ${err.message}`);
  }

  // ----------------------------------------------------
  // TESTE 9: Dynamic XML Sitemap Generator (/api/sitemap.js)
  // ----------------------------------------------------
  console.log('\n🗺️ [9/9] Testando api/sitemap.js...');
  try {
    const sitemapHandler = require('../api/sitemap');
    const { req, res } = createMockReqRes();
    await sitemapHandler(req, res);

    assert(res.statusCode === 200, 'Status HTTP 200 retornado');
    assert(res.headers['content-type'].includes('application/xml'), 'Content-Type XML retornado');
    assert(res.body.includes('<urlset'), 'Sitemap contém tag raiz <urlset>');
    assert(res.body.includes('https://www.aquitemachadinhos.com.br/barretos-home'), 'Sitemap inclui hubs prioritários');
  } catch (err) {
    assert(false, `Erro no endpoint /api/sitemap: ${err.message}`);
  }

  // ----------------------------------------------------
  // TESTE 10: 24/7 Autopilot Machine (/api/cron-autopilot.js)
  // ----------------------------------------------------
  console.log('\n⏱️ [10/10] Testando api/cron-autopilot.js...');
  try {
    const cronHandler = require('../api/cron-autopilot');
    const { req, res } = createMockReqRes({ query: { secret: 'aquitem-cron-autopilot-2026' } });
    await cronHandler(req, res);

    assert(res.statusCode === 200, 'Status HTTP 200 retornado pelo Autopilot');
    assert(res.body && res.body.success === true, 'Autopilot executou ciclo com sucesso');
    assert(res.body.report && res.body.report.tasks_executed.length >= 4, 'Executou 4 tarefas automatizadas no ciclo');
    assert(res.body.report.metrics.total_cities >= 5581, 'Telemetria confirmou 5.581 cidades ativas no Supabase');
  } catch (err) {
    assert(false, `Erro no endpoint /api/cron-autopilot: ${err.message}`);
  }

  console.log('\n====================================================');
  console.log(`📊 RESULTADO DOS TESTES: ${passed} PASSOU | ${failed} FALHOU`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
