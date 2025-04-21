// components/landing/ServicesOverview.tsx
"use client";

import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animatedSection";
import {
  Hotel,
  DollarSign,
  Users,
  LifeBuoy,
} from "lucide-react";

const services = [
  {
    title: "Hotel Booking",
    icon: <Hotel className="w-6 h-6 text-blue-500" />,
    targetId: "hotel",
  },
  {
    title: "Currency Exchange",
    icon: <DollarSign className="w-6 h-6 text-green-500" />,
    targetId: "exchange",
  },
  {
    title: "Tour Guides",
    icon: <Users className="w-6 h-6 text-purple-500" />,
    targetId: "tours",
  },
  {
    title: "Local Support",
    icon: <LifeBuoy className="w-6 h-6 text-orange-500" />,
    targetId: "support",
  },
];

export const ServicesOverview = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-muted text-center px-4">
      <AnimatedSection delay={0.1}>
        <h2 className="text-3xl font-bold mb-2">
          Our Services
        </h2>
        <p className="text-muted-foreground mb-10">
          We offer trusted, high-quality services for
          travelers.
        </p>
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service) => (
            <Card
              key={service.title}
              onClick={() => scrollTo(service.targetId)}
              className="cursor-pointer hover:shadow-xl transition"
            >
              <CardContent className="flex flex-col items-center gap-3 py-6">
                {service.icon}
                <CardTitle>{service.title}</CardTitle>
                <Badge variant="outline">
                  Click to explore
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
};
