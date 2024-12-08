import { type AppProps } from 'next/app'
import { CookieConsent } from '../components/ui/CookieConsent'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <CookieConsent />
    </>
  )
}