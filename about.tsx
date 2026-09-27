import Image from 'next/image'
import { siteConfig } from '@/lib/site-config'
import { ButtonLink } from './button-link'
import { Reveal } from './reveal'

const pillars = ['Quality equipment', 'Professional coaching', 'Friendly trainers', 'Real community']

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 md:py-32 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative order-last lg:order-first">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-white/10">
            <Image
              src={siteConfig.aboutImage.src}
              alt={siteConfig.aboutImage.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1.5s] hover:scale-105"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 rounded-xl border border-white/10 bg-background/85 p-5 backdrop-blur-md sm:left-auto sm:right-8 sm:w-72">
            <p className="font-display text-lg font-bold uppercase leading-tight">
              Serious training. <span className="text-primary">Zero intimidation.</span>
            </p>
          </div>
        </Reveal>

        <div className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-6">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              <span aria-hidden="true" className="h-px w-8 bg-primary" />
              About the gym
            </p>
            <h2
              id="about-title"
              className="font-display text-balance text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl"
            >
              More than a gym.
              <br />
              <span className="text-muted-foreground">A place to get stronger.</span>
            </h2>
          </Reveal>
          <Reveal delay={100} className="flex flex-col gap-5 text-pretty leading-relaxed text-muted-foreground sm:text-lg">
            <p>
              {siteConfig.businessName} is a training space in {siteConfig.location.city} for people
              who want to make real progress. Members come here for quality machines and equipment,
              and they stay for the coaching and the atmosphere.
            </p>
            <p>
              Our trainers are known for being professional, understanding, and genuinely friendly.
              Whether you are walking in for the first time or you have been lifting for years, you
              will get guidance that meets you where you are.
            </p>
            <p>
              No shortcuts and no gimmicks. Just consistent training, a positive environment, and a
              community that pushes each other to keep getting better.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <ul className="flex flex-wrap gap-2">
              {pillars.map((p) => (
                <li
                  key={p}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium"
                >
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={300}>
            <ButtonLink href="#contact" variant="outline" withArrow>
              Book a visit
            </ButtonLink>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
