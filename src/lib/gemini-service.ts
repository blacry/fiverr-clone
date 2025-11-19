import { Subtask, db } from "./store";

// Mock Gemini AI Service
export const GeminiService = {
  // Split a large request into smaller subtasks
  async splitRequest(requestId: string, description: string): Promise<Subtask[]> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simple mock logic to generate tasks based on keywords
    const tasks: Subtask[] = [];
    const keywords = description.toLowerCase().split(' ');
    
    if (keywords.includes('video') || keywords.includes('youtube')) {
      tasks.push(
        { id: Math.random().toString(36).substr(2, 9), requestId, description: "Write script and storyboard", status: 'pending', progress: 0 },
        { id: Math.random().toString(36).substr(2, 9), requestId, description: "Video editing and assembly", status: 'pending', progress: 0 },
        { id: Math.random().toString(36).substr(2, 9), requestId, description: "Sound design and mixing", status: 'pending', progress: 0 },
        { id: Math.random().toString(36).substr(2, 9), requestId, description: "Thumbnail design", status: 'pending', progress: 0 }
      );
    } else if (keywords.includes('website') || keywords.includes('app')) {
      tasks.push(
        { id: Math.random().toString(36).substr(2, 9), requestId, description: "UI/UX Design", status: 'pending', progress: 0 },
        { id: Math.random().toString(36).substr(2, 9), requestId, description: "Frontend Development", status: 'pending', progress: 0 },
        { id: Math.random().toString(36).substr(2, 9), requestId, description: "Backend API Setup", status: 'pending', progress: 0 },
        { id: Math.random().toString(36).substr(2, 9), requestId, description: "Testing and Deployment", status: 'pending', progress: 0 }
      );
    } else {
      // Generic tasks
      tasks.push(
        { id: Math.random().toString(36).substr(2, 9), requestId, description: "Research and Planning", status: 'pending', progress: 0 },
        { id: Math.random().toString(36).substr(2, 9), requestId, description: "Execution Phase 1", status: 'pending', progress: 0 },
        { id: Math.random().toString(36).substr(2, 9), requestId, description: "Execution Phase 2", status: 'pending', progress: 0 },
        { id: Math.random().toString(36).substr(2, 9), requestId, description: "Final Review", status: 'pending', progress: 0 }
      );
    }

    return tasks;
  },

  // Assign lifters to tasks based on skills (mock)
  async assignLifters(tasks: Subtask[]): Promise<Subtask[]> {
    const lifters = db.users.filter(u => u.role === 'lifter');
    
    if (lifters.length === 0) return tasks;

    return tasks.map(task => {
      // Randomly assign a lifter
      const randomLifter = lifters[Math.floor(Math.random() * lifters.length)];
      return { ...task, assignedLifterId: randomLifter.id };
    });
  },

  // Calculate and update lifter rank based on completed tasks
  calculateRank(lifterId: string): number {
    const user = db.getUser(lifterId);
    if (!user) return 0;

    // Mock ranking logic: Base rank + (completed tasks * 5)
    // In real app, this would use complex metrics
    const completedTasks = db.getLifterTasks(lifterId).filter(t => t.status === 'completed').length;
    const newRank = Math.min(100, (user.rank || 0) + (completedTasks * 5));
    
    db.updateUser(lifterId, { rank: newRank });
    return newRank;
  },

  // Simulate work progress for end-of-day reports
  simulateWork() {
    db.getAllRequests().forEach(req => {
      req.subtasks.forEach(task => {
        if (task.status === 'in-progress') {
          // Randomly increase progress
          const increment = Math.floor(Math.random() * 20) + 5;
          task.progress = Math.min(100, task.progress + increment);
          
          if (task.progress >= 100) {
            task.status = 'completed';
            if (task.assignedLifterId) {
              this.calculateRank(task.assignedLifterId);
            }
          }
        }
      });
      
      // Check if all subtasks are done
      if (req.subtasks.every(t => t.status === 'completed') && req.subtasks.length > 0) {
        req.status = 'completed';
      }
    });
  }
};
