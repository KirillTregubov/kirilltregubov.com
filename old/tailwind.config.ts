import type { Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import colors from 'tailwindcss/colors'

export default {
  content: ['./src/**/*.tsx'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        rotate: 'rotate 2s ease-in-out'
      },
      colors: {
        accent: colors.orange
      },
      fontFamily: {
        sans: ['Inter var', ...fontFamily.sans]
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(0deg)' },
          '40%, 100%': { transform: 'rotate(360deg)' }
        }
      },
      screens: {
        wide: { raw: '(min-width: 825px)' }
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
} satisfies Config
