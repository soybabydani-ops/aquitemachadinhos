// /api/feeds.js
// Edge-ready API route - serves fresh feeds from Supabase
// Glassmorphism visual ready + affiliate headers

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || 'barretos';

  // Fetch fresh data
  const { data: weather } = await supabase
    .from('climate_data')
    .select('*')
    .eq('tenant_slug', tenant)
    .order('fetched_at', { ascending: false })
    .limit(1);

  const { data: jobs } = await supabase
    .from('jobs')
    .select('*')
    .eq('tenant_slug', tenant)
    .limit(5);

  // Affiliate tracking (CJ/Impact - USD, GBP, EUR)
  const affiliateHeaders = {
    'X-Affiliate-NordVPN': 'nordvpn-cj-usd',
    'X-Affiliate-CyberGhost': 'cyberghost-cj-eur',
    'X-Affiliate-Expedia': 'expedia-impact-gbp'
  };

  const responseData = {
    tenant,
    weather: weather?.[0] || { temperature: 24, condition: 'Updated' },
    jobs: jobs || [],
    updated: new Date().toISOString(),
    affiliates: affiliateHeaders
  };

  // Glassmorphism ready response
  return NextResponse.json(responseData, {
    headers: {
      'Cache-Control': 's-maxage=300, stale-while-revalidate=60',
      ...affiliateHeaders
    }
  });
}