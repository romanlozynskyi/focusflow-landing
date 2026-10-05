import type { ReactNode } from 'react'

type SectionHeadingProps = {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  id?: string
  tone?: 'light' | 'dark'
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
  tone = 'light',
  align = 'center',
}: SectionHeadingProps) {
  const onDark = tone === 'dark'
  const centered = align === 'center'

  return (
    <div className={`reveal max-w-2xl ${centered ? 'mx-auto text-center' : ''}`}>
      <p
        className={`font-mono text-xs font-medium tracking-[0.18em] uppercase ${
          onDark ? 'text-signal-soft' : 'text-signal-ink'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-4 font-display text-4xl leading-[1.02] font-bold tracking-[-0.035em] text-balance sm:text-5xl ${
          onDark ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-5 text-lg leading-relaxed text-pretty ${
            onDark ? 'text-white/70' : 'text-ink/70'
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  )
}
