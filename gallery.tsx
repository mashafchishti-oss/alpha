'use client'

import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

const images = siteConfig.galleryImages

const shapeClass = {
  wide: 'sm:col-span-2 aspect-[16/10] sm:aspect-auto',
  tall: 'sm:row-span-2 aspect-[4/5] sm:aspect-auto',
  square: 'aspect-square sm:aspect-auto',
} as const

export function Gallery() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState<number | null>(null)

  const open = (index: number) => {
    setActive(index)
    dialogRef.current?.showModal()
  }
  const close = () => dialogRef.current?.close()
  const step = useCallback(
    (dir: 1 | -1) => setActive((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [],
  )

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, step])

  const current = active === null ? null : images[active]

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-5 py-20 sm:px-8 md:py-28">
        <SectionHeading
          id="gallery-title"
          eyebrow="Inside the gym"
          title="Where the work happens"
          description={
            siteConfig.galleryIsRepresentative
              ? 'A look at the kind of training, equipment, and energy you can expect. Visit in person to see the full space.'
              : undefined
          }
        />

        <ul className="grid grid-flow-dense auto-rows-[minmax(0,1fr)] gap-3 sm:grid-cols-2 sm:auto-rows-[16rem] lg:grid-cols-4 lg:auto-rows-[15rem]">
          {images.map((image, i) => (
            <Reveal as="li" key={image.src + i} delay={(i % 4) * 60} className={cn('relative', shapeClass[image.shape])}>
              <button
                type="button"
                onClick={() => open(i)}
                className="group relative block size-full overflow-hidden rounded-xl border border-white/10"
              >
                <span className="sr-only">View larger: {image.alt}</span>
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                <span aria-hidden="true" className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-background/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur-sm">
                  {image.category}
                </span>
                <span aria-hidden="true" className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand className="size-4" />
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === e.currentTarget && close()}
        aria-label="Gallery image viewer"
        className="lightbox m-auto max-h-none max-w-none bg-transparent p-0 text-foreground backdrop:bg-transparent"
      >
        {current && (
          <div className="flex h-svh w-screen flex-col items-center justify-center gap-4 p-4 sm:p-10">
            <div className="flex w-full max-w-6xl items-center justify-between">
              <p className="text-sm text-muted-foreground" aria-live="polite">
                {active! + 1} / {images.length} · {current.category}
              </p>
              <button
                type="button"
                onClick={close}
                className="flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-primary hover:text-primary"
              >
                <X aria-hidden="true" className="size-5" />
                <span className="sr-only">Close viewer</span>
              </button>
            </div>
            <div className="relative w-full max-w-6xl flex-1">
              <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => step(-1)}
                className="flex size-12 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-primary hover:text-primary"
              >
                <ChevronLeft aria-hidden="true" className="size-5" />
                <span className="sr-only">Previous image</span>
              </button>
              <p className="max-w-xs text-center text-sm text-foreground/80 sm:max-w-md">{current.alt}</p>
              <button
                type="button"
                onClick={() => step(1)}
                className="flex size-12 items-center justify-center rounded-full border border-white/15 bg-white/5 transition-colors hover:border-primary hover:text-primary"
              >
                <ChevronRight aria-hidden="true" className="size-5" />
                <span className="sr-only">Next image</span>
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  )
}
