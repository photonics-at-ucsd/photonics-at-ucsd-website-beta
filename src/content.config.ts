import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { PARAMETERS } from './data/parameters';

// Each value is a single number (5) or a range ([7, 9]); [5] also means 5.
// 0–10 for score parameters, any dollar amount for usd parameters (budget).
function rangeOf(value: z.ZodNumber, what: string) {
  return z
    .union([value, z.tuple([value]), z.tuple([value, value])], {
      error: (issue) =>
        issue.input === undefined
          ? `Missing: every parameter in src/data/rubric.yaml needs a score (${what})`
          : `Must be ${what}`,
    })
    .transform((v) => (Array.isArray(v) ? { lo: v[0], hi: v[v.length - 1] } : { lo: v, hi: v }))
    .refine((r) => r.lo <= r.hi, { message: 'A range must be written [low, high]' });
}
const scoreRange = rangeOf(z.number().int().min(0).max(10), 'a whole number 0–10, or a range like [3, 5]');
const dollarRange = rangeOf(z.number().nonnegative(), 'a dollar amount, or a range like [50, 100]');

// `scores:` must list exactly the parameters in src/data/rubric.yaml; unknown keys are errors.
const scores = z.strictObject(
  Object.fromEntries(PARAMETERS.map((p) => [p.key, p.unit === 'usd' ? dollarRange : scoreRange])),
);

export const NEED_LEVELS = [
  'required',
  'effectively-required',
  'likely-required',
  'maybe-required',
  'highly-recommended',
  'recommended',
  'optional',
] as const;

const demos = defineCollection({
  // One folder per demo: src/content/demos/<slug>/index.md
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/demos',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      // A short paragraph of context for readers new to the phenomenon, shown under the subtitle.
      blurb: z.string().optional(),
      // An unfinished page: shows a "this page is a stub" banner at the top.
      stub: z.boolean().default(false),
      added: z.coerce.date(),
      diagram: image().optional(),
      diagramAlt: z.string().optional(),
      thumbnail: image().optional(),
      // Each entry is a photo `{ src: ./photo.jpg, alt }` or a looping video clip
      // `{ video: ./clip.mp4, alt }` (made by `npm run media`, which also makes its clip.poster.jpg).
      photos: z
        .array(
          z.union([
            z.strictObject({ src: image(), alt: z.string() }),
            z.strictObject({
              video: z.string().regex(/^\.\/[^/]+\.mp4$/, 'A video must be an .mp4 in the same folder, like ./clip.mp4'),
              alt: z.string(),
            }),
          ]),
        )
        .default([]),
      scores,
      // The supplies table is built from this list by src/plugins/rehype-demo.mjs.
      supplies: z
        .array(
          z.object({
            item: z.string(),
            need: z.enum(NEED_LEVELS),
            details: z.string().default(''),
            cost: z.union([z.string(), z.array(z.string())]).optional(),
            link: z.object({ label: z.string(), url: z.string().optional() }).optional(),
          }),
        )
        .default([]),
      draft: z.boolean().default(false),
    }),
});

// Resource pages (light sources, optomechanics, …): src/content/resources/<slug>/index.md.
// Written with the same Markdown conventions as demo pages; the rubric page is separate.
const resources = defineCollection({
  loader: glob({
    pattern: '*/index.md',
    base: './src/content/resources',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    order: z.number().default(100), // position on the Resources page, lowest first
    stub: z.boolean().default(false), // shows a "this page is a stub" banner at the top
    draft: z.boolean().default(false),
  }),
});

// One-off pages written in Markdown: src/content/pages/<name>.md
//   about.md → the About page          home.md → the introduction at the top of the front page
const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    // home.md: phrases that take turns after the title ("Looking for … a weekend project?")
    nouns: z.array(z.string()).optional(),
  }),
});

export const collections = { demos, resources, pages };
