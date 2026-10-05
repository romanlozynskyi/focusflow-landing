import type { ReactNode } from 'react'
import { socialLinks } from '../../data/content'

type Social = { label: string; href: string; icon: ReactNode }

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const socials: Social[] = [
  {
    label: 'FocusFlow on X',
    href: socialLinks.x,
    icon: (
      <path
        fill="currentColor"
        transform="translate(3 3) scale(0.75)"
        d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      />
    ),
  },
  {
    label: 'FocusFlow on Instagram',
    href: socialLinks.instagram,
    icon: (
      <g {...stroke}>
        <rect width="20" height="20" x="2" y="2" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <path d="M17.5 6.5h.01" />
      </g>
    ),
  },
  {
    label: 'FocusFlow on LinkedIn',
    href: socialLinks.linkedin,
    icon: (
      <g {...stroke}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </g>
    ),
  },
  {
    label: 'FocusFlow on YouTube',
    href: socialLinks.youtube,
    icon: (
      <g {...stroke}>
        <path d="M2.5 17a24 24 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.6 49.6 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24 24 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.6 49.6 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </g>
    ),
  },
]

export function SocialIcons() {
  return (
    <ul className="flex gap-2">
      {socials.map(({ label, href, icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="grid size-10 place-items-center rounded-full border border-white/15 text-white/80 transition hover:border-signal hover:text-signal"
          >
            <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
              {icon}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
