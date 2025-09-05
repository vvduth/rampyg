import React from "react";
import StripeProvider from "./StripeProvider";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useCurrentCourse } from "@/hooks/useCurrentCourse";
import { useClerk, useUser } from "@clerk/nextjs";
import { useCheckoutNavigation } from "@/hooks/useCheckoutNavigation";
import CoursePreview from "@/components/CoursePreview";
import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentPageContent = () => {
  const stripe = useStripe();
  const elements = useElements();

  // const [createTranasction] = useCreateTransactionMutation();
  const { navigateToStep } = useCheckoutNavigation();
  const { course, courseId } = useCurrentCourse();
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!course) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {}

  return <div className="payment">
    <div className="payment__container">
      {/* Order summary goes here */}
      <div className="payment__preview">
        <CoursePreview course={course} />
        </div>
        {/* payment form goes here */}
        <div className="payment__form-container">
          <form id="payment-form" onSubmit={handleSubmit}
          className="payment__form">
            <div className="payment__content">
              <h1 className="payment__title">Payment Information</h1>
              <p className="payment__subtitle">
                Fill out your payment details to complete your purchase.
              </p>
              <div className="payment__method">
                <h3 className="payment__method-title">Payment Method</h3>
                <div className="payment__card-container">
                  <div className="payment__card-header">
                    <CreditCard  size={"24"} />
                    <span>Credit/Debit Card</span>
                  </div>
                  <div className="payment__card-element">
                    <PaymentElement />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
    </div>

    {/* navigation buttons go here */}
    <div className="payment__actions">
      <Button className="hover:bg-white-50/10"
        //onClick={handleSignOutandNavigate}
        variant={"outline"}
        type="button"
      >Switch account</Button>
      <Button
        form="payment-form"
        type="submit"
        className="payment__submit"
        disabled={!stripe || !elements}
      >
        Pay with credit card
      </Button>
    </div>
  </div>;
};

export const PaymentPage = () => {
  return (
    <StripeProvider>
      <PaymentPageContent />
    </StripeProvider>
  );
};
