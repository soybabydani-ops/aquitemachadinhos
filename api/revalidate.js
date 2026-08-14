// /api/revalidate.js
// On-demand revalidation endpoint for Vercel + Google instant indexing

import { revalidatePath } from 'next/cache';

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const path = searchParams.get('path') || '/';

  if (secret !== process.env.REVALIDATE_SECRET) {
    return new Response('Invalid secret', { status: 401 });
  }

  try {
    await revalidatePath(path);
    return Response.json({ revalidated: true, path, now: new Date().toISOString() });
  } catch (err) {
    return new Response('Error revalidating', { status: 500 });
  }
}