"use client"

import { useEffect, useState } from "react"
import { useUser, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Request } from "@/lib/store"

export default function ClientDashboard() {
  const { user } = useUser()
  const [requests, setRequests] = useState<Request[]>([])

  useEffect(() => {
    if (!user) return;

    const fetchRequests = async () => {
      try {
        const res = await fetch(`/api/request/list?clientId=${user.id}`);
        const data = await res.json();
        if (data.requests) {
          setRequests(data.requests);
        }
      } catch (error) {
        console.error("Failed to fetch requests", error);
      }
    };

    fetchRequests();
  }, [user]);

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Client Dashboard</h1>
        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
          <Link href="/client/request/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Request
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.filter(r => r.status !== 'completed').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{requests.filter(r => r.status === 'completed').length}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-6">Recent Requests</h2>
      {requests.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          No requests yet. Create one to get started!
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((req) => (
            <Card key={req.id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-medium">{req.description}</CardTitle>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    req.status === 'completed' ? 'bg-green-100 text-green-800' :
                    req.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {req.status.toUpperCase()}
                  </span>
                  <span className="text-sm font-bold">${req.budget}</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  Deadline: {new Date(req.deadline).toLocaleDateString()}
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium">Subtasks:</div>
                  {req.subtasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between text-sm bg-secondary/50 p-2 rounded">
                      <span>{task.description}</span>
                      <span className="text-xs text-muted-foreground">
                        {task.assignedLifterId ? 'Assigned' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex justify-end">
                  <Link href={`/chat/${req.id}`}>
                    <Button variant="outline" size="sm">
                      View Chat & Progress
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
