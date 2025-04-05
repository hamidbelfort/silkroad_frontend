"use client";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
export default function Home() {
  const { t, i18n } = useTranslation("common");
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (i18n.isInitialized) {
      setIsReady(true);
    } else {
      i18n.on("initialized", () => setIsReady(true));
    }
  }, [i18n]);

  if (!isReady) return null;
  return (
    <main className="flex flex-col min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">{t("welcomeText")}</h1>
      <h1>{t("greeting")}</h1>
      <p>{t("login")}</p>
    </main>
  );
}
