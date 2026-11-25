import rss from '@astrojs/rss'
import { BLOG_SUBTITLE } from '@lib/blog'
import { SITE_NAME } from '@lib/site'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'

export async function GET(context: APIContext) {
  const posts = (
    await getCollection('blog', ({ data }) => !data.draft && !data.hidden)
  ).sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())

  return rss({
    title: SITE_NAME,
    description: BLOG_SUBTITLE,
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}`,
      categories: post.data.tags,
    })),
    customData: '<language>en-us</language>',
  })
}
