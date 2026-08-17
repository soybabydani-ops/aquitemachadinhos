// ============================================================
// AQUITEM — Scheduled maintenance / discovery notifier
// Invoked only by Vercel Cron through /api/cron-autopilot.
// ============================================================

const crypto = require('crypto');
const https = require('https');

const HOST = 'www.aquitemachadinhos.com.br';

function hasValidCronAuthorization(header) {
  const secret = process.env.CRON_SECRET;
  if (!header || !secret) return false;

  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(header);
  return expected.length === received.length && crypto.timingSafeEqual(expected, received);
}

async function pingIndexNow(urls, key, keyLocation) {
  const payload = JSON.stringify({
    host: HOST,
    key,
    keyLocation,
    urlList: urls,
  });

  const endpoints = ['api.indexnow.org'];
  return Promise.all(endpoints.map((hostname) => new Promise((resolve) => {
    const request = https.request({
      hostname,
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent': 'AquiTemAchadinhos-Cron/1.0',
      },
    }, (response) => resolve({ host: hostname, status: response.statusCode }));

    request.on('error', (error) => resolve({ host: hostname, error: error.message }));
    request.write(payload);
    request.end();
  })));
}

module.exports = async function handler(req, res) {
  // This guard is intentionally first: no IndexNow or Supabase request may run
  // until the Vercel Cron Authorization header is verified.
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  if (!hasValidCronAuthorization(req.headers.authorization)) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  const indexNowKey = process.env.INDEXNOW_KEY;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!indexNowKey || !supabaseAnonKey) {
    return res.status(503).json({ ok: false, error: 'Cron dependencies are not configured' });
  }

  const startTime = Date.now();
  const keyLocation = `https://${HOST}/indexnow-key.txt`;
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
    `https://${HOST}/guias/`,
    `https://${HOST}/sitemap-growth.xml`,
    `https://${HOST}/feeds/alertas-urgentes.xml`,
    `https://${HOST}/feeds/sitemap-urgente.atom`,
    `https://${HOST}/data/hubs-municipais.json`,
    `https://${HOST}/data/index-realtime.json`,
  ];

  try {
    const indexResults = await pingIndexNow(priorityUrls, indexNowKey, keyLocation);

    // These calls are intentionally best-effort and run only after the cron guard.
    for (const path of [
      'multiplexed-google-api-dispatcher',
      'edge-cache-purge-engine',
    ]) {
      https.get(`https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/${path}`, {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
      }, () => {}).on('error', () => {});
    }

    return res.status(200).json({
      ok: true,
      executionMs: Date.now() - startTime,
      urlsSubmitted: priorityUrls.length,
      indexNow: indexResults,
    });
  } catch (error) {
    console.error('[cron-autopilot]', error instanceof Error ? error.message : 'unknown error');
    return res.status(502).json({ ok: false, error: 'Cron execution failed' });
  }
};
