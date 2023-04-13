import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { Inter } from "next/font/google"

import { usePreserveScroll } from 'lib/usePreserveScroll'
import 'styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  usePreserveScroll()

  return (
    <main className={inter.className}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  )
}

export default MyApp
