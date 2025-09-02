import NonDashboardNavBar from '@/components/NonDashboardNavBar'
import React from 'react'
import Landing from './landing/page'
import Footer from '@/components/ui/Footer'

const NonDashBoardLayout = ({ children }: {
    children: React.ReactNode
}) => {
  return (
    <div className="nondashboard-layout">
        <NonDashboardNavBar />
        <main className="nondashboard-layout__main">
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default NonDashBoardLayout