import { NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get('clientId');

  if (!clientId) {
    return NextResponse.json({ error: 'Client ID is required' }, { status: 400 });
  }

  const requests = db.getRequestsByClient(clientId);
  
  return NextResponse.json({ requests });
}
