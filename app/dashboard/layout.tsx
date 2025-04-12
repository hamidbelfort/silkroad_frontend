"use client";

import SidebarWrapper from "./components/dashboard/SideBarWrapper";
import { ReactNode } from "react";

const DashboardLayout = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="flex min-h-screen w-full bg-muted text-foreground">
      {/* Sidebar */}
      <SidebarWrapper />

      {/* Main content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
