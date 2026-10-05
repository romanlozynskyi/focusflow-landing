import { ShieldCheck } from 'lucide-react'
import type { CSSProperties } from 'react'
import { steps } from '../data/content'
import { FocusRing } from './FocusRing'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'

const durations = [15, 25, 50, 90]

const week = [
  { day: 'M', hours: 2.5 },
  { day: 'T', hours: 3.2 },
  { day: 'W', hours: 1.6 },
  { day: 'T', hours: 2.9 },
  { day: 'F', hours: 3.7, today: true },
  { day: 'S', hours: 0.8 },
  { day: 'S', hours: 0.4 },
]

function PickTask() {
  return (
    <div className="w-full max-w-[250px] rounded-2xl bg-white p-4 text-left text-ink shadow-xl shadow-black/20">
      <span className="font-mono text-[10px] tracking-[0.16em] text-ink/65 uppercase">
        What’s the one thing?
      </span>
      <p className="mt-1 text-sm font-semibold">
        Draft the Q4 report outline
        <span className="ml-0.5 inline-block h-4 w-px animate-pulse bg-signal align-middle" />
      </p>
      <div className="mt-3 flex gap-1.5">
        {durations.map((min) => (
          <span
            key={min}
            className={`rounded-full px-2.5 py-1 font-mono text-[11px] ${
              min === 50 ? 'bg-signal text-ink' : 'bg-glacier text-ink/65'
            }`}
          >
            {min}m
          </span>
        ))}
      </div>
    </div>
  )
}

function StartSession() {
  return (
    <div className="flex items-center gap-4">
      <FocusRing
        progress={0.3}
        stroke={14}
        trackClassName="stroke-white/15"
        className="w-24 xl:w-28"
      >
        <span className="font-mono text-lg font-medium text-white tabular-nums">35:00</span>
      </FocusRing>
      <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white">
        <ShieldCheck className="size-3.5 text-signal" />
        Shield on
      </span>
    </div>
  )
}

function ReviewDay() {
  const max = Math.max(...week.map((d) => d.hours))
  return (
    <div className="w-full max-w-[250px]">
      <div className="flex items-baseline justify-between text-white">
        <span className="font-mono text-[10px] tracking-[0.16em] text-white/60 uppercase">
          Today
        </span>
        <span className="font-mono text-sm font-medium">3h 40m</span>
      </div>
      <div className="mt-3 flex h-20 items-end gap-2">
        {week.map((d, i) => (
          <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
            <span
              className={`w-full rounded-md ${d.today ? 'bg-signal' : 'bg-white/20'}`}
              style={{ height: `${(d.hours / max) * 64}px` }}
            />
            <span className={`font-mono text-[10px] ${d.today ? 'text-white' : 'text-white/60'}`}>
              {d.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const visuals = [PickTask, StartSession, ReviewDay]

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="py-4 sm:py-8">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-pine px-5 py-16 sm:rounded-[2.5rem] sm:px-10 lg:px-14 lg:py-20">
          <svg
            aria-hidden="true"
            viewBox="0 0 400 400"
            className="pointer-events-none absolute -top-40 -right-40 w-[480px] opacity-20"
          >
            <circle cx="200" cy="200" r="160" fill="none" stroke="white" strokeWidth="1" />
            <circle
              cx="200"
              cy="200"
              r="196"
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeDasharray="2 8"
            />
          </svg>

          <SectionHeading
            id="how-title"
            tone="dark"
            eyebrow="How it works"
            title="From open laptop to deep work in three steps"
            lead="No setup marathon. Your first session starts in under a minute."
          />

          <ol className="relative mt-14 grid gap-12 lg:mt-16 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, i) => {
              const Visual = visuals[i]
              return (
                <li
                  key={step.title}
                  className="reveal md:grid md:grid-cols-2 md:items-center md:gap-10 lg:block"
                  style={{ '--reveal-delay': `${i * 100}ms` } as CSSProperties}
                >
                  <div className="grid h-48 place-items-center rounded-3xl bg-pine-deep px-5">
                    <Visual />
                  </div>
                  <div>
                    <div className="mt-6 flex items-center gap-3 md:mt-0 lg:mt-6">
                      <span className="grid size-8 place-items-center rounded-full bg-signal font-mono text-sm font-medium text-ink">
                        {i + 1}
                      </span>
                      <span className="h-px flex-1 bg-white/15" aria-hidden="true" />
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.025em] text-white">
                      {step.title}
                    </h3>
                    <p className="mt-2 leading-relaxed text-pretty text-white/70">{step.text}</p>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </Container>
    </section>
  )
}
