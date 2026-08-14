import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Geo-aware middleware + 301 HTTPS + hreflang injection
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const country = request.geo?.country || 'BR';
  const isHttps = request.headers.get('x-forwarded-proto') === 'https';

  // Force 301 HTTPS
  if (!isHttps && !pathname.startsWith('/_next')) {
    const httpsUrl = `https://${request.headers.get('host')}${pathname}`;
    return NextResponse.redirect(httpsUrl, 301);
  }

  // Geo targeting
  let variant = 'local-brl';
  if (['US', 'CA', 'GB', 'DE', 'FR'].includes(country)) {
    variant = 'international-usd';
  }

  const response = NextResponse.next();

  // Inject hreflang tags (clean, no .html duplicates)
  const base = 'https://www.aquitemachadinhos.com.br';
  response.headers.set('Link', 
    `<${base}${pathname}>; rel="alternate"; hreflang="pt-br", ` +
    `<${base}/en${pathname}>; rel="alternate"; hreflang="en", ` +
    `<${base}/es${pathname}>; rel="alternate"; hreflang="es"`
  );

  // Pass geo to pages
  response.headers.set('X-Geo-Country', country);
  response.headers.set('X-Content-Variant', variant);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};