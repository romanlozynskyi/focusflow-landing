import { Check } from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import { plans, type Billing, type Plan } from '../data/content'
import { Button } from './ui/Button'
import { Container } from './ui/Container'
import { SectionHeading } from './ui/SectionHeading'

const billingOptions: { value: Billing; label: string }[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
]

function billingNote(plan: Plan, billing: Billing) {
  if (plan.price.monthly === 0) return 'No card needed'
  if (billing === 'monthly') return 'Billed monthly, cancel anytime'
  return `$${plan.price.yearly * 12} billed yearly`
}

function PlanCard({ plan, billing }: { plan: Plan; billing: Billing }) {
  const featured = plan.featured === true

  return (
    <article
      className={`relative flex h-full flex-col rounded-3xl p-7 sm:p-8 ${
        featured
          ? 'bg-pine text-white shadow-[0_40px_80px_-40px_rgba(30,77,69,0.8)] lg:-my-5 lg:py-12'
          : 'border border-mist bg-white/70'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-2xl font-semibold tracking-[-0.025em]">{plan.name}</h3>
        {featured && (
          <span className="rounded-full bg-signal px-3 py-1 font-mono text-[11px] font-medium text-ink">
            Most popular
          </span>
        )}
      </div>
      <p className={`mt-1 text-sm ${featured ? 'text-white/70' : 'text-ink/65'}`}>
        {plan.audience}
      </p>

      <p className="mt-7 flex items-baseline gap-2">
        <span className="font-mono text-5xl font-medium tracking-[-0.05em] tabular-nums">
          ${plan.price[billing]}
        </span>
        <span className={`text-sm ${featured ? 'text-white/70' : 'text-ink/65'}`}>{plan.unit}</span>
      </p>
      <p className={`mt-1 text-xs ${featured ? 'text-white/60' : 'text-ink/65'}`}>
        {billingNote(plan, billing)}
      </p>

      <ul
        className={`mt-7 space-y-3 border-t pt-7 ${featured ? 'border-white/15' : 'border-mist'}`}
      >
        {plan.features.map((feature) => (
          <li key={feature} className="flex gap-3 text-[15px]">
            <Check
              className={`mt-0.5 size-4 shrink-0 ${featured ? 'text-signal' : 'text-pine'}`}
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-9">
        <Button
          href={plan.cta.href}
          variant={featured ? 'primary' : 'outline'}
          size="lg"
          className="w-full"
        >
          {plan.cta.label}
        </Button>
      </div>
    </article>
  )
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>('monthly')

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          id="pricing-title"
          eyebrow="Pricing"
          title="Start free. Upgrade when focus sticks."
          lead={
            <>
              Every plan includes unlimited focus sessions. Pro and Team come with a{' '}
              <span className="whitespace-nowrap">14-day</span> free trial.
            </>
          }
        />

        <div className="reveal mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <div
            role="group"
            aria-label="Billing period"
            className="inline-flex rounded-full border border-mist bg-white/70 p-1"
          >
            {billingOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                aria-pressed={billing === option.value}
                onClick={() => setBilling(option.value)}
                className={`h-10 rounded-full px-5 text-sm font-semibold transition ${
                  billing === option.value ? 'bg-ink text-white' : 'text-ink/65 hover:text-ink'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <span className="font-mono text-xs text-signal-ink">Save up to 33% yearly</span>
        </div>

        <div className="mx-auto mt-12 grid max-w-xl gap-5 lg:mt-16 lg:max-w-none lg:grid-cols-3 lg:items-stretch">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className="reveal"
              style={{ '--reveal-delay': `${i * 80}ms` } as CSSProperties}
            >
              <PlanCard plan={plan} billing={billing} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
