import { ChevronDown, Dumbbell, HeartHandshake, MapPin, UserCheck, Users } from 'lucide-react'
import Image from 'next/image'
import type { CSSProperties } from 'react'
import { siteConfig } from '@/lib/site-config'
import { ButtonLink } from './button-link'

const highlights = [
  { icon: UserCheck, label: 'Professional Trainers' },
  { icon: Dumbbell, label: 'Quality Equipment' },
  { icon: HeartHandshake, label: 'Welcoming Environment' },
  { icon: Users, label: 'Fitness Community' },
]

const delay = (ms: number) => ({ '--hero-delay': `${ms}ms` }) as CSSProperties

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <Image
        src={siteConfig.heroImage.src}
        alt={siteConfig.heroImage.alt}
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover object-[70%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-background/30 md:bg-gradient-to-r md:from-background md:via-background/75 md:to-transparent"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-end px-5 pb-10 pt-32 sm:px-8 md:justify-center md:pb-16">
        <p
          className="hero-in flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground"
          style={delay(0)}
        >
          <MapPin aria-hidden="true" className="size-4 text-primary" />
          {siteConfig.location.label}
        </p>

        <h1
          id="hero-title"
          className="hero-in mt-6 font-display text-[clamp(3.5rem,13vw,9.5rem)] font-extrabold uppercase leading-[0.85] tracking-tight"
          style={delay(100)}
        >
          <span className="sr-only">{siteConfig.businessName} — </span>
          Train hard.
          <br />
          <span className="text-primary">Live strong.</span>
        </h1>

        <span aria-hidden="true" className="accent-line mt-8 block h-0.5 w-24 bg-primary" />

        <p
          className="hero-in mt-8 max-w-xl text-pretty text-lg leading-relaxed text-foreground/80 sm:text-xl"
          style={delay(250)}
        >
          Build strength. Build confidence. Become your strongest self at {siteConfig.businessName}.
        </p>

        <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row" style={delay(400)}>
          <ButtonLink href="#contact" withArrow>
            Start your journey
          </ButtonLink>
          <ButtonLink href="#gallery" variant="outline">
            Explore the gym
          </ButtonLink>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-8 sm:px-8">
        <ul className="hero-in grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10 lg:grid-cols-4" style={delay(550)}>
          {highlights.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-3 bg-background/70 px-4 py-4 backdrop-blur-md sm:px-6 sm:py-5">
              <Icon aria-hidden="true" className="size-5 shrink-0 text-primary" strokeWidth={1.5} />
              <span className="text-sm font-medium leading-tight sm:text-base">{label}</span>
            </li>
          ))}
        </ul>
        <a
          href="#trust"
          className="mx-auto mt-6 hidden w-fit flex-col items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-primary md:flex"
        >
          Scroll
          <ChevronDown aria-hidden="true" className="scroll-cue size-4" />
        </a>
      </div>
    </section>
  )
}
