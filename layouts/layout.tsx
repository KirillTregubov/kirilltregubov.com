import { ReactNode } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

type Props = {
  children: ReactNode
  title?: string
  description?: string
  type?: 'website' | 'article'
  image?: string
  published_time?: string
  modified_time?: string
  author?: string
  section?: string
  tags?: string[]
}

export default function Layout({ children, ...customMeta }: Props) {
  const meta = {
    title: 'Kirill Tregubov',
    description: `Full stack web developer and computer science blogger.`,
    // image: 'https://kirilltregubov.com/static/images/banner.png',
    type: 'website',
    ...customMeta
  }
  const router = useRouter()

  return (
    <div className="text-neutral-900 dark:text-neutral-50">
      <Head>
        <title>{meta.title}</title>
        <meta content={meta.description} name="description" />
        <meta name="robots" content="follow, index" />
        <meta property="og:site_name" content="Kirill Tregubov" />
        <link
          rel="canonical"
          href={`https://kirilltregubov.com${router.asPath}`}
        />
        <meta
          property="og:url"
          content={`https://kirilltregubov.com${router.asPath}`}
        />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={meta.image} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:locale" content="en_US" />
        {meta.type === 'article' && (
          <>
            {meta.published_time && (
              <meta
                property="article:published_time"
                content={meta.published_time}
              />
            )}
            {meta.modified_time && (
              <>
                <meta
                  property="article:modified_time"
                  content={meta.modified_time}
                />
                <meta property="og:updated_time" content={meta.modified_time} />
              </>
            )}
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
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KirillTregubov_" />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <Navbar />
      <main id="content" className="justify-centre flex flex-col px-6 md:px-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
