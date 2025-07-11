// components/landing/HeroSection.tsx
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/animatedSection";
import Image from "next/image";

export const HeroSection = () => {
  const appTitle = process.env.APP_TITLE || "Silk Road Services";

  return (
    <section className="relative h-[75vh] flex items-center bg-black text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-0" />
      <Image
        src="/images/main_hero.webp"
        alt="Hero Image"
        fill
        className="object-cover brightness-[0.9]"
        priority
      />
      <AnimatedSection>
        <div className="relative z-10 text-left max-w-2xl px-6 md:px-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-br from-blue-600 via-teal-500 to-emerald-400 text-transparent bg-clip-text drop-shadow-md">
            Welcome to {appTitle}
          </h1>
          <p className="text-lg md:text-xl text-white mb-4">
            Your trusted gateway to Iran
          </p>

          {/* 👇 متن چینی با زیرخط نقطه‌ای */}
          <p className="text-base md:text-lg text-white underline decoration-dotted underline-offset-4 mb-6">
            您通往伊朗的值得信赖的门户
          </p>

          <Link
            href="/#services"
            className="text-gray-900 bg-white font-semibold rounded-lg px-4 py-2 no-underline hover:underline hover:bg-gray-800 hover:text-white transition-all duration-500 cursor-pointer "
          >
            Explore Our Services
          </Link>
        </div>
      </AnimatedSection>
    </section>
  );
};
