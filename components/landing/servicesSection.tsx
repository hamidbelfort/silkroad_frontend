// components/landing/ServiceSections.tsx
"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animatedSection";
import { useTranslation } from "react-i18next";
const services = [
  {
    id: "hotel",
    title: "sections.hotelServices.title",
    desc: "sections.hotelServices.desc",
    img: "/images/hotel.png",
    alt: "Hotel Booking",
  },
  {
    id: "exchange",
    title: "sections.exchangeServices.title",
    desc: "sections.exchangeServices.desc",
    img: "/images/exchange.jpg",
    alt: "Currency Exchange",
  },
  {
    id: "tours",
    title: "sections.tourServices.title",
    desc: "sections.tourServices.desc",
    img: "/images/tour.jpg",
    alt: "Tour Guides",
  },
  {
    id: "support",
    title: "sections.supportServices.title",
    desc: "sections.supportServices.desc",
    img: "/images/support.jpeg",
    alt: "Local Support",
  },
];

export const ServiceSections = () => {
  const { t } = useTranslation();
  return (
    <section className="py-24 space-y-24 px-4">
      {services.map((s, i) => (
        <AnimatedSection key={i} delay={i * 0.1}>
          <div
            key={s.id}
            id={s.id}
            className={`flex flex-col md:flex-row ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center gap-10 max-w-6xl mx-auto p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:bg-slate-50 dark:hover:bg-slate-800`}
          >
            <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-md">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  className="object-cover rounded-md"
                />
              </AspectRatio>
            </div>
            <div className="md:w-1/2 space-y-3 text-center md:text-left">
              <h3 className="text-2xl font-semibold">{t(s.title)}</h3>
              <p className="text-muted-foreground">{t(s.desc)}</p>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </section>
  );
};
