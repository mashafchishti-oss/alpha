'use client'

import { Menu, X } from 'lucide-react'
import { useEffect, useState, type CSSProperties } from 'react'
import { navLinks, siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { ButtonLink } from './button-link'
import { Logo } from './logo'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <nav
        aria-label="Main"
        className={cn(
          'mx-auto flex h-16 max-w-7xl items-center justify-between rounded-xl border px-4 transition-all duration-500 sm:px-6',
          scrolled || open
            ? 'border-white/10 bg-background/80 shadow-2xl shadow-black/40 backdrop-blur-xl'
            : 'border-transparent bg-transparent',
        )}
      >
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ButtonLink href="#contact" className="hidden min-h-10 px-5 text-xs sm:inline-flex">
            Join {siteConfig.shortName}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex size-11 items-center justify-center rounded-md border border-white/10 bg-white/5 lg:hidden"
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-xl border border-white/10 bg-background/95 backdrop-blur-xl lg:hidden"
      >
        <ul className="flex flex-col p-3">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              className="hero-in"
              style={{ '--hero-delay': `${i * 40}ms` } as CSSProperties}
            >
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-lg px-4 py-3.5 font-display text-2xl font-bold uppercase tracking-wide transition-colors hover:bg-white/5 hover:text-primary"
              >
                {link.label}
                <span aria-hidden="true" className="text-xs font-sans font-medium text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="border-t border-white/10 p-4">
          <ButtonLink href="#contact" onClick={() => setOpen(false)} withArrow className="w-full">
            Join {siteConfig.shortName}
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
