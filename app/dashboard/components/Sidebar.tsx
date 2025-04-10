"use client";

import { useState } from "react";
import { SidebarItem } from "./SidebarItem";
import { customerItems } from "./sidebarItems";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className="bg-muted h-screen p-4 transition-all duration-300 min-w-[250px] max-w-[250px] lg:min-w-[250px]">
      <div className="flex justify-between items-center mb-4">
        {!isCollapsed && <h1 className="text-lg font-bold">Dashboard</h1>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <nav className="flex flex-col space-y-1">
        {customerItems.map((item, idx) => (
          <SidebarItem key={idx} {...item} isCollapsed={isCollapsed} />
        ))}
      </nav>
    </aside>
  );
};
