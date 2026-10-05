import { useEffect } from 'react'

/** Adds `is-visible` to every `.reveal` element the first time it scrolls into view. */
export function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal')
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
