"use client";
import React from "react";
import { CustomerDashboardCards } from "./components/dashboard/customer/dashboardCards";
//import { useAuthStore } from "@/store/authStore";
const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">
        Welcome to Your Dashboard 🎉
      </h1>
      <div className="mt-2 text-muted-foreground">
        This is your dashboard overview.
        <CustomerDashboardCards />
      </div>
    </div>
  );
};

export default Dashboard;
