import { useCallback, useEffect, useRef, useState } from 'react'

export type TimerStatus = 'idle' | 'running' | 'paused' | 'done'

/** Countdown driven by wall-clock time, so it stays accurate if frames are dropped. */
export function useFocusTimer(durationMs: number) {
  const [remaining, setRemaining] = useState(durationMs)
  const [status, setStatus] = useState<TimerStatus>('idle')
  const endAt = useRef(0)

  useEffect(() => {
    if (status !== 'running') return

    let frame = 0
    const tick = () => {
      const left = Math.max(0, endAt.current - performance.now())
      setRemaining(left)
      if (left === 0) {
        setStatus('done')
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [status])

  const start = useCallback(() => {
    const from = status === 'done' ? durationMs : remaining
    setRemaining(from)
    endAt.current = performance.now() + from
    setStatus('running')
  }, [durationMs, remaining, status])

  const pause = useCallback(() => setStatus('paused'), [])

  const reset = useCallback(() => {
    setStatus('idle')
    setRemaining(durationMs)
  }, [durationMs])

  return {
    status,
    remaining,
    progress: 1 - remaining / durationMs,
    start,
    pause,
    reset,
  }
}

export function formatClock(ms: number) {
  const total = Math.ceil(ms / 1000)
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}
