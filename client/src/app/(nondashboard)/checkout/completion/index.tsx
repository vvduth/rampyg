import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const CompletionPage = () => {
  return (
    <div className='completion'>
      <div className='completion__content'>
        <div  className='completion__icon'>
          <Check className='w-16 h-16 text-green-500'/>

        </div>
        <h1 className='completion__title'>Thank you for your purchase!</h1>
        <p className='completion__message'>Your transaction has been completed successfully.</p>
      </div>
      <div className='completion__support'>
        <p>
          Need help? Contact our {" "}
          <Button variant={"link"} asChild className='p-0 m-0 text-primary-700'>
            <a href="mailto:support@example.com">support@example.com</a>
          </Button>
        </p>
      </div>
      <div className='completion__action'>
        <Link href="user/courses">Go back to homepage</Link>
      </div>
    </div>
  )
}

export default CompletionPage
