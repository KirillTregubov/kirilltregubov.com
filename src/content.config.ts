import { z, defineCollection, reference } from 'astro:content'
import { file, glob } from 'astro/loaders'

const technologies = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/technologies' }),
  schema: z.object({
    name: z.string(),
    type: z.enum(['technology', 'tool']).default('technology'),
    order: z.number().default(Infinity),
    link: z.string().url().optional()
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
    image: z.string(),
    title: z.string(),
    description: z.string(),
    keywords: z.string(),
    link: z.string().optional(),
    available: z.boolean().or(z.literal('never'))
  })
})

export const collections = {
  technologies,
  projects,
  // blog,
  overbuddy
}
