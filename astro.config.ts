import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],

  experimental: {
    incrementalBuild: true,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  redirects: {
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
