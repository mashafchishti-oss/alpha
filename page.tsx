import { About } from '@/components/site/about'
import { Contact } from '@/components/site/contact'
import { Cta } from '@/components/site/cta'
import { Features } from '@/components/site/features'
import { Footer } from '@/components/site/footer'
import { Gallery } from '@/components/site/gallery'
import { Hero } from '@/components/site/hero'
import { MobileActionBar } from '@/components/site/mobile-action-bar'
import { Navbar } from '@/components/site/navbar'
import { Programs } from '@/components/site/programs'
import { Reviews } from '@/components/site/reviews'
import { Trainers } from '@/components/site/trainers'
import { Trust } from '@/components/site/trust'

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Trust />
        <About />
        <Features />
        <Programs />
        <Trainers />
        <Reviews />
        <Gallery />
        <Cta />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
    </>
  )
}
