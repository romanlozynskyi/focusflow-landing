import { CtaBand } from './components/CtaBand'
import { Features } from './components/Features'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Pricing } from './components/Pricing'
import { Testimonials } from './components/Testimonials'
import { useHashScroll } from './hooks/useHashScroll'
import { useReveal } from './hooks/useReveal'

export default function App() {
  useReveal()
  useHashScroll()

  return (
    <>
      <a
        href="#main"
        data-menu-inert
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" data-menu-inert>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <Testimonials />
        <CtaBand />
      </main>
      <Footer />
    </>
  )
}
