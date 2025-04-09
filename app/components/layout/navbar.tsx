"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { useTranslation } from "react-i18next";
import i18n from "@/lib/i18n";
import {
  Languages,
  Menu,
  Home,
  Info,
  Phone,
  HelpCircle,
  LogIn,
} from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;
  const navLinks = [
    {
      href: "/",
      label: t("navbar.home"),
      icon: <Home size={18} />,
    },
    {
      href: "/faq",
      label: t("FAQ"),
      icon: <HelpCircle size={18} />,
    },
    {
      href: "/about",
      label: t("navbar.about"),
      icon: <Info size={18} />,
    },
    {
      href: "/contact",
      label: t("navbar.contact"),
      icon: <Phone size={18} />,
    },
    {
      href: "/login",
      label: t("login"),
      icon: <LogIn size={18} />,
    },
  ];
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };
  const getLanguage = () => localStorage.getItem("lang");
  return (
    <header className="w-full shadow-sm border-b">
      {" "}
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {" "}
        <Link href="/" className="text-xl font-bold">
          {" "}
          Silkroad{" "}
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:underline"
            >
              {link.label}
            </Link>
          ))}
          <ModeToggle />
          <div className="relative">
            <select
              className="text-sm bg-transparent border-none focus:outline-none"
              onChange={(e) => changeLanguage(e.target.value)}
            >
              <option value="en" defaultChecked={getLanguage() === "en"}>
                EN
              </option>
              <option value="zh" defaultChecked={getLanguage() === "zh"}>
                中文
              </option>
            </select>
          </div>
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle className="text-center p-2">{t("menu")}</SheetTitle>
              <div className="flex flex-col gap-4 mt-4 pl-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-base hover:underline"
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center gap-2">
                  <Languages size={18} />
                  <select
                    className="text-sm bg-transparent border-none focus:outline-none"
                    onChange={(e) => changeLanguage(e.target.value)}
                  >
                    <option value="en">EN</option>
                    <option value="zh">中文</option>
                  </select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
