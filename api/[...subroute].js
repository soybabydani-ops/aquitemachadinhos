const crypto = require('crypto');

const handlers = {
  'cron-autopilot': require('../server/api-handlers/cron-autopilot'),
  'distribute-media': require('../server/api-handlers/distribute-media'),
  empresas: require('../server/api-handlers/empresas'),
  'google-index': require('../server/api-handlers/google-index'),
  'link-equity': require('../server/api-handlers/link-equity'),
  'mercadopago-webhook': require('../server/api-handlers/mercadopago-webhook'),
  og: require('../server/api-handlers/og'),
  'seo-page': require('../server/api-handlers/seo-page'),
  sitemap: require('../server/api-handlers/sitemap'),
  'upgrade-checkout': require('../server/api-handlers/upgrade-checkout'),
  pagamentos: require('../server/api-handlers/upgrade-checkout'),
  vagas: require('../server/api-handlers/vagas'),
  widget: require('../server/api-handlers/widget'),
};

function routeKey(req) {
  const url = new URL(req.url || '/', `https://${req.headers.host || 'www.aquitemachadinhos.com.br'}`);
  return url.pathname.replace(/^\/api\//, '').replace(/\/+$/, '');
}

function authorized(header) {
  const secret = process.env.SEO_REFRESH_SECRET;
  if (!header || !secret) return false;
  const expected = Buffer.from(`Bearer ${secret}`);
  const received = Buffer.from(header);
  return expected.length === received.length && crypto.timingSafeEqual(expected, received);
}

async function seoRefresh(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'Method not allowed' });
  if (!authorized(req.headers.authorization)) return res.status(401).json({ ok: false, error: 'Unauthorized' });
  try {
    const base = 'https://www.aquitemachadinhos.com.br';
    const response = await fetch(`${base}/sitemap.xml`, { cache: 'no-store' });
    if (!response.ok) throw new Error(`Sitemap HTTP ${response.status}`);
    const nodes = [...new Set([...(await response.text()).matchAll(/<loc>(https:\/\/[^<]+)<\/loc>/g)].map(match => match[1].replaceAll('&amp;', '&')).filter(url => {
      const parsed = new URL(url);
      return parsed.host === 'www.aquitemachadinhos.com.br' && !parsed.pathname.startsWith('/api/') && parsed.pathname !== '/ir.html';
    }))];
    const key = process.env.INDEXNOW_KEY;
    if (!key) {
      return res.status(503).json({ ok: false, error: 'IndexNow is not configured' });
    }
    const indexNow = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'www.aquitemachadinhos.com.br',
        key,
        keyLocation: `${base}/indexnow-key.txt`,
        urlList: nodes.slice(0, 10000),
      }),
    });
    return res.status(200).json({ ok: true, cacheHeadersRefreshed: true, structuredNodes: nodes.length, indexNowStatus: indexNow.status, googleSubmission: 'Use Search Console; public sitemap ping was discontinued.' });
  } catch (error) {
    console.error('[seo-refresh]', error.message);
    return res.status(502).json({ ok: false, error: 'SEO refresh failed' });
  }
}

module.exports = async function consolidatedApi(req, res) {
  const key = routeKey(req);
  if (key === 'revalidate' || key === 'seo-refresh') return seoRefresh(req, res);
  const handler = handlers[key];
  if (!handler) return res.status(404).json({ error: 'API route not found' });
  return handler(req, res);
};
