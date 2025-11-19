"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function NewRequestPage() {
  const { user } = useUser()
  const router = useRouter()
  const [description, setDescription] = useState("")
  const [budget, setBudget] = useState("")
  const [date, setDate] = useState<Date>()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!user || !description || !date) return
    setLoading(true)

    try {
      const res = await fetch('/api/request/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientId: user.id,
          description,
          deadline: date.toISOString(),
          budget: Number(budget)
        })
      })
      
      if (res.ok) {
        router.push('/client/dashboard')
      }
    } catch (error) {
      console.error("Failed to create request", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>New Work Request</CardTitle>
          <CardDescription>Tell Gemini what you need done.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="desc">What do you need?</Label>
            <Textarea 
              id="desc" 
              placeholder="E.g. I need a 5-minute promotional video for my new app..." 
              className="h-32"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="budget">Budget ($)</Label>
            <Input 
              id="budget" 
              type="number" 
              placeholder="500"
              value={budget}
              onChange={e => setBudget(e.target.value)}
            />
          </div>

          <div className="space-y-2 flex flex-col">
            <Label>Deadline</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button className="w-full" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Gemini is analyzing...
              </>
            ) : (
              "Submit Request"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
