import { NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id;
  const reqData = db.getRequest(id);

  if (!reqData) {
    return NextResponse.json({ error: 'Request not found' }, { status: 404 });
  }
  
  return NextResponse.json({ request: reqData });
}
