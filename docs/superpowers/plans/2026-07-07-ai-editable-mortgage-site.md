# AI-Editable Mortgage Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an SEO-focused Astro static site for `floridabestmortgage.com` that AI can edit through Git and deploy automatically to Hostinger.

**Architecture:** Astro generates static pages from structured content collections for services, locations, FAQs, and blog posts. Shared layouts/components handle SEO metadata, schema JSON-LD, navigation, contact calls to action, and responsive presentation. GitHub Actions builds the site and deploys the static output to Hostinger through either native Git deploy or SSH sync.

**Tech Stack:** Astro, TypeScript, Markdown/MDX content collections, CSS, GitHub Actions, Hostinger Git/SSH deployment.

---

## File Structure

- `package.json`: npm scripts and project dependencies.
- `astro.config.mjs`: Astro configuration, site URL, sitemap integration.
- `tsconfig.json`: TypeScript settings.
- `src/content/config.ts`: Content collection schemas for services, locations, blog, FAQs, testimonials.
- `src/content/services/*.md`: Editable mortgage service pages.
- `src/content/locations/*.md`: Editable local SEO pages.
- `src/content/blog/*.md`: Editable blog posts.
- `src/data/site.ts`: Global business settings and compliance text.
- `src/data/navigation.ts`: Header and footer navigation.
- `src/layouts/BaseLayout.astro`: Shared HTML shell, metadata, schema injection.
- `src/components/*.astro`: Header, footer, hero, service grid, FAQ list, CTA band, contact form shell.
- `src/pages/index.astro`: Home page.
- `src/pages/services/index.astro`: Services index page.
- `src/pages/services/[slug].astro`: Generated service detail pages.
- `src/pages/locations/[slug].astro`: Generated location landing pages.
- `src/pages/blog/index.astro`: Blog index page.
- `src/pages/blog/[slug].astro`: Generated blog post pages.
- `src/pages/about.astro`: About page.
- `src/pages/contact.astro`: Contact page.
- `src/pages/robots.txt.ts`: Generated robots file.
- `public/images/`: Optimized site images and Open Graph images.
- `.github/workflows/deploy.yml`: Build and deploy workflow.
- `README.md`: Project overview, local commands, deployment workflow.
- `docs/content-editing.md`: Handoff guide for future Codex users.
- `docs/deployment.md`: Hostinger and GitHub setup notes.
- `docs/migration.md`: Staging, backup, cutover, and rollback procedure.

---

### Task 1: Scaffold Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `src/env.d.ts`
- Create: `.gitignore`

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "florida-best-mortgage-ai-site",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "packageManager": "npm@11.6.1",
  "engines": {
    "node": ">=22.12.0"
  },
  "scripts": {
    "dev": "astro dev",
    "build": "astro check && astro build",
    "preview": "astro preview",
    "check": "astro check"
  },
  "dependencies": {
    "@astrojs/check": "^0.9.9",
    "@astrojs/sitemap": "^3.7.3",
    "astro": "^7.0.6",
    "typescript": "^6.0.3"
  },
  "devDependencies": {}
}
```

- [ ] **Step 2: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://floridabestmortgage.com',
  integrations: [sitemap()],
  output: 'static'
});
```

- [ ] **Step 3: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@content/*": ["src/content/*"],
      "@data/*": ["src/data/*"],
      "@layouts/*": ["src/layouts/*"],
      "@styles/*": ["src/styles/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```

- [ ] **Step 4: Create `src/env.d.ts`**

```ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
```

- [ ] **Step 5: Create `.gitignore`**

```gitignore
node_modules/
dist/
.astro/
.env
.env.*
!.env.example
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`

Expected: `package-lock.json` is created and dependencies install without errors.

- [ ] **Step 7: Run initial check**

Run: `npm run check`

Expected: Astro check completes successfully.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/env.d.ts .gitignore
git commit -m "chore: scaffold Astro site"
```

---

### Task 2: Add Global Data And Content Schemas

**Files:**
- Create: `src/data/site.ts`
- Create: `src/data/navigation.ts`
- Create: `src/content/config.ts`

- [ ] **Step 1: Create `src/data/site.ts`**

```ts
export const site = {
  name: 'Florida Best Mortgage',
  legalName: 'Dinerofacil LLC',
  url: 'https://floridabestmortgage.com',
  description: 'Florida mortgage guidance for home buyers, refinancers, veterans, and homeowners exploring loan options.',
  phone: '(239) 860-7763',
  phoneHref: 'tel:+12398607763',
  email: 'zuluaga.maria@gmail.com',
  emailHref: 'mailto:zuluaga.maria@gmail.com',
  address: {
    street: '3757 Tamiami Trail N',
    city: 'Naples',
    region: 'FL',
    postalCode: '34103',
    country: 'US'
  },
  advisor: {
    name: 'Maria Zuluaga',
    nmls: '242841'
  },
  companyNmls: '2746598',
  nmls: 'Maria Zuluaga, NMLS #242841 | Dinerofacil LLC, NMLS #2746598',
  equalHousingText: 'Maria Zuluaga, NMLS #242841, and Dinerofacil LLC, NMLS #2746598, provide mortgage loan origination services in Florida. Information on this website is for general informational purposes only and is not a commitment to lend or extend credit. Loan approval, interest rates, terms, and programs are subject to borrower qualification, lender approval, and applicable underwriting guidelines. Equal Housing Opportunity.',
  defaultOgImage: '/images/og-florida-best-mortgage.jpg'
} as const;
```

- [ ] **Step 2: Create `src/data/navigation.ts`**

```ts
export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'About', href: '/about/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' }
];

export const footerNav = [
  { label: 'FHA Loans', href: '/services/fha-loans-florida/' },
  { label: 'VA Loans', href: '/services/va-loans-florida/' },
  { label: 'Refinance', href: '/services/refinance-mortgage-florida/' },
  { label: 'Naples Mortgage Broker', href: '/locations/naples-mortgage-broker/' },
  { label: 'Fort Myers Mortgage Broker', href: '/locations/fort-myers-mortgage-broker/' }
];
```

- [ ] **Step 3: Create `src/content/config.ts`**

```ts
import { defineCollection, z } from 'astro:content';

const seoSchema = z.object({
  title: z.string(),
  description: z.string(),
  canonical: z.string().optional(),
  ogImage: z.string().optional()
});

const services = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    order: z.number(),
    ctaLabel: z.string().default('Talk with a mortgage advisor'),
    seo: seoSchema,
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).default([])
  })
});

const locations = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    city: z.string(),
    region: z.string().default('Florida'),
    summary: z.string(),
    seo: seoSchema,
    faqs: z.array(z.object({
      question: z.string(),
      answer: z.string()
    })).default([])
  })
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default([]),
    seo: seoSchema
  })
});

export const collections = {
  services,
  locations,
  blog
};
```

- [ ] **Step 4: Run schema check**

Run: `npm run check`

Expected: PASS with no TypeScript or Astro content schema errors.

- [ ] **Step 5: Commit**

```bash
git add src/data/site.ts src/data/navigation.ts src/content/config.ts
git commit -m "feat: add site data and content schemas"
```

---

### Task 3: Add Seed Content

**Files:**
- Create: `src/content/services/fha-loans-florida.md`
- Create: `src/content/services/va-loans-florida.md`
- Create: `src/content/services/first-time-home-buyer-programs-florida.md`
- Create: `src/content/services/refinance-mortgage-florida.md`
- Create: `src/content/services/heloc-home-equity-loans.md`
- Create: `src/content/locations/naples-mortgage-broker.md`
- Create: `src/content/locations/fort-myers-mortgage-broker.md`
- Create: `src/content/blog/florida-mortgage-preapproval-guide.md`

- [ ] **Step 1: Create `src/content/services/fha-loans-florida.md`**

```md
---
title: "FHA Loans in Florida"
slug: "fha-loans-florida"
summary: "Flexible mortgage options for Florida buyers who want a lower down payment path."
order: 1
seo:
  title: "FHA Loans in Florida | Florida Best Mortgage"
  description: "Learn how FHA loans can help Florida home buyers qualify with flexible credit and down payment options."
faqs:
  - question: "Who is a good fit for an FHA loan in Florida?"
    answer: "FHA loans can be a fit for buyers who want flexible credit guidelines or a lower down payment option, subject to lender approval and program requirements."
  - question: "Can first-time buyers use FHA financing?"
    answer: "Yes. Many first-time buyers consider FHA financing, though eligibility depends on credit, income, property, and current FHA guidelines."
---

FHA loans are popular with Florida buyers because they may offer flexible qualification standards and a lower down payment path than some conventional programs.

Florida Best Mortgage helps buyers compare FHA options with conventional, VA, and other loan programs so they can choose a path that fits their budget and goals.
```

- [ ] **Step 2: Create `src/content/services/va-loans-florida.md`**

```md
---
title: "VA Loans in Florida"
slug: "va-loans-florida"
summary: "Mortgage options for eligible veterans, active-duty service members, and qualifying surviving spouses."
order: 2
seo:
  title: "VA Loans in Florida | Florida Best Mortgage"
  description: "Explore VA loan options in Florida with guidance for eligible veterans, service members, and qualifying spouses."
faqs:
  - question: "Who may qualify for a VA loan?"
    answer: "VA loan eligibility is based on military service history, certificate of eligibility requirements, lender approval, and property guidelines."
---

VA loans can help eligible Florida buyers purchase or refinance with benefits created for military borrowers.

Florida Best Mortgage helps clients compare VA financing with other available loan options and understand the documentation needed to move forward.
```

- [ ] **Step 3: Create `src/content/services/first-time-home-buyer-programs-florida.md`**

```md
---
title: "First-Time Home Buyer Programs in Florida"
slug: "first-time-home-buyer-programs-florida"
summary: "Guidance for Florida buyers comparing down payment assistance, FHA, conventional, and other first-home options."
order: 3
seo:
  title: "First-Time Home Buyer Programs Florida | Florida Best Mortgage"
  description: "Compare Florida first-time home buyer programs, down payment options, and mortgage paths with Florida Best Mortgage."
faqs:
  - question: "Are there down payment assistance options in Florida?"
    answer: "Some Florida buyers may qualify for down payment assistance or grant programs, depending on income, location, property type, and program availability."
---

Buying your first home is easier when the loan options, payment expectations, and required documents are clear from the beginning.

Florida Best Mortgage helps first-time buyers compare programs and prepare for the preapproval process.
```

- [ ] **Step 4: Create `src/content/services/refinance-mortgage-florida.md`**

```md
---
title: "Refinance Mortgage Florida"
slug: "refinance-mortgage-florida"
summary: "Refinance guidance for Florida homeowners considering rate-and-term, cash-out, or loan program changes."
order: 4
seo:
  title: "Refinance Mortgage Florida | Florida Best Mortgage"
  description: "Explore Florida mortgage refinance options including rate-and-term refinancing, cash-out refinance, and home equity strategies."
faqs:
  - question: "When does refinancing make sense?"
    answer: "Refinancing may make sense when it lowers costs, changes loan terms, accesses equity, or better matches the homeowner's financial goals."
---

Refinancing can help Florida homeowners reduce payments, adjust loan terms, or access equity when the numbers support the decision.

Florida Best Mortgage reviews the current loan, goals, and available options before recommending a refinance path.
```

- [ ] **Step 5: Create `src/content/services/heloc-home-equity-loans.md`**

```md
---
title: "HELOC and Home Equity Loans"
slug: "heloc-home-equity-loans"
summary: "Home equity guidance for Florida homeowners comparing HELOCs, fixed second loans, and cash-out refinance options."
order: 5
seo:
  title: "HELOC and Home Equity Loans Florida | Florida Best Mortgage"
  description: "Compare HELOC, fixed second mortgage, and cash-out refinance options for Florida homeowners."
faqs:
  - question: "Is a HELOC the same as a cash-out refinance?"
    answer: "No. A HELOC is usually a separate line of credit, while cash-out refinancing replaces the current mortgage with a new loan."
---

Home equity options can support renovations, debt consolidation, reserves, or other financial goals when structured carefully.

Florida Best Mortgage helps homeowners compare HELOCs, fixed second loans, and cash-out refinance options.
```

- [ ] **Step 6: Create location files**

Use this exact structure for `src/content/locations/naples-mortgage-broker.md`, then create a matching Fort Myers file.

```md
---
title: "Naples Mortgage Broker"
slug: "naples-mortgage-broker"
city: "Naples"
summary: "Mortgage guidance for Naples home buyers, refinancers, and homeowners comparing loan options."
seo:
  title: "Naples Mortgage Broker | Florida Best Mortgage"
  description: "Work with Florida Best Mortgage for Naples mortgage guidance, refinancing options, and home loan support."
faqs:
  - question: "Does Florida Best Mortgage help buyers in Naples?"
    answer: "Yes. Florida Best Mortgage helps buyers and homeowners in Naples compare mortgage and refinance options."
---

Buying or refinancing in Naples requires clear guidance, responsive communication, and loan options matched to the local market.

Florida Best Mortgage helps Naples clients understand available programs and prepare for the mortgage process with confidence.
```

- [ ] **Step 7: Create `src/content/blog/florida-mortgage-preapproval-guide.md`**

```md
---
title: "Florida Mortgage Preapproval Guide"
slug: "florida-mortgage-preapproval-guide"
description: "A practical guide to mortgage preapproval for Florida home buyers."
publishDate: 2026-07-07
tags: ["preapproval", "home buying", "Florida mortgage"]
seo:
  title: "Florida Mortgage Preapproval Guide | Florida Best Mortgage"
  description: "Learn what Florida buyers should know about mortgage preapproval before shopping for a home."
---

Mortgage preapproval helps Florida buyers understand their budget, prepare documentation, and make stronger offers when they find the right home.

Before applying, gather income documents, asset statements, identification, and details about debts or current housing expenses. A mortgage advisor can help compare loan programs and explain what the numbers mean before you make an offer.
```

- [ ] **Step 8: Run content validation**

Run: `npm run check`

Expected: PASS and no content schema errors.

- [ ] **Step 9: Commit**

```bash
git add src/content
git commit -m "feat: add initial mortgage site content"
```

---

### Task 4: Build Layout, SEO Helpers, Header, And Footer

**Files:**
- Create: `src/utils/schema.ts`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`
- Create: `src/components/Footer.astro`
- Create: `src/styles/global.css`

- [ ] **Step 1: Create `src/utils/schema.ts`**

```ts
import { site } from '@data/site';

export function mortgageBrokerSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MortgageBroker',
    name: site.legalName,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      addressRegion: site.address.region,
      addressCountry: site.address.country
    }
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}
```

- [ ] **Step 2: Create `src/layouts/BaseLayout.astro`**

```astro
---
import Header from '@components/Header.astro';
import Footer from '@components/Footer.astro';
import { site } from '@data/site';
import '@styles/global.css';

type Props = {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  schema?: Record<string, unknown> | Record<string, unknown>[];
};

const { title, description, canonical, ogImage = site.defaultOgImage, schema } = Astro.props;
const canonicalUrl = canonical ?? new URL(Astro.url.pathname, site.url).toString();
const schemas = Array.isArray(schema) ? schema : schema ? [schema] : [];
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonicalUrl} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalUrl} />
    <meta property="og:image" content={new URL(ogImage, site.url).toString()} />
    {schemas.map((item) => <script type="application/ld+json" set:html={JSON.stringify(item)} />)}
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

- [ ] **Step 3: Create `src/components/Header.astro` and `Footer.astro`**

Header should render `primaryNav`, a phone link, and a contact button. Footer should render `footerNav`, business contact details, NMLS text, and Equal Housing Opportunity text.

- [ ] **Step 4: Create `src/styles/global.css`**

Use a restrained professional palette with high contrast, responsive layout utilities, and no single-hue dominant theme. Include styles for `.container`, `.section`, `.button`, `.grid`, `.card`, and form elements.

- [ ] **Step 5: Run check**

Run: `npm run check`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/utils/schema.ts src/layouts/BaseLayout.astro src/components/Header.astro src/components/Footer.astro src/styles/global.css
git commit -m "feat: add base layout and site chrome"
```

---

### Task 5: Build Core Reusable Components

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/components/ServiceGrid.astro`
- Create: `src/components/FaqList.astro`
- Create: `src/components/CtaBand.astro`
- Create: `src/components/ContactPanel.astro`

- [ ] **Step 1: Create component files**

Implement focused components:

```astro
--- 
// Hero.astro props
type Props = {
  eyebrow?: string;
  title: string;
  lead: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};
const props = Astro.props;
---

<section class="hero section">
  <div class="container hero__inner">
    {props.eyebrow && <p class="eyebrow">{props.eyebrow}</p>}
    <h1>{props.title}</h1>
    <p class="lead">{props.lead}</p>
    <div class="actions">
      {props.primaryHref && <a class="button" href={props.primaryHref}>{props.primaryLabel}</a>}
      {props.secondaryHref && <a class="button button--secondary" href={props.secondaryHref}>{props.secondaryLabel}</a>}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Add service, FAQ, CTA, and contact markup**

Keep components presentation-only. Pass data through props. Do not fetch collections inside generic components.

- [ ] **Step 3: Run check**

Run: `npm run check`

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro src/components/ServiceGrid.astro src/components/FaqList.astro src/components/CtaBand.astro src/components/ContactPanel.astro
git commit -m "feat: add reusable marketing components"
```

---

### Task 6: Build Pages And Routes

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/services/index.astro`
- Create: `src/pages/services/[slug].astro`
- Create: `src/pages/locations/[slug].astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/blog/[slug].astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/contact.astro`

- [ ] **Step 1: Create the home page**

Home page should use `BaseLayout`, `Hero`, `ServiceGrid`, `CtaBand`, `ContactPanel`, and a small local SEO section linking to Naples and Fort Myers pages.

- [ ] **Step 2: Create collection-generated pages**

Use `getCollection` and `getStaticPaths` for services, locations, and blog posts. Each generated page must pass unique SEO metadata into `BaseLayout`.

- [ ] **Step 3: Create static About and Contact pages**

About should focus on trust, guidance, and Florida mortgage expertise. Contact should include phone, email, service area, and a simple form shell that can later be wired to Hostinger email or another provider.

- [ ] **Step 4: Run build**

Run: `npm run build`

Expected: PASS and `dist/` contains generated routes for home, service pages, location pages, blog, about, contact, sitemap, and robots after later robots task.

- [ ] **Step 5: Commit**

```bash
git add src/pages
git commit -m "feat: add site pages and generated routes"
```

---

### Task 7: Add SEO Files And Validation Script

**Files:**
- Create: `src/pages/robots.txt.ts`
- Create: `scripts/validate-seo.mjs`
- Modify: `package.json`

- [ ] **Step 1: Create `src/pages/robots.txt.ts`**

```ts
import { site } from '@data/site';

export function GET() {
  return new Response(`User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap-index.xml
`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
```

- [ ] **Step 2: Create `scripts/validate-seo.mjs`**

```js
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const htmlFiles = [];

function walk(dir) {
  for (const item of readdirSync(dir)) {
    const path = join(dir, item);
    if (statSync(path).isDirectory()) walk(path);
    if (path.endsWith('.html')) htmlFiles.push(path);
  }
}

walk(dist);

const failures = [];
for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  if (!/<title>[^<]{10,}<\/title>/.test(html)) failures.push(`${file}: missing useful title`);
  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) failures.push(`${file}: missing useful description`);
  if (!/<link rel="canonical" href="https:\/\/floridabestmortgage\.com/.test(html)) failures.push(`${file}: missing canonical`);
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`SEO validation passed for ${htmlFiles.length} HTML files.`);
```

- [ ] **Step 3: Update `package.json` scripts**

Add:

```json
"validate:seo": "npm run build && node scripts/validate-seo.mjs"
```

- [ ] **Step 4: Run SEO validation**

Run: `npm run validate:seo`

Expected: PASS and console prints `SEO validation passed`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/robots.txt.ts scripts/validate-seo.mjs package.json package-lock.json
git commit -m "feat: add SEO validation"
```

---

### Task 8: Add Handoff Documentation

**Files:**
- Create: `README.md`
- Create: `docs/content-editing.md`
- Create: `docs/deployment.md`
- Create: `docs/migration.md`

- [ ] **Step 1: Create `README.md`**

Include:

```md
# Florida Best Mortgage AI-Editable Site

This repo contains the Astro static website for `floridabestmortgage.com`.

## Commands

- `npm install`
- `npm run dev`
- `npm run check`
- `npm run build`
- `npm run validate:seo`

## Common Edits

- Business settings: `src/data/site.ts`
- Navigation: `src/data/navigation.ts`
- Services: `src/content/services/`
- Location SEO pages: `src/content/locations/`
- Blog posts: `src/content/blog/`
- Shared design: `src/styles/global.css`
- Layout shell: `src/layouts/BaseLayout.astro`

## Deployment

Production deploys through GitHub Actions and Hostinger. See `docs/deployment.md`.
```

- [ ] **Step 2: Create `docs/content-editing.md`**

Document exact examples for changing phone/email, adding a service, adding a blog post, editing SEO metadata, and updating FAQs.

- [ ] **Step 3: Create `docs/deployment.md`**

Document that deployment uses GitHub Actions plus Hostinger SSH for static publishing, with Hostinger API support for account/resource setup when an API token is available. Document required GitHub secrets:

```md
- `HOSTINGER_HOST`
- `HOSTINGER_USERNAME`
- `HOSTINGER_SSH_KEY`
- `HOSTINGER_PORT`
- `HOSTINGER_TARGET_DIR`
- `HOSTINGER_API_TOKEN` optional, only for Hostinger API setup/discovery scripts
```

Explain that secret values must not be committed.

- [ ] **Step 4: Create `docs/migration.md`**

```md
# Migration Guide

The current live site must stay intact until the new Astro site is verified.

## Recommended Sequence

1. Back up the existing Hostinger website files and any related website data.
2. Create a staging target such as `new.floridabestmortgage.com` or `staging.floridabestmortgage.com`.
3. Deploy the Astro build to staging through GitHub Actions and Hostinger SSH.
4. Verify staging on desktop and mobile.
5. Confirm contact links, email routing, sitemap, robots file, canonical URLs, and major service pages.
6. Cut over `floridabestmortgage.com` to the new static site.
7. Keep the old site backup until production has been verified.

## Do Not Delete First

Do not delete old production files before the new site is live and verified. Rename or archive old files when possible so rollback remains available.

## Hostinger API

Hostinger's developer API can help inspect hosting resources or create supporting resources if an API token is available. Do not commit API tokens. Use GitHub secrets or an untracked local environment file.
```

- [ ] **Step 5: Commit**

```bash
git add README.md docs/content-editing.md docs/deployment.md docs/migration.md
git commit -m "docs: add Codex handoff guides"
```

---

### Task 9: Add GitHub Actions Deployment Workflow

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Create `.github/workflows/deploy.yml`**

```yaml
name: Build and deploy

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build and validate
        run: npm run validate:seo

      - name: Add SSH key
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.HOSTINGER_SSH_KEY }}

      - name: Add known host
        run: ssh-keyscan -p "${{ secrets.HOSTINGER_PORT }}" "${{ secrets.HOSTINGER_HOST }}" >> ~/.ssh/known_hosts

      - name: Deploy dist to Hostinger
        run: |
          rsync -az --delete -e "ssh -p ${{ secrets.HOSTINGER_PORT }}" dist/ "${{ secrets.HOSTINGER_USERNAME }}@${{ secrets.HOSTINGER_HOST }}:${{ secrets.HOSTINGER_TARGET_DIR }}/"
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: add Hostinger deployment workflow"
```

---

### Task 10: Final Local Verification

**Files:**
- Modify only if verification finds problems.

- [ ] **Step 1: Run full validation**

Run: `npm run validate:seo`

Expected: PASS.

- [ ] **Step 2: Start preview server**

Run: `npm run preview -- --host 127.0.0.1`

Expected: Preview server starts and prints a local URL.

- [ ] **Step 3: Browser smoke check**

Open home, services index, one service page, one location page, one blog page, about, and contact. Verify page content renders, header/footer links work, no text overlaps, and mobile width is readable.

- [ ] **Step 4: Stop preview server**

Terminate the preview process cleanly.

- [ ] **Step 5: Commit fixes if needed**

If verification required fixes:

```bash
git add .
git commit -m "fix: resolve final verification issues"
```

If no fixes were needed, do not create an empty commit.
