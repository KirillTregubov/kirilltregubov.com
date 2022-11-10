import Head from 'next/head'
import { useRouter } from 'next/router'

import Navbar from 'components/Navbar'
import Footer from 'components/Footer'

const Layout: React.FC<{
  children: React.ReactNode
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
}> = ({ children, ...customMeta }) => {
  const meta = {
    title: 'Kirill Tregubov',
    description: `Full stack web developer and computer science blogger.`,
    image: 'banner.png',
    type: 'website',
    ...customMeta
  }
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
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
        <meta
          property="og:image"
          content={`https://kirilltregubov.com/static/images/${meta.image}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@KirillTregubov_" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta
          name="twitter:image"
          content={`https://kirilltregubov.com/static/images/${meta.image}`}
        />
      </Head>
      <Navbar />
      <main
        id="content"
        className="justify-centre m-auto mt-6 flex max-w-5xl flex-col px-6"
      >
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
