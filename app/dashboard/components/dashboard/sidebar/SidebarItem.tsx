"use client";

import Link from "next/link";
import { SidebarItemProps } from "@/lib/types/sidebar";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const SidebarItem = ({
  label,
  href,
  icon: Icon,
  onClick,
  hrefRouter,
  isCollapsed,
}: SidebarItemProps) => {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault();
          onClick(router);
          router.push(hrefRouter!);
        }
      }}
      className={cn(
        "flex items-center space-x-2 mx-2 p-2 rounded-md hover:bg-muted transition",
        isCollapsed ? "justify-center" : "justify-start"
      )}
    >
      <Icon className="h-5 w-5" />
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};
