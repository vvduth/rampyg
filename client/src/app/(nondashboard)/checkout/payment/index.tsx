import React from 'react'
import StripeProvider from './StripeProvider'

const PaymentPageContent = () => {
  return (
    <div>PaymentPageContent</div>
  )
}

export const PaymentPage = () => {
  return (
    <StripeProvider>
      <PaymentPageContent />
    </StripeProvider>
  )
}
