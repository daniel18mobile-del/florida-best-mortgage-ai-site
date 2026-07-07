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

