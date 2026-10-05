import type { CSSProperties } from 'react'
import { features } from '../data/content'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="features-title"
          eyebrow="Features"
          title="Fewer pings. More finished work."
          lead="Six tools with one job: keeping you on the task you picked."
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {features.map(({ icon: Icon, title, text }, i) => (
            <li
              key={title}
              className="reveal group rounded-3xl border border-mist bg-white/70 p-7 transition duration-300 hover:-translate-y-1 hover:border-ink/15 hover:bg-white hover:shadow-[0_24px_48px_-32px_rgba(15,27,45,0.4)]"
              style={{ '--reveal-delay': `${(i % 3) * 80}ms` } as CSSProperties}
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-peach text-signal-ink transition duration-300 group-hover:bg-signal group-hover:text-ink">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-[-0.02em]">
                {title}
              </h3>
              <p className="mt-2 leading-relaxed text-pretty text-ink/65">{text}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
