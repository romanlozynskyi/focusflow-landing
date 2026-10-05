import {
  ChartColumn,
  Headphones,
  ListTodo,
  MonitorSmartphone,
  ShieldCheck,
  Timer,
  type LucideIcon,
} from 'lucide-react'

type NavLink = { label: string; href: string }

export const navLinks: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Sections that can be "current" in the sticky nav, in page order. Testimonials and the
 * download CTA have no nav item; tracking them keeps Pricing from staying highlighted below it.
 */
export const trackedSections = [
  'features',
  'how-it-works',
  'pricing',
  'testimonials',
  'download',
  'contact',
] as const

/** Every "Get Started" leads to the download CTA at the end of the page. */
export const GET_STARTED_HREF = '#download'

export const contact = {
  email: 'hello@focusflow.example',
}

/*
 * External destinations. These are placeholders until the app is published: they open the
 * store and network home pages. Replace them with the real listing and profile URLs.
 */
export const storeLinks = {
  ios: 'https://apps.apple.com/',
  android: 'https://play.google.com/store/apps',
}

export const socialLinks = {
  x: 'https://x.com/',
  instagram: 'https://www.instagram.com/',
  linkedin: 'https://www.linkedin.com/',
  youtube: 'https://www.youtube.com/',
  discord: 'https://discord.com/',
}

type Feature = { icon: LucideIcon; title: string; text: string }

export const features: Feature[] = [
  {
    icon: Timer,
    title: 'Focus sessions',
    text: 'Choose 15, 25, 50 or 90 minutes. The ring shows how much time is left at a glance, even from across the desk.',
  },
  {
    icon: ShieldCheck,
    title: 'Distraction shield',
    text: 'Pick the apps and sites that pull you away. They stay locked until the session ends.',
  },
  {
    icon: ListTodo,
    title: 'Task queue',
    text: 'Only the current task is on screen. Everything else waits in the queue, in the order you set.',
  },
  {
    icon: Headphones,
    title: 'Soundscapes',
    text: 'Rain, café murmur, brown noise or silence. Sound fades in when you start and out when you stop.',
  },
  {
    icon: ChartColumn,
    title: 'Focus insights',
    text: 'See how many hours you actually focused, at what time of day, and on which projects.',
  },
  {
    icon: MonitorSmartphone,
    title: 'Sync across devices',
    text: 'Start on your laptop, finish on your phone. Sessions and tasks stay in step on iOS, Android, Mac and Windows.',
  },
]

type Step = { title: string; text: string }

export const steps: Step[] = [
  {
    title: 'Pick one task',
    text: 'Write down the one thing you want to finish and choose how long you will give it.',
  },
  {
    title: 'Start a session',
    text: 'The shield switches on, notifications go quiet, and the ring starts counting down.',
  },
  {
    title: 'Review your day',
    text: 'When the ring closes, take a break. In the evening, see where your focused hours went.',
  },
]

export type Billing = 'monthly' | 'yearly'

export type Plan = {
  name: string
  audience: string
  price: Record<Billing, number>
  unit: string
  features: string[]
  cta: { label: string; href: string }
  featured?: boolean
}

export const plans: Plan[] = [
  {
    name: 'Free',
    audience: 'For trying a new routine',
    price: { monthly: 0, yearly: 0 },
    unit: 'forever',
    features: [
      'Unlimited focus sessions',
      'Block up to 3 apps',
      'Task queue with 10 tasks',
      '2 soundscapes',
    ],
    cta: { label: 'Get Started', href: GET_STARTED_HREF },
  },
  {
    name: 'Pro',
    audience: 'For people who focus every day',
    price: { monthly: 6, yearly: 4 },
    unit: 'per month',
    features: [
      'Everything in Free',
      'Block unlimited apps and sites',
      'Focus insights and weekly report',
      'All 24 soundscapes',
      'Sync across devices',
    ],
    cta: { label: 'Start 14-day free trial', href: GET_STARTED_HREF },
    featured: true,
  },
  {
    name: 'Team',
    audience: 'For teams that protect deep work',
    price: { monthly: 10, yearly: 8 },
    unit: 'per user / month',
    features: [
      'Everything in Pro',
      'Shared quiet hours for the team',
      'Team focus dashboard',
      'Admin controls and SSO',
      'Priority support',
    ],
    cta: {
      label: 'Contact sales',
      href: `mailto:${contact.email}?subject=${encodeURIComponent('FocusFlow Team plan')}`,
    },
  },
]

type Testimonial = { quote: string; name: string; role: string; tone: string }

export const testimonials: Testimonial[] = [
  {
    quote:
      'I used to start my mornings with forty open tabs. Now I start with one task and the ring. The first two hours are the best part of my day.',
    name: 'Marta Kovalenko',
    role: 'Product designer',
    tone: 'bg-peach text-signal-ink',
  },
  {
    quote:
      'The shield changed everything. I can’t “just check” Slack in the middle of a session, so I don’t.',
    name: 'Daniel Osei',
    role: 'Backend engineer',
    tone: 'bg-pine text-white',
  },
  {
    quote:
      'I’m writing my thesis in 50-minute sessions. The weekly report keeps me honest about how much I actually worked.',
    name: 'Sofia Lindqvist',
    role: 'PhD student',
    tone: 'bg-ink text-white',
  },
]

export const footerLinks: NavLink[] = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
]

type ContactLink = { label: string; href: string; external?: boolean }

export const contactLinks: ContactLink[] = [
  { label: 'Email', href: `mailto:${contact.email}` },
  { label: 'Discord', href: socialLinks.discord, external: true },
  { label: 'LinkedIn', href: socialLinks.linkedin, external: true },
]
