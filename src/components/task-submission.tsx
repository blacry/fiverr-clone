"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

export function TaskSubmission({ taskId, onSubmit }: { taskId: string, onSubmit: () => void }) {
  const [open, setOpen] = useState(false)
  const [notes, setNotes] = useState("")

  const handleSubmit = () => {
    // Mock submission
    // In real app: call API to update task status and upload files
    onSubmit()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Submit Work</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Task</DialogTitle>
          <DialogDescription>
            Upload your work and add any necessary notes.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="file" className="text-right">
              File
            </Label>
            <Input id="file" type="file" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="notes" className="text-right">
              Notes
            </Label>
            <Textarea 
              id="notes" 
              value={notes} 
              onChange={e => setNotes(e.target.value)} 
              className="col-span-3" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
