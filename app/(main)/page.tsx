import { HeroSection } from "../../components/landing/heroSection";
import { ServicesOverview } from "../../components/landing/servicesOverview";
import { ServiceSections } from "../../components/landing/servicesSection";
import { Testimonials } from "../../components/landing/testimonials";

// app/(main)/page.tsx
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <ServiceSections />
      <Testimonials />
    </>
  );
}
