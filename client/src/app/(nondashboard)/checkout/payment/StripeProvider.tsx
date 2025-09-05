"use client";
import React, { useEffect, useState } from "react";
import { Appearance, loadStripe } from "@stripe/stripe-js";
import { useCreateStripePaymentIntentMutation } from "@/state/api";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";
if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY environment variable");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const appearance : Appearance = {
    theme: 'stripe',
    variables: {
        colorPrimary: '#0570de',
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        colorTextPlaceholder   : '#666',
        fontFamily: 'Ideal Sans, system-ui, sans-serif',
        spacingUnit: '2px',
        borderRadius: '4px',
        fontSizeBase: '16px',
    }
}
const StripeProvider = ({children}: {
    children: React.ReactNode
}) => {
    const [clientSecret, setClientSecret] = useState<string | "">("");
    const [createStripePaymentIntent] = useCreateStripePaymentIntentMutation();
    const {course} = useCurrentCourse();
    useEffect(() => {
        if (!course) return;
        const fetchPaymentIntent = async () => {
            const result = await createStripePaymentIntent({
                amount: course?.price ?? 999999999999, 
            }).unwrap();
        }
    }, [])
  return <div>{children}</div>;
};

export default StripeProvider;
