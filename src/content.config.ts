import { file, glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { defineCollection, reference } from 'astro:content'
import { parse as parseYaml } from 'yaml'

const technologies = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/technologies' }),
  schema: z.object({
    name: z.string(),
    type: z.enum(['technology', 'tool', 'hidden']).default('technology'),
    order: z.number().default(Number.POSITIVE_INFINITY),
    link: z.url().optional(),
    // color: z.string()
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/projects' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    technologies: z.array(reference('technologies')),
    repository: z.url().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    // page: z.string().optional(),
    // pageButton: z.string().optional(),
    // buttons
    source: z.string().optional(),
    article: z.string().optional(),
    demo: z.string().optional(),
    download: z.url().optional(),
    play: z.url().optional(),
    apple: z.url().optional(),
    google: z.url().optional(),
  }),
})

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()).default([]),
    series: z
      .object({
        id: z
          .string()
          .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            'Series id must contain lowercase alphanumeric segments separated by hyphens',
          ),
        title: z.string().min(1),
        order: z.number().int().positive(),
      })
      .optional(),
    draft: z.boolean().default(false),
    hidden: z.boolean().default(false),
    archived: z.boolean().default(false),
    beginningOfPostInToc: z.boolean().default(true),
    demo: z.url().optional(),
  }),
})

const overbuddy = defineCollection({
  loader: file('src/content/overbuddy/backgrounds.json'),
  schema: z.object({
    id: z.string(),
    order: z.number(),
    image: z.string(),
    title: z.string(),
    description: z.string(),
    keywords: z.string(),
    link: z.string().optional(),
    available: z.boolean().or(z.literal('never')),
    removed: z.string(),
  }),
})

const cinemas = defineCollection({
  loader: file('src/content/cinemas/theatres.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    area: z.string(),
    location: z
      .object({
        address: z.object({
          streetAddress: z.string(),
          addressLocality: z.string(),
          addressRegion: z.string(),
          postalCode: z.string(),
          addressCountry: z.string(),
        }),
        coordinates: z.object({
          latitude: z.number().min(-90).max(90),
          longitude: z.number().min(-180).max(180),
        }),
      })
      .optional(),
    auditoriumCount: z.number().int().positive(),
    auditoriums: z.array(
      z.object({
        auditoriums: z.string(),
        formats: z
          .array(
            z.enum([
              'Regular',
              'UltraAVX',
              'IMAX',
              'IMAX 70mm',
              'SCREENX',
              '4DX',
              '70mm',
              'VIP 19+',
              'Clubhouse',
            ]),
          )
          .min(1),
        screen: z.object({
          ratio: z.enum([
            '1.43:1',
            '1.85:1',
            '1.90:1',
            '2.20:1',
            '2.39:1',
            'N/A',
          ]),
        }),
        features: z
          .array(
            z.enum([
              '3D',
              'Laser Projection',
              'Dolby Atmos',
              'D-BOX',
              'Recliners',
            ]),
          )
          .default([]),
        details: z.string().optional(),
      }),
    ),
    notes: z.array(z.string()).default([]),
  }),
})

// Everything shown on /saved lives in one YAML list; `type` picks the format.
const savedBase = z.object({
  // Position in saved.yaml (added by the parser); breaks ties between same-date items.
  order: z.number(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  note: z.string().optional(),
})

const saved = defineCollection({
  loader: file('src/content/saved.yaml', {
    // List items have no ids, so number them in file order.
    parser: (text) =>
      ((parseYaml(text) ?? []) as Record<string, unknown>[]).map(
        (item, index) => ({ ...item, id: String(index), order: index }),
      ),
  }),
  schema: z.discriminatedUnion('type', [
    savedBase.extend({
      type: z.literal('tweet'),
      url: z
        .url()
        .regex(
          /^https:\/\/(?:www\.)?(?:x|twitter)\.com\/[^/]+\/status\/\d+/,
          'Expected an x.com or twitter.com status URL',
        ),
    }),
    savedBase.extend({
      type: z.literal('snippet'),
      title: z.string(),
      code: z.string(),
      lang: z.string().default('plaintext'),
      source: z.url().optional(),
    }),
    savedBase.extend({
      type: z.literal('link'),
      title: z.string(),
      url: z.url(),
    }),
    savedBase.extend({
      type: z.literal('quote'),
      text: z.string(),
      source: z.url(),
      author: z.string().optional(),
      // Title of the article/page it's from.
      title: z.string().optional(),
    }),
    // Reference sites kept in their own section.
    savedBase.extend({
      type: z.literal('resource'),
      title: z.string(),
      url: z.url(),
      description: z.string().optional(),
    }),
  ]),
})

export const collections = {
  technologies,
  projects,
  blog,
  overbuddy,
  cinemas,
  saved,
}
