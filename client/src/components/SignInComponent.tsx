"use client"
import { SignIn, useUser } from "@clerk/nextjs";
import React from "react";
import { dark } from "@clerk/themes";
import { useSearchParams } from "next/navigation";

const SignInComponent = () => {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const isCheckoutPage = searchParams.get("showSignUp") !== null;
  const courseId = searchParams.get("courseId");

  const signUpUrl = isCheckoutPage
    ? `/checkout?step=1&id=${courseId}&showSignUp=true`
    : "/signup";
  
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
      <SignIn
        appearance={{
          baseTheme: dark,
          elements: {
            rootBox: "flex justify-center items-center ",
          },
        }}
        signUpUrl={signUpUrl}
        forceRedirectUrl={getRedirecturl()}
        routing="hash"
        afterSignOutUrl={"/"}
      />
    </div>
  );
};

export default SignInComponent;
