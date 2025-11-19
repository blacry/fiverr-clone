import { NextResponse } from 'next/server';
import { db, User } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const newUser: User = {
      ...data,
      rank: data.role === 'lifter' ? 0 : undefined,
      balance: 0,
      resumeUrl: data.role === 'lifter' ? 'mock-resume.pdf' : undefined
    };

    db.addUser(newUser);
    
    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create user' }, { status: 500 });
  }
}
