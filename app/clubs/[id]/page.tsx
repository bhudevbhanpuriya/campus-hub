"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { EventCard } from "@/components/event-card"
import { ThreadedComments } from "@/components/threaded-comments"
import { AISummaryPanel } from "@/components/ai-summary"
import {
  mockClubs,
  mockEvents,
  mockComments,
  mockAISummary,
  mockUserClubs,
  mockUserRsvps,
} from "@/lib/mock-data"
import { cn } from "@/lib/utils"

type Tab = "events" | "about" | "discussions"

export default function ClubDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const club = mockClubs.find((c) => c.id === id) ?? mockClubs[0]
  const [activeTab, setActiveTab] = useState<Tab>("events")
  const [isMember, setIsMember] = useState(mockUserClubs.includes(club.id))

  const clubEvents = mockEvents.filter((e) => e.club.id === club.id)

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "events", label: "Events", count: clubEvents.length },
    { key: "about", label: "About" },
    { key: "discussions", label: "Discussions" },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image
          src={club.image || "/placeholder.svg"}
          alt={club.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />

        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-16">
          <div className="mx-auto max-w-5xl">
            <Link
              href="/clubs"
              className="mb-6 inline-flex items-center gap-2 text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to Clubs
            </Link>

            <div className="flex items-start gap-5">
              <img
                src={club.avatar || "/placeholder.svg"}
                alt={club.name}
                className="h-16 w-16 rounded-2xl border-2 border-background md:h-20 md:w-20"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-foreground/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-foreground/70 backdrop-blur-sm">
                    {club.category}
                  </span>
                </div>
                <h1 className="mt-2 font-serif text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  {club.name}
                </h1>
                <div className="mt-3 flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {club.memberCount} members
                  </span>
                  <div className="flex -space-x-1.5">
                    {["Alex", "Bella", "Chris", "Dana"].map((name) => (
                      <img
                        key={name}
                        src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${name}`}
                        alt={name}
                        className="h-6 w-6 rounded-full border-2 border-background"
                      />
                    ))}
                    <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-secondary text-[9px] font-medium text-muted-foreground">
                      +{club.memberCount - 4}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsMember(!isMember)}
                className={cn(
                  "flex-shrink-0 rounded-full px-6 py-2.5 text-sm font-semibold transition-all",
                  isMember
                    ? "border border-border bg-secondary text-foreground hover:border-destructive/50 hover:text-destructive"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                {isMember ? "Leave Club" : "Join Club"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border/50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "relative px-4 py-4 text-sm font-medium transition-colors",
                  activeTab === tab.key
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <span className="flex items-center gap-2">
                  {tab.label}
                  {tab.count !== undefined && (
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">
                      {tab.count}
                    </span>
                  )}
                </span>
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mx-auto max-w-5xl px-6 py-12">
        {activeTab === "events" && (
          <div className="space-y-4">
            {clubEvents.length > 0 ? (
              clubEvents.map((event, i) => (
                <div
                  key={event.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
                >
                  <EventCard
                    event={event}
                    rsvpStatus={mockUserRsvps[event.id] ?? null}
                  />
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
                  <svg className="h-8 w-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  No events yet
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  This club hasn{"'"}t organized any events.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "about" && (
          <div className="max-w-2xl space-y-8 animate-fade-in">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                About
              </h2>
              <p className="mt-4 text-base leading-relaxed text-foreground/85">
                {club.description}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Quick Stats
              </h3>
              <div className="mt-4 grid grid-cols-3 gap-6">
                <div>
                  <p className="font-serif text-2xl font-bold text-foreground">
                    {club.memberCount}
                  </p>
                  <p className="text-xs text-muted-foreground">Members</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-foreground">
                    {clubEvents.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Events</p>
                </div>
                <div>
                  <p className="font-serif text-2xl font-bold text-foreground">
                    {club.category}
                  </p>
                  <p className="text-xs text-muted-foreground">Category</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "discussions" && (
          <div className="space-y-8 animate-fade-in">
            <AISummaryPanel summary={mockAISummary} />
            <ThreadedComments
              comments={mockComments}
              title="Club Discussion"
            />
          </div>
        )}
      </div>
    </div>
  )
}
