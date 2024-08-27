import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'
import typography from '@tailwindcss/typography'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        accent: colors.orange
      },
      screens: {
        xs: '375px'
      },
      minHeight: {
        dynamic: ['100vh', '100dvh']
      },
      fontFamily: {
        sans: ['Inter Variable', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [typography],
  future: {
    hoverOnlyWhenSupported: true
  }
}
