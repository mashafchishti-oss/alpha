import { Quote } from 'lucide-react'
import Image from 'next/image'
import { siteConfig, type Trainer } from '@/lib/site-config'
import { ButtonLink } from './button-link'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
}

function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-card transition-colors duration-500 hover:border-primary/40">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-secondary to-background">
        {trainer.photo ? (
          <Image
            src={trainer.photo}
            alt={`Portrait of ${trainer.name}`}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div aria-hidden="true" className="flex h-full items-center justify-center">
            <span className="font-display text-8xl font-extrabold uppercase tracking-tight text-white/10 transition-colors duration-500 group-hover:text-primary/30">
              {initials(trainer.name)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6 sm:p-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{trainer.role}</p>
          <h3 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight">{trainer.name}</h3>
        </div>
        {trainer.bio && <p className="leading-relaxed text-muted-foreground">{trainer.bio}</p>}
        {trainer.memberMention && (
          <figure className="mt-auto flex gap-3 border-t border-white/10 pt-4">
            <Quote aria-hidden="true" className="size-4 shrink-0 text-primary" />
            <div>
              <blockquote className="italic text-foreground/85">
                {'"'}
                {trainer.memberMention.quote}
                {'"'}
              </blockquote>
              <figcaption className="mt-1 text-sm text-muted-foreground">
                — {trainer.memberMention.author}, member
              </figcaption>
            </div>
          </figure>
        )}
      </div>
    </article>
  )
}

export function Trainers() {
  return (
    <section id="trainers" aria-labelledby="trainers-title" className="bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          id="trainers-title"
          eyebrow="Meet the team"
          title="Coaches who care about your progress"
          description="Members consistently describe our trainers as professional, understanding, and welcoming."
        />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {siteConfig.trainers.map((trainer, i) => (
            <Reveal as="li" key={trainer.name} delay={i * 80}>
              <TrainerCard trainer={trainer} />
            </Reveal>
          ))}
          <Reveal as="li" delay={siteConfig.trainers.length * 80}>
            <div className="flex h-full min-h-72 flex-col justify-between gap-8 rounded-xl border border-dashed border-white/15 p-7">
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-3xl font-bold uppercase leading-none tracking-tight">
                  Train one-on-one
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  Want a coach in your corner? Tell us about your goals and we will match you with the
                  right trainer.
                </p>
              </div>
              <ButtonLink href="#contact" withArrow className="w-full sm:w-fit">
                Ask about coaching
              </ButtonLink>
            </div>
          </Reveal>
        </ul>
      </div>
    </section>
  )
}
