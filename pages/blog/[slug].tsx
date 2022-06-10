import { useMDXComponent } from 'next-contentlayer/hooks'
import { allBlogPosts, BlogPost } from 'contentlayer/generated'

import BlogLayout from 'layouts/BlogLayout'
import MDXComponents from 'components/MDXComponents'

type Props = {
  post: BlogPost
}

export default function Post({ post }: Props) {
  const Component = useMDXComponent(post.body.code)

  return (
    <BlogLayout>
      <Component components={{ ...MDXComponents }} as any />
    </BlogLayout>
  )
}

export async function getStaticPaths() {
  return {
    paths: allBlogPosts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false
  }
}

type StaticProps = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params: { slug } }: StaticProps) {
  const post = allBlogPosts.find((post) => post.slug === slug)

  return { props: { post } }
}
