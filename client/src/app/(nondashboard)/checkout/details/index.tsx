"use client";
import CoursePreview from '@/components/CoursePreview';
import Loading from '@/components/Loading';
import { useCurrentCourse } from '@/hooks/useCurrentCourse';
import { useSearchParams } from 'next/navigation'
import React from 'react'
import SignUpComponent from '@/components/SignUpComponent';
import SignInComponent from '@/components/SignInComponent';
const CheckoutDetailsPage = () => {
    const { course: selectedCourse, isLoading, isError } = useCurrentCourse();
    const searchParams = useSearchParams();
    const showSignUp = searchParams.get("showSignUp") === "true";

    if (isLoading) return <Loading />;
    if (isError) return <div>Error loading course details.</div>;
    if (!selectedCourse) return <div>No course selected.</div>;
  return (
    <div className='checkout-details'>
      <div className='checkout-details__container'>
        <div className='checkout-details__preview'>
          <CoursePreview course={selectedCourse} />
        </div>
        {/* Guest checkout section */}
        <div className='checkout-details__auth'>
          {showSignUp ? (
            <SignUpComponent />
          ): (
            <SignInComponent />
          )}
        </div>
      </div>
    </div>
  )
}

export default CheckoutDetailsPage