# Florida Best Mortgage Site Handoff

## Project

AI-editable replacement website for `floridabestmortgage.com`.

The goal is to keep the site easy for Codex or another AI coding agent to edit through a normal Git repository, then deploy automatically to Hostinger without manual uploads.

## Current Location

Local worktree:

`C:\Users\Dan\florida-best-mortgage-ai-site\.worktrees\ai-editable-site`

Current branch:

`feature/ai-editable-site`

Latest commit at handoff:

`73c40ae docs: add project handoff note`

## What Is Built

- Astro static site using Astro 7.
- SEO-focused content structure.
- Structured content collections for services, locations, and blog posts.
- Initial mortgage content:
  - FHA Loans in Florida
  - VA Loans in Florida
  - First-Time Home Buyer Programs in Florida
  - Refinance Mortgage Florida
  - HELOC and Home Equity Loans
  - Naples Mortgage Broker
  - Fort Myers Mortgage Broker
  - Florida Mortgage Preapproval Guide blog post
- Pages/routes:
  - Home
  - Services index
  - Service detail pages
  - Location pages
  - Blog index
  - Blog post page
  - About
  - Contact
- Polished first visual pass:
  - dark blue/gold hero
  - Maria advisor panel
  - compliance/contact top bar
  - trust strip
  - stronger service card treatment
- Static-safe contact panel using phone/email CTAs instead of an unsupported POST form.

## Verified

These commands passed:

```bash
npm run check
npm run build
```

Build generated 13 pages.

The local dev server was viewed in Codex's built-in browser at:

`http://127.0.0.1:4321/`

## How To Run Locally

Requires Node `>=22.12.0` and npm `11.6.1`.

```bash
npm install
npm run dev -- --host 127.0.0.1 --port 4321
```

Then open:

`http://127.0.0.1:4321/`

## Important Files

- Business settings: `src/data/site.ts`
- Navigation: `src/data/navigation.ts`
- Content schema: `src/content.config.ts`
- Services: `src/content/services/`
- Locations: `src/content/locations/`
- Blog: `src/content/blog/`
- Layout shell: `src/layouts/BaseLayout.astro`
- Header/footer/global styles: `src/components/Header.astro`, `src/components/Footer.astro`, `src/styles/global.css`
- Home page: `src/pages/index.astro`
- Implementation plan: `docs/superpowers/plans/2026-07-07-ai-editable-mortgage-site.md`
- Design spec: `docs/superpowers/specs/2026-07-07-ai-editable-mortgage-site-design.md`

## Remaining Work

1. Complete formal review of Task 6 pages and routes.
2. Add SEO files and validation script:
   - `src/pages/robots.txt.ts`
   - `scripts/validate-seo.mjs`
   - `npm run validate:seo`
3. Add handoff documentation:
   - `README.md`
   - `docs/content-editing.md`
   - `docs/deployment.md`
   - `docs/migration.md`
4. Add GitHub Actions deployment workflow for Hostinger SSH deploy.
5. Run final local/browser verification.
6. Connect to GitHub and Hostinger staging.

## Hostinger Plan

Do not delete the current live site first.

Recommended migration:

1. Push this branch/repo to GitHub.
2. Configure Hostinger staging target, ideally `staging.floridabestmortgage.com` or `new.floridabestmortgage.com`.
3. Add GitHub secrets for Hostinger SSH deployment.
4. Deploy the new Astro build to staging.
5. Verify staging.
6. Back up old Hostinger site files.
7. Cut over production only after staging is approved.
8. Keep old site backup for rollback.

Expected GitHub secrets:

- `HOSTINGER_HOST`
- `HOSTINGER_USERNAME`
- `HOSTINGER_SSH_KEY`
- `HOSTINGER_PORT`
- `HOSTINGER_TARGET_DIR`
- Optional: `HOSTINGER_API_TOKEN`

Do not commit secret values.

## Notes For Next Codex User

The owner wants AI-first editing, not a drag-and-drop builder. Prefer editing structured content files before touching components.

SEO matters. Keep page titles/descriptions unique, preserve sitemap/robots generation, and avoid thin duplicate location/service pages.

The visual direction should feel more like a polished mortgage/lender site than a generic starter template. The current styling is improved but still open to refinement.
