import { SidebarItemType } from "@/lib/types/sidebar";
import { LayoutDashboard, Hotel, Repeat, User, LogOut } from "lucide-react";

export const customerItems: SidebarItemType[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Exchange", href: "/dashboard/exchange", icon: Repeat },
  { title: "Reserve Hotel", href: "/dashboard/hotel", icon: Hotel },
  { title: "Profile", href: "/dashboard/profile", icon: User },
  { title: "Sign out", href: "/logout", icon: LogOut },
];
