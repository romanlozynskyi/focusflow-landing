import { Menu, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { GET_STARTED_HREF, navLinks, trackedSections } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { useMobileMenu } from '../hooks/useMobileMenu'
import { Button } from './ui/Button'
import { Container } from './ui/Container'
import { Logo } from './ui/Logo'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const closeMenu = useCallback(() => setOpen(false), [])
  const active = useActiveSection(trackedSections)
  const isCurrent = (href: string) => active === href.slice(1)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useMobileMenu(open, closeMenu, { header: headerRef, menu: menuRef, toggle: toggleRef })

  const solid = scrolled || open

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          solid ? 'border-mist bg-glacier/85 backdrop-blur-md' : 'border-transparent'
        }`}
      >
        <Container className="flex h-16 items-center justify-between gap-6 md:h-18">
          <a href="#top" aria-label="FocusFlow home" onClick={() => setOpen(false)}>
            <Logo />
          </a>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1 lg:gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    aria-current={isCurrent(link.href) ? 'location' : undefined}
                    className={`relative block rounded-full px-3 py-2 text-sm font-medium transition hover:bg-white/70 hover:text-ink lg:px-4 ${
                      isCurrent(link.href) ? 'text-ink' : 'text-ink/70'
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-signal transition duration-300 ${
                        isCurrent(link.href) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <div className={`max-[359px]:hidden ${open ? 'max-md:invisible' : ''}`}>
              <Button href={GET_STARTED_HREF} className="max-md:h-10 max-md:px-4">
                Get Started
              </Button>
            </div>
            <button
              ref={toggleRef}
              type="button"
              className="grid size-11 place-items-center rounded-full border border-ink/10 bg-white/60 md:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </Container>
      </header>

      {/* Kept outside <header>: its backdrop-filter would become the containing block for `fixed`. */}
      <div
        ref={menuRef}
        id="mobile-menu"
        role="region"
        aria-label="Site menu"
        hidden={!open}
        className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-glacier md:hidden"
      >
        <Container className="flex min-h-full flex-col pt-6 pb-8">
          <nav aria-label="Mobile">
            <ul className="divide-y divide-mist border-y border-mist">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isCurrent(link.href) ? 'location' : undefined}
                    className="flex items-center justify-between py-4 font-display text-3xl font-semibold tracking-[-0.03em]"
                  >
                    {link.label}
                    {isCurrent(link.href) && (
                      <span aria-hidden="true" className="size-2 rounded-full bg-signal" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <Button
            href={GET_STARTED_HREF}
            size="lg"
            className="mt-8 w-full"
            onClick={() => setOpen(false)}
          >
            Get Started
          </Button>
          <p className="mt-4 text-center text-sm text-ink/65">Free on iOS and Android</p>
        </Container>
      </div>
    </>
  )
}
