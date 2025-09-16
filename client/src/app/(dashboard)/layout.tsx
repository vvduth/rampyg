"use client";
import AppSidebar from "@/components/AppSidebar";
import ChaptersSidebar from "@/components/courses/[courseId]/ChaptersSidebar";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [courseId, setCourseId] = useState<string | null>(null);
  const { user, isLoaded } = useUser();
  const isCoursePage = /^\/user\/courses\/[^\/]+(?:\/chapters\/[^\/]+)?$/.test(
    pathname
  );

  // handle use effect isCoursePage
 useEffect(() => {
    if (isCoursePage) {
      const match = pathname.match(/\/user\/courses\/([^\/]+)/);
      setCourseId(match ? match[1] : null);
    } else {
      setCourseId(null);
    }
  }, [isCoursePage, pathname]);
  if (!isLoaded) return <Loading />;
  if (!user) return <div>Please sign in to access the dashboard.</div>;

  return (
    <SidebarProvider>
        <div className="dashboard">
          <AppSidebar />
      {/* sidebar will go here */}
      <div className="dashboard__content">
        {/* chapter sidebar will go here */}
        {courseId && <ChaptersSidebar />}
        <div
          className={cn("dashboard__main",
            isCoursePage && "dashboard__main--not-course"
          )}
          style={{
            height: "100vh",
          }}
        >
          <Navbar isCoursePage={isCoursePage} />
          <main className="dashboard__body">{children}</main>
        </div>
      </div>
    </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
