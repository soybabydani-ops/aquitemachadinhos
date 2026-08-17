import { NextResponse } from 'next/server';
export async function GET(req: Request) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET || 'live-cron-secret-2026'}`) return new NextResponse('Unauthorized', { status: 401 });
  return NextResponse.json({ status: 'ok', time: new Date().toISOString(), message: 'Hourly loop executed' });
}
