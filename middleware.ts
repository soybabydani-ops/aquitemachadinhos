import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const country = request.geo?.country || 'BR';
  const userAgent = request.headers.get('user-agent') || '';

  // 1. Security: Block malicious scanners
  const badAgents = ['sqlmap', 'nikto', 'nmap', 'masscan', 'zgrab', 'curl/7'];
  if (badAgents.some(agent => userAgent.toLowerCase().includes(agent))) {
    return new NextResponse('Access Denied', { status: 403 });
  }

  // 2. 301 HTTPS + clean .html
  if (request.headers.get('x-forwarded-proto') === 'http') {
    const httpsUrl = `https://${request.headers.get('host')}${pathname}`;
    return NextResponse.redirect(httpsUrl, 301);
  }
  if (pathname.endsWith('.html')) {
    return NextResponse.redirect(pathname.replace(/\.html$/, ''), 301);
  }

  // 3. Geo targeting (Glassmorphism dynamic offers)
  let variant = 'brl';
  if (['US', 'CA', 'GB', 'DE', 'FR', 'ES'].includes(country)) {
    variant = 'usd-gbp-eur';
  }

  const response = NextResponse.next();
  response.headers.set('X-Geo-Country', country);
  response.headers.set('X-Offer-Variant', variant);

  // 4. Hreflang + Canonical
  const base = 'https://www.aquitemachadinhos.com.br';
  response.headers.set('Link', 
    `<${base}${pathname}>; rel="alternate"; hreflang="pt-br", ` +
    `<${base}/en${pathname}>; rel="alternate"; hreflang="en", ` +
    `<${base}/es${pathname}>; rel="alternate"; hreflang="es"`
  );

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
