import Image from 'next/image'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/lib/site-config'

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#home"
      aria-label={`${siteConfig.businessName} — back to top`}
      className={cn('group inline-flex items-center gap-3 leading-none', className)}
    >
      <span
        aria-hidden="true"
        className="relative size-11 shrink-0 overflow-hidden rounded-full border border-primary/40 bg-background transition-transform duration-300 group-hover:scale-105"
      >
        <Image
          src="/images/logo.jpg"
          alt=""
          fill
          sizes="44px"
          priority
          className="scale-[1.3] object-cover object-[50%_56%]"
        />
      </span>
      <span className="flex flex-col">
        <span className="font-display text-xl font-extrabold uppercase tracking-wide">
          Alpha Athlete
        </span>
        <span className="text-[0.6rem] font-semibold uppercase tracking-[0.5em] text-primary">
          Gym
        </span>
      </span>
    </a>
  )
}
