import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { usePreserveScroll } from 'hooks/usePreserveScroll'

import 'styles/globals.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  usePreserveScroll()

  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
