import { Quote } from 'lucide-react'
import type { CSSProperties } from 'react'
import { testimonials } from '../data/content'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
}

export function Testimonials() {
  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="pb-20 sm:pb-28">
      <Container>
        <SectionHeading
          id="testimonials-title"
          eyebrow="Testimonials"
          title="People who got their mornings back"
        />

        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-5">
          {testimonials.map((t, i) => (
            <li
              key={t.name}
              className={`reveal ${i === 2 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
            >
              <figure className="flex h-full flex-col rounded-3xl border border-mist bg-white/70 p-7 sm:p-8">
                <Quote className="size-7 fill-signal text-signal" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-pretty text-ink/85">
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3 border-t border-mist pt-6">
                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-full font-mono text-sm font-medium ${t.tone}`}
                    aria-hidden="true"
                  >
                    {initials(t.name)}
                  </span>
                  <span>
                    <span className="block font-semibold">{t.name}</span>
                    <span className="block text-sm text-ink/65">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
