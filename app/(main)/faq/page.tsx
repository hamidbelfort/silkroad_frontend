"use client";
import Image from "next/image";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { FaqType } from "@/lib/types/faq";
import questionImage from "@/public/images/questions.svg";
import { Skeleton } from "@/components/ui/skeleton";
import { getFaqs } from "@/lib/api/faq";
import { useEffect, useState } from "react";
//import { DataState } from "@/components/ui/dataState";

export default function FaqPage() {
  const [faqs, setFaqs] = useState<FaqType[]>([]);
  const [loading, setLoading] = useState(true);
  const loadFaqs = async () => {
    try {
      setLoading(true);
      const res = await getFaqs();
      if (res && res.length > 0) {
        setFaqs(res);
      }
      setLoading(false);
    } catch {
      setFaqs([]);
    }
  };
  useEffect(() => {
    loadFaqs();
  }, []);
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-10">
        Frequently Asked Questions
      </h1>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Left side */}
        <div className="md:w-1/3 w-full flex flex-col items-center text-center space-y-4">
          <Image
            src={questionImage}
            alt="FAQ Illustration"
            width={100}
            height={100}
            className="w-1/2"
          />
          <p className="text-muted-foreground text-sm">
            Can’t find what you are looking for?
          </p>
          <Link
            href="/contact-us"
            className="text-blue-400 font-medium hover:underline"
          >
            We would like to chat with you.
          </Link>
        </div>

        {/* Right side */}
        <div className="md:w-2/3 w-full">
          {loading ? (
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-md" />
              ))}
            </div>
          ) : (
            faqs !== null && (
              <Accordion type="multiple" className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={faq.id}>
                    <AccordionItem value={faq.id!}>
                      <AccordionTrigger className="text-lg font-semibold hover:cursor-pointer">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent>{faq.answer}</AccordionContent>
                    </AccordionItem>
                    {index < faqs.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </Accordion>
            )
          )}
        </div>
      </div>
    </div>
  );
}
