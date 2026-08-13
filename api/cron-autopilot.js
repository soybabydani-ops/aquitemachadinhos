// ============================================================
// AQUITEM — 24/7 Autopilot Machine & Traffic Booster (/api/cron-autopilot)
// Vercel Serverless Cron / Real-Time SEO High-Frequency Indexer v5.2
// ============================================================

const https = require('https');

const HOST = 'www.aquitemachadinhos.com.br';
const KEY = 'aquitem2026indexnowkey';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV6eGRoc2lycHZ4Y2xnZGZnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU1MDM1OTEsImV4cCI6MjEwMTA3OTU5MX0.nPVBBKO_W9-tAccFRv7ajnllxTXvkqbsVsYecDqyeQc";

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
          'User-Agent': 'AQUITEM-HighFrequency-BatchIndexer/5.2 (Compatible; Public Service & Live Deal Portal)'
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
    const priorityUrls = [
      `https://${HOST}/luxo-vip`,
      `https://${HOST}/pacotes-viagem`,
      `https://${HOST}/aluguel-carros`,
      `https://${HOST}/cursos`,
      `https://${HOST}/infoprodutos`,
      `https://${HOST}/estudante/carteirinha-estudante-digital-emitida-na-hora`,
      `https://${HOST}/clube-invest/como-destravar-independencia-financeira`,
      `https://${HOST}/energy-system/how-to-lower-electricity-bills-at-home-legally`,
      `https://${HOST}/barretos-2026/biometria-facial-festa-do-peao-barretos`,
      `https://${HOST}/achadinhos`,
      `https://${HOST}/marcas`,
      `https://${HOST}/alerta-transito`,
      `https://${HOST}/concursos`,
      `https://${HOST}/alerta-clima`,
      `https://${HOST}/feeds/alertas-urgentes.xml`,
      `https://${HOST}/feeds/sitemap-urgente.atom`,
      `https://${HOST}/data/hubs-municipais.json`,
      `https://${HOST}/data/index-realtime.json`
    ];

    // 1. Disparo IndexNow Multi-Endpoint
    const indexResults = await pingIndexNow(priorityUrls);

    // 2. Acionamento assíncrono do Multiplexed Google API Dispatcher e Edge Cache Purge
    https.get('https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/multiplexed-google-api-dispatcher', {
      headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}` }
    }, () => {}).on('error', () => {});

    https.get('https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/edge-cache-purge-engine', {
      headers: { 'apikey': SUPABASE_ANON, 'Authorization': `Bearer ${SUPABASE_ANON}` }
    }, () => {}).on('error', () => {});

    // 3. Ping Google Search Console
    https.get(`https://www.google.com/ping?sitemap=https://${HOST}/feeds/sitemap-urgente.atom`, () => {}).on('error', () => {});

    return res.status(200).json({
      success: true,
      timestamp: new Date().toISOString(),
      protocol: "Batch API & Schema Saturation Protocol v5.2",
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
