/**
 * Central content for the Alpha Athlete Gym website.
 *
 * Every business fact lives here. Values set to `null` are unconfirmed:
 * the UI hides them (or uses an honest fallback) until real details are added,
 * so no invented phone numbers, addresses, or hours are ever shown to visitors.
 */

export type SocialPlatform = 'instagram' | 'facebook' | 'tiktok' | 'youtube'

export type Review = {
  name: string
  quote: string
  rating?: number
}

export type Trainer = {
  name: string
  role: string
  /** Replace with a real photo path, e.g. '/images/trainers/jamshaid.jpg' */
  photo: string | null
  /** Unconfirmed until supplied by the gym. Suggested copy: "Professional coaching focused on helping members train with confidence and consistency." */
  bio: string | null
  /** A genuine member quote that mentions this trainer, if one exists. */
  memberMention?: { quote: string; author: string }
}

export type Program = {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  /** Set to true once the gym confirms this program is offered. */
  confirmed: boolean
}

export type GalleryImage = {
  src: string
  alt: string
  category: 'Training' | 'Equipment' | 'Gym Environment' | 'Strength' | 'Community'
  /** Layout hint for the masonry grid. */
  shape: 'wide' | 'tall' | 'square'
}

export const siteConfig = {
  businessName: 'Alpha Athlete Gym',
  shortName: 'Alpha Athlete',
  tagline: 'Train. Improve. Become stronger.',
  /** Set to the production domain once published, e.g. 'https://alphaathletegym.pk' */
  siteUrl: null as string | null,

  location: {
    city: 'Lahore',
    region: 'Punjab',
    country: 'Pakistan',
    label: 'Lahore, Pakistan',
  },

  address: 'Bedian Road, Sector A, DHA Phase 6, Lahore' as string | null,
  phone: '+92 308 4929506' as string | null,
  /** Assumed to be the same number as the phone line. */
  whatsapp: '923084929506' as string | null,
  /** [GYM EMAIL] */
  email: null as string | null,
  /** [OPENING HOURS] e.g. [{ days: 'Mon – Sat', time: '6:00 AM – 11:00 PM' }] */
  hours: null as { days: string; time: string }[] | null,

  /** [GOOGLE MAPS URL] — the official Maps listing link. Falls back to a Maps search for the gym name. */
  googleMapsUrl: 'https://maps.app.goo.gl/q5qftqHPq3BqJYEz5' as string | null,
  /** Short maps.app links can't be framed, so the embed uses an address query. */
  googleMapsEmbedUrl:
    'https://www.google.com/maps?q=Alpha+Athlete+Gym,+Bedian+Road,+Sector+A,+DHA+Phase+6,+Lahore&output=embed' as
      | string
      | null,

  /** Official accounts only. Links render once a URL is added. */
  socialLinks: {
    instagram: null,
    facebook: null,
    tiktok: null,
    youtube: null,
  } as Record<SocialPlatform, string | null>,

  /** Summary of the customer reviews supplied by the gym. */
  reviewSummary: {
    rating: 4.8,
    count: 25,
    sourceLabel: 'Based on customer reviews',
  },

  /** Genuine customer comments, reproduced verbatim. Do not add invented reviews. */
  reviews: [
    {
      name: 'Asghar Ali',
      quote:
        'One of the best gym place i must say. Fine quality machinery.. thumbs up for environment',
    },
    { name: 'Rauf Azam', quote: 'Best fitness trainer in town.... Jamshaid Saleem 👍' },
    { name: 'Shawn', quote: 'Best gym at best place .. really impressive' },
    {
      name: 'Gulfam Khan',
      quote:
        'Brilliant environment and super nice and friendly way of coaching. Love to workout here and the vibes are just amazing.',
    },
    {
      name: 'Samina Arif',
      quote:
        'It was good. I actually like their trainers they were very understanding and welcoming. Jolly people',
    },
    { name: 'Muhammad Furqan', quote: 'Excellent equipments.' },
    { name: 'Naveed Majeed', quote: 'Best gym, professional trainers 💪' },
    { name: 'Hamza Sheikh', quote: 'Best Gym in Lahore' },
  ] satisfies Review[],

  trainers: [
    {
      name: 'Jamshaid Saleem',
      role: 'Trainer',
      photo: null,
      bio: null,
      memberMention: { quote: 'Best fitness trainer in town', author: 'Rauf Azam' },
    },
  ] satisfies Trainer[],

  /**
   * Training focus areas. These are editable and NOT yet confirmed by the gym —
   * update titles/descriptions and flip `confirmed` once verified.
   */
  programs: [
    {
      id: 'strength',
      title: 'Strength Training',
      description:
        'Build a foundation of real strength with compound lifts, structured progression, and attention to technique.',
      image: '/images/program-strength.png',
      imageAlt: 'Athlete performing a barbell back squat in a squat rack',
      confirmed: false,
    },
    {
      id: 'personal',
      title: 'Personal Training',
      description:
        'One-on-one guidance from a trainer who helps you set goals, learn good form, and stay consistent.',
      image: '/images/program-personal.png',
      imageAlt: 'Personal trainer coaching a client through a dumbbell exercise',
      confirmed: false,
    },
    {
      id: 'weights',
      title: 'Weight Training',
      description:
        'Free weights and machines for every level, whether you are learning the basics or chasing new numbers.',
      image: '/images/program-weights.png',
      imageAlt: 'Rack of heavy dumbbells under dramatic lighting',
      confirmed: false,
    },
    {
      id: 'conditioning',
      title: 'Fitness & Conditioning',
      description:
        'Improve stamina, work capacity, and overall fitness with conditioning work that complements your lifting.',
      image: '/images/program-conditioning.png',
      imageAlt: 'Athlete doing a battle rope conditioning workout',
      confirmed: false,
    },
    {
      id: 'fat-loss',
      title: 'Fat Loss',
      description:
        'A sustainable approach combining training and consistency to help you get leaner and feel better.',
      image: '/images/program-fatloss.png',
      imageAlt: 'Person running on a treadmill in a dark modern gym',
      confirmed: false,
    },
    {
      id: 'muscle',
      title: 'Muscle Building',
      description:
        'Focused hypertrophy training to add lean muscle with smart exercise selection and steady progress.',
      image: '/images/program-muscle.png',
      imageAlt: 'Athlete performing cable rows with defined back muscles',
      confirmed: false,
    },
  ] satisfies Program[],

  /**
   * Representative imagery. Replace `src` with real Alpha Athlete Gym photos
   * and set `galleryIsRepresentative` to false.
   */
  galleryIsRepresentative: false,
  galleryImages: [
    {
      src: '/images/real-wings.jpg',
      alt: 'Bench press rack in front of the black and white angel wings mural reading "Fly High, Do or Die"',
      category: 'Strength',
      shape: 'tall',
    },
    {
      src: '/images/real-mural.jpg',
      alt: 'Full dumbbell rack beneath a hand-painted anime powering-up mural with lightning and flames',
      category: 'Gym Environment',
      shape: 'tall',
    },
    {
      src: '/images/real-floor.jpg',
      alt: 'Training floor with leg press, Smith machine and leg extension beside a gold splash mural',
      category: 'Equipment',
      shape: 'tall',
    },
    {
      src: '/images/real-cable.jpg',
      alt: 'Multi-station cable machine branded with the Alpha Athletes Gym logo',
      category: 'Equipment',
      shape: 'tall',
    },
  ] satisfies GalleryImage[],

  heroImage: {
    src: '/images/hero.png',
    alt: 'Athlete performing a heavy barbell deadlift in a dark gym',
  },
  aboutImage: {
    src: '/images/real-wings.jpg',
    alt: 'Angel wings mural reading "Fly High, Do or Die" behind a bench press at Alpha Athlete Gym',
  },
  ctaImage: {
    src: '/images/cta.png',
    alt: 'Chalked hands gripping a barbell',
  },
} as const

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Trainers', href: '#trainers' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
] as const

export function getWhatsAppHref(message?: string) {
  if (!siteConfig.whatsapp) return null
  const digits = siteConfig.whatsapp.replace(/\D/g, '')
  const text = message ?? `Hi ${siteConfig.businessName}, I'd like to know more about joining.`
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
}

export function getDirectionsHref() {
  if (siteConfig.googleMapsUrl) return siteConfig.googleMapsUrl
  const query = [siteConfig.businessName, siteConfig.address ?? siteConfig.location.city]
    .filter(Boolean)
    .join(' ')
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

export function getPhoneHref() {
  return siteConfig.phone ? `tel:${siteConfig.phone.replace(/[^\d+]/g, '')}` : null
}
