// components/landing/HeroSection.tsx
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animatedSection";
import Image from "next/image";

export const HeroSection = () => {
  const appTitle = process.env.APP_TITLE || "Silk Road Services";

  return (
    <section className="relative h-[75vh] flex items-center justify-center bg-black text-white overflow-hidden">
      <Image
        //src="/images/plane-takeoff.png"
        src="/images/main-hero.jpg"
        alt="Hero image"
        fill
        className="object-cover brightness-[0.6]"
        priority
      />
      <AnimatedSection delay={0.1}>
        <div className="relative z-10 flex flex-col text-center w-full px-4">
          <h1 className="lg:text-6xl md:text-4xl sm:text-xl font-extrabold mb-4 bg-gradient-to-b from-white to-gray-200 text-transparent bg-clip-text drop-shadow-md">
            Welcome to {appTitle}
          </h1>
          <p className="text-4xl md:text-2xl sm:text-xl text-neutral-200 mb-6 text-shadow-2xs">
            Your trusted gateway to Iran
          </p>
          <p className="lg:text-4xl md:text-2xl sm:text-xl text-neutral-200 mt-2 text-shadow-2xs decoration-dashed">
            您通往伊朗的值得信赖的门户
          </p>
        </div>
        <div className="flex items-center justify-center mt-6 z-10">
          <Button variant="secondary">Explore Our Services</Button>
        </div>
      </AnimatedSection>
    </section>
  );
};
