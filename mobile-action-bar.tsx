import { MessageCircle, Navigation, Phone } from 'lucide-react'
import { getDirectionsHref, getPhoneHref, getWhatsAppHref } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { buttonLinkVariants } from './button-link'

/** Sticky bottom bar on mobile so the primary contact action is always one tap away. */
export function MobileActionBar() {
  const whatsapp = getWhatsAppHref()
  const phone = getPhoneHref()

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-background/90 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden">
      <div className="flex gap-2">
        {whatsapp ? (
          <a href={whatsapp} target="_blank" rel="noopener noreferrer" className={cn(buttonLinkVariants(), 'flex-1')}>
            <MessageCircle aria-hidden="true" className="size-4" />
            WhatsApp
          </a>
        ) : (
          <a href="#contact" className={cn(buttonLinkVariants(), 'flex-1')}>
            Join now
          </a>
        )}
        {phone ? (
          <a href={phone} className={cn(buttonLinkVariants({ variant: 'outline' }), 'px-4')}>
            <Phone aria-hidden="true" className="size-4" />
            <span className="sr-only">Call the gym</span>
          </a>
        ) : null}
        <a
          href={getDirectionsHref()}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonLinkVariants({ variant: 'outline' }), 'px-4')}
        >
          <Navigation aria-hidden="true" className="size-4" />
          <span className="sr-only">Get directions</span>
        </a>
      </div>
    </div>
  )
}
