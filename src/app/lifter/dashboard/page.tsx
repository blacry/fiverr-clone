"use client"

import { useEffect, useState } from "react"
import { useUser, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, DollarSign, ListTodo } from "lucide-react"
import Link from "next/link"
import { Subtask } from "@/lib/store"

export default function LifterDashboard() {
  const { user } = useUser()
  const [tasks, setTasks] = useState<Subtask[]>([])
  const [rank, setRank] = useState(0)
  const [earnings, setEarnings] = useState(0)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Lifter Dashboard</h1>
        <div className="flex items-center gap-4">
          <UserButton afterSignOutUrl="/" />
          <Link href="/lifter/settings">
            <Button variant="outline">Settings & Withdrawal</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Rank</CardTitle>
            <Trophy className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">#{rank}</div>
            <p className="text-xs text-muted-foreground">Top 10% of lifters</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${earnings}</div>
            <p className="text-xs text-muted-foreground">Available for withdrawal</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <ListTodo className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-xl font-semibold mt-6">Assigned Tasks</h2>
      {tasks.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          No tasks assigned yet. Gemini is looking for matches...
        </div>
      ) : (
        <div className="grid gap-4">
          {/* Task list */}
        </div>
      )}
    </div>
  )
}
