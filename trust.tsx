import { Star } from 'lucide-react'
import { siteConfig } from '@/lib/site-config'
import { Reveal } from './reveal'

const themes = [
  { label: 'Quality machinery', source: 'Asghar Ali' },
  { label: 'Professional trainers', source: 'Naveed Majeed' },
  { label: 'Friendly coaching', source: 'Gulfam Khan' },
  { label: 'Positive environment', source: 'Asghar Ali' },
  { label: 'Excellent equipment', source: 'Muhammad Furqan' },
  { label: 'Welcoming atmosphere', source: 'Samina Arif' },
]

export function Trust() {
  const { rating, count, sourceLabel } = siteConfig.reviewSummary

  return (
    <section id="trust" aria-labelledby="trust-title" className="border-y border-white/5 bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <Reveal className="flex flex-col gap-6">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            <span aria-hidden="true" className="h-px w-8 bg-primary" />
            What members say
          </p>
          <h2
            id="trust-title"
            className="font-display text-balance text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Built around better training
          </h2>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            The people who train here keep coming back to the same things: good machines, coaches who
            know what they are doing, and a place where everyone feels welcome.
          </p>
          <a
            href="#reviews"
            className="group mt-2 flex w-fit items-center gap-4 rounded-xl border border-white/10 bg-background/60 px-5 py-4 transition-colors hover:border-primary/50"
          >
            <span className="font-display text-5xl font-bold leading-none">{rating}</span>
            <span className="flex flex-col gap-1">
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
              </span>
              <span className="text-sm text-muted-foreground">
                <span className="sr-only">Rated {rating} out of 5 — </span>
                {count} reviews · {sourceLabel}
              </span>
            </span>
          </a>
        </Reveal>

        <ul className="grid gap-px self-center overflow-hidden rounded-xl border border-white/10 bg-white/10 sm:grid-cols-2">
          {themes.map((theme, i) => (
            <Reveal as="li" key={theme.label} delay={i * 60} className="bg-surface">
              <div className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-white/[0.03] sm:p-8">
                <span className="font-display text-sm font-semibold text-primary">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                  {theme.label}
                </p>
                <p className="text-sm text-muted-foreground">Mentioned by {theme.source}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
