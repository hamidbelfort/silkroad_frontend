"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { SidebarItem } from "./SidebarItem";
import {
  adminSidebarItems,
  operatorSidebarItems,
  customerSidebarItems,
} from "./sidebarItems";
import { SidebarItemType } from "@/lib/types/sidebar";

interface SidebarProps {
  isCollapsed: boolean;
}
const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const role = useAuthStore((state) => state.user?.role);
  const router = useRouter();
  let items: SidebarItemType[] = [];
  if (role === "admin") items = adminSidebarItems;
  else if (role === "operator")
    items = operatorSidebarItems;
  else if (role === "customer")
    items = customerSidebarItems;
  else {
    router.push("/");
  }
  return (
    <div className="flex flex-col gap-2 py-4">
      {items.map((item: SidebarItemType, idx: number) => (
        <SidebarItem
          key={idx}
          {...item}
          isCollapsed={isCollapsed}
        />
      ))}
    </div>
  );
};
export default Sidebar;
