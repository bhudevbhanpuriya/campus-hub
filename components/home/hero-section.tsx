import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Campus at night"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-16 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
          Your Campus. Your Community.
        </p>

        <h1 className="mt-6 font-serif text-5xl font-bold leading-[1.1] tracking-tight text-foreground md:text-7xl lg:text-8xl">
          <span className="text-balance">
            Where Every
            <br />
            <span className="text-primary">Moment</span> Matters
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
          Discover events, join clubs, and connect with your campus community.
          One platform for everything that makes campus life unforgettable.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/events"
            className="group flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explore Events
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href="/clubs"
            className="rounded-full border border-border px-8 py-3.5 text-sm font-semibold tracking-wide text-foreground transition-all hover:border-foreground/30 hover:bg-secondary"
          >
            Browse Clubs
          </Link>
        </div>

        <div className="mt-20 flex items-center justify-center gap-12 text-center">
          <div>
            <p className="font-serif text-3xl font-bold text-foreground md:text-4xl">50+</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Active Clubs</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="font-serif text-3xl font-bold text-foreground md:text-4xl">200+</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Events / Year</p>
          </div>
          <div className="h-8 w-px bg-border" />
          <div>
            <p className="font-serif text-3xl font-bold text-foreground md:text-4xl">5K+</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">Students</p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Scroll to explore
          </span>
          <div className="h-8 w-px animate-pulse bg-muted-foreground/40" />
        </div>
      </div>
    </section>
  )
}
