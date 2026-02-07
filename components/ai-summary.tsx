"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import type { AISummary } from "@/lib/mock-data"

export function AISummaryPanel({ summary }: { summary: AISummary }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <section className="rounded-xl border border-border bg-card p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary">
            <svg
              className="h-4 w-4 text-foreground"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground">
              AI Summary
            </h3>
            <p className="text-[11px] text-muted-foreground">
              Auto-generated from discussion
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider",
              summary.sentiment === "positive" &&
                "bg-[hsl(142,71%,45%)]/10 text-[hsl(142,71%,45%)]",
              summary.sentiment === "neutral" &&
                "bg-secondary text-muted-foreground",
              summary.sentiment === "mixed" && "bg-primary/10 text-primary"
            )}
          >
            {summary.sentiment}
          </span>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
          >
            <svg
              className={cn(
                "h-4 w-4 transition-transform",
                !expanded && "-rotate-90"
              )}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {expanded && (
        <div className="mt-5 space-y-5">
          <p className="text-sm leading-relaxed text-foreground/85">
            {summary.summary}
          </p>

          <div className="flex flex-wrap gap-2">
            {summary.topTopics.map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Key Takeaways
            </h4>
            <ul className="space-y-2">
              {summary.keyInsights.map((insight) => (
                <li
                  key={insight}
                  className="flex items-start gap-2.5 text-sm text-foreground/80"
                >
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          <p className="border-t border-border/50 pt-4 text-[11px] text-muted-foreground">
            Auto-generated summary. Read the full thread for complete context.
          </p>
        </div>
      )}
    </section>
  )
}
