import type { ReactNode } from 'react'
import Head from 'next/head'

import Layout from 'layouts/layout'

const BlogLayout: React.FC<{
  children: ReactNode
  title?: string
  description?: string
  image?: string
  published_time?: string
  modified_time?: string
  author?: string
  section?: string
  tags?: string[]
}> = ({ children, ...customMeta }) => {
  return (
    <Layout type="article">
      <Head>{/* <meta property="og:type" content={'article'} /> */}</Head>
      <article className="prose prose-h2:mt-[1.75em] dark:prose-invert">
        {children}
      </article>
    </Layout>
  )
}

export default BlogLayout
