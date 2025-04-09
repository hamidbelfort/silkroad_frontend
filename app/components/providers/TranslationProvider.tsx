// components/providers/translation-provider.tsx
"use client";

import { useEffect, useState } from "react";
import i18n from "@/lib/i18n";
import { I18nextProvider } from "react-i18next";

export const TranslationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || "en";

    // جلوگیری از ست کردن تکراری زبان
    if (i18n.language !== storedLang) {
      i18n.changeLanguage(storedLang);
    }

    setReady(true);
  }, []);

  if (!ready) return null; // جلوگیری از رندر تا وقتی زبان ست نشده

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};
