import crypto from 'node:crypto';
import { revalidatePath } from 'next/cache';

const HOST = 'www.aquitemachadinhos.com.br';
const BASE = `https://${HOST}`;

function authorized(header) {
  const secret = process.env.SEO_REFRESH_SECRET || process.env.REVALIDATE_SECRET;
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

export async function POST(request) {
  if (!authorized(request.headers.get('authorization'))) return Response.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  try {
    const body = await request.json().catch(() => ({}));
    const requestedPath = typeof body.path === 'string' && body.path.startsWith('/') ? body.path : '/';
    revalidatePath(requestedPath);

    const sitemap = await fetch(`${BASE}/sitemap.xml`, { cache: 'no-store' });
    if (!sitemap.ok) throw new Error(`Sitemap HTTP ${sitemap.status}`);
    const nodes = [...new Set(extractUrls(await sitemap.text()))];
    const key = process.env.INDEXNOW_KEY || 'aquitem2026indexnowkey';
    const indexNow = await fetch('https://api.indexnow.org/indexnow', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ host: HOST, key, keyLocation: `${BASE}/${key}.txt`, urlList: nodes.slice(0, 10000) }) });

    return Response.json({ ok: true, revalidated: true, path: requestedPath, structuredNodes: nodes.length, indexNowStatus: indexNow.status, googleSubmission: 'Use Search Console; public sitemap ping was discontinued.' }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    console.error('[revalidate]', error instanceof Error ? error.message : 'Unknown error');
    return Response.json({ ok: false, error: 'Revalidation failed' }, { status: 502 });
  }
}
