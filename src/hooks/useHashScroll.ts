import { useEffect } from 'react'

/**
 * Opening the page with a hash (`/#pricing`) should land on that section. The page is rendered
 * by React after the browser has already tried, and failed, to jump to the fragment, so do it
 * here. Fonts and other late layout changes would push the section away from the top, so keep
 * it aligned until the visitor first scrolls, taps or presses a key (or after a short timeout).
 */
export function useHashScroll() {
  useEffect(() => {
    let id: string
    try {
      id = decodeURIComponent(window.location.hash.slice(1))
    } catch {
      return
    }
    if (!id || !document.getElementById(id)) return

    const align = () => document.getElementById(id)?.scrollIntoView({ behavior: 'instant' })
    const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const

    const observer = new ResizeObserver(align)
    const stop = () => {
      observer.disconnect()
      window.clearTimeout(timer)
      events.forEach((name) => window.removeEventListener(name, stop))
    }
    const timer = window.setTimeout(stop, 2500)

    events.forEach((name) => window.addEventListener(name, stop, { passive: true }))
    observer.observe(document.body)
    return stop
  }, [])
}
