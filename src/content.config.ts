import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const seoSchema = z.object({
  title: z.string(),
  description: z.string(),
  canonical: z.string().optional(),
  ogImage: z.string().optional()
});

const faqItemSchema = z.object({
  question: z.string(),
  answer: z.string()
});

const services = defineCollection({
  loader: glob({ base: './src/content/services', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    order: z.number(),
    ctaLabel: z.string().default('Talk with a mortgage advisor'),
    seo: seoSchema,
    faqs: z.array(faqItemSchema).default([])
  })
});

const locations = defineCollection({
  loader: glob({ base: './src/content/locations', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    city: z.string(),
    region: z.string().default('Florida'),
    summary: z.string(),
    seo: seoSchema,
    faqs: z.array(faqItemSchema).default([])
  })
});

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    seo: seoSchema
  })
});

export const collections = {
  services,
  locations,
  blog
};
