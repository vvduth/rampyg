import Header from '@/components/Header'
import { UserProfile } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import React from 'react'

const TeacherProfilePage = () => {
  return (
    <>
        <Header 
            title="Profile"
            subtitle='View and edit your profile information'
        />
        <UserProfile
            path='/teacher/profile'
            routing='path'
            appearance={{
                baseTheme: dark, 
                elements: {
                    scrollBox: "bg-customgreys-darkGrey",
                    navbar: {
                        "& > div:nth-child(1)": {
                            backgroundColor: "none",
                        }
                    }
                }
            }}
        />
    </>
  )
}

export default TeacherProfilePage