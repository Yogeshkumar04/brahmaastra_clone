# Brahmaastra homepage

Next.js App Router, strict TypeScript, Tailwind CSS v4 and ESLint. Existing
reference analysis and screenshots are preserved in `docs/`. The full homepage is implemented with the custom palette and verified at four viewport widths. Reference-based motion is implemented with reduced-motion support and a global pause control.

Local analysis, screenshots and QA reports are retained in the ignored `docs/` directory and are not included in the source upload. No deployment has been performed.

## Development

Requires Node.js 20.9+ and npm. Install with `npm ci`, then run `npm run dev`.
Open http://localhost:3000. Copy `.env.example` to `.env.local` if configuring the
site origin; set `NEXT_PUBLIC_SITE_URL` to the deployed origin before publishing.
No environment variables are required for local development.

## Commands

- `npm run dev`: development server
- `npm run build`: production build, including Next.js TypeScript validation
- `npm start`: serve the production build
- `npm run lint`: ESLint with no warnings allowed
- `npm run lint:fix`: apply automatic lint fixes
- `npm run typecheck`: standalone TypeScript check
- `npm run test`: deterministic REOS playback boundary tests

## Structure

```text
src/
  app/                 App Router pages, root layout, metadata, not-found and icon
  components/
    layout/            Shared site header/footer
    home/              Homepage sections
    motion/            Client-only animation boundaries when needed
    ui/                Typed reusable presentation components
  content/             Typed page content and site configuration
  styles/              Tailwind entrypoint and semantic palette tokens
  types/               Shared TypeScript contracts
public/assets/         Images, icons, fonts and videos
```

Use `@/*` imports for `src/*`. Components are Server Components by default.
Add `"use client"` only where interactivity requires it. GSAP, @gsap/react, Lenis and Lucide React are installed. `HeroMotion` scopes decorative GSAP particles; navigation uses a small client
boundary for scrolling, dismissal and its accessible mobile dialog.
`HomeMotion` mounts `SmoothScroll` once for the homepage; Unused initial motion/artwork wrappers were removed during production cleanup. Server Components pass content through their children. Semantic
palette and measured dimensions live in `src/styles/tokens.css`. Manrope, Anton
and DM Sans are self-hosted with license notices, so builds do not fetch fonts.
Repeated homepage copy and data live in `src/content/home.ts`.

Remaining sections use typed data and Server Components. FAQ and partner selection use controlled React state with native HTML fallbacks; scoped client boundaries handle progressive motion and floating CTA visibility.
Non-homepage navigation links currently resolve to the original reference website;
product subpages are not implemented locally. Reference brand asset provenance and
rights status are recorded in `public/assets/brand/README.md`.

The setup follows the official [Next.js installation guide](https://nextjs.org/docs/app/getting-started/installation)
and [Tailwind Next.js guide](https://tailwindcss.com/docs/installation/framework-guides/nextjs).

## Production checks and prerequisites

Run `npm run lint`, `npm run typecheck`, `npm run test`, then `npm run build`.
Use `npm start -- --port 3001` for a production preview alongside the development server.
Set `NEXT_PUBLIC_SITE_URL` to the final HTTPS origin in the build environment before release.
Hosting must support this Next.js version and built-in image optimization; static export is not configured.
Confirm reference asset reuse permissions before public distribution. Captions, artwork contrast,
physical devices and Safari/Firefox remain manual-review items; automated QA is not full accessibility certification.
