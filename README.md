# FocusFlow — landing page

Responsive landing page for **FocusFlow**, a made-up mobile focus-timer app.
Built with React 19, TypeScript and Tailwind CSS v4 on Vite.

**Live:** https://focusflow-landing-three.vercel.app

## Sections

Header (logo, menu, "Get Started") · Hero with an interactive focus-timer demo · Features (6) ·
How it works (3 steps) · Pricing (3 plans, monthly / yearly toggle) · Testimonials (3) · Download
call to action · Footer (product links, contact, social, copyright).

## Run locally

Requires Node.js `^20.19.0 || >=22.12.0` (the `engines` field in `package.json`).

```bash
npm ci            # or npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build to dist/
npm run preview   # serve the production build
npm run lint      # oxlint
npm run format    # prettier (with Tailwind class sorting)
```

## Structure

```
src/
  data/content.ts            all copy: nav, features, steps, plans, testimonials, footer, links
  hooks/useFocusTimer.ts     countdown used by the live demo in the hero
  hooks/useActiveSection.ts  which section is on screen, for the nav's active state
  hooks/useHashScroll.ts     lands on the section named in the URL hash (/#pricing)
  hooks/useMobileMenu.ts     focus trap, inert page, Escape and scroll lock for the open menu
  hooks/useReveal.ts         scroll-in reveal for elements with .reveal
  components/
    Header.tsx               sticky header and full-screen mobile menu
    Hero.tsx                 headline, CTAs, phone mockup
    PhoneMockup.tsx          interactive 60-second focus session
    FocusRing.tsx            SVG time-left ring (hero, steps, CTA band)
    Features.tsx             6 features with icons
    HowItWorks.tsx           3 steps with mini UI previews
    Pricing.tsx              3 plans, monthly / yearly toggle
    Testimonials.tsx         3 quotes
    CtaBand.tsx              download call to action
    Footer.tsx               product links, contact links, social, copyright
    ui/                      Button, Container, SectionHeading, Logo, SocialIcons
  index.css                  design tokens (@theme), reveal + reduced-motion rules
```

## Design notes

- Palette: Glacier `#EEF2F0`, Ink `#0F1B2D`, Signal `#FF5A1F`, Pine `#1E4D45`, Mist `#D6E0DC`, Peach `#FFE3D3`.
- Type: Bricolage Grotesque (display), Onest (body), JetBrains Mono (timer, prices, labels), all self-hosted via Fontsource.
- Every visual is built in code (SVG / CSS), so there are no image assets to load.
- Accessibility: text meets WCAG AA contrast, keyboard focus is visible, there is a skip link, and
  `prefers-reduced-motion` turns off animation.

## Demo content

FocusFlow is fictional, so the following is placeholder content:

- Ratings, usage numbers, testimonials and names are invented.
- The contact email uses the reserved `focusflow.example` domain, so it cannot reach anyone.
- `storeLinks` and `socialLinks` (including the Discord and LinkedIn contact links) in
  `src/data/content.ts` open the App Store, Google Play and the networks' home pages. Replace them
  with real listing, invite and profile URLs, and `contact.email` with a real address, before using
  this for a real product.

## Deploy

- **Vercel:** import the repo. The Vite preset is detected automatically (build command `npm run build`, output directory `dist`).
- **Netlify:** build command `npm run build`, publish directory `dist`.
