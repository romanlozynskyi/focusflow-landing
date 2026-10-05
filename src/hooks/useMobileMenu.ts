import { useEffect, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const isTabbable = (el: HTMLElement) =>
  el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden'

type MobileMenuRefs = {
  /** The sticky header: it stays visible above the open menu and holds the toggle button. */
  header: RefObject<HTMLElement | null>
  menu: RefObject<HTMLElement | null>
  toggle: RefObject<HTMLElement | null>
}

/**
 * While the full-screen menu is open:
 * - the page behind it (`[data-menu-inert]`) is inert, so it can't be focused, clicked or read,
 * - Tab and Shift+Tab cycle through the header and the menu only,
 * - Escape closes the menu and returns focus to the toggle button,
 * - page scrolling is locked, and the menu closes if the viewport grows to the desktop layout.
 */
export function useMobileMenu(
  open: boolean,
  close: () => void,
  { header, menu, toggle }: MobileMenuRefs,
) {
  useEffect(() => {
    if (!open) return

    const inertTargets = document.querySelectorAll<HTMLElement>('[data-menu-inert]')
    inertTargets.forEach((el) => (el.inert = true))
    document.body.style.overflow = 'hidden'

    const tabbables = () =>
      [header.current, menu.current]
        .flatMap((root) => (root ? [...root.querySelectorAll<HTMLElement>(FOCUSABLE)] : []))
        .filter(isTabbable)

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        toggle.current?.focus()
        return
      }
      if (e.key !== 'Tab') return

      const items = tabbables()
      if (items.length === 0) return
      const index = items.indexOf(document.activeElement as HTMLElement)
      const first = items[0]
      const last = items[items.length - 1]

      if (e.shiftKey && index <= 0) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (index === -1 || index === items.length - 1)) {
        e.preventDefault()
        first.focus()
      }
    }

    const desktop = window.matchMedia('(min-width: 768px)')
    desktop.addEventListener('change', close)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      inertTargets.forEach((el) => (el.inert = false))
      document.body.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', close)
    }
  }, [open, close, header, menu, toggle])
}
