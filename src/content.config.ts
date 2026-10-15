import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** A string in both site languages. */
const localized = z.object({ en: z.string(), it: z.string() });
const localizedList = z.object({ en: z.array(z.string()), it: z.array(z.string()) });

const experience = defineCollection({
  loader: file('src/content/experience.yaml'),
  schema: z.object({
    company: z.string(),
    url: z.url().optional(),
    location: localized,
    role: localized,
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    summary: localized.optional(),
    highlights: localizedList,
    tags: z.array(z.string()).default([]),
  }),
});

const education = defineCollection({
  loader: file('src/content/education.yaml'),
  schema: z.object({
    title: localized,
    school: z.string(),
    url: z.url().optional(),
    location: localized,
    start: z.coerce.date(),
    end: z.coerce.date(),
    /** True while the end date is a forecast (e.g. thesis defence not held yet). */
    expected: z.boolean().default(false),
    thesis: z.string().optional(),
    description: localized,
  }),
});

/** One Markdown file per project and language: src/content/projects/{en,it}/<slug>.md */
const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    kind: z.enum(['thesis', 'personal', 'university']),
    period: z.string(),
    role: z.string(),
    order: z.number(),
    stack: z.array(z.string()),
    pipeline: z.array(z.string()).optional(),
    live: z.url().optional(),
    repo: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { experience, education, projects };
