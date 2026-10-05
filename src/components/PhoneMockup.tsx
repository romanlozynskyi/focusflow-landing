import { BellOff, Headphones, Pause, Play, RotateCcw, ShieldCheck } from 'lucide-react'
import { formatClock, useFocusTimer, type TimerStatus } from '../hooks/useFocusTimer'
import { FocusRing } from './FocusRing'

const DEMO_MS = 60_000
const EQ_BARS = [0.5, 0.9, 0.6, 1, 0.7]

const statusCopy: Record<TimerStatus, { label: string; shield: string }> = {
  idle: { label: 'Ready', shield: 'Shield ready · 14 apps' },
  running: { label: 'Focusing', shield: 'Shield on · 14 apps quiet' },
  paused: { label: 'Paused', shield: 'Shield on · 14 apps quiet' },
  done: { label: 'Session done', shield: 'Shield off · take a break' },
}

const primaryLabel: Record<TimerStatus, string> = {
  idle: 'Start focus',
  running: 'Pause',
  paused: 'Resume',
  done: 'Start again',
}

export function PhoneMockup() {
  const { status, remaining, progress, start, pause, reset } = useFocusTimer(DEMO_MS)
  const running = status === 'running'
  const done = status === 'done'

  return (
    <figure className="relative mx-auto w-[280px] sm:w-[310px]">
      {/* Floating context chips: what the shield and queue are doing right now.
          They overlap only the phone frame, so they're hidden where the layout has no side room. */}
      <div
        aria-hidden="true"
        className="absolute top-14 -left-[188px] z-10 hidden w-52 items-center gap-3 rounded-2xl border border-mist bg-white/90 p-3 shadow-[0_18px_40px_-20px_rgba(15,27,45,0.45)] backdrop-blur md:max-lg:flex xl:flex"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-peach text-signal-ink">
          <BellOff className="size-4" />
        </span>
        <span className="text-xs leading-snug text-ink/70">
          <strong className="block text-sm font-semibold text-ink">Instagram is muted</strong>
          until this session ends
        </span>
      </div>
      <div
        aria-hidden="true"
        className="absolute -right-[172px] bottom-32 z-10 hidden w-48 rounded-2xl border border-mist bg-white/90 p-3 shadow-[0_18px_40px_-20px_rgba(15,27,45,0.45)] backdrop-blur min-[1360px]:block md:max-lg:block"
      >
        <span className="font-mono text-[10px] tracking-[0.16em] text-ink/65 uppercase">
          Up next
        </span>
        <span className="mt-1 block text-sm font-semibold">Reply to Lena’s notes</span>
        <span className="mt-2 flex gap-1" aria-hidden="true">
          <span className="h-1 w-6 rounded-full bg-signal" />
          <span className="h-1 w-6 rounded-full bg-mist" />
          <span className="h-1 w-6 rounded-full bg-mist" />
        </span>
      </div>

      <div className="rounded-[3rem] bg-ink p-2.5 shadow-[0_50px_80px_-40px_rgba(15,27,45,0.6),inset_0_0_0_1.5px_rgba(255,255,255,0.08)]">
        <div className="relative flex aspect-[9/19] flex-col overflow-hidden rounded-[2.5rem] bg-[#fbfcfb] px-5 pt-3 pb-6">
          <div className="absolute top-2.5 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-ink" />

          <div className="flex justify-between px-2 text-[11px] font-semibold" aria-hidden="true">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-2.5 w-4 rounded-[3px] border border-ink/70" />
            </span>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <span className="font-mono text-[10px] tracking-[0.16em] text-ink/65 uppercase">
              Session 2 of 4
            </span>
            <span className="flex gap-1">
              <span className="size-1.5 rounded-full bg-pine" />
              <span className={`size-1.5 rounded-full ${done ? 'bg-pine' : 'bg-signal'}`} />
              <span className="size-1.5 rounded-full bg-mist" />
              <span className="size-1.5 rounded-full bg-mist" />
            </span>
          </div>

          <div className="mt-3 rounded-2xl border border-mist bg-white px-4 py-3">
            <span className="font-mono text-[10px] tracking-[0.16em] text-signal-ink uppercase">
              Now
            </span>
            <p className="mt-0.5 font-display text-[17px] leading-tight font-semibold tracking-[-0.02em]">
              Draft the Q4 report outline
            </p>
          </div>

          <FocusRing progress={progress} done={done} ticks className="mx-auto mt-4 w-[88%]">
            <span className="font-mono text-[10px] tracking-[0.16em] text-ink/65 uppercase">
              {statusCopy[status].label}
            </span>
            <span
              role="timer"
              aria-label={`${formatClock(remaining)} left`}
              className="mt-1 font-mono text-[42px] leading-none font-medium tracking-[-0.04em] tabular-nums"
            >
              {formatClock(remaining)}
            </span>
          </FocusRing>

          <p
            className={`mx-auto mt-3 flex items-center gap-1.5 text-xs font-medium ${
              status === 'idle' ? 'text-ink/65' : 'text-pine'
            }`}
          >
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            {statusCopy[status].shield}
          </p>

          <div className="mt-auto mb-3 flex items-center gap-3 rounded-2xl bg-glacier px-3.5 py-2.5">
            <Headphones className="size-4 text-ink/65" aria-hidden="true" />
            <span className="flex-1 text-xs font-medium">Soft rain</span>
            <span className="flex h-4 items-end gap-[3px]" aria-hidden="true">
              {EQ_BARS.map((height, i) => (
                <span
                  key={i}
                  className={`w-[3px] origin-bottom rounded-full ${
                    running ? 'animate-eq bg-signal' : 'bg-ink/25'
                  }`}
                  style={{ height: `${height * 100}%`, animationDelay: `${i * 0.12}s` }}
                />
              ))}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={reset}
              disabled={status === 'idle'}
              aria-label="Reset demo session"
              className="grid size-12 shrink-0 place-items-center rounded-full border border-mist text-ink transition hover:bg-glacier disabled:opacity-40"
            >
              <RotateCcw className="size-4" />
            </button>
            <button
              type="button"
              onClick={running ? pause : start}
              className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-sm font-semibold transition ${
                running ? 'bg-ink text-white' : 'bg-signal text-ink'
              }`}
            >
              {running ? <Pause className="size-4" /> : <Play className="size-4" />}
              {primaryLabel[status]}
            </button>
          </div>
        </div>
      </div>

      <figcaption className="mt-5 text-center font-mono text-xs text-ink/65">
        Tap Start to try a 60-second session.
      </figcaption>
      <p className="sr-only" aria-live="polite">
        {status === 'done' ? 'Demo session complete.' : ''}
      </p>
    </figure>
  )
}
