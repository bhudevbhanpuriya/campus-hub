export function AIFeaturesSection() {
  return (
    <section className="border-t border-border/50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            Built-in Intelligence
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            AI that works quietly
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Discussion summaries, semantic search, and smart recommendations
            -- all running in the background so you can focus on what matters.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border/50 bg-border/50 md:grid-cols-3">
          <div className="bg-card p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              01
            </p>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Discussion Summaries
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Long threads distilled into key points. Catch up on any
              conversation in seconds without scrolling through hundreds of
              replies.
            </p>
          </div>

          <div className="bg-card p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              02
            </p>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Semantic Search
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Search by meaning, not keywords. Ask for "something creative this
              weekend" and find exactly what you are looking for.
            </p>
          </div>

          <div className="bg-card p-8">
            <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              03
            </p>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Smart Recommendations
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Events surfaced based on your clubs, interests, and past
              attendance. No setup required -- it learns as you go.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
