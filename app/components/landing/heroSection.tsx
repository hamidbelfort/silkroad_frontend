// components/landing/HeroSection.tsx
import Image from "next/image";

export const HeroSection = () => {
  const app_title =
    process.env.APP_TITLE || "Silk Road Services";
  return (
    <section className="relative h-[70vh] flex items-center justify-center text-white">
      <Image
        src="/images/plane-takeoff.jpg"
        alt="Plane taking off"
        layout="fill"
        objectFit="cover"
        className="brightness-75"
        priority
      />
      <div className="relative z-10 text-center max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-b from-white to-black bg-clip-text">
          Welcome to {app_title}
        </h1>
        <p className="text-lg md:text-xl">
          Your gateway to smart tourism and services.
        </p>
      </div>
    </section>
  );
};
