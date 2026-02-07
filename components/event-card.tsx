"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Event } from "@/lib/mock-data"

function StatusBadge({
  status,
  rsvpStatus,
}: {
  status: Event["status"]
  rsvpStatus?: "GOING" | "INTERESTED" | "NOT_GOING" | null
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
          status === "TODAY" && "bg-primary/20 text-primary",
          status === "UPCOMING" && "bg-foreground/10 text-foreground/80",
          status === "PAST" && "bg-muted text-muted-foreground"
        )}
      >
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            status === "TODAY" && "bg-primary animate-pulse-glow",
            status === "UPCOMING" && "bg-foreground/60",
            status === "PAST" && "bg-muted-foreground"
          )}
        />
        {status}
      </span>
      {rsvpStatus && rsvpStatus !== "NOT_GOING" && (
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
            rsvpStatus === "GOING" && "bg-[hsl(142,71%,45%)]/15 text-[hsl(142,71%,45%)]",
            rsvpStatus === "INTERESTED" && "bg-primary/15 text-primary"
          )}
        >
          {rsvpStatus}
        </span>
      )}
    </div>
  )
}

export function EventCard({
  event,
  rsvpStatus,
  featured = false,
}: {
  event: Event
  rsvpStatus?: "GOING" | "INTERESTED" | "NOT_GOING" | null
  featured?: boolean
}) {
  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  if (featured) {
    return (
      <Link href={`/events/${event.id}`} className="group block">
        <article className="relative overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:border-border">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            <div className="absolute top-4 left-4">
              <StatusBadge status={event.status} rsvpStatus={rsvpStatus} />
            </div>
          </div>
          <div className="relative p-6">
            <div className="flex items-center gap-3">
              <img
                src={event.club.avatar || "/placeholder.svg"}
                alt={event.club.name}
                className="h-6 w-6 rounded-full"
              />
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {event.club.name}
              </span>
            </div>
            <h3 className="mt-3 font-serif text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary lg:text-3xl">
              {event.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
              {event.description.split("\n")[0]}
            </p>
            <div className="mt-4 flex items-center gap-6 text-xs text-muted-foreground">
              <span>{formattedDate}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span>{event.venue}</span>
              <span className="h-1 w-1 rounded-full bg-muted-foreground" />
              <span>{event.attendeeCount} going</span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/events/${event.id}`} className="group block">
      <article className="flex gap-5 rounded-xl border border-border/30 bg-card/50 p-4 transition-all duration-300 hover:border-border hover:bg-card">
        <div className="relative hidden h-28 w-40 flex-shrink-0 overflow-hidden rounded-lg sm:block">
          <Image
            src={event.image || "/placeholder.svg"}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <img
                  src={event.club.avatar || "/placeholder.svg"}
                  alt={event.club.name}
                  className="h-5 w-5 rounded-full"
                />
                <span className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                  {event.club.name}
                </span>
              </div>
              <StatusBadge status={event.status} rsvpStatus={rsvpStatus} />
            </div>
            <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
              {event.title}
            </h3>
          </div>
          <div className="mt-2 flex items-center gap-4 text-xs text-muted-foreground">
            <span>{formattedDate}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground" />
            <span className="truncate">{event.venue}</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground" />
            <span className="whitespace-nowrap">{event.attendeeCount} going</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
