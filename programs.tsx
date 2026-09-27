import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { siteConfig, type Program } from '@/lib/site-config'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

function ProgramCard({ program }: { program: Program }) {
  return (
    <article className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-xl border border-white/10 sm:aspect-[3/4]">
      <Image
        src={program.image}
        alt={program.imageAlt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/60 to-background/0" />
      <div className="flex flex-col gap-3 p-6 sm:p-7">
        <h3 className="font-display text-3xl font-bold uppercase leading-none tracking-tight">
          {program.title}
        </h3>
        <p className="text-pretty text-sm leading-relaxed text-foreground/75">{program.description}</p>
        <a
          href="#contact"
          className="mt-2 inline-flex w-fit items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-primary after:absolute after:inset-0 after:content-['']"
        >
          Learn more
          <span className="sr-only"> about {program.title}</span>
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>
    </article>
  )
}

export function Programs() {
  return (
    <section id="programs" aria-labelledby="programs-title">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 py-20 sm:px-8 md:py-32">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="programs-title"
            eyebrow="Ways to train"
            title="Find your focus"
            description="Whatever your goal, our team can help you train for it. Ask us which options and coaching plans are currently available."
          />
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.programs.map((program, i) => (
            <Reveal as="li" key={program.id} delay={(i % 3) * 80}>
              <ProgramCard program={program} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
