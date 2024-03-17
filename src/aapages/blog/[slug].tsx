import type { GetStaticPaths, GetStaticProps } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { allBlogPosts, BlogPost } from 'contentlayer/generated'

import BlogLayout from 'layouts/BlogLayout'
import components from 'components/MDXComponents'
import { isProduction } from 'lib/isProduction'

const Post: React.FC<{ post: BlogPost }> = ({ post }) => {
  const MDXComponent = useMDXComponent(post.body.code)

  return (
    <BlogLayout {...post}>
      <MDXComponent components={{ ...components } as any} />
    </BlogLayout>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  let paths
  if (isProduction) {
    paths = allBlogPosts
      .filter((post) => post.status === 'published')
      .map((post) => ({ params: { slug: post.slug } }))
  } else {
    paths = allBlogPosts.map((post) => ({ params: { slug: post.slug } }))
  }

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const post = allBlogPosts.find((post) => post.slug === context?.params?.slug)

  return { props: { post } }
}
