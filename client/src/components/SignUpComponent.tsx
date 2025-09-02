"use client"
import { SignUp, useUser } from '@clerk/nextjs'
import React from 'react'
import {dark} from "@clerk/themes"
import { useSearchParams } from 'next/navigation';
const SignUpComponent = () => {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const isCheckoutPage = searchParams.get("showSignUp") !== null;
  const courseId = searchParams.get("courseId");

  const signInUrl = isCheckoutPage
    ? `/checkout?step=1&id=${courseId}&showSignUp=false`
    : "/signin";
  
  const getRedirecturl = () => {
    if (isCheckoutPage) {
      return `/checkout?step=2&id=${courseId}`
    }
    const userType = user?.publicMetadata?.userType as string;
    if (userType === "teacher") {
      return "/teacher/courses";
    }
    return "/user/courses";
  }
  return (
    <div>
      <SignUp 
        appearance={{
          baseTheme:dark ,
          elements: {
            rootBox: "flex justify-center items-center "
          }
        }}
        signInUrl={signInUrl}
        forceRedirectUrl={getRedirecturl()}
        routing="hash"
        afterSignOutUrl={"/"}
      />
    </div>
  )
}

export default SignUpComponent