import type { GetStaticPaths, GetStaticProps } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { allBlogPosts, BlogPost } from 'contentlayer/generated'

import Blog from 'layouts/blog'

type Props = {
  post: BlogPost
}

export default function Post({ post }: Props) {
  const Component = useMDXComponent(post.body.code)

  return (
    <Blog>
      <Component />
    </Blog>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allBlogPosts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allBlogPosts.find((post) => post.slug === params?.slug)

  return { props: { post } }
}
