"use client"
import Loading from '@/components/Loading';
import WizardStepper from '@/components/WizardStepper';
import { useCheckoutNavigation } from '@/hooks/useCheckoutNavigation';
import { useUser } from '@clerk/nextjs'
import React from 'react'
import CheckoutDetailsPage from './details';

const CheckoutPage = () => {
    const { isLoaded } = useUser();
    const { checkoutStep } = useCheckoutNavigation();

    if (!isLoaded ) return <Loading />;

    const renderStep = () => {
        switch(checkoutStep) {
            case 1:
                return <CheckoutDetailsPage />;
            case 2:
                return "payment  page";
            case 3:
                return "completion page";
            default:
                return "checkout details page";
        }
    }
  return (
    <div className='checkout'>
        <WizardStepper currentStep={checkoutStep} />
        <div className='checkout__content'>{renderStep()}</div>
    </div>
  )
}

export default CheckoutPage