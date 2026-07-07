import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const dist = 'dist';
const siteUrl = 'https://floridabestmortgage.com';
const brand = 'Florida Best Mortgage';
const htmlFiles = [];

function walk(dir) {
  for (const item of readdirSync(dir)) {
    const path = join(dir, item);
    if (statSync(path).isDirectory()) {
      walk(path);
      continue;
    }
    if (path.endsWith('.html')) {
      htmlFiles.push(path);
    }
  }
}

function attr(html, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = html.match(new RegExp(`<meta ${escaped} content="([^"]+)"`));
  return match?.[1];
}

function decodeEntities(value) {
  return value
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>');
}

if (!existsSync(dist)) {
  console.error('Missing dist directory. Run npm run build first.');
  process.exit(1);
}

walk(dist);

const failures = [];
const titles = new Map();
const descriptions = new Map();

for (const file of htmlFiles) {
  const rel = relative(dist, file).replaceAll('\\', '/');
  const html = readFileSync(file, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/)?.[1]?.trim();
  const description = attr(html, 'name="description"')?.trim();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]?.trim();
  const ogTitle = attr(html, 'property="og:title"')?.trim();
  const ogDescription = attr(html, 'property="og:description"')?.trim();
  const ogImage = attr(html, 'property="og:image"')?.trim();

  if (!title || title.length < 10) failures.push(`${rel}: missing useful title`);
  if (title && title.includes(`| ${brand} | ${brand}`)) failures.push(`${rel}: duplicate brand in title`);
  if (!description || description.length < 50) failures.push(`${rel}: missing useful description`);
  if (!canonical?.startsWith(`${siteUrl}/`)) failures.push(`${rel}: missing absolute canonical`);
  if (!ogTitle) failures.push(`${rel}: missing og:title`);
  if (!ogDescription) failures.push(`${rel}: missing og:description`);
  if (!ogImage || ogImage.includes('/images/og-florida-best-mortgage.jpg')) {
    failures.push(`${rel}: missing real og:image`);
  }

  if (title) {
    const decoded = decodeEntities(title);
    titles.set(decoded, [...(titles.get(decoded) ?? []), rel]);
  }
  if (description) {
    const decoded = decodeEntities(description);
    descriptions.set(decoded, [...(descriptions.get(decoded) ?? []), rel]);
  }
}

for (const [title, files] of titles.entries()) {
  if (files.length > 1) failures.push(`Duplicate title "${title}" in ${files.join(', ')}`);
}

for (const [description, files] of descriptions.entries()) {
  if (files.length > 1) failures.push(`Duplicate description "${description}" in ${files.join(', ')}`);
}

if (!existsSync(join(dist, 'robots.txt'))) failures.push('Missing robots.txt');
if (!existsSync(join(dist, 'sitemap-index.xml'))) failures.push('Missing sitemap-index.xml');

const blogHtml = readFileSync(join(dist, 'blog', 'florida-mortgage-preapproval-guide', 'index.html'), 'utf8');
if (!blogHtml.includes('property="og:type" content="article"')) failures.push('Blog post missing article og:type');
if (!blogHtml.includes('"@type":"BlogPosting"')) failures.push('Blog post missing BlogPosting schema');

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`SEO validation passed for ${htmlFiles.length} HTML files.`);

