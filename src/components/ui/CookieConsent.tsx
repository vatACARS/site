import { useState, useEffect } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./alert-dialog"

const COOKIE_CONSENT_KEY = 'cookieConsent'

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const hasConsented = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (!hasConsented) {
      setShowConsent(true)
    }
  }, [])

  const handleConsent = (status) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, status || 'declined')
    setShowConsent(false)
  }

  return (
    <AlertDialog open={showConsent}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Cookie Settings</AlertDialogTitle>
          <AlertDialogDescription className="text-sm">
            We use cookies to enhance your browsing experience and analyze site traffic. 
            By clicking Accept, you consent to our use of cookies.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel 
            onClick={() => handleConsent('declined')}
            className="mt-0"
          >
            Decline
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={() => handleConsent('accepted')}
          >
            Accept
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}