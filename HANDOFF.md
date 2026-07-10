# Florida Best Mortgage Site Handoff

## Project

AI-editable replacement website for `floridabestmortgage.com`.

The goal is to keep the site easy for Codex or another AI coding agent to edit through a normal Git repository, then deploy automatically to Hostinger without manual uploads.

## Current Location

Local worktree:

`C:\Users\Dan\florida-best-mortgage-ai-site\.worktrees\ai-editable-site`

Current branch:

`feature/ai-editable-site`

Handoff branch head:

Use the latest commit on `feature/ai-editable-site`.

## What Is Built

- Astro static site using Astro 7.
- SEO-focused content structure.
- Structured content collections for services, locations, and blog posts.
- Mortgage service content:
  - FHA Loans in Florida
  - VA Loans in Florida
  - First-Time Home Buyer Programs in Florida
  - Refinance Mortgage Florida
  - HELOC and Home Equity Loans
  - Condo Loans in Florida
  - Construction Loans in Florida
  - DSCR Loans in Florida
  - Jumbo Loans in Florida
  - Non-QM Loans in Florida
  - Renovation Loans in Florida
  - Reverse Mortgage Guidance in Florida
  - USDA Loans in Florida
- Southwest Florida location content:
  - Naples Mortgage Broker
  - Fort Myers Mortgage Broker
  - Ave Maria Mortgage Broker
  - Bonita Springs Mortgage Broker
  - Cape Coral Mortgage Broker
  - Estero Mortgage Broker
  - Golden Gate Mortgage Broker
  - Lehigh Acres Mortgage Broker
  - Marco Island Mortgage Broker
- Blog/resource content for preapproval, document checklists, closing dos and don'ts, condos, flood insurance, Naples jumbo loans, DSCR rentals, HELOC vs cash-out refinance, broker vs bank, and new-to-Florida buying.
- Pages/routes:
  - Home
  - Calculators
  - Spanish `/es/` entry, contact, about, service index, and service detail pages
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
- BreadcrumbList, FAQPage, BlogPosting, and MortgageBroker structured data on relevant pages.

## Verified

These commands passed:

```bash
npm run validate:seo
```

Build generated 56 pages and SEO validation passed.

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

1. Review the new SEO content with Maria for licensing/compliance accuracy and preferred wording.
2. Replace generic Spanish service copy with full human-approved Spanish translations where needed.
3. Add real testimonials/reviews only if they can be verified and approved.
4. Connect GitHub Actions to Hostinger SSH secrets and deploy to staging.
5. Run final staging browser verification before any production cutover.

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
