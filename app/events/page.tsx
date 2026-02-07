"use client"

import { useState } from "react"
import { EventCard } from "@/components/event-card"
import { mockEvents, mockUserRsvps } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const filters = ["All", "Upcoming", "Today", "Past"] as const
type Filter = (typeof filters)[number]

export default function EventsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All")

  const filteredEvents = mockEvents.filter((event) => {
    if (activeFilter === "All") return true
    return event.status === activeFilter.toUpperCase()
  })

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Discover
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Events
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            From hackathons to cultural fests, find events that inspire,
            challenge, and connect you.
          </p>
        </div>

        <div className="mt-10 flex items-center gap-2 border-b border-border/50 pb-4">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                activeFilter === filter
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {filter}
            </button>
          ))}
          <div className="ml-auto hidden text-sm text-muted-foreground md:block">
            {filteredEvents.length} {filteredEvents.length === 1 ? "event" : "events"}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event, i) => (
              <div
                key={event.id}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
              >
                <EventCard
                  event={event}
                  rsvpStatus={mockUserRsvps[event.id] ?? null}
                  featured={i === 0 && activeFilter === "All"}
                />
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                <svg
                  className="h-8 w-8 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                No events found
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {"There aren't any"} {activeFilter.toLowerCase()} events right now.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
