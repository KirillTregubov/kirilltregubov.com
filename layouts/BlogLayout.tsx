import type { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  image?: string
  published_time?: string
  modified_time?: string
  author?: string
  section?: string
  tags?: string[]
}

import Layout from 'layouts/layout'

export default function BlogLayout({ children, ...customMeta }: Props) {
  return (
    <Layout type="article">
      <Head>{/* <meta property="og:type" content={'article'} /> */}</Head>
      <div className="prose prose-h2:mt-[1.75em] dark:prose-invert">
        {children}
      </div>
    </Layout>
  )
}
