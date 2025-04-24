// components/ui/language-switcher.tsx
"use client";

import { Button } from "@/components/ui/button";
import Flag from "react-world-flags";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { updateLanguage } from "@/lib/api/auth";
import { LanguageManager } from "@/lib/languageManager";
import { useAuthStore } from "@/store/authStore";
const languages = [
  { code: "en", label: "English", country: "us" },
  { code: "zh", label: "中文", country: "cn" },
];

export const LanguageSwitcher = () => {
  const { isLoggedIn } = useAuthStore();
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(i18n.language);

  const changeLang = async (lng: "en" | "zh") => {
    setLang(lng);
    localStorage.setItem("language", lng);
    LanguageManager.set(lng);
    i18n.changeLanguage(lng);
    if (isLoggedIn) {
      await updateLanguage(lng);
    }
    //window.location.reload();
  };

  const current = languages.find((l) => l.code === lang);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="text-sm capitalize flex items-center gap-2"
        >
          <Flag code={current?.country || "us"} style={{ width: 20 }} />
          {current?.label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => changeLang(l.code as "en" | "zh")}
          >
            <div className="flex items-center gap-2">
              <Flag code={l.country} style={{ width: 20 }} />
              {l.label}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
