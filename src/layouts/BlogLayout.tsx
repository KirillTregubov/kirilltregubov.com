import Head from 'next/head'

import Layout from 'layouts/layout'
import type { Image } from 'contentlayer/generated'

const BlogLayout: React.FC<{
  children: React.ReactNode
  title: string
  description: string
  image: Image
  publishedTime: string
  modifiedTime: string
  author?: string
  topics?: string[]
}> = ({ children, ...customMeta }) => {
  const meta = {
    type: 'website',
    ...customMeta
  }

  return (
    <Layout
      title={meta.title}
      description={meta.description}
      image={meta.image.path}
      type="article"
    >
      <Head>
        <meta property="article:published_time" content={meta.publishedTime} />
        <meta property="article:modified_time" content={meta.modifiedTime} />
        <meta property="og:updated_time" content={meta.modifiedTime} />
        {meta.author && (
          <meta property="article:author" content={meta.author} />
        )}
        {meta.topics && (
          <>
            <meta property="article:section" content={meta.topics[0]} />
            {meta.topics.map((topic) => (
              <meta property="article:tag" content={topic} key={topic} />
            ))}
          </>
        )}
      </Head>
      <div className="flex gap-12">
        <article className="prose w-[65ch] prose-h2:mt-[1.75em] prose-lead:text-[1.15rem] dark:prose-invert">
          {children}
        </article>
        <div className=" flex-grow bg-red-500">Sidebar</div>
      </div>
    </Layout>
  )
}

export default BlogLayout
