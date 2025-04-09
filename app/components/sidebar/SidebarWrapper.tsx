"use client";

import { getUserRole } from "@/lib/api/auth";
import AdminSidebar from "./admin/AdminSidebar";
import OperatorSidebar from "./operator/OperatorSidebar";
import CustomerSidebar from "./customer/CustomerSidebar";

export default function SidebarWrapper() {
  const role = getUserRole(); // مثلا: "admin" | "operator" | "customer"

  switch (role) {
    case "admin":
      return <AdminSidebar />;
    case "operator":
      return <OperatorSidebar />;
    case "customer":
      return <CustomerSidebar />;
    default:
      return null;
  }
}
