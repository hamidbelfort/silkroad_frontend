import { HeroSection } from "../components/landing/heroSection";
import { ServicesOverview } from "../components/landing/servicesOverview";
import { ServiceSections } from "../components/landing/servicesSection";

// app/(main)/page.tsx
export default function HomePage() {
  const app_title = process.env.APP_TITLE || "Silk Road Services";
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <ServiceSections />
    </>
  );
}
