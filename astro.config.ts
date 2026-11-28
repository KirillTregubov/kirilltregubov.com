import { readdirSync, readFileSync } from 'node:fs'

import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import sitemap from '@astrojs/sitemap'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import vercelConfig from './vercel.json' with { type: 'json' }

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

  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        // Project images are UI screenshots: keep full colour resolution
        // (4:4:4), since 4:2:0 visibly smears coloured text and edges. At this
        // quality AVIF is about the size of the old WebP at q80, but far
        // closer to the original.
        avif: { quality: 70, chromaSubsampling: '4:4:4' },
      },
    },
  },

  vite: {
    plugins: [tailwindcss()],
    // react-tweet imports CSS modules, which Node can't load unbundled.
    resolve: { noExternal: ['react-tweet'] },
    build: {
      // SaturnScene is deliberately lazy-loaded after the GPU capability check.
      // Currently ~1003 kB (three.js), so allow headroom for updates.
      chunkSizeWarningLimit: 1500,
    },
  },

  // Vercel serves these as real 308s; Astro uses them for the dev server and
  // for any host that ignores vercel.json (where they become meta refreshes).
  redirects: Object.fromEntries(
    vercelConfig.redirects.map(({ source, destination }) => [
      source,
      { status: 308 as const, destination },
    ]),
  ),
})
