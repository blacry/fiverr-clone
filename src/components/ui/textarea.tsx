import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-primary/20 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-background border-input dark:bg-white/5 dark:border-white/10 flex field-sizing-content min-h-16 w-full rounded-md border px-3 py-2 text-base shadow-xs transition-all outline-none focus-visible:ring-[3px] focus-visible:shadow-[0_0_10px_-2px_var(--primary)] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
