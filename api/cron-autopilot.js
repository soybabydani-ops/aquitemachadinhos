// ============================================================
// AQUITEM — 24/7 Autopilot Machine & Traffic Booster (/api/cron-autopilot)
// Vercel Serverless Cron / Real-Time SEO High-Frequency Indexer
// ============================================================

const https = require('https');

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
          'Content-Length': Buffer.byteLength(payload),
          'User-Agent': 'AQUITEM-HighFrequency-BatchIndexer/3.5 (Compatible; Public Service & Live Deal Portal)'
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
    // 1. Coleta das rotas e produtos de maior conversão de todas as verticais
    const priorityUrls = [
      `https://${HOST}/pacotes-viagem/pacotes-cruzeiros-maritimos-resorts-all-inclusive-promocao.html`,
      `https://${HOST}/pacotes-viagem/bugs-passagens-aereas-internacionais-orlando.html`,
      `https://${HOST}/pacotes-viagem/bugs-passagens-aereas-internacionais-paris.html`,
      `https://${HOST}/pacotes-viagem/melhores-hoteis-boutique-resorts-luxo-barretos.html`,
      `https://${HOST}/aluguel-carros/aluguel-carros-blindados-utilitarios-sao-paulo-guarulhos.html`,
      `https://${HOST}/aluguel-carros/como-conseguir-desconto-locacao-veiculos-festa-peao-barretos.html`,
      `https://${HOST}/aluguel-carros/luxury-car-hire-suv-rentals-tokyo-haneda.html`,
      `https://${HOST}/aluguel-carros/best-car-rental-deals-free-cancellation-mia-airport.html`,
      `https://${HOST}/cursos/cupom-desconto-promocoes-relampago-udemy-hoje.html`,
      `https://${HOST}/cursos/melhores-cursos-online-capacitacao-profissional-barretos.html`,
      `https://${HOST}/cursos/cursos-inteligencia-artificial-chatgpt-prompts.html`,
      `https://${HOST}/infoprodutos/clube-invest-v3.html`,
      `https://${HOST}/clube-invest/como-destravar-independencia-financeira.html`,
      `https://${HOST}/energy-system/how-to-lower-electricity-bills-at-home-legally.html`,
      `https://${HOST}/estudante/como-pagar-meia-entrada-festa-do-peao-barretos.html`,
      `https://${HOST}/viagens.html`,
      `https://${HOST}/captura-tarifas-bug.html`,
      `https://${HOST}/destinos/orlando-passagens-hoteis-baratos.html`,
      `https://${HOST}/luxo/fretamento-jato-executivo-sao-paulo-catarina-trancoso.html`,
      `https://${HOST}/investimentos/pontos-comerciais-e-terrenos-em-sao-paulo.html`,
      `https://${HOST}/hedge/corporate-jet-insurance-fleet-liability.html`,
      `https://${HOST}/logistica-pesada/sao-paulo-fretamento-industrial.html`,
      `https://${HOST}/eventos/shakira-em-sao-paulo-como-chegar-hoteis.html`,
      `https://${HOST}/cupons-ativos/bug-de-preco-air-fryer-8l-digital-inox-shopee-mercado-livre.html`,
      `https://${HOST}/consultas/calendario-de-pagamentos-bolsa-familia-2026.html`,
      `https://${HOST}/barretos-2026/biometria-facial-festa-do-peao-barretos.html`,
      `https://${HOST}/barretos-2026/horarios-shows-gusttavo-lima-ana-castela-barretos.html`,
      `https://${HOST}/looks/chapeu-pralana-barretos-promocao.html`,
      `https://${HOST}/utilidade-publica/barretos/achados-e-perdidos.html`,
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
