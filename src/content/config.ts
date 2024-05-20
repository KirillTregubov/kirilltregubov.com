import { z, defineCollection } from 'astro:content'
import { allTechnologies } from './constants'

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(), // was dateAdded
    updatedDate: z.coerce.date().optional(),
    image: z.object({
      url: z.string(), // was path
      alt: z.string()
    }),
    technologies: z.array(z.enum(allTechnologies)),
    source: z.string().optional(),
    demo: z.string().optional(),
    draft: z.boolean().default(false)
    // pubDate: z.date(),
    // description: z.string(),
    // author: z.string(),
    // image: z.object({
    //   url: z.string(),
    //   alt: z.string()
    // }),
    // tags: z.array(z.string())
  })
})

export const collections = {
  projects: projectsCollection
}
