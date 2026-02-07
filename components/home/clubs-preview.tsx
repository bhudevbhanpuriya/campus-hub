import Link from "next/link"
import { ClubCard } from "@/components/club-card"
import { mockClubs, mockUserClubs } from "@/lib/mock-data"

export function ClubsPreview() {
  const popularClubs = mockClubs.slice(0, 4)

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Find Your People
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Popular Clubs
          </h2>
        </div>
        <Link
          href="/clubs"
          className="hidden items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:flex"
        >
          View all clubs
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

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {popularClubs.map((club, i) => (
          <div
            key={club.id}
            className="animate-slide-up"
            style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
          >
            <ClubCard club={club} isMember={mockUserClubs.includes(club.id)} />
          </div>
        ))}
      </div>

      <div className="mt-8 text-center md:hidden">
        <Link
          href="/clubs"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary"
        >
          View all clubs
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
