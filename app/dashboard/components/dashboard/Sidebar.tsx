"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { SidebarItem } from "./SidebarItem";
import {
  adminSidebarItems,
  operatorSidebarItems,
  customerSidebarItems,
} from "./sidebarItems";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
interface SidebarProps {
  isCollapsed: boolean;
}
const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const role = useAuthStore((state) => state.user?.role);

  let items: any = [];
  if (role === "admin") items = adminSidebarItems;
  else if (role === "operator") items = operatorSidebarItems;
  else if (role === "customer") items = customerSidebarItems;

  return (
    <div className="flex flex-col gap-2 py-4">
      {items.map((item: any, idx: any) => (
        <SidebarItem key={idx} {...item} isCollapsed={isCollapsed} />
      ))}
    </div>
  );
};
export default Sidebar;
