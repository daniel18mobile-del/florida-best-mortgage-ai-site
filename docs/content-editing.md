# Content Editing Guide

Use this guide when making AI-assisted content changes.

## Change Business Details

Edit:

`src/data/site.ts`

Common fields:

- `phone`
- `phoneHref`
- `email`
- `emailHref`
- `address`
- `advisor`
- `companyNmls`
- `equalHousingText`

Run:

```bash
npm run validate:seo
```

## Change Navigation

Edit:

`src/data/navigation.ts`

Use trailing slashes for internal links, for example:

`/services/`

## Change Hero Video Or Images

Edit:

`src/data/media.ts`

The home hero uses:

- `heroMedia.videoSrc`
- `heroMedia.posterSrc`

The service grids use `serviceImages` by service slug.

Keep video size in mind. Large autoplay video should stay desktop-only or be replaced with a smaller optimized file before production.

## Add A Service Page

Create:

`src/content/services/example-service.md`

Required frontmatter:

```md
---
title: "Example Service"
slug: "example-service"
summary: "Short summary for cards and index pages."
order: 6
seo:
  title: "Example Service | Florida Best Mortgage"
  description: "Unique search description with at least 50 characters."
faqs:
  - question: "Question text?"
    answer: "Clear answer with no unsupported guarantees."
---

Page body goes here.
```

Then add an optional image in `src/data/media.ts`.

Run:

```bash
npm run validate:seo
```

## Add A Location Page

Create:

`src/content/locations/example-city-mortgage-broker.md`

Required frontmatter:

```md
---
title: "Example City Mortgage Broker"
slug: "example-city-mortgage-broker"
city: "Example City"
summary: "Local mortgage guidance summary."
seo:
  title: "Example City Mortgage Broker | Florida Best Mortgage"
  description: "Unique local SEO description with at least 50 characters."
faqs:
  - question: "Does Florida Best Mortgage help in Example City?"
    answer: "Yes. Florida Best Mortgage helps buyers and homeowners compare mortgage options."
---

Page body goes here.
```

## Add A Blog Post

Create:

`src/content/blog/example-post.md`

Required frontmatter:

```md
---
title: "Example Blog Post"
slug: "example-post"
description: "Short blog summary."
publishDate: "2026-07-07"
tags: ["mortgage", "Florida"]
seo:
  title: "Example Blog Post | Florida Best Mortgage"
  description: "Unique blog SEO description with at least 50 characters."
---

Post body goes here.
```

## Compliance Tone

Avoid:

- Guaranteed approval claims.
- Exact rate promises.
- Unsupported savings claims.
- Advice that sounds like legal, tax, or financial planning.

Prefer:

- "May qualify"
- "Can help compare"
- "Subject to lender approval"
- "Based on program guidelines"
- "Talk through options"

