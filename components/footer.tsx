import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                <span className="text-sm font-bold text-primary-foreground">C</span>
              </div>
              <span className="text-lg font-semibold text-foreground">CampusHub</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Your gateway to campus life. Discover events, join clubs, and
              connect with your community.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Platform
            </h4>
            <div className="flex flex-col gap-3">
              <Link
                href="/events"
                className="text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                Events
              </Link>
              <Link
                href="/clubs"
                className="text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                Clubs
              </Link>
              <Link
                href="/me"
                className="text-sm text-foreground/70 transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              About
            </h4>
            <div className="flex flex-col gap-3">
              <span className="text-sm text-foreground/70">Contact</span>
              <span className="text-sm text-foreground/70">Privacy</span>
              <span className="text-sm text-foreground/70">Terms</span>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-border/50 pt-8">
          <p className="text-xs text-muted-foreground">
            {"2026 CampusHub. All rights reserved."}
          </p>
          <p className="text-xs text-muted-foreground">
            Built for students, by students.
          </p>
        </div>
      </div>
    </footer>
  )
}
