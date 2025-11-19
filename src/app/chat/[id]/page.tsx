"use client"

import { useState, useEffect, useRef } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send } from "lucide-react"

interface Message {
  id: string
  sender: string
  content: string
  timestamp: number
  isGemini?: boolean
}

export default function ChatPage({ params }: { params: { id: string } }) {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [requestTitle, setRequestTitle] = useState("Project Chat")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Fetch request details
    const fetchRequest = async () => {
      try {
        const res = await fetch(`/api/request/${params.id}`);
        const data = await res.json();
        if (data.request) {
          setRequestTitle(data.request.description);
        }
      } catch (error) {
        console.error("Failed to fetch request", error);
      }
    };
    fetchRequest();
  }, [params.id]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || !user) return

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: user.fullName || "User",
      content: input,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, newMessage])
    setInput("")

    // Check for Gemini command
    if (input.toLowerCase().includes("@gemini")) {
      // Simulate Gemini thinking
      setTimeout(() => {
        const geminiResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: "Gemini AI",
          content: "I'm analyzing the progress. The video editing task is 60% complete. I've notified the sound engineer to be ready.",
          timestamp: Date.now(),
          isGemini: true
        }
        setMessages(prev => [...prev, geminiResponse])
      }, 1500)
    }
  }

  return (
    <div className="container mx-auto p-4 h-[calc(100vh-4rem)]">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="truncate">{requestTitle}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col overflow-hidden">
          <ScrollArea className="flex-1 pr-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === user?.fullName ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-2 max-w-[80%] ${msg.sender === user?.fullName ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{msg.isGemini ? 'AI' : msg.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`p-3 rounded-lg ${
                        msg.isGemini 
                          ? 'bg-purple-100 dark:bg-purple-900' 
                          : msg.sender === user?.fullName
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                      }`}
                    >
                      <p className="text-xs font-semibold mb-1 opacity-70">{msg.sender}</p>
                      <p>{msg.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="mt-4 flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message... Use @gemini for AI help"
            />
            <Button onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
