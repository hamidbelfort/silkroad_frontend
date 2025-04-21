// components/landing/HeroSection.tsx
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animatedSection";
import Image from "next/image";

export const HeroSection = () => {
  const appTitle =
    process.env.APP_TITLE || "Silk Road Services";

  return (
    <section className="relative h-[75vh] flex items-center justify-center bg-black text-white overflow-hidden">
      <Image
        src="/images/plane-takeoff.png"
        alt="Plane taking off"
        fill
        className="object-cover brightness-[0.6]"
        priority
      />
      <AnimatedSection delay={0.1}>
        <div className="relative z-10 text-center max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-br from-white to-blue-300 text-transparent bg-clip-text drop-shadow-md">
            Welcome to {appTitle}
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6">
            Your gateway to smart tourism and trusted
            services.
          </p>
          <Button variant="secondary">
            Explore Our Services
          </Button>
        </div>
      </AnimatedSection>
    </section>
  );
};
