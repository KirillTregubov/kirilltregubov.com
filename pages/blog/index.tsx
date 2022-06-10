import type { InferGetStaticPropsType } from 'next'
import { pick } from '@contentlayer/utils'
import { allBlogPosts } from 'contentlayer/generated'

import Layout from 'layouts/layout'
import BlogPreview from 'components/BlogPreview'

type Props = InferGetStaticPropsType<typeof getStaticProps>

export default function Blog({ posts }: Props) {
  const filteredBlogPosts = posts.filter(
    (post) => post.title.toLowerCase()
    // .includes(searchValue.toLowerCase())
  )
  return (
    <Layout>
      {filteredBlogPosts.map((post) => (
        <BlogPreview key={post.title} {...post} />
      ))}
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = allBlogPosts
    .map((post) =>
      pick(post, ['slug', 'title', 'description', 'published_time'])
    )
    .sort(
      (a, b) =>
        Number(new Date(b.published_time)) - Number(new Date(a.published_time))
    )

  return { props: { posts } }
}
