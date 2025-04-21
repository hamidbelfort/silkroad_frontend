// components/landing/ServiceSections.tsx
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animatedSection";
const services = [
  {
    id: "hotel",
    title: "Hotel Booking",
    desc: "Find and book top-rated hotels across Iran.",
    img: "/images/hotel.png",
  },
  {
    id: "exchange",
    title: "Currency Exchange",
    desc: "Check and exchange currencies with real-time rates.",
    img: "/images/exchange.jpg",
  },
  {
    id: "tours",
    title: "Tour Guides",
    desc: "Connect with experienced local tour guides.",
    img: "/images/tour.jpg",
  },
  {
    id: "support",
    title: "Local Support",
    desc: "Get 24/7 assistance and travel support in Iran.",
    img: "/images/support.jpeg",
  },
];

export const ServiceSections = () => {
  return (
    <section className="py-24 space-y-24 px-4">
      {services.map((s, i) => (
        <AnimatedSection key={i} delay={i * 0.1}>
          <div
            key={s.id}
            id={s.id}
            className={`flex flex-col md:flex-row ${
              i % 2 === 1 ? "md:flex-row-reverse" : ""
            } items-center gap-10 max-w-6xl mx-auto`}
          >
            <div className="w-full md:w-1/2 rounded-lg overflow-hidden shadow-md">
              <AspectRatio ratio={16 / 9}>
                <Image
                  src={s.img}
                  alt={s.title}
                  fill
                  className="object-cover rounded-md"
                />
              </AspectRatio>
            </div>
            <div className="md:w-1/2 space-y-3 text-center md:text-left">
              <h3 className="text-2xl font-semibold">{s.title}</h3>
              <p className="text-muted-foreground">{s.desc}</p>
            </div>
          </div>
        </AnimatedSection>
      ))}
    </section>
  );
};
