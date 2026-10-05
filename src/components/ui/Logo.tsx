type LogoProps = { tone?: 'light' | 'dark'; className?: string }

/** A focus ring with a quarter left to go, next to the wordmark. */
export function Logo({ tone = 'light', className = '' }: LogoProps) {
  const onDark = tone === 'dark'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="9" className={onDark ? 'fill-white' : 'fill-ink'} />
        <circle
          cx="16"
          cy="16"
          r="8.5"
          fill="none"
          strokeWidth="3.5"
          className={onDark ? 'stroke-ink/15' : 'stroke-white/15'}
        />
        <path
          d="M16 7.5a8.5 8.5 0 1 1-8.5 8.5"
          fill="none"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="stroke-signal"
        />
      </svg>
      <span
        className={`font-display text-xl font-bold tracking-[-0.03em] ${
          onDark ? 'text-white' : 'text-ink'
        }`}
      >
        FocusFlow
      </span>
    </span>
  )
}
