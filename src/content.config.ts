import { defineCollection, reference } from 'astro:content'
import { file, glob } from 'astro/loaders'
import { z } from 'astro/zod'

const technologies = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/technologies' }),
  schema: z.object({
    name: z.string(),
    type: z.enum(['technology', 'tool', 'hidden']).default('technology'),
    order: z.number().default(Number.POSITIVE_INFINITY),
    link: z.url().optional()
    // color: z.string()
  })
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
      alt: z.string()
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
    google: z.url().optional()
  })
})

// const blog = defineCollection({
//   loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/blog' }),
//   schema: z.object({
//     title: z.string(),
//     description: z.string(),
//     pubDate: z.coerce.date(),
//     updatedDate: z.coerce.date().optional()
//   })
// })

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
    removed: z.string()
  })
})

const cinemas = defineCollection({
  loader: file('src/content/cinemas/theatres.json'),
  schema: z.object({
    id: z.string(),
    name: z.string(),
    area: z.string(),
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
              'VIP 19+'
            ])
          )
          .min(1),
        screen: z.object({
          ratio: z.enum(['1.43:1', '1.85:1', '1.90:1', '2.20:1', '2.39:1'])
        }),
        features: z
          .array(
            z.enum([
              'Dolby Atmos',
              'D-BOX',
              'Laser Projection',
              'VIP',
              'Recliners'
            ])
          )
          .default([]),
        details: z.string().optional()
      })
    ),
    notes: z.array(z.string()).default([])
  })
})

export const collections = {
  technologies,
  projects,
  // blog,
  overbuddy,
  cinemas
}
