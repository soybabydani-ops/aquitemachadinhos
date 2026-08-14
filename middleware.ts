import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const country = request.geo?.country || 'BR';
  const userAgent = request.headers.get('user-agent') || '';
  const host = request.headers.get('host') || '';

  // 1. Security: Block malicious scanners
  const badAgents = ['sqlmap', 'nikto', 'nmap', 'masscan', 'zgrab', 'curl/7'];
  if (badAgents.some(agent => userAgent.toLowerCase().includes(agent))) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // 2. BLINDAGEM DE REDIRECIONAMENTOS 301 (strict + authority protection)
  // HTTP → HTTPS (permanent)
  if (request.headers.get('x-forwarded-proto') === 'http') {
    const httpsUrl = `https://${host}${pathname}${search || ''}`;
    return NextResponse.redirect(httpsUrl, 301);
  }

  // Remove .html + fragment params that fragment authority
  let cleanPath = pathname;
  if (cleanPath.endsWith('.html')) {
    cleanPath = cleanPath.replace(/\.html$/, '');
  }

  // Strip tracking / temporary query params that fragment authority
  const urlObj = new URL(request.url);
  const badParamPrefixes = ['utm', 'ref', 'fbclid', 'gclid', 'mc_', 'source', 'campaign', 'yclid'];
  let paramsRemoved = false;

  Array.from(urlObj.searchParams.keys()).forEach(key => {
    if (badParamPrefixes.some(p => key.toLowerCase().startsWith(p))) {
      urlObj.searchParams.delete(key);
      paramsRemoved = true;
    }
  });

  if (pathname !== cleanPath || paramsRemoved) {
    const finalUrl = `${urlObj.origin}${cleanPath}${urlObj.search}`;
    return NextResponse.redirect(finalUrl, 301);
  }

  // 3. Geo targeting (Glassmorphism dynamic offers)
  let variant = 'brl';
  if (['US', 'CA', 'GB', 'DE', 'FR', 'ES'].includes(country)) {
    variant = 'usd-gbp-eur';
  }

  const response = NextResponse.next();
  response.headers.set('X-Geo-Country', country);
  response.headers.set('X-Offer-Variant', variant);

  // 4. BLINDAGEM HREFLANG + CANONICAL (cross-folder /en /es)
  const base = 'https://www.aquitemachadinhos.com.br';
  const cleanPathname = cleanPath || pathname;

  const hreflangs = [
    `<${base}${cleanPathname}>; rel="alternate"; hreflang="pt-br"`,
    `<${base}/en${cleanPathname}>; rel="alternate"; hreflang="en"`,
    `<${base}/es${cleanPathname}>; rel="alternate"; hreflang="es"`,
    `<${base}${cleanPathname}>; rel="canonical"`
  ].join(', ');

  response.headers.set('Link', hreflangs);
  response.headers.set('X-Robots-Tag', 'index, follow');

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};