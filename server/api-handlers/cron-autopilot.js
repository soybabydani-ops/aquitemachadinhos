// ============================================================
// AQUITEM — Authenticated nightly maintenance orchestrator
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

function invokeSupabaseWorker(name, apiKey) {
  return new Promise((resolve) => {
    const request = https.get(`https://efvuzxdhsirpvxclgdfg.supabase.co/functions/v1/${name}`, {
      headers: {
        apikey: apiKey,
        Authorization: `Bearer ${apiKey}`,
      },
      timeout: 15_000,
    }, (response) => {
      response.resume();
      resolve({ worker: name, status: response.statusCode || 0 });
    });

    request.on('timeout', () => request.destroy());
    request.on('error', () => resolve({ worker: name, status: 0 }));
  });
}

module.exports = async function handler(req, res) {
  // This guard is intentionally first: no network request may run until the
  // Vercel Cron Authorization header is verified.
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  if (!hasValidCronAuthorization(req.headers.authorization)) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' });
  }

  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
  if (!supabaseAnonKey) {
    return res.status(503).json({ ok: false, error: 'Cron dependencies are not configured' });
  }

  const startedAt = performance.now();
  const tasks = await Promise.allSettled([
    invokeSupabaseWorker('multiplexed-google-api-dispatcher', supabaseAnonKey),
    invokeSupabaseWorker('edge-cache-purge-engine', supabaseAnonKey),
  ]);
  const workerResults = tasks.map((task) => task.status === 'fulfilled'
    ? task.value
    : { worker: 'unknown', status: 0 });

  // This legacy cron has no authoritative changed-URL manifest. It deliberately
  // does not re-submit a static URL list to IndexNow every day. IndexNow should
  // be invoked only by the write path that knows which canonical URLs changed.
  const summary = {
    event: 'nightly_sync_completed',
    durationMs: Math.round((performance.now() - startedAt) * 100) / 100,
    changedCanonicalUrls: 0,
    indexNowStatuses: [],
    workers: workerResults.map((result) => ({ worker: result.worker, status: result.status })),
  };
  console.info(JSON.stringify(summary));

  return res.status(200).json({ ok: true, ...summary, host: HOST });
};
