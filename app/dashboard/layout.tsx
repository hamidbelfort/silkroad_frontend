"use client";

import SidebarWrapper from "./components/dashboard/sidebar/SideBarWrapper";
import { ReactNode } from "react";
import Navbar from "./components/dashboard/navbar";
import Footer from "./components/dashboard/footer";
const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Sidebar */}
      <Navbar />
      {/* Main content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <SidebarWrapper />
        {/* محتوای صفحه */}
        <main className="flex-1 flex flex-col justify-between p-6 md:p-6 lg:p-8">
          {children}
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
