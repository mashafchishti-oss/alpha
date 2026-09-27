import { Dumbbell, HeartHandshake, TrendingUp, UserCheck, type LucideIcon } from 'lucide-react'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Dumbbell,
    title: 'Quality Equipment',
    description: 'Train with equipment designed to support effective workouts, from free weights to machines.',
  },
  {
    icon: UserCheck,
    title: 'Professional Coaching',
    description: 'Get guidance from trainers who understand what good training looks like, and how to teach it.',
  },
  {
    icon: HeartHandshake,
    title: 'Welcoming Environment',
    description: 'A friendly space where beginners and experienced gym-goers can both train comfortably.',
  },
  {
    icon: TrendingUp,
    title: 'Serious About Progress',
    description: 'A space built around consistency, discipline, and getting a little better every session.',
  },
]

function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: (typeof features)[number] & { index: number }) {
  return (
    <article className="group relative flex h-full flex-col gap-10 overflow-hidden rounded-xl border border-white/10 bg-card p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40">
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100"
      />
      <div className="flex items-start justify-between">
        <span className="flex size-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-primary transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
        </span>
        <span aria-hidden="true" className="font-display text-sm font-semibold text-muted-foreground">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-2xl font-bold uppercase tracking-tight">{title}</h3>
        <p className="text-pretty leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </article>
  )
}

export function Features() {
  return (
    <section aria-labelledby="features-title" className="bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          id="features-title"
          eyebrow="Why Alpha Athlete"
          title={
            <>
              Built for people who
              <br className="hidden sm:block" /> take training seriously
            </>
          }
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <Reveal as="li" key={feature.title} delay={i * 80}>
              <FeatureCard {...feature} index={i} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
