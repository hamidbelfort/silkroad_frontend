import { LucideIcon } from "lucide-react";

export interface SidebarItemType {
  title: string;
  href: string;
  icon: LucideIcon;
  onClick?: (router: unknown) => void;
  hrefRouter?: string;
  children?: SidebarItemType[];
}

export interface SidebarItemProps extends SidebarItemType {
  isCollapsed: boolean;
}
