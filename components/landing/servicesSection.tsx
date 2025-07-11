// components/landing/ServiceSections.tsx
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/animatedSection";
const services = [
  {
    id: "hotel",
    title: "Hotel Booking",
    desc: "Beyond a simple search, book with confidence. We offer a curated selection of verified hotels, from boutique guesthouses to luxury resorts, all across Iran. Our seamless booking process ensures you have a comfortable and secure place to stay, so you can focus on your journey.",
    img: "/images/hotel.png",
  },
  {
    id: "exchange",
    title: "Currency Exchange",
    desc: "Navigate currency exchange with clarity and confidence. Avoid hidden fees and confusing rates with our platform, which provides transparent, real-time exchange rates. Exchange your currency securely and get the best value for your money.",
    img: "/images/exchange.jpg",
  },
  {
    id: "tours",
    title: "Tour Guides",
    desc: "Discover the soul of Iran with those who know it best. We connect you with experienced, multilingual local guides who are passionate about sharing their culture. Unlock authentic experiences, from historical wonders to hidden culinary gems, with a trusted local expert by your side.",
    img: "/images/tour.jpg",
  },
  {
    id: "support",
    title: "Local Support",
    desc: "Travel with complete peace of mind, knowing you're never alone. Our dedicated 24/7 support team is always just a call or message away. Whether you need help with translation, directions, or any unforeseen situation, we are your reliable support system on the ground in Iran.",
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
            } items-center gap-10 max-w-6xl mx-auto p-6 rounded-xl transition-all duration-300 hover:shadow-xl hover:bg-slate-50 dark:hover:bg-slate-800`}
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
