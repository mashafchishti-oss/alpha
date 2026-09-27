import { Quote, Star } from 'lucide-react'
import { siteConfig, type Review } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

function TestimonialCard({ review, featured = false }: { review: Review; featured?: boolean }) {
  return (
    <figure
      className={cn(
        'flex h-full flex-col justify-between gap-8 rounded-xl border p-6 transition-all duration-500 hover:-translate-y-1 sm:p-7',
        featured
          ? 'border-primary/30 bg-primary/[0.06] hover:border-primary/60'
          : 'border-white/10 bg-card hover:border-white/25',
      )}
    >
      <div className="flex flex-col gap-5">
        <Quote aria-hidden="true" className="size-6 text-primary" strokeWidth={1.5} />
        <blockquote
          className={cn(
            'text-pretty leading-relaxed',
            featured ? 'font-display text-2xl font-semibold leading-snug sm:text-3xl' : 'text-lg',
          )}
        >
          {'"'}
          {review.quote}
          {'"'}
        </blockquote>
      </div>
      <figcaption className="flex items-center gap-3 border-t border-white/10 pt-5">
        <span
          aria-hidden="true"
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary font-display text-sm font-bold uppercase"
        >
          {review.name.charAt(0)}
        </span>
        <span className="flex flex-col">
          <span className="font-semibold">{review.name}</span>
          <span className="text-sm text-muted-foreground">Member review</span>
        </span>
      </figcaption>
    </figure>
  )
}

/**
 * Static testimonials for now. To connect a review platform later, fetch
 * reviews in a server component and pass them in as `reviews`.
 */
export function Reviews({ reviews = siteConfig.reviews }: { reviews?: readonly Review[] }) {
  const { rating, count, sourceLabel } = siteConfig.reviewSummary
  const featuredIndexes = new Set([0])

  return (
    <section id="reviews" aria-labelledby="reviews-title">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 py-20 md:py-32">
        <div className="flex flex-col justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-end">
          <SectionHeading id="reviews-title" eyebrow="Reviews" title="Heard on the gym floor" />
          <Reveal className="flex items-center gap-4">
            <div className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5 fill-primary text-primary" />
              ))}
            </div>
            <p className="text-sm">
              <span className="font-semibold">
                {rating} <span aria-hidden="true">★</span>
                <span className="sr-only">out of 5</span> rating · {count} reviews
              </span>
              <br />
              <span className="text-muted-foreground">{sourceLabel}</span>
            </p>
          </Reveal>
        </div>

        <ul
          aria-label="Customer testimonials"
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 sm:scroll-px-8 sm:px-8 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3"
        >
          {reviews.map((review, i) => (
            <Reveal
              as="li"
              key={review.name}
              delay={(i % 3) * 70}
              className={cn(
                'w-[82%] shrink-0 snap-start sm:w-[60%] md:w-auto',
                featuredIndexes.has(i) && 'lg:col-span-2',
              )}
            >
              <TestimonialCard review={review} featured={featuredIndexes.has(i)} />
            </Reveal>
          ))}
        </ul>
        <p className="-mt-8 px-5 text-center text-xs text-muted-foreground sm:px-8 md:hidden" aria-hidden="true">
          Swipe to read more
        </p>
      </div>
    </section>
  )
}
