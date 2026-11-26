import { readdirSync, readFileSync } from 'node:fs'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

const previewHostname =
  process.env.VERCEL_ENV === 'preview'
    ? process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
    : undefined

// Blog posts marked hidden or draft are reachable but should not be listed.
const unlistedBlogPaths = new Set(
  readdirSync('src/content/blog')
    .filter((file) => file.endsWith('.mdx') && !file.startsWith('_'))
    .filter((file) =>
      /^(hidden|draft):\s*true\s*$/m.test(
        readFileSync(`src/content/blog/${file}`, 'utf8').split(/^---$/m)[1] ??
          '',
      ),
    )
    .map((file) => `/blog/${file.replace(/\.mdx$/, '')}/`),
)

const excludedFromSitemap = (pathname: string) =>
  /^\/(dev|embed|assets)\//.test(pathname) ||
  /^\/(404|rss\.xml|robots\.txt|saved)\/?$/.test(pathname) ||
  unlistedBlogPaths.has(pathname.endsWith('/') ? pathname : `${pathname}/`)

// https://astro.build/config
export default defineConfig({
  site: previewHostname
    ? `https://${previewHostname}`
    : 'https://kirilltregubov.com',
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => !excludedFromSitemap(new URL(page).pathname),
      // Match internal links and canonical URLs, which omit the trailing slash.
      serialize: (item) => {
        const url = new URL(item.url)
        if (url.pathname.length > 1) {
          url.pathname = url.pathname.replace(/\/$/, '')
        }
        return { ...item, url: url.href }
      },
    }),
  ],

  experimental: {
    incrementalBuild: true,
  },

  vite: {
    plugins: [tailwindcss()],
    // react-tweet imports CSS modules, which Node can't load unbundled.
    ssr: { noExternal: ['react-tweet'] },
    build: {
      // SaturnScene is deliberately lazy-loaded after the GPU capability check.
      // Currently ~1003 kB (three.js), so allow headroom for updates.
      chunkSizeWarningLimit: 1500,
    },
  },

  redirects: {
    '/raiven': {
      status: 308,
      destination: '/blog/raiven',
    },
    '/github': {
      status: 308,
      destination: 'https://github.com/KirillTregubov',
    },
    '/linkedin': {
      status: 308,
      destination: 'https://www.linkedin.com/in/kirilltregubov/',
    },
  },
})
