"use client"

import { use } from "react"
import Image from "next/image"
import Link from "next/link"
import { RSVPButtonGroup } from "@/components/rsvp-button-group"
import { ThreadedComments } from "@/components/threaded-comments"
import { AISummaryPanel } from "@/components/ai-summary"
import {
  mockEvents,
  mockComments,
  mockAISummary,
  mockUserRsvps,
} from "@/lib/mock-data"

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const event = mockEvents.find((e) => e.id === id) ?? mockEvents[0]
  const rsvpStatus = mockUserRsvps[event.id] ?? null

  const formattedDate = new Date(event.date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="min-h-screen">
      {/* Editorial Hero */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/events"
              className="mb-6 inline-flex items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Events
            </Link>

            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                {event.status}
              </span>
              <span className="text-sm text-foreground/60">{formattedDate}</span>
            </div>

            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {event.title}
            </h1>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={event.club.avatar || "/placeholder.svg"}
                  alt={event.club.name}
                  className="h-8 w-8 rounded-full"
                />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {event.club.name}
                  </p>
                  <p className="text-xs text-muted-foreground">Organizer</p>
                </div>
              </div>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                  {event.attendeeCount} going
                </span>
                <span className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  {event.interestedCount} interested
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* Main Content */}
          <div className="space-y-12">
            {/* Description */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                About This Event
              </h2>
              <div className="mt-4 space-y-4">
                {event.description.split("\n\n").map((paragraph, i) => (
                  <p
                    key={`p-${i}`}
                    className="text-base leading-relaxed text-foreground/85"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* AI Summary - Standing Out */}
            <AISummaryPanel summary={mockAISummary} />

            {/* Threaded Comments - Standing Out */}
            <ThreadedComments
              comments={mockComments}
              title="Discussion"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* RSVP Card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-sm font-semibold text-foreground">
                {"Are you going?"}
              </h3>
              <div className="mt-4">
                <RSVPButtonGroup
                  initialStatus={rsvpStatus}
                  eventId={event.id}
                />
              </div>
            </div>

            {/* Event Details Card */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Details
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {formattedDate}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {event.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {event.venue}
                    </p>
                    <p className="text-xs text-muted-foreground">Venue</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {event.attendeeCount + event.interestedCount} RSVPs
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {event.attendeeCount} going, {event.interestedCount}{" "}
                      interested
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organized By */}
            <Link
              href={`/clubs/${event.club.id}`}
              className="block rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/20"
            >
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Organized By
              </h3>
              <div className="flex items-center gap-3">
                <img
                  src={event.club.avatar || "/placeholder.svg"}
                  alt={event.club.name}
                  className="h-12 w-12 rounded-full"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {event.club.name}
                  </p>
                  <p className="text-xs text-primary">View Club</p>
                </div>
              </div>
            </Link>

            {/* Attendee Avatars */}
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Attendees
              </h3>
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {["Arjun", "Priya", "Rohan", "Maya", "Kabir"].map(
                    (name) => (
                      <img
                        key={name}
                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${name}`}
                        alt={name}
                        className="h-8 w-8 rounded-full border-2 border-card"
                      />
                    )
                  )}
                </div>
                <span className="ml-3 text-xs text-muted-foreground">
                  +{event.attendeeCount - 5} more
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
