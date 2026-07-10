import { site } from '@data/site';

export function GET() {
  return new Response(`User-agent: *
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

Sitemap: ${site.url}/sitemap-index.xml
LLMs: ${site.url}/llms.txt
`, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    }
  });
}
