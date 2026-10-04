import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

const previewHostname =
  process.env.VERCEL_ENV === 'preview'
    ? process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
    : undefined

// https://astro.build/config
export default defineConfig({
  site: previewHostname
    ? `https://${previewHostname}`
    : 'https://kirilltregubov.com',
  integrations: [react(), mdx()],

  experimental: {
    incrementalBuild: true,
  },

  vite: {
    plugins: [tailwindcss()],
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
