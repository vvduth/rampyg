import { SignUp } from '@clerk/nextjs'
import React from 'react'
import {dark} from "@clerk/themes"
const SignUpComponent = () => {
  return (
    <div>
      <SignUp 
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

export default SignUpComponent