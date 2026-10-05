import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently being read: the last one whose top edge has
 * passed 40% of the viewport. At the very bottom of the page the last id wins, so a short
 * final section (the footer) can still become active.
 *
 * `ids` must be in page order and referentially stable (define it at module level).
 */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null)

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const root = document.documentElement
      const atBottom = window.innerHeight + window.scrollY >= root.scrollHeight - 2
      const line = window.innerHeight * 0.4

      let current: string | null = null
      if (atBottom) {
        current = ids[ids.length - 1]
      } else {
        for (const id of ids) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= line) current = id
        }
      }
      setActive(current)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    // Late layout changes (web fonts, wrapping) move sections without a scroll event.
    const observer = new ResizeObserver(schedule)
    observer.observe(document.body)

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [ids])

  return active
}
