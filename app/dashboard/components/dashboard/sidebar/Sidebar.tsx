"use client";

import { useAuthStore } from "@/store/authStore";
import { SidebarHeader } from "./sidebarHeader";
import {
  adminSidebarItems,
  operatorSidebarItems,
  customerSidebarItems,
} from "./sidebarItems";
import { SidebarItemType } from "@/lib/types/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
interface SidebarProps {
  isCollapsed: boolean;
}

const Sidebar = ({ isCollapsed }: SidebarProps) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const role = useAuthStore((state) => state.role);
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>([]);

  const normalizedRole = role?.toLowerCase();
  let items: SidebarItemType[] = [];
  if (normalizedRole === "admin") items = adminSidebarItems;
  else if (normalizedRole === "operator")
    items = operatorSidebarItems;
  else if (normalizedRole === "customer")
    items = customerSidebarItems;

  if (!normalizedRole) {
    return (
      <div className="p-4 text-sm text-gray-500">
        <Skeleton className="h-6" />
      </div>
    );
  }

  const toggleMenu = (label: string) => {
    setOpenMenus((prev) =>
      prev.includes(label)
        ? prev.filter((i) => i !== label)
        : [...prev, label]
    );
  };

  return (
    <aside className="flex flex-col py-4 px-2 h-full w-full">
      <SidebarHeader isCollapsed={isCollapsed} />
      <ul className="space-y-2 mt-4">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const hasChildren = !!item.children;
          const isOpen = openMenus.includes(t(item.label));
          const Icon = item.icon;
          const itemOnClick = item.onClick!;
          return (
            <li key={item.label}>
              <div className="flex justify-between items-center">
                <Link
                  href={item.href || "#"}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-accent hover:text-primary transition",
                    isActive && "bg-accent text-primary"
                  )}
                  onClick={(e) => {
                    if (hasChildren) {
                      e.preventDefault();
                      toggleMenu(t(item.label));
                    }
                    if (itemOnClick) {
                      itemOnClick(router);
                    }
                  }}
                >
                  <span>{Icon && <Icon size={18} />}</span>
                  {!isCollapsed && (
                    <span>{t(item.label)}</span>
                  )}
                </Link>
                {hasChildren && !isCollapsed && (
                  <button
                    onClick={() =>
                      toggleMenu(t(item.label))
                    }
                    className="mr-2 text-muted-foreground cursor-pointer"
                  >
                    {isOpen ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}
                  </button>
                )}
              </div>

              {hasChildren && isOpen && !isCollapsed && (
                <ul className="ml-6 mt-1 space-y-1">
                  {item.children?.map((child, i) => {
                    const childActive =
                      pathname === child.href;
                    return (
                      <li key={i}>
                        <Link
                          href={child.href}
                          className={cn(
                            "block px-3 py-1 text-sm rounded-md hover:bg-accent hover:text-primary transition",
                            childActive &&
                              "bg-accent text-primary font-medium"
                          )}
                        >
                          {t(child.label)}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
