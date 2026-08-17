// /api/timestamps.js
// Edge route for historical consistency headers (Last-Modified + ETag)

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tenant = searchParams.get('tenant') || 'barretos';
  const path = searchParams.get('path') || '/';

  // Fetch or create timestamp record
  const { data, error } = await supabase
    .from('faculdade_paginas_interativas')
    .select('created_at, last_modified, content_hash')
    .eq('tenant_slug', tenant)
    .eq('page_path', path)
    .single();

  let record = data;
  if (!record) {
    const now = new Date();
    const hash = Buffer.from(`${tenant}${path}${now.toISOString()}`).toString('base64').slice(0, 16);
    
    const { data: newRecord } = await supabase
      .from('faculdade_paginas_interativas')
      .insert({
        tenant_slug: tenant,
        page_path: path,
        content_hash: hash,
        created_at: now,
        last_modified: now
      })
      .select()
      .single();
    record = newRecord;
  }

  const lastModified = new Date(record.last_modified).toUTCString();
  const etag = `"${record.content_hash}"`;

  // Strict headers for Google historical consistency
  return NextResponse.json({
    tenant,
    path,
    created_at: record.created_at,
    last_modified: record.last_modified,
    message: 'Historical consistency headers applied'
  }, {
    headers: {
      'Last-Modified': lastModified,
      'ETag': etag,
      'Cache-Control': 's-maxage=86400, stale-while-revalidate=604800',
      'X-Content-Stability': 'perennial-stable'
    }
  });
}