# Florida Best Mortgage AI-Editable Site

Astro static website for `floridabestmortgage.com`.

This project is designed for AI-assisted editing through Git. Content lives in structured files, pages are statically generated for speed and SEO, and deployment is intended to run automatically through GitHub Actions and Hostinger.

## Commands

```bash
npm install
npm run dev
npm run check
npm run build
npm run validate:seo
```

Local dev URL:

`http://127.0.0.1:4321/`

## Requirements

- Node `>=22.12.0`
- npm `11.6.1`

## Common Edits

- Business settings: `src/data/site.ts`
- Visual/media URLs: `src/data/media.ts`
- Navigation: `src/data/navigation.ts`
- Services: `src/content/services/`
- Location SEO pages: `src/content/locations/`
- Blog posts: `src/content/blog/`
- Shared layout: `src/layouts/BaseLayout.astro`
- Global styles: `src/styles/global.css`
- Home page composition: `src/pages/index.astro`

## Current Branch

Continue work on:

`feature/ai-editable-site`

## Handoff

Start with `HANDOFF.md`, then read:

- `docs/content-editing.md`
- `docs/deployment.md`
- `docs/migration.md`

