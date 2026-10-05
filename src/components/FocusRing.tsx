import type { ReactNode } from 'react'

type FocusRingProps = {
  /** Share of the session already elapsed, 0–1. */
  progress: number
  done?: boolean
  ticks?: boolean
  stroke?: number
  className?: string
  trackClassName?: string
  children?: ReactNode
}

const SIZE = 240
const CENTER = SIZE / 2
const RADIUS = 96
const CIRCUMFERENCE = 2 * Math.PI * RADIUS
const TICK_COUNT = 60

function polar(radius: number, turn: number) {
  const angle = turn * 2 * Math.PI - Math.PI / 2
  return { x: CENTER + radius * Math.cos(angle), y: CENTER + radius * Math.sin(angle) }
}

/**
 * Time-left ring: the orange arc shrinks clockwise from 12 o'clock as the session runs,
 * like a desk timer emptying.
 */
export function FocusRing({
  progress,
  done = false,
  ticks = false,
  stroke = 12,
  className = '',
  trackClassName = 'stroke-mist',
  children,
}: FocusRingProps) {
  const elapsed = Math.min(1, Math.max(0, progress))
  const hasArc = !done && elapsed < 0.999
  const knob = polar(RADIUS, elapsed)

  return (
    <div className={`relative aspect-square ${className}`}>
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="absolute inset-0 size-full"
        aria-hidden="true"
      >
        {ticks &&
          Array.from({ length: TICK_COUNT }, (_, i) => {
            const major = i % 5 === 0
            const from = polar(major ? 107 : 110, i / TICK_COUNT)
            const to = polar(116, i / TICK_COUNT)
            const passed = !done && i / TICK_COUNT < elapsed
            return (
              <line
                key={i}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                strokeWidth={major ? 2 : 1.25}
                strokeLinecap="round"
                className={passed ? 'stroke-ink/10' : 'stroke-ink/35'}
              />
            )
          })}

        <circle
          cx={CENTER}
          cy={CENTER}
          r={RADIUS}
          fill="none"
          strokeWidth={stroke}
          className={done ? 'stroke-pine' : trackClassName}
        />

        {hasArc && (
          <>
            <circle
              cx={CENTER}
              cy={CENTER}
              r={RADIUS}
              fill="none"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
              strokeDashoffset={-CIRCUMFERENCE * elapsed}
              transform={`rotate(-90 ${CENTER} ${CENTER})`}
              className="stroke-signal"
            />
            {elapsed > 0 && (
              <circle
                cx={knob.x}
                cy={knob.y}
                r={stroke / 2 + 3}
                className="fill-white stroke-signal"
                strokeWidth={3}
              />
            )}
          </>
        )}
      </svg>
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {children}
        </div>
      )}
    </div>
  )
}
