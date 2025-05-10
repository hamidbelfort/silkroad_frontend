"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ClassNames from "embla-carousel-class-names";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { UserCircle } from "lucide-react";
//import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
const testimonials = [
  {
    name: "Angela Wang",
    text: "Great experience! Everything was smooth and fast.",
  },
  {
    name: "Li Wei",
    text: "平台服务很好，我很满意！",
  },
  {
    name: "Zhang Min",
    text: "I really liked the exchange rate system, very transparent.",
  },
  {
    name: "Tiger Hui",
    text: "我对该网站的服务非常满意，尤其是其支持。",
  },
  {
    name: "Chen Hui",
    text: "App is easy to use and very helpful for tourists.",
  },
  {
    name: "王伟",
    text: "Very convenient and easy to book hotels!",
  },
  {
    name: "李娜",
    text: "货币兑换功能很棒，实时汇率很准确。",
  },
  {
    name: "陈晨",
    text: "I felt very safe using this platform.",
  },
  { name: "张强", text: "导游服务非常专业，值得推荐。" },
  {
    name: "刘洋",
    text: "Everything was smooth and professional!",
  },
  { name: "赵敏", text: "非常满意的用户体验。" },
];

export const Testimonials = () => {
  const { t } = useTranslation("common");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [Autoplay({ delay: 3500 }), ClassNames()]
  );

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    });
  }, [emblaApi]);

  return (
    <section className="py-20 bg-muted">
      <h2 className="text-3xl font-bold text-center mb-10">
        {t("title.testimonials")}
      </h2>

      <div className="relative max-w-4xl mx-auto">
        {/* SLIDER */}
        <div ref={emblaRef} className="overflow-hidden">
          <div className="flex transition-opacity duration-700">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                className="embla__slide min-w-full px-4 flex justify-center"
              >
                <Card className="w-full max-w-xl shadow-md hover:shadow-xl transition">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3">
                      <UserCircle className="text-blue-500 w-6 h-6" />
                      <p className="font-semibold">
                        {item.name}
                      </p>
                    </div>
                    <p className="text-muted-foreground text-md leading-relaxed relative pl-6">
                      <span className="absolute left-0 top-0 text-4xl text-blue-400">
                        ”
                      </span>
                      {item.text}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition ${
                selectedIndex === idx
                  ? "bg-blue-500 scale-110"
                  : "bg-gray-400 opacity-50"
              }`}
              onClick={() => scrollTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
