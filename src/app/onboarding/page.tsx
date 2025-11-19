"use client"

import { useState, useEffect } from "react"
import { useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OnboardingPage() {
  const { user } = useUser()
  const router = useRouter()
  const [role, setRole] = useState<"client" | "lifter" | null>(null)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(true)
  
  // Lifter details
  const [phone, setPhone] = useState("")
  const [skills, setSkills] = useState("")
  const [resume, setResume] = useState<File | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      if (!user) return;
      try {
        const res = await fetch('/api/user/me');
        const data = await res.json();
        if (data.user) {
          // User already exists, redirect to dashboard
          if (data.user.role === 'client') router.push('/client/dashboard');
          else router.push('/lifter/dashboard');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to check user", error);
        setLoading(false);
      }
    };
    checkUser();
  }, [user, router]);

  const handleSubmit = async () => {
    if (!user || !role) return

    // In a real app, we would upload the file and send data to backend
    // Here we'll just simulate it by calling an API route we'll create
    
    const userData = {
      id: user.id,
      email: user.primaryEmailAddress?.emailAddress,
      name: user.fullName,
      role,
      phone: role === 'lifter' ? phone : undefined,
      skills: role === 'lifter' ? skills.split(',').map(s => s.trim()) : undefined,
      // resumeUrl: ... (mocked)
    }

    try {
      const res = await fetch('/api/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      
      if (res.ok) {
        if (role === 'client') router.push('/client/dashboard')
        else router.push('/lifter/dashboard')
      }
    } catch (error) {
      console.error("Failed to create user", error)
    }
  }

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen p-4 relative z-10">
      <Card className="w-full max-w-lg bg-black/40 backdrop-blur-xl border-white/10 shadow-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Welcome, {user.firstName}!
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            Let's customize your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-2 text-center">
                <Label className="text-base">I want to...</Label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant={role === 'client' ? 'default' : 'outline'} 
                  className={`h-32 text-lg flex flex-col gap-3 transition-all ${role === 'client' ? 'ring-2 ring-primary ring-offset-2 ring-offset-black' : 'hover:bg-white/5'}`}
                  onClick={() => setRole('client')}
                >
                  <span className="text-4xl">🤝</span>
                  Hire Talent
                </Button>
                <Button 
                  variant={role === 'lifter' ? 'default' : 'outline'} 
                  className={`h-32 text-lg flex flex-col gap-3 transition-all ${role === 'lifter' ? 'ring-2 ring-primary ring-offset-2 ring-offset-black' : 'hover:bg-white/5'}`}
                  onClick={() => setRole('lifter')}
                >
                  <span className="text-4xl">🚀</span>
                  Work as Lifter
                </Button>
              </div>
              <Button 
                className="w-full h-12 text-lg mt-4" 
                disabled={!role}
                onClick={() => role === 'lifter' ? setStep(2) : handleSubmit()}
              >
                {role === 'lifter' ? 'Next Step' : 'Get Started'}
              </Button>
            </div>
          )}

          {step === 2 && role === 'lifter' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={phone} 
                  onChange={e => setPhone(e.target.value)} 
                  placeholder="+1 234 567 890" 
                  className="bg-white/5 border-white/10 focus:border-primary/50"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Textarea 
                  id="skills" 
                  value={skills} 
                  onChange={e => setSkills(e.target.value)} 
                  placeholder="Video Editing, Python, React..." 
                  className="bg-white/5 border-white/10 focus:border-primary/50 min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="resume">Resume (PDF)</Label>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="resume" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-white/20 hover:bg-white/5 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF (MAX. 5MB)</p>
                    </div>
                    <Input id="resume" type="file" accept=".pdf" className="hidden" onChange={e => setResume(e.target.files?.[0] || null)} />
                  </label>
                </div>
                {resume && <p className="text-sm text-primary mt-2">Selected: {resume.name}</p>}
              </div>
              <div className="flex gap-4 pt-4">
                <Button variant="outline" className="flex-1 h-11" onClick={() => setStep(1)}>Back</Button>
                <Button className="flex-1 h-11" onClick={handleSubmit}>Complete Profile</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
