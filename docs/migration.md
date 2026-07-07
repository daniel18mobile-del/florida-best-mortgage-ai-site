# Migration Guide

The current live Hostinger site should stay intact until the new Astro site is verified.

## Recommended Sequence

1. Back up the existing Hostinger website files and any website data.
2. Create a staging target such as `staging.floridabestmortgage.com` or `new.floridabestmortgage.com`.
3. Add GitHub deployment secrets.
4. Deploy the Astro build to staging.
5. Verify staging on desktop and mobile.
6. Confirm contact links, email routing, sitemap, robots file, canonical URLs, and major service pages.
7. Cut over `floridabestmortgage.com` to the new static site.
8. Keep the old site backup until production has been verified.

## Do Not Delete First

Do not delete old production files before the new site is live and verified.

When possible, rename or archive old files so rollback remains available.

## Rollback

Rollback options:

- Redeploy a previous Git commit.
- Restore Hostinger backup.
- Restore archived old site files.

## Hostinger API

Hostinger's developer API can help inspect hosting resources or create supporting resources if an API token is available.

Use API tokens only through GitHub secrets or local untracked environment files.

