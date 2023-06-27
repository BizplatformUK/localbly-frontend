import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { GlobalProvider } from '../context/globalContext'
import { MantineProvider } from '@mantine/core';

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <GlobalProvider>
              <Component {...pageProps} />
        </GlobalProvider>
        </MantineProvider>
    </SessionProvider>
  )
}

export default MyApp
