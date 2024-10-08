import { z, defineCollection, reference } from 'astro:content'

const technologies = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    type: z.enum(['technology', 'tool']).default('technology'),
    order: z.number().default(Infinity),
    link: z.string().url().optional()
    // color: z.string()
  })
})

const projects = defineCollection({
  type: 'content',
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
    page: z.string().optional(),
    pageButton: z.string().optional(),
    source: z.string().optional(),
    article: z.string().optional(),
    demo: z.string().optional(),
    download: z.string().url().optional(),
    play: z.string().url().optional(),
    repository: z.string().url().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false)
  })
})

export const collections = {
  projects,
  technologies
}
