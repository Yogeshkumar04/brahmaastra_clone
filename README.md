# Brahmaastra Homepage

A responsive frontend recreation of [brahmaastra.ai](https://brahmaastra.ai/), built with a custom dark palette and interactive motion.

**[Live demo](https://brahmaastra-clone.vercel.app/)**

## Features

- Responsive homepage with reusable components and typed content.
- GSAP and ScrollTrigger animations, SVG artwork, and Lenis smooth scrolling.
- Mobile navigation, FAQ accordion, partner carousel, and deterministic REOS conversation demo.
- Keyboard navigation, reduced-motion support, and readable content before animation initialization.
- Self-hosted fonts, Next.js image optimization, and page metadata.

## Tech stack

Next.js App Router, React, TypeScript, Tailwind CSS, GSAP, Lenis, and Lucide React.
Server Components render page content; Client Components handle interactions and animation.

## Local setup

Requires Node.js 20.9 or later and npm.

```bash
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000).
No environment variables are required for local development. To configure the site origin,
copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`.
For production, use the deployed HTTPS origin in the build environment.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Apply automatic lint fixes |
| `npm run typecheck` | Validate TypeScript |
| `npm test` | Run REOS playback tests |

## Project structure

```text
src/
  app/                 Pages, root layout, metadata, and app icon
  components/
    home/              Homepage sections and interactions
    layout/            Shared navigation and footer
    motion/            Scoped animation and scrolling
    ui/                Reusable presentation components
  content/             Typed content and asset mappings
  lib/                 Playback logic
  styles/              Fonts, styles, and design tokens
  types/               Shared TypeScript types
public/assets/         Images, SVGs, fonts, and video
tests/                 Playback tests
```

## Scope and attribution

This project implements the homepage. Product links lead to the reference website;
the REOS conversation is a frontend demo with no backend integration.

The reference design, brand marks, partner logos, artwork, and marketing video belong
to their respective owners. No redistribution license was identified for the reference
assets. Asset source records are retained in `public/assets/reference/sources.json`;
brand assets originate from the reference site's `/global/main-logo.png`,
`/global/small-logo.svg`, `/svg/trishul/trishul-small.svg`, and `/images/newhome/rios.png`.
The video poster is a frame captured from the reference video.
Font source records and Open Font License notices are included in `public/assets/fonts/`.
