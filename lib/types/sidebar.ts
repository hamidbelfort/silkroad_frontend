import { LucideIcon } from "lucide-react";

export interface SidebarItemType {
  title: string;
  href: string;
  icon: LucideIcon;
}

export interface SidebarItemProps extends SidebarItemType {
  isCollapsed: boolean;
}
