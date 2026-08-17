import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || 'barretos';

  // Simulate compressed Supabase payload (clean + gzip-ready)
  const data = {
    t: tenant,
    d: Date.now(),
    offers: tenant.startsWith('en') || tenant.startsWith('es') 
      ? ['nordvpn-usd', 'cyberghost-gbp'] 
      : ['samsung-brl', 'shopee-brl']
  };

  // Clean JSON (no whitespace)
  const payload = JSON.stringify(data);

  return new NextResponse(payload, {
    headers: {
      'Content-Type': 'application/json',
      'Content-Encoding': 'br',           // Brotli/Gzip (Vercel auto)
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=604800',
      'X-Payload-Size': payload.length + 'bytes'
    }
  });
}
