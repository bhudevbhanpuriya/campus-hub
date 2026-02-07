import Link from "next/link"
import Image from "next/image"
import { mockEvents } from "@/lib/mock-data"

export function EventsPreview() {
  const upcomingEvents = mockEvents
    .filter((e) => e.status !== "PAST")
    .slice(0, 3)

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Upcoming
          </p>
          <h2 className="mt-2 font-serif text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            Events
          </h2>
        </div>
        <Link
          href="/events"
          className="hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:flex"
        >
          {"View All"}
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>

      <div className="mt-12 divide-y divide-border/50">
        {upcomingEvents.map((event, i) => {
          const dateObj = new Date(event.date)
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })

          return (
            <Link
              key={event.id}
              href={`/events/${event.id}`}
              className="group flex items-center gap-6 py-8 transition-colors first:pt-0 last:pb-0"
            >
              {/* Thumbnail */}
              <div className="relative hidden h-24 w-36 shrink-0 overflow-hidden rounded-lg sm:block">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Info */}
              <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-muted-foreground">{"--"}</span>
                  <span className="text-xs text-muted-foreground">
                    {event.club.name}
                  </span>
                  <span
                    className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                      event.status === "TODAY"
                        ? "border-primary/40 bg-primary/10 text-primary"
                        : "border-border bg-secondary text-muted-foreground"
                    }`}
                  >
                    {event.status === "TODAY" ? "Today" : "Upcoming"}
                  </span>
                </div>

                <h3 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors md:text-xl">
                  {event.title}
                </h3>

                <p className="text-xs font-medium uppercase tracking-wider text-primary/80">
                  {event.club.name === "CodeCraft"
                    ? "HACKATHON"
                    : event.club.name === "Stage Ensemble"
                      ? "PERFORMANCE"
                      : "EXHIBITION"}
                </p>
              </div>

              {/* Date & Location */}
              <div className="hidden shrink-0 text-right md:block">
                <p className="text-sm font-medium text-foreground">
                  {formattedDate}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {event.venue}
                </p>
              </div>

              {/* Arrow */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-hover:border-foreground/30">
                <svg
                  className="h-4 w-4 -rotate-45 text-muted-foreground transition-colors group-hover:text-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </div>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link
          href="/events"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary"
        >
          {"View All"}
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </section>
  )
}
