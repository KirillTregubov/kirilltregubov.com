import Document, { Html, Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="antialiased">
        <Head>
          <link rel="shortcut icon" href="/static/favicons/favicon.ico" />
          <link href="/static/favicons/site.webmanifest" rel="manifest" />
          <link
            href="/static/favicons/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="/static/favicons/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link
            href="/static/favicons/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <meta
            name="theme-color"
            content="#fafafa"
            media="(prefers-color-scheme: light)"
          />
          <meta
            name="theme-color"
            content="#171717"
            media="(prefers-color-scheme: dark)"
          ></meta>
          {/* Google Site Verification */}
          <meta
            content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            name="robots"
          />
        </Head>
        <body className="bg-neutral-50 text-neutral-900 transition-colors dark:bg-neutral-900 dark:text-neutral-50">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
