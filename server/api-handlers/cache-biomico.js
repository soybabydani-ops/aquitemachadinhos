import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || 'barretos';

  // Extreme compaction: minimal JSON
  const compact = {
    t: tenant,
    d: Date.now(),
    v: [1,2,3] // compacted vacancies/utilities
  };

  const body = JSON.stringify(compact);

  return new NextResponse(body, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=2592000',
      'Content-Encoding': 'br'
    }
  });
}
