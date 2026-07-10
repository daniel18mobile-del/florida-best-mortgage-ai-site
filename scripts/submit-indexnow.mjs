import { readFileSync } from 'node:fs';
import { setTimeout as delay } from 'node:timers/promises';

const host = 'floridabestmortgage.com';
const key = 'b74e2e16f2cf4bb19bb6f0775d2f6c7a';
const keyLocation = `https://${host}/${key}.txt`;
const sitemap = readFileSync('dist/sitemap-0.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);

if (urls.length === 0) {
  throw new Error('No URLs found in dist/sitemap-0.xml. Run npm run build first.');
}

const endpoint = 'https://api.indexnow.org/indexnow';
const body = {
  host,
  key,
  keyLocation,
  urlList: urls
};

const response = await fetch(endpoint, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  body: JSON.stringify(body)
});

const text = await response.text();

if (!response.ok) {
  throw new Error(`IndexNow submission failed: ${response.status} ${response.statusText}\n${text}`);
}

// Give participating engines a moment before deployment scripts continue to follow-up checks.
await delay(250);
console.log(`Submitted ${urls.length} URLs to IndexNow.`);
