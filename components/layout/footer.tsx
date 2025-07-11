"use client";
import { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useTranslation } from "react-i18next";
export default function Footer() {
  const { t } = useTranslation();
  const app_title = process.env.APP_TITLE || "Silk Road Services";
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  //from-indigo-800/80 via-purple-700/80 to-pink-600/80
  return (
    <footer className="w-full border-t bg-gradient-to-t from-background to-muted/50 text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* حالت موبایل: آکاردئون */}
        <div className="md:hidden">
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-foreground cursor-pointer">
                Quick Links
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 pl-2">
                  <li>
                    <Link href="/" className="hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about-us" className="hover:underline">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact-us" className="hover:underline">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link href="/faq" className="hover:underline">
                      FAQ
                    </Link>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-foreground cursor-pointer">
                About
              </AccordionTrigger>
              <AccordionContent>
                <p className="pl-2 text-foreground leading-5">
                  {t("footer.aboutText")}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-foreground cursor-pointer">
                Follow Us
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex gap-3 pl-2 mt-2">
                  <a href="#">
                    <Facebook size={18} />
                  </a>
                  <a href="#">
                    <Twitter size={18} />
                  </a>
                  <a href="#">
                    <Instagram size={18} />
                  </a>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* حالت دسکتاپ: ۳ ستونه */}
        <div className="hidden md:grid grid-cols-3 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-xl mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-xl mb-2">About</h4>
            <p className="leading-5 text-foreground">{t("footer.aboutText")}</p>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex gap-3 mb-4 md:mb-0">
              <Link href="#">
                <Facebook
                  size={20}
                  className="transition-all duration-200 hover:size-7"
                />
              </Link>
              <Link href="#">
                <Twitter
                  size={20}
                  className="transition-all duration-200 hover:size-7"
                />
              </Link>
              <Link href="#">
                <Instagram
                  size={20}
                  className="transition-all duration-200 hover:size-7"
                />
              </Link>
            </div>
            <p className="text-xs text-foreground mt-auto">
              <HoverCard>
                <HoverCardTrigger>
                  &copy; {year} {app_title}. All rights reserved.
                </HoverCardTrigger>
                <HoverCardContent>
                  Made with ❤️ by{" "}
                  <Link href="https://github.com/hamidbelfort">Hamid</Link>
                </HoverCardContent>
              </HoverCard>
            </p>
          </div>
        </div>

        {/* کپی‌رایت در حالت موبایل */}
        <div className="md:hidden mt-6 text-center text-xs text-foreground">
          &copy; {year} SilkRoad. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
