# Deployment Guide

The intended production workflow is GitHub Actions deploying the static Astro build to Hostinger through SSH.

## Recommended Flow

1. Push changes to GitHub.
2. GitHub Actions runs `npm ci` and `npm run validate:seo`.
3. If validation passes, built files from `dist/` are synced to Hostinger.
4. Hostinger serves the static site.

## Required GitHub Secrets

Add these in GitHub repository settings:

- `HOSTINGER_HOST`
- `HOSTINGER_USERNAME`
- `HOSTINGER_SSH_KEY`
- `HOSTINGER_PORT`
- `HOSTINGER_TARGET_DIR`

Optional:

- `HOSTINGER_API_TOKEN`

Never commit secret values.

## Required GitHub Variable

Add this repository variable when you are ready for GitHub Actions to deploy:

- `HOSTINGER_DEPLOY_ENABLED` = `true`

Without this variable, the workflow still validates and builds the site, but it will not deploy. This prevents accidental deployment before staging is ready.

## Workflow Behavior

The workflow file is:

`.github/workflows/deploy.yml`

It validates pushes to:

- `feature/ai-editable-site`
- `main`

It deploys only when:

- the branch is `main`, or a manual workflow run sets `deploy=true`
- `HOSTINGER_DEPLOY_ENABLED` is set to `true`
- all Hostinger SSH secrets are configured

## Hostinger Target Directory

For staging, use a staging site/subdomain directory first.

For production, the target is usually a `public_html` path, but confirm the exact document root in Hostinger hPanel before deploying.

## Manual Validation Before Deploy

Run:

```bash
npm run validate:seo
```

Check:

- Home page loads.
- Service pages load.
- Location pages load.
- Blog page loads.
- Contact links use phone/email.
- `dist/robots.txt` exists.
- `dist/sitemap-index.xml` exists.
