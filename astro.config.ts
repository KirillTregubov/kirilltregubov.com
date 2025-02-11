import { defineConfig } from 'astro/config'
import react from '@astrojs/react'
import mdx from '@astrojs/mdx'

import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],

  vite: {
    plugins: [tailwindcss()]
  },

  redirects: {
    '/github': {
      status: 308,
      destination: 'https://github.com/KirillTregubov'
    },
    '/linkedin': {
      status: 308,
      destination: 'https://www.linkedin.com/in/kirilltregubov/'
    }
  }
})
