"use client"

import { useState } from "react"
import { ClubCard } from "@/components/club-card"
import { mockClubs, mockUserClubs } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const categories = ["All", "Technology", "Arts", "Engineering", "Business", "Environment"] as const
type Category = (typeof categories)[number]

export default function ClubsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All")

  const filteredClubs = mockClubs.filter((club) => {
    if (activeCategory === "All") return true
    return club.category === activeCategory
  })

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
            Community
          </p>
          <h1 className="mt-3 font-serif text-4xl font-bold tracking-tight text-foreground md:text-6xl">
            Clubs
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Find your tribe. From coding to theater, there{"'"}s a club for
            every passion on campus.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2 border-b border-border/50 pb-4">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
          <div className="ml-auto hidden text-sm text-muted-foreground md:block">
            {filteredClubs.length} {filteredClubs.length === 1 ? "club" : "clubs"}
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredClubs.length > 0 ? (
            filteredClubs.map((club, i) => (
              <div
                key={club.id}
                className="animate-slide-up"
                style={{ animationDelay: `${i * 100}ms`, opacity: 0 }}
              >
                <ClubCard
                  club={club}
                  isMember={mockUserClubs.includes(club.id)}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-24 text-center">
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
                    d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                  />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                No clubs found
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                No clubs match the selected category.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
