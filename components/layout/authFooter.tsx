"use client";

import React from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { LanguageSwitcher } from "@/components/ui/language-switcher.tsx";
import { Languages } from "lucide-react";
const AuthFooter = () => {
  const app_title =
    process.env.APP_TITLE || "Silk Road Services";
  const { t } = useTranslation();
  const [year, setYear] = useState(
    new Date().getFullYear()
  );

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="w-full border-t bg-gradient-to-t from-background to-muted/50 text-muted-foreground text-center py-2 text-sm mt-auto">
      <nav className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/">{t("home")}</Link>
            <Link href="/about-us">{t("about")}</Link>
            <Link href="/contact-us">{t("contact")}</Link>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="flex items-center gap-2">
              <Languages size={18} />
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </nav>
      <div>
        <div className="text-left px-4 pt-4">
          <HoverCard>
            <HoverCardTrigger>
              <Button
                variant="link"
                className="hover:no-underline cursor-pointer text-muted-foreground text-sm"
              >
                &copy; {year} {app_title}
              </Button>
              All rights reserved.
            </HoverCardTrigger>
            <HoverCardContent>
              Made with ❤️ by{" "}
              <Link href="https://github.com/hamidbelfort">
                Hamid
              </Link>
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;
