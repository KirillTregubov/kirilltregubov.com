import { z, defineCollection, reference } from 'astro:content'

const technologies = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    type: z.enum(['technology', 'tool']).default('technology'),
    order: z.number().default(Infinity)
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
    source: z.string().optional(),
    demo: z.string().optional(),
    draft: z.boolean().default(false)
  })
})

export const collections = {
  projects,
  technologies
}
