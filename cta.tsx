import Image from 'next/image'
import { getWhatsAppHref, siteConfig } from '@/lib/site-config'
import { ButtonLink } from './button-link'
import { Reveal } from './reveal'

export function Cta() {
  const whatsapp = getWhatsAppHref()

  return (
    <section aria-labelledby="cta-title" className="relative isolate overflow-hidden">
      <Image
        src={siteConfig.ctaImage.src}
        alt=""
        fill
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-background/75" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-transparent to-background" />
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-5 py-28 text-center sm:px-8 md:py-40">
        <h2
          id="cta-title"
          className="font-display text-balance text-5xl font-extrabold uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-8xl"
        >
          Your strongest self <span className="text-primary">starts here</span>
        </h2>
        <p className="max-w-xl text-pretty text-lg leading-relaxed text-foreground/80">
          Visit {siteConfig.businessName} and experience a better place to train.
        </p>
        <div className="flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
          <ButtonLink href="#contact" withArrow>
            Join now
          </ButtonLink>
          {whatsapp ? (
            <ButtonLink href={whatsapp} target="_blank" rel="noopener noreferrer" variant="outline">
              Contact on WhatsApp
            </ButtonLink>
          ) : (
            <ButtonLink href="#contact" variant="outline">
              Send an inquiry
            </ButtonLink>
          )}
        </div>
      </Reveal>
    </section>
  )
}
