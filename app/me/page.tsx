"use client"

import { EventCard } from "@/components/event-card"
import { ClubCard } from "@/components/club-card"
import {
  mockEvents,
  mockClubs,
  mockUserRsvps,
  mockUserClubs,
} from "@/lib/mock-data"

export default function DashboardPage() {
  const myClubs = mockClubs.filter((c) => mockUserClubs.includes(c.id))
  const myEvents = mockEvents.filter((e) => mockUserRsvps[e.id])

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-4">
          <img
            src="https://api.dicebear.com/9.x/avataaars/svg?seed=User"
            alt="Your avatar"
            className="h-14 w-14 rounded-full border border-border"
          />
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Your Dashboard
            </h1>
            <p className="text-sm text-muted-foreground">
              Events, clubs, and activity at a glance.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              My Events
            </p>
            <p className="mt-2 font-serif text-3xl font-bold text-foreground">
              {myEvents.length}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              My Clubs
            </p>
            <p className="mt-2 font-serif text-3xl font-bold text-foreground">
              {myClubs.length}
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Going To
            </p>
            <p className="mt-2 font-serif text-3xl font-bold text-foreground">
              {
                Object.values(mockUserRsvps).filter((s) => s === "GOING")
                  .length
              }
            </p>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Your Events
          </h2>
          <div className="mt-6 space-y-4">
            {myEvents.length > 0 ? (
              myEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  rsvpStatus={mockUserRsvps[event.id] ?? null}
                />
              ))
            ) : (
              <p className="py-12 text-center text-sm text-muted-foreground">
                {"You haven't RSVP'd to any events yet."}
              </p>
            )}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Your Clubs
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {myClubs.length > 0 ? (
              myClubs.map((club) => (
                <ClubCard key={club.id} club={club} isMember />
              ))
            ) : (
              <p className="col-span-full py-12 text-center text-sm text-muted-foreground">
                {"You haven't joined any clubs yet."}
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
