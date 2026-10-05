import { Smartphone } from 'lucide-react'
import { storeLinks } from '../data/content'
import { FocusRing } from './FocusRing'
import { Button } from './ui/Button'
import { Container } from './ui/Container'

export function CtaBand() {
  return (
    <section id="download" aria-labelledby="download-title" className="pb-20 sm:pb-28">
      <Container>
        <div className="reveal relative isolate overflow-hidden rounded-[2rem] bg-ink px-6 py-16 text-center sm:rounded-[2.5rem] sm:px-12 sm:py-20 lg:px-16 lg:text-left">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 -right-24 -z-10 hidden w-[440px] -translate-y-1/2 lg:block xl:right-0"
          >
            <FocusRing progress={0.25} stroke={10} trackClassName="stroke-white/10">
              <span className="font-mono text-6xl font-medium tracking-[-0.05em] text-white/90 tabular-nums">
                45:00
              </span>
              <span className="mt-2 font-mono text-xs tracking-[0.16em] text-white/50 uppercase">
                Focusing
              </span>
            </FocusRing>
          </div>

          <h2
            id="download-title"
            className="mx-auto max-w-3xl font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.95] font-bold tracking-[-0.045em] text-balance text-white lg:mx-0"
          >
            Your next hour, undisturbed<span className="text-signal">.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-white/70 lg:mx-0">
            FocusFlow is free on iOS and Android. Try every Pro feature for 14 days.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button href={storeLinks.ios} target="_blank" rel="noreferrer" size="lg">
              <Smartphone className="size-4" aria-hidden="true" />
              Download for iOS
            </Button>
            <Button
              href={storeLinks.android}
              target="_blank"
              rel="noreferrer"
              size="lg"
              variant="outline-light"
            >
              <Smartphone className="size-4" aria-hidden="true" />
              Download for Android
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
