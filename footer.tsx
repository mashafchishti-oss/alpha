import { navLinks, siteConfig, type SocialPlatform } from '@/lib/site-config'
import { Logo } from './logo'

const socialLabels: Record<SocialPlatform, string> = {
  instagram: 'Instagram',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  youtube: 'YouTube',
}

export function Footer() {
  const socials = (Object.entries(siteConfig.socialLinks) as [SocialPlatform, string | null][]).filter(
    (entry): entry is [SocialPlatform, string] => Boolean(entry[1]),
  )

  return (
    <footer className="border-t border-white/10 bg-surface pb-28 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.5fr_1fr_1fr]">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="max-w-sm text-pretty leading-relaxed text-muted-foreground">
            {siteConfig.tagline} A training space in {siteConfig.location.city} built around quality
            equipment, professional coaching, and a welcoming community.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Explore</h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm transition-colors hover:text-primary">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">Visit</h2>
          <address className="mt-5 flex flex-col gap-3 text-sm not-italic">
            <span>{siteConfig.address ?? siteConfig.location.label}</span>
            {siteConfig.phone && <span>{siteConfig.phone}</span>}
            {siteConfig.email && (
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-primary">
                {siteConfig.email}
              </a>
            )}
          </address>
          {socials.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-4">
              {socials.map(([platform, url]) => (
                <li key={platform}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {socialLabels[platform]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:justify-between sm:px-8">
          <p>
            © {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.
          </p>
          <p>{siteConfig.location.label}</p>
        </div>
      </div>
    </footer>
  )
}
