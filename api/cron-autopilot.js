// ============================================================
// AQUITEM — 24/7 Autopilot Machine & Traffic Booster (/api/cron-autopilot)
// Vercel Serverless Cron / Real-Time SEO Indexing Pinger
// ============================================================

const https = require('https');
const { supabase } = require('./_lib/supabase');

const HOST = 'www.aquitemachadinhos.com.br';
const KEY = 'aquitem2026indexnowkey';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const INDEXNOW_ENDPOINTS = [
  'api.indexnow.org',
  'www.bing.com',
  'yandex.com'
];

async function pingIndexNow(urls) {
  const payload = JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  });

  const promises = INDEXNOW_ENDPOINTS.map(hostname => {
    return new Promise(resolve => {
      const req = https.request({
        hostname: hostname,
        port: 443,
        path: '/indexnow',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(payload)
        }
      }, (res) => {
        resolve({ host: hostname, status: res.statusCode });
      });
      req.on('error', (e) => resolve({ host: hostname, error: e.message }));
      req.write(payload);
      req.end();
    });
  });

  return Promise.all(promises);
}

module.exports = async function handler(req, res) {
  const startTime = Date.now();
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');

  try {
    // 1. Coleta das rotas e produtos de maior conversão
    const priorityUrls = [
      `https://${HOST}/viagens.html`,
      `https://${HOST}/captura-tarifas-bug.html`,
      `https://${HOST}/destinos/orlando-passagens-hoteis-baratos.html`,
      `https://${HOST}/destinos/paris-passagens-hoteis-baratos.html`,
      `https://${HOST}/en/destinations/orlando-cheap-flights-hotel-deals.html`,
      `https://${HOST}/es/destinos/cancun-vuelos-baratos-hoteles.html`,
      `https://${HOST}/malas-e-viagem/kit-malas-viagem-rigidas-360-tsa-amazon-promocao.html`,
      `https://${HOST}/eventos/shakira-em-sao-paulo-como-chegar-hoteis.html`,
      `https://${HOST}/cupons-ativos/bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre.html`,
      `https://${HOST}/consultas/calendario-de-pagamentos-bolsa-familia-2026.html`,
      `https://${HOST}/barretos-2026/biometria-facial-festa-do-peao-barretos.html`,
      `https://${HOST}/barretos-2026/horarios-shows-gusttavo-lima-ana-castela-barretos.html`,
      `https://${HOST}/looks/chapeu-pralana-barretos-promocao.html`,
      `https://${HOST}/looks/jaqueta-couro-franjas-ana-castela-barretos.html`,
      `https://${HOST}/utilidade-publica`,
      `https://${HOST}/utilidade-publica/barretos/achados-e-perdidos.html`,
      `https://${HOST}/utilidade-publica/barretos/doacoes-e-desapegos.html`,
      `https://${HOST}/alerta-transito/rodovia-presidente-dutra-travada.html`,
      `https://${HOST}/concursos/barretos-inscricoes-abertas.html`,
      `https://${HOST}/alerta-clima/barretos-alerta-meteorologico.html`,
      `https://${HOST}/pinterest-catalog.xml`,
      `https://${HOST}/pinterest-global-catalog.xml`
    ];

    // 2. Disparo IndexNow Multi-Endpoint
    const indexResults = await pingIndexNow(priorityUrls);

    // 3. Ping Google Search Console
    https.get(`https://www.google.com/ping?sitemap=https://${HOST}/sitemap.xml`, () => {}).on('error', () => {});

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      execution_ms: Date.now() - startTime,
      urls_boosted: priorityUrls.length,
      indexing_pings: indexResults
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
      execution_ms: Date.now() - startTime
    });
  }
};
