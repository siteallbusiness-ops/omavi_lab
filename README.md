# Biotech Laboratory

Next.js application for **Biotech Laboratory** — specialty analytical testing for peptides and specialty compounds.

## Stack

- **Next.js 16** (App Router + Turbopack)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 4**
- **ESLint** + **Prettier**

## Getting started

```bash
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start local development (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run format` | Format with Prettier |

## Brand assets

In-app logo: `src/components/layout/logo.tsx` (SVG mark + Space Grotesk wordmark).

Typography: **Space Grotesk** (display) + **IBM Plex Sans** (body).

Favicons / OG (regenerate after mark changes):

```bash
node scripts/generate-brand-assets.mjs
```

Writes `src/app/icon.png`, `src/app/apple-icon.png`, `public/favicon.ico`, and `public/og-image.png`.

## Project structure

```text
src/
  app/           # Routes, layouts, and pages (App Router)
  components/    # Shared UI components
  hooks/         # Reusable React hooks
  lib/           # Utilities and shared helpers
  types/         # Shared TypeScript types
```

## Environment

See `.env.example` for required public variables.
