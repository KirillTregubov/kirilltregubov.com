import type { GetStaticPaths, GetStaticProps } from 'next'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { allBlogPosts, BlogPost } from 'contentlayer/generated'

import BlogLayout from 'layouts/BlogLayout'
import components from 'components/MDXComponents'

const Post: React.FC<{ post: BlogPost }> = ({ post }) => {
  const MDXComponent = useMDXComponent(post.body.code)

  return (
    <BlogLayout
      title={post.title}
      description={post.description}
      image={post.image}
      published_time={post.published_time}
      modified_time={post.published_time}
    >
      <MDXComponent components={{ ...components } as any} />
    </BlogLayout>
  )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: allBlogPosts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const post = allBlogPosts.find((post) => post.slug === context?.params?.slug)

  return { props: { post } }
}
