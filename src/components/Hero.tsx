import { ArrowDown, Star } from 'lucide-react'
import { GET_STARTED_HREF } from '../data/content'
import { PhoneMockup } from './PhoneMockup'
import { Button } from './ui/Button'
import { Container } from './ui/Container'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate overflow-x-clip">
      {/* Echo of the focus ring behind the phone */}
      <svg
        aria-hidden="true"
        viewBox="0 0 800 800"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[900px] max-w-none -translate-x-1/2 -translate-y-[38%] lg:top-[48%] lg:left-[74%] lg:w-[860px] lg:-translate-y-1/2"
      >
        <defs>
          <radialGradient id="hero-glow">
            <stop offset="0%" stopColor="#FFE3D3" stopOpacity="0.95" />
            <stop offset="70%" stopColor="#FFE3D3" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="400" cy="400" r="300" fill="url(#hero-glow)" />
        <circle cx="400" cy="400" r="250" fill="none" stroke="#D6E0DC" strokeWidth="1.5" />
        <circle
          cx="400"
          cy="400"
          r="370"
          fill="none"
          stroke="#D6E0DC"
          strokeWidth="1.5"
          strokeDasharray="2 10"
        />
      </svg>

      <Container className="grid items-center gap-16 pt-10 pb-8 sm:pt-14 sm:pb-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8 lg:pt-16 lg:pb-12">
        <div className="text-center lg:text-left">
          <p className="reveal inline-flex items-center gap-2 rounded-full border border-mist bg-white/70 px-3.5 py-1.5 font-mono text-xs text-ink/70">
            <span className="size-1.5 rounded-full bg-signal" aria-hidden="true" />
            Focus timer for iOS and Android
          </p>

          <h1
            id="hero-title"
            className="reveal mt-6 font-display text-[clamp(2.75rem,12.5vw,6.25rem)] leading-[0.88] font-extrabold tracking-[-0.05em] [--reveal-delay:80ms] lg:text-[clamp(3rem,7.4vw,6.25rem)]"
          >
            One task.
            <br />
            Full attention<span className="text-signal">.</span>
          </h1>

          <p className="reveal mx-auto mt-7 max-w-xl text-lg leading-relaxed text-pretty text-ink/70 [--reveal-delay:160ms] sm:text-xl lg:mx-0">
            FocusFlow runs a timer, silences distracting apps and keeps the next task in view, so
            the hour goes to the work instead of switching between things.
          </p>

          <div className="reveal mt-9 flex flex-col items-center justify-center gap-3 [--reveal-delay:240ms] sm:flex-row lg:justify-start">
            <Button href={GET_STARTED_HREF} size="lg" className="w-full sm:w-auto">
              Get Started — it’s free
            </Button>
            <Button href="#how-it-works" variant="outline" size="lg" className="w-full sm:w-auto">
              See how it works
              <ArrowDown className="size-4" aria-hidden="true" />
            </Button>
          </div>

          <dl className="reveal mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 [--reveal-delay:320ms] lg:justify-start">
            <div className="flex items-center gap-2">
              <dt className="sr-only">App Store rating</dt>
              <span className="flex text-signal" aria-hidden="true">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="size-4 fill-current" />
                ))}
              </span>
              <dd className="text-sm text-ink/70">
                <strong className="font-semibold text-ink">4.8</strong> from 12,400 ratings
              </dd>
            </div>
            <div className="flex items-center gap-2">
              <dt className="sr-only">Focused hours logged</dt>
              <dd className="text-sm text-ink/70">
                <strong className="font-mono font-medium text-ink">2.1M</strong> focused hours
                logged
              </dd>
            </div>
          </dl>
        </div>

        <div className="reveal [--reveal-delay:200ms]">
          <PhoneMockup />
        </div>
      </Container>
    </section>
  )
}
