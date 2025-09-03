"use client";
import AppSidebar from "@/components/AppSidebar";
import Loading from "@/components/Loading";
import NonDashboardNavBar from "@/components/NonDashboardNavBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  // handle use effect isCoursePage

  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please sign in to access the dashboard.</div>;

  return (
    <SidebarProvider>
        <div className="dashboard">
          <AppSidebar />
      {/* sidebar will go here */}
      <div className="dashboard__content">
        {/* chapter sidebar will go here */}
        
        <div
          className={cn("dashboard__main")}
          style={{
            height: "100vh",
          }}
        >
          <NonDashboardNavBar />
          <main className="dashboard__body">{children}</main>
        </div>
      </div>
    </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
