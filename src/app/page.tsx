import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Zap, Users } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { ModeToggle } from "@/components/mode-toggle";

export default async function Home() {
  const { userId } = await auth();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-white/10 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center" href="#">
          <div className="bg-primary/20 p-2 rounded-lg mr-2">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            KaamSetu
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          {userId ? (
            <Link
              className="text-sm font-medium hover:text-primary transition-colors"
              href="/onboarding"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                className="text-sm font-medium hover:text-primary transition-colors"
                href="/sign-in"
              >
                Sign In
              </Link>
              <Link
                className="text-sm font-medium hover:text-primary transition-colors"
                href="/sign-up"
              >
                Join Now
              </Link>
            </>
          )}
          <ModeToggle />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-48 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-4">
                  <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
                  AI-Powered Workflow Engine
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
                  Your Bridge to <br />
                  <span className="text-primary glow-text">Smart Work</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl leading-relaxed">
                  KaamSetu connects clients with top-tier "Lifters" using Gemini AI.
                  Post a request, get it split into tasks, and watch the magic happen.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 min-w-[200px]">
                {userId ? (
                  <Link href="/onboarding">
                    <Button className="h-12 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_-5px_var(--primary)] transition-all hover:scale-105">
                      Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/sign-up">
                      <Button className="h-12 px-8 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_-5px_var(--primary)] transition-all hover:scale-105">
                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/sign-in">
                      <Button
                        variant="outline"
                        className="h-12 px-8 text-lg border-white/10 hover:bg-white/5 hover:text-white transition-all"
                      >
                        Log In
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-20 md:py-32 bg-black/20 backdrop-blur-sm border-t border-white/5">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:border-primary/50 hover:bg-primary/5">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-white/5 rounded-2xl ring-1 ring-white/10 group-hover:ring-primary/50 transition-all">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <h2 className="text-xl font-bold text-white">AI-Powered Workflow</h2>
                  <p className="text-gray-400">
                    Gemini analyzes your request and breaks it down into manageable
                    subtasks automatically.
                  </p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:border-blue-500/50 hover:bg-blue-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-white/5 rounded-2xl ring-1 ring-white/10 group-hover:ring-blue-500/50 transition-all">
                    <Users className="h-8 w-8 text-blue-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Expert Lifters</h2>
                  <p className="text-gray-400">
                    Our ranked "Lifters" are assigned based on skills and performance
                    history.
                  </p>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 transition-all hover:border-green-500/50 hover:bg-green-500/5">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-white/5 rounded-2xl ring-1 ring-white/10 group-hover:ring-green-500/50 transition-all">
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">Guaranteed Results</h2>
                  <p className="text-gray-400">
                    Track progress in real-time and pay only when you're satisfied.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-8 w-full shrink-0 items-center px-4 md:px-6 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <p className="text-xs text-gray-500">© 2024 KaamSetu. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs text-gray-500 hover:text-primary transition-colors" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs text-gray-500 hover:text-primary transition-colors" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
