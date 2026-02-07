"use client"

import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { Club } from "@/lib/mock-data"

export function ClubCard({
  club,
  isMember = false,
}: {
  club: Club
  isMember?: boolean
}) {
  return (
    <Link href={`/clubs/${club.id}`} className="group block">
        <article className="relative overflow-hidden rounded-xl border border-border/30 bg-card/50 transition-all duration-300 hover:border-border hover:bg-card">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={club.image || "/placeholder.svg"}
            alt={club.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3">
              <img
                src={club.avatar || "/placeholder.svg"}
                alt={club.name}
                className="h-10 w-10 rounded-full border-2 border-background"
              />
              <div>
                <h3 className="text-lg font-semibold tracking-tight text-foreground">
                  {club.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground/70">
                    {club.memberCount} members
                  </span>
                  {isMember && (
                    <span className="inline-flex items-center rounded-full bg-primary/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      Joined
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-3 right-3">
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider",
                "bg-background/80 text-foreground/80 backdrop-blur-sm"
              )}
            >
              {club.category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {club.description}
          </p>
        </div>
      </article>
    </Link>
  )
}
