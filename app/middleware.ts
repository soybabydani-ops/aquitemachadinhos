import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Middleware Next.js para redirecionamentos 301 e Canonical
// Aplica para todos os tenants editoriais (64 cidades)

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const host = request.headers.get('host') || 'www.aquitemachadinhos.com.br';

  // 1. Redirecionamento permanente HTTP → HTTPS
  if (request.headers.get('x-forwarded-proto') === 'http') {
    const httpsUrl = `https://${host}${pathname}${search}`;
    return NextResponse.redirect(httpsUrl, 301);
  }

  // 2. Redirecionamento de variações .html para URL limpa
  if (pathname.endsWith('.html')) {
    const cleanPath = pathname.replace(/\.html$/, '');
    const cleanUrl = `https://${host}${cleanPath}${search}`;
    return NextResponse.redirect(cleanUrl, 301);
  }

  // 3. Redirecionamento de www para não-www (ou vice-versa conforme preferência)
  if (host.startsWith('www.')) {
    const nonWwwHost = host.replace('www.', '');
    const cleanUrl = `https://${nonWwwHost}${pathname}${search}`;
    return NextResponse.redirect(cleanUrl, 301);
  }

  // 4. Canonical header (o Next.js adiciona automaticamente via metadata, mas reforçamos aqui)
  const response = NextResponse.next();

  // Adiciona header canonical explícito
  const canonicalUrl = `https://${host}${pathname}`;
  response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};