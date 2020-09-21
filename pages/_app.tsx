import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/core'
import { GlobalProvider } from '../context/GlobalState'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      <ChakraProvider resetCSS>
        <Component {...pageProps} />
      </ChakraProvider>
    </GlobalProvider>
  )
}

export default MyApp
