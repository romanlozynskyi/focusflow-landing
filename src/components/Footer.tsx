import { ArrowUp } from 'lucide-react'
import { contactLinks, footerLinks } from '../data/content'
import { Container } from './ui/Container'
import { Logo } from './ui/Logo'
import { SocialIcons } from './ui/SocialIcons'

const year = new Date().getFullYear()
const linkClass = 'text-white/65 transition hover:text-white'
const headingClass = 'font-mono text-xs tracking-[0.16em] text-white/55 uppercase'

export function Footer() {
  return (
    <footer id="contact" data-menu-inert className="bg-ink pt-16 pb-10 text-white sm:pt-20">
      <Container>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-8 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-y-12">
          <div className="col-span-2 lg:col-span-1">
            <Logo tone="dark" />
            <p className="mt-4 max-w-xs leading-relaxed text-white/65">
              A focus timer that silences distractions and keeps one task in view.
            </p>
            <div className="mt-6">
              <SocialIcons />
            </div>
          </div>

          <nav aria-labelledby="footer-product-title">
            <h2 id="footer-product-title" className={headingClass}>
              Product
            </h2>
            <ul className="mt-5 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className={linkClass}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingClass}>Contact</h2>
            <ul className="mt-5 space-y-3">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={linkClass}
                    {...(link.external && { target: '_blank', rel: 'noreferrer' })}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-white/50 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} FocusFlow. All rights reserved.</p>
          <a href="#top" className={`inline-flex items-center gap-1.5 ${linkClass}`}>
            Back to top
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  )
}
