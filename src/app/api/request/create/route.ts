import { NextResponse } from 'next/server';
import { db, Request as StoreRequest } from '@/lib/store';
import { GeminiService } from '@/lib/gemini-service';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    const newRequest: StoreRequest = {
      id: Math.random().toString(36).substr(2, 9),
      clientId: data.clientId,
      description: data.description,
      deadline: data.deadline,
      status: 'processing', // Start as processing for AI
      subtasks: [],
      budget: data.budget || 0
    };

    db.addRequest(newRequest);

    // Trigger AI processing (fire and forget or await depending on UX)
    // Here we await to show immediate results
    const subtasks = await GeminiService.splitRequest(newRequest.id, newRequest.description);
    const assignedTasks = await GeminiService.assignLifters(subtasks);
    
    newRequest.subtasks = assignedTasks;
    newRequest.status = 'in-progress';
    
    // Update request in store (since we modified it)
    // In a real DB this would be an update call
    // Since it's by reference in memory, it might be already updated but let's be explicit if we were using a real DB pattern
    
    return NextResponse.json({ success: true, request: newRequest });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create request' }, { status: 500 });
  }
}
