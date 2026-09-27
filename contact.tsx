import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone, type LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import { getDirectionsHref, getPhoneHref, getWhatsAppHref, siteConfig } from '@/lib/site-config'
import { ButtonLink } from './button-link'
import { ContactForm } from './contact-form'
import { Reveal } from './reveal'
import { SectionHeading } from './section-heading'

type InfoItem = { icon: LucideIcon; label: string; value: ReactNode; href?: string }

function InfoRow({ icon: Icon, label, value, href }: InfoItem) {
  const content = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-primary">
        <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </span>
    </>
  )
  return (
    <li>
      {href ? (
        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="flex items-center gap-4 rounded-lg transition-colors hover:text-primary"
        >
          {content}
        </a>
      ) : (
        <div className="flex items-center gap-4">{content}</div>
      )}
    </li>
  )
}

export function Contact() {
  const phoneHref = getPhoneHref()
  const whatsappHref = getWhatsAppHref()

  const items: InfoItem[] = [
    { icon: MapPin, label: 'Location', value: siteConfig.address ?? siteConfig.location.label },
  ]
  if (siteConfig.phone && phoneHref)
    items.push({ icon: Phone, label: 'Phone', value: siteConfig.phone, href: phoneHref })
  if (whatsappHref)
    items.push({ icon: MessageCircle, label: 'WhatsApp', value: 'Message us', href: whatsappHref })
  if (siteConfig.email)
    items.push({ icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` })
  if (siteConfig.hours)
    items.push({
      icon: Clock,
      label: 'Opening hours',
      value: (
        <span className="flex flex-col">
          {siteConfig.hours.map((h) => (
            <span key={h.days}>
              {h.days}: {h.time}
            </span>
          ))}
        </span>
      ),
    })

  const hasDirectLine = Boolean(phoneHref || whatsappHref)

  return (
    <section id="contact" aria-labelledby="contact-title">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 md:py-32 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="contact-title"
            eyebrow="Get in touch"
            title="Visit Alpha Athlete Gym"
            description={
              hasDirectLine
                ? 'Drop by, give us a call, or send a message. We are happy to show you around.'
                : 'Send us an inquiry and our team will get back to you, or find us on the map and drop by.'
            }
          />
          <Reveal delay={100}>
            <ul className="flex flex-col gap-5">
              {items.map((item) => (
                <InfoRow key={item.label} {...item} />
              ))}
            </ul>
          </Reveal>
          <Reveal delay={200} className="flex flex-col gap-3 sm:flex-row">
            {whatsappHref && (
              <ButtonLink href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle aria-hidden="true" className="size-4" />
                Chat on WhatsApp
              </ButtonLink>
            )}
            {phoneHref && (
              <ButtonLink href={phoneHref} variant="outline">
                <Phone aria-hidden="true" className="size-4" />
                Call now
              </ButtonLink>
            )}
            <ButtonLink href={getDirectionsHref()} target="_blank" rel="noopener noreferrer" variant="outline">
              <Navigation aria-hidden="true" className="size-4" />
              Get directions
            </ButtonLink>
          </Reveal>
          {siteConfig.googleMapsEmbedUrl && (
            <Reveal delay={250} className="aspect-video overflow-hidden rounded-xl border border-white/10">
              <iframe
                src={siteConfig.googleMapsEmbedUrl}
                title={`Map showing ${siteConfig.businessName}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="size-full grayscale invert-[0.9]"
              />
            </Reveal>
          )}
        </div>
        <Reveal delay={150}>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  )
}
