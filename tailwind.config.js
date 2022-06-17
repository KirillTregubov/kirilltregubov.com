const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.tsx', './components/*.tsx', './layouts/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        accent: 'spin 3s ease-in-out 3s infinite'
      },
      colors: {
        accent: colors.amber
      },
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans]
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
}
