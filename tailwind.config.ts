import defaultTheme from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

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
      fontFamily: {
        sans: ['Inter Variable', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true
  }
}
