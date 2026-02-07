"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type RsvpStatus = "GOING" | "INTERESTED" | "NOT_GOING" | null

export function RSVPButtonGroup({
  initialStatus = null,
  eventId,
}: {
  initialStatus?: RsvpStatus
  eventId: string
}) {
  const [status, setStatus] = useState<RsvpStatus>(initialStatus)
  const [isLoading, setIsLoading] = useState(false)

  const handleRSVP = async (newStatus: RsvpStatus) => {
    setIsLoading(true)
    const nextStatus = status === newStatus ? null : newStatus
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))
    setStatus(nextStatus)
    setIsLoading(false)
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => handleRSVP("GOING")}
        disabled={isLoading}
        className={cn(
          "relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300",
          status === "GOING"
            ? "bg-[hsl(142,71%,45%)] text-[hsl(0,0%,4%)]"
            : "border border-border bg-secondary text-foreground/80 hover:border-foreground/20 hover:text-foreground"
        )}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Going
      </button>

      <button
        type="button"
        onClick={() => handleRSVP("INTERESTED")}
        disabled={isLoading}
        className={cn(
          "relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300",
          status === "INTERESTED"
            ? "bg-primary text-primary-foreground"
            : "border border-border bg-secondary text-foreground/80 hover:border-foreground/20 hover:text-foreground"
        )}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
          />
        </svg>
        Interested
      </button>

      <button
        type="button"
        onClick={() => handleRSVP("NOT_GOING")}
        disabled={isLoading}
        className={cn(
          "relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-300",
          status === "NOT_GOING"
            ? "bg-muted-foreground/20 text-muted-foreground"
            : "border border-border bg-secondary text-foreground/80 hover:border-muted-foreground/50 hover:text-foreground"
        )}
      >
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Not Going
      </button>
    </div>
  )
}
