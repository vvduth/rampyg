"use client";
import React, { useEffect, useState } from "react";
import { Appearance, loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { useCreateStripePaymentIntentMutation } from "@/state/api";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import Loading from "@/components/Loading";
import { Elements  } from "@stripe/react-stripe-js";

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error("Missing NEXT_PUBLIC_STRIPE_PUBLIC_KEY environment variable");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const appearance: Appearance = {
  theme: "stripe",
  variables: {
    colorPrimary: "#0570de",
    colorBackground: "#ffffff",
    colorText: "#30313d",
    colorDanger: "#df1b41",
    colorTextPlaceholder: "#666",
    fontFamily: "Ideal Sans, system-ui, sans-serif",
    spacingUnit: "2px",
    borderRadius: "4px",
    fontSizeBase: "16px",
  },
};
const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  const [clientSecret, setClientSecret] = useState<string | "">("");
  const [createStripePaymentIntent] = useCreateStripePaymentIntentMutation();
  const { course } = useCurrentCourse();
  useEffect(() => {
    if (!course) return;
    const fetchPaymentIntent = async () => {
      const result = await createStripePaymentIntent({
        amount: course?.price ?? 999999999999,
      }).unwrap();

      setClientSecret(result.clientSecret);
    };
    fetchPaymentIntent();
  }, [createStripePaymentIntent, course?.price, course]);

  const options : StripeElementsOptions = {
    clientSecret,
    appearance,
  }
  if (!clientSecret) {
    return <Loading />;
  }
  return (
    <Elements stripe={stripePromise}
        options={options}
        key={clientSecret}
    >
        {children}
    </Elements>
  );
};

export default StripeProvider;
