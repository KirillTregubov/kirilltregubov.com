import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

import 'styles/globals.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
