const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./pages/**/*.tsx', './components/*.tsx', './layouts/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
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
