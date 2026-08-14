import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const secret = process.env.CRON_SECRET || 'live-cron-secret';

  if (authHeader !== `Bearer ${secret}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  console.log('[CRON] Global hydration triggered at', new Date().toISOString());
  
  return NextResponse.json({
    status: 'ok',
    time: new Date().toISOString(),
    message: 'Cron global hydration executed'
  });
}
