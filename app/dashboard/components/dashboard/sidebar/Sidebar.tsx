"use client";

import { useAuthStore } from "@/store/authStore";
import { SidebarHeader } from "./sidebarHeader";
import { SidebarItem } from "./SidebarItem";
import {
  adminSidebarItems,
  operatorSidebarItems,
  customerSidebarItems,
} from "./sidebarItems";
import { SidebarItemType } from "@/lib/types/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
interface SidebarProps {
  isCollapsed: boolean;
}
const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const role = useAuthStore((state) => state.role);
  // const isLoggedIn = useAuthStore(
  //   (state) => state.isAuthenticated
  // );
  // console.log("isLoggedIn : " + isLoggedIn);
  const normalizedRole = role?.toLowerCase();
  //const router = useRouter();
  let items: SidebarItemType[] = [];
  if (normalizedRole === "admin") items = adminSidebarItems;
  else if (normalizedRole === "operator") items = operatorSidebarItems;
  else if (normalizedRole === "customer") items = customerSidebarItems;
  if (!normalizedRole) {
    return (
      <div className="p-4 text-sm text-gray-500">
        <Skeleton className="h-6" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-2 py-4">
      <SidebarHeader isCollapsed={isCollapsed} />
      {items.map((item: SidebarItemType, idx: number) => {
        return <SidebarItem key={idx} {...item} isCollapsed={isCollapsed} />;
      })}
    </div>
  );
};
export default Sidebar;
