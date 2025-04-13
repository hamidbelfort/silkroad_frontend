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
const AuthFooter = () => {
  const { t, i18n } = useTranslation();
  const [year, setYear] = useState(
    new Date().getFullYear()
  );
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };
  const getLanguage = () => localStorage.getItem("lang");
  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <footer className="w-full bg-gradient-to-t border-t from-background to-muted/50 text-center py-2 text-sm text-muted-foreground mt-auto">
      <nav className="max-w-7xl mx-auto px-4 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/">{t("home")}</Link>
            <Link href="/about">{t("about")}</Link>
            <Link href="/contact">{t("contact")}</Link>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="relative">
              <select
                className="text-sm bg-transparent border-none focus:outline-none"
                onChange={(e) =>
                  changeLanguage(e.target.value)
                }
              >
                <option
                  value="en"
                  defaultChecked={getLanguage() === "en"}
                >
                  EN
                </option>
                <option
                  value="zh"
                  defaultChecked={getLanguage() === "zh"}
                >
                  中文
                </option>
              </select>
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
                &copy; {year} Silkroad
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
