"use client";
import { useEffect, useState } from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="w-full bg-gradient-to-r from-indigo-800/80 via-purple-700/80 to-pink-600/80 text-white">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        {/* حالت موبایل: آکاردئون */}
        <div className="md:hidden">
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-white">
                Quick Links
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-1 pl-2">
                  <li>
                    <a href="/" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/about" className="hover:underline">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="/contact" className="hover:underline">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="/faq" className="hover:underline">
                      FAQ
                    </a>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-white">About</AccordionTrigger>
              <AccordionContent>
                <p className="pl-2 text-white/90 leading-5">
                  We simplify travel for Chinese tourists in Iran. Enjoy easy
                  booking and local services all in one place.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-white">
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
            <h4 className="font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">About</h4>
            <p className="leading-5 text-white/90">
              We simplify travel for Chinese tourists in Iran. Enjoy easy
              booking and local services all in one place.
            </p>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex gap-3 mb-4 md:mb-0">
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
            <p className="text-xs text-white/60 mt-auto">
              &copy; {new Date().getFullYear()} SilkRoad. All rights reserved.
            </p>
          </div>
        </div>

        {/* کپی‌رایت در حالت موبایل */}
        <div className="md:hidden mt-6 text-center text-xs text-white/60">
          &copy; {new Date().getFullYear()} SilkRoad. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
