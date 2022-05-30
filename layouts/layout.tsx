import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Layout(props) {
  const { children, ...customMeta } = props
  const meta = {
    title: 'Kirill Tregubov',
    description: `Full stack web developer and computer science blogger.`,
    // image: 'https://kirilltregubov.com/static/images/banner.png',
    type: 'website',
    ...customMeta
  }
  const router = useRouter()

  return (
    <div>
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
        <meta property="og:locale" content="en_CA" />
        {meta.type === 'article' && (
          <>
            {meta.published_time && (
              <meta
                property="article:published_time"
                content={meta.published_time}
              />
            )}
            {meta.modified_time && (
              <meta
                property="article:modified_time"
                content={meta.modified_time}
              />
            )}
            {meta.author && (
              <meta property="article:author" content={meta.author} />
            )}
            {meta.section && (
              <meta property="article:section" content={meta.section} />
            )}
            {meta.tags && <meta property="article:tag" content={meta.tags} />}
          </>
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KirillTregubov_" />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:image" content={meta.image} />
      </Head>
      <main id="content" className="justify-centre flex flex-col px-6 md:px-8">
        {children}
      </main>
    </div>
  )
}
