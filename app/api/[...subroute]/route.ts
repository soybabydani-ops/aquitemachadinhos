export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

type Context = { params: { subroute: string[] } | Promise<{ subroute: string[] }> };
type WebModule = Record<string, ((request: Request) => Promise<Response> | Response) | unknown>;
type LegacyHandler = (req: any, res: any) => Promise<unknown> | unknown;

const webLoaders: Record<string, () => Promise<WebModule>> = {
  'cache-biomico': () => import('../../../server/api-handlers/cache-biomico.js'),
  compress: () => import('../../../server/api-handlers/compress.js'),
  'faq-schema': () => import('../../../server/api-handlers/faq-schema.js'),
  feeds: () => import('../../../server/api-handlers/feeds.js'),
  revalidate: () => import('../../../server/api-handlers/revalidate.js'),
  'semantic-graph': () => import('../../../server/api-handlers/semantic-graph.js'),
  timestamps: () => import('../../../server/api-handlers/timestamps.js'),
  'v1/automated-global-loop': () => import('../../../server/api-handlers/v1/automated-global-loop'),
  'v1/cron-global-hydration': () => import('../../../server/api-handlers/v1/cron-global-hydration'),
};

const legacyLoaders: Record<string, () => Promise<{ default?: LegacyHandler } & Record<string, unknown>>> = {
  'cron-autopilot': () => import('../../../server/api-handlers/cron-autopilot.js'),
  'distribute-media': () => import('../../../server/api-handlers/distribute-media.js'),
  empresas: () => import('../../../server/api-handlers/empresas.js'),
  'google-index': () => import('../../../server/api-handlers/google-index.js'),
  'link-equity': () => import('../../../server/api-handlers/link-equity.js'),
  'mercadopago-webhook': () => import('../../../server/api-handlers/mercadopago-webhook.js'),
  og: () => import('../../../server/api-handlers/og.js'),
  'seo-page': () => import('../../../server/api-handlers/seo-page.js'),
  sitemap: () => import('../../../server/api-handlers/sitemap.js'),
  'upgrade-checkout': () => import('../../../server/api-handlers/upgrade-checkout.js'),
  vagas: () => import('../../../server/api-handlers/vagas.js'),
  widget: () => import('../../../server/api-handlers/widget.js'),
};

async function bodyForLegacy(request: Request) {
  if (request.method === 'GET' || request.method === 'HEAD') return undefined;
  const text = await request.clone().text();
  if (!text) return {};
  if ((request.headers.get('content-type') || '').includes('application/json')) {
    try { return JSON.parse(text); } catch { return {}; }
  }
  return text;
}

async function runLegacy(handler: LegacyHandler, request: Request) {
  const url = new URL(request.url);
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => { headers[key.toLowerCase()] = value; });
  const query: Record<string, string | string[]> = {};
  url.searchParams.forEach((value, key) => {
    const current = query[key];
    query[key] = current === undefined ? value : Array.isArray(current) ? [...current, value] : [current, value];
  });

  let status = 200;
  let payload: BodyInit | null = null;
  const responseHeaders = new Headers();
  let finished = false;
  const res: any = {
    setHeader(name: string, value: string | number | readonly string[]) { responseHeaders.set(name, Array.isArray(value) ? value.join(', ') : String(value)); return res; },
    status(code: number) { status = code; return res; },
    json(value: unknown) { responseHeaders.set('Content-Type', 'application/json; charset=utf-8'); payload = JSON.stringify(value); finished = true; return res; },
    send(value: unknown) { payload = typeof value === 'string' || value instanceof Uint8Array ? value as BodyInit : JSON.stringify(value); finished = true; return res; },
    end(value?: unknown) { if (value !== undefined) payload = String(value); finished = true; return res; },
    writeHead(code: number, values?: Record<string, string>) { status = code; for (const [key, value] of Object.entries(values || {})) responseHeaders.set(key, value); return res; },
    get statusCode() { return status; },
    set statusCode(code: number) { status = code; },
  };
  const req = { method: request.method, headers, query, body: await bodyForLegacy(request), socket: { remoteAddress: headers['x-forwarded-for']?.split(',')[0]?.trim() || '127.0.0.1' }, url: request.url };
  await handler(req, res);
  if (!finished && payload === null) payload = '';
  return new Response(request.method === 'HEAD' ? null : payload, { status, headers: responseHeaders });
}

async function dispatch(request: Request, context: Context) {
  const { subroute } = await context.params;
  const key = (subroute || []).join('/').replace(/\/+$/, '');
  const webLoader = webLoaders[key];
  if (webLoader) {
    const loaded = await webLoader();
    const handler = loaded[request.method] as ((request: Request) => Promise<Response> | Response) | undefined;
    if (!handler) return Response.json({ error: 'Method not allowed' }, { status: 405 });
    return handler(request);
  }
  const legacyLoader = legacyLoaders[key];
  if (legacyLoader) {
    const loaded = await legacyLoader();
    const handler = (loaded.default || loaded) as LegacyHandler;
    return runLegacy(handler, request);
  }
  return Response.json({ error: 'API route not found' }, { status: 404 });
}

export const GET = dispatch;
export const POST = dispatch;
export const PUT = dispatch;
export const PATCH = dispatch;
export const DELETE = dispatch;
export const OPTIONS = dispatch;
export const HEAD = dispatch;
