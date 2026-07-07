# AI-Editable Mortgage Site Design

## Goal

Rebuild `floridabestmortgage.com` as an SEO-focused, AI-editable website that can be deployed automatically to Hostinger without manual file uploads.

The site should preserve the current business identity and general structure while improving maintainability, local SEO, page speed, and content quality. AI editing should happen through a normal Git repository, where content and site structure are clear enough for future changes to be made safely.

## Primary Decisions

- Use Astro as a static site framework.
- Host the production site on the existing Hostinger account.
- Store the site in a GitHub repository.
- Deploy automatically after approved changes are pushed.
- Use Hostinger SSH and Git access for deployment.
- Keep the current site's basic feel, but allow design cleanup where it improves trust, clarity, SEO, or usability.

## Site Structure

The rebuilt site will start with these primary pages:

- Home
- Services
- About
- Blog
- Contact

The SEO structure will add focused landing pages:

- FHA Loans in Florida
- VA Loans in Florida
- First-Time Home Buyer Programs in Florida
- Refinance Mortgage Florida
- HELOC and Home Equity Loans
- Naples Mortgage Broker
- Fort Myers Mortgage Broker

These pages will be linked naturally from the home page, services page, footer, and relevant blog posts.

## Content Model

Editable content will live in structured files rather than being buried in large components.

Planned content groups:

- Site settings: business name, NMLS numbers, phone, email, address, social links, compliance footer.
- Navigation: main menu and footer links.
- Services: loan type, summary, details, call to action, SEO metadata.
- Location pages: city or region, page intro, local mortgage copy, FAQs, SEO metadata.
- FAQs: question, answer, category, target page.
- Testimonials and case studies: name or label, quote, supporting details, display controls.
- Blog posts: Markdown or MDX files with title, description, publish date, slug, tags, and body.

This model lets AI make targeted edits such as changing a phone number, adding a new mortgage service page, writing a blog post, or updating FAQ answers without rewriting the whole site.

## SEO Requirements

Each indexable page will include:

- Unique title tag.
- Unique meta description.
- Canonical URL.
- Open Graph title, description, and image fields.
- Clean URL slug.
- Internal links to related service and location pages.
- Mortgage-relevant headings with one clear H1.

The site will also include:

- `sitemap.xml`
- `robots.txt`
- LocalBusiness or MortgageBroker schema where appropriate.
- BlogPosting schema for blog posts.
- FAQ schema on pages with real FAQ sections.
- NMLS and Equal Housing Opportunity compliance text in the footer.

Performance should support SEO by keeping pages static, image sizes controlled, and JavaScript minimal.

## Design Direction

The site should remain recognizable as the current Florida mortgage broker website: professional, local, bilingual-friendly, and contact-focused.

Design updates may:

- Remove duplicated home page sections.
- Improve spacing, readability, and mobile layout.
- Make phone/email/contact actions more prominent.
- Use consistent service cards and page sections.
- Improve trust signals around NMLS, location, and consultation flow.

The design should not become a generic AI-builder landing page. It should feel like a practical mortgage advisor site built for Florida buyers, refinancers, and first-time home buyers.

## AI Editing Workflow

Future AI edits will happen in Git:

1. User requests a change.
2. AI edits content files, components, or page metadata.
3. AI runs local checks and builds the site.
4. Changes are committed and pushed.
5. Deployment runs automatically.
6. Live Hostinger site updates without manual upload.

For content changes, AI should prefer editing structured content files. Component changes should be reserved for layout, interaction, or shared presentation updates.

## Deployment Design

Because Hostinger shows both SSH and Git, the preferred deployment path is:

1. GitHub stores the source repo.
2. GitHub Actions installs dependencies and builds the Astro site.
3. The built static output is deployed to Hostinger.
4. Hostinger serves the generated files from the website document root.

If Hostinger's native Git deployment can pull the built branch cleanly, use a build branch workflow:

- Main branch contains source.
- GitHub Actions builds the site.
- Build output is pushed to a deploy branch.
- Hostinger Git deploy pulls the deploy branch.

If native Git deployment is awkward or unreliable, use SSH/SFTP deployment from GitHub Actions:

- Main branch contains source.
- GitHub Actions builds the site.
- GitHub Actions uses Hostinger SSH credentials stored as GitHub secrets.
- Built files are synced to the production web root.

The SSH/SFTP workflow is the fallback and may become the default if it is simpler to operate.

## Error Handling And Rollback

The deployment workflow should fail before publishing if:

- Dependency installation fails.
- Type checking or linting fails.
- Astro build fails.
- Required environment variables or secrets are missing.

Rollback should be possible by redeploying a previous Git commit or restoring a previous deploy branch state. Hostinger backups can remain a secondary safety net, but Git history should be the main rollback mechanism.

## Testing And Verification

Before a deployment is treated as successful:

- Astro build must pass.
- Generated pages should be checked for expected routes.
- Sitemap and robots files should exist.
- Important pages should have unique titles and descriptions.
- Contact links should render correctly.
- Mobile and desktop layouts should be visually checked during the initial build.

For later edits, test depth can match risk: content-only changes need build and spot checks, while layout changes need broader visual checks.

## Out Of Scope For First Build

- Full CRM integration.
- Mortgage calculators.
- User accounts.
- Live rate feeds.
- Complex multilingual routing.
- Custom admin dashboard.

These can be added later if the business needs them. The first build should focus on a fast, searchable, trustworthy, AI-maintainable marketing site.

