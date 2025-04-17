"use client";
import React from "react";

import { ModeToggle } from "@/components/ui/mode-toggle";
import { useAuthStore } from "@/store/authStore";
import { useTranslation } from "react-i18next";
const Navbar = () => {
  const { role } = useAuthStore();
  const { t } = useTranslation("common");
  const normalizedRole = role?.toLowerCase();
  const roleText = t(`navbar.${normalizedRole}`);
  return (
    <nav className="w-full h-14 px-6 flex items-center justify-between border-b">
      <h1 className="text-lg font-semibold text-shadow-md">
        Main Dashboard
      </h1>
      <div className="flex items-center gap-4">
        <ModeToggle />
        <span className="text-sm text-muted-foreground capitalize">
          {roleText}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
