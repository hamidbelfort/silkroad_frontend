"use client";

import { useState, useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
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
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LinkItemType } from "@/lib/types/linkItemType";
import { Skeleton } from "@/components/ui/skeleton";
export function Navbar() {
  const { t } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const { token } = useAuthStore();
  const router = useRouter();
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!setHydrated)
    return <Skeleton className="h-16 w-full" />;
  const isLoggedIn = !!token;
  const publicLinks: LinkItemType[] = [
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
  ];
  const userLinks: LinkItemType[] = [
    {
      href: "/dashboard",
      label: t("navbar.dashboard"),
      icon: <LayoutDashboard size={18} />,
    },
    {
      href: "/signout",
      label: t("navbar.signout"),
      icon: <LogOut size={18} />,
      onClick: () => {
        useAuthStore.getState().logout();
        router.push("/login");
      },
    },
  ];
  const guestLinks: LinkItemType[] = [
    {
      href: "/login",
      label: t("navbar.login"),
      icon: <LogIn size={18} />,
    },
  ];
  const navLinks = [
    ...publicLinks,
    ...(hydrated && isLoggedIn ? userLinks : guestLinks),
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
          SilkRoad{" "}
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="text-sm font-medium hover:underline"
              onClick={(e) => {
                if (link.onClick) {
                  e.preventDefault();
                  link.onClick(router);
                }
              }}
            >
              {link.label}
            </Link>
          ))}
          <ModeToggle />
          <div className="relative">
            <select
              className="text-sm bg-transparent text-foreground border-none focus:outline-none"
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
              <SheetTitle className="text-center p-2">
                {t("menu")}
              </SheetTitle>
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
                    onChange={(e) =>
                      changeLanguage(e.target.value)
                    }
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
