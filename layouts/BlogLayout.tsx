import type { ReactNode } from 'react'
import Head from 'next/head'

import Layout from 'layouts/layout'

const BlogLayout: React.FC<{
  children: ReactNode
  title: string
  description: string
  image: string
  published_time: string
  modified_time: string
  author?: string
  section?: string
  tags?: string[]
}> = ({ children, ...customMeta }) => {
  const meta = {
    type: 'website',
    ...customMeta
  }

  return (
    <Layout
      title={meta.title}
      description={meta.description}
      image={meta.image}
      type="article"
    >
      <Head>
        <meta property="article:published_time" content={meta.published_time} />
        <meta property="article:modified_time" content={meta.modified_time} />
        <meta property="og:updated_time" content={meta.modified_time} />
        {meta.author && (
          <meta property="article:author" content={meta.author} />
        )}
        {meta.section && (
          <meta property="article:section" content={meta.section} />
        )}
        {meta.tags &&
          meta.tags.map((tag) => (
            <meta property="article:tag" content={tag} key={tag} />
          ))}
      </Head>
      <div className="flex gap-12">
        <article className="prose w-[65ch] prose-lead:text-[1.15rem] prose-h2:mt-[1.75em] dark:prose-invert">
          {children}
        </article>
        <div className=" flex-grow bg-red-500">Sidebar</div>
      </div>
    </Layout>
  )
}

export default BlogLayout
