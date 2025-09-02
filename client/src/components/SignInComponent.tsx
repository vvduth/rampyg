import { SignIn } from '@clerk/nextjs'
import React from 'react'
import {dark} from "@clerk/themes"
const SignInComponent = () => {
  return (
    <div>
      <SignIn 
        appearance={{
          baseTheme:dark ,
          elements: {
            rootBox: "flex justify-center items-center "
          }
        }}
      />
    </div>
  )
}

export default SignInComponent