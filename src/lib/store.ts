
export type Role = 'client' | 'lifter';

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone?: string;
  skills?: string[];
  resumeUrl?: string;
  rank?: number; // 1-100
  balance?: number;
  bankDetails?: string;
}

export interface Subtask {
  id: string;
  requestId: string;
  description: string;
  assignedLifterId?: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number; // 0-100
}

export interface Request {
  id: string;
  clientId: string;
  description: string;
  deadline: string;
  status: 'pending' | 'processing' | 'in-progress' | 'completed';
  subtasks: Subtask[];
  budget: number;
}

// Simple in-memory store (reset on server restart)
// In a real app, this would be a database
class Store {
  users: User[] = [];
  requests: Request[] = [];

  addUser(user: User) {
    this.users.push(user);
  }

  getUser(id: string) {
    return this.users.find(u => u.id === id);
  }

  updateUser(id: string, data: Partial<User>) {
    const index = this.users.findIndex(u => u.id === id);
    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...data };
    }
  }

  addRequest(request: Request) {
    this.requests.push(request);
  }

  getRequest(id: string) {
    return this.requests.find(r => r.id === id);
  }

  getRequestsByClient(clientId: string) {
    return this.requests.filter(r => r.clientId === clientId);
  }

  getAllRequests() {
    return this.requests;
  }

  getLifterTasks(lifterId: string) {
    const tasks: Subtask[] = [];
    this.requests.forEach(req => {
      req.subtasks.forEach(task => {
        if (task.assignedLifterId === lifterId) {
          tasks.push(task);
        }
      });
    });
    return tasks;
  }
}

export const db = new Store();
