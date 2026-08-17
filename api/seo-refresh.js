const crypto = require('crypto');

const HOST = 'www.aquitemachadinhos.com.br';
const BASE = `https://${HOST}`;

function authorized(header) {
  const secret = process.env.SEO_REFRESH_SECRET;
  if (!header || !secret) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(header);
  return expected.length === received.length && crypto.timingSafeEqual(expected, received);
}

function extractUrls(xml) {
  return [...String(xml).matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)]
    .map(match => match[1].replaceAll('&amp;', '&'))
    .filter(url => {
      const parsed = new URL(url);
      return parsed.host === HOST && !parsed.pathname.startsWith('/api/') && parsed.pathname !== '/ir.html';
    });
}

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  if (!authorized(req.headers.authorization)) return res.status(401).json({ ok: false, error: 'Unauthorized' });

  try {
    const sitemapResponse = await fetch(`${BASE}/sitemap.xml`, { cache: 'no-store' });
    if (!sitemapResponse.ok) throw new Error(`Sitemap HTTP ${sitemapResponse.status}`);
    const nodes = [...new Set(extractUrls(await sitemapResponse.text()))];

    let indexNowStatus = null;
    const key = process.env.INDEXNOW_KEY || 'aquitem2026indexnowkey';
    if (nodes.length) {
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host: HOST, key, keyLocation: `${BASE}/${key}.txt`, urlList: nodes.slice(0, 10000) })
      });
      indexNowStatus = response.status;
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    let edgePurgeStatus = null;
    if (supabaseUrl && anonKey) {
      const purge = await fetch(`${supabaseUrl}/functions/v1/edge-cache-purge-engine`, { headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` } });
      edgePurgeStatus = purge.status;
    }

    return res.status(200).json({ ok: true, cachePurgeRequested: edgePurgeStatus !== null, edgePurgeStatus, structuredNodes: nodes.length, indexNowStatus, googleSubmission: 'Use Search Console; public sitemap ping was discontinued.' });
  } catch (error) {
    console.error('[seo-refresh]', error.message);
    return res.status(502).json({ ok: false, error: 'SEO refresh failed' });
  }
};
