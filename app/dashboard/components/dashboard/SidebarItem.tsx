"use client";

import Link from "next/link";
import { SidebarItemProps } from "@/lib/types/sidebar";
import { cn } from "@/lib/utils";

export const SidebarItem = ({
  title,
  href,
  icon: Icon,
  isCollapsed,
}: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center space-x-2 p-2 rounded-md hover:bg-muted transition",
        isCollapsed ? "justify-center" : "justify-start"
      )}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span>{title}</span>}
    </Link>
  );
};
