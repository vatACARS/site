import { type AppProps } from 'next/app'
import { CookieConsent } from '../components/ui/CookieConsent'
import '../styles/globals.css'

import ConsumerLayout from '@comp/layout/ConsumerLayout'
import { GoogleOAuthProvider } from '@react-oauth/google'
import FlyonuiScript from '@comp/meta/flyonui'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
      <ConsumerLayout>
        <Component {...pageProps} />
        <CookieConsent />
      </ConsumerLayout>
      <FlyonuiScript />
    </GoogleOAuthProvider>
  )
}