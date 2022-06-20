const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.tsx', './components/*.tsx', './layouts/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        rotate: 'rotate 2s ease-in-out'
      },
      colors: {
        accent: colors.amber
      },
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans]
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '40%, 100%': { transform: 'rotate(360deg)' }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
