import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Barlow_Condensed, Inter } from 'next/font/google'
import type { ReactNode } from 'react'
import { siteConfig } from '@/lib/site-config'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const barlow = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-barlow',
  display: 'swap',
})

const title = `${siteConfig.businessName} | Gym & Personal Training in ${siteConfig.location.city}`
const description = `Build strength and confidence at ${siteConfig.businessName} in ${siteConfig.location.label}. Quality equipment, professional trainers, and a welcoming fitness community.`

export const metadata: Metadata = {
  ...(siteConfig.siteUrl ? { metadataBase: new URL(siteConfig.siteUrl) } : {}),
  title,
  description,
  keywords: [
    `gym in ${siteConfig.location.city}`,
    'personal training',
    'strength training',
    'weight training',
    'fat loss',
    'muscle building',
    siteConfig.businessName,
  ],
  openGraph: {
    title,
    description,
    type: 'website',
    siteName: siteConfig.businessName,
    images: [{ url: siteConfig.heroImage.src, alt: siteConfig.heroImage.alt }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [siteConfig.heroImage.src] },
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0d0e10',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ExerciseGym',
  name: siteConfig.businessName,
  description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.location.city,
    addressCountry: 'PK',
    ...(siteConfig.address ? { streetAddress: siteConfig.address } : {}),
  },
  ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: siteConfig.reviewSummary.rating,
    reviewCount: siteConfig.reviewSummary.count,
  },
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${barlow.variable} bg-background`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
