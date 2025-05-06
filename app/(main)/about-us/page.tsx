import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Globe,
  Handshake,
} from "lucide-react";

export default function AboutUs() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-16">
      {/* Hero Section */}
      <div className="relative bg-gray-100 h-32 flex items-center justify-center text-center rounded-2xl">
        <div className="absolute inset-0 bg-background border-gray-400 rounded-2xl" />
        <div className="relative z-10 text-foreground">
          <h1 className="text-4xl font-bold mb-2">
            About Us
          </h1>
          <p className="text-lg">We Make Travel Easier</p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="text-center space-y-4">
        <div className="flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-red-500 mr-2" />
          <h2 className="text-2xl font-semibold">
            Mission
          </h2>
        </div>
        <p className="max-w-2xl mx-auto text-muted-foreground">
          Our mission is to simplify travel for tourists by
          providing seamless, multilingual and reliable
          services.
        </p>
      </section>

      <Separator />

      {/* Values Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Card className="text-center">
            <CardContent className="py-8">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-medium">Security</h3>
              <p className="text-sm text-muted-foreground">
                We protect our users&rsquo; data and
                transactions with top-grade security.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="py-8">
              <Globe className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <h3 className="font-medium">
                Multilingual Support
              </h3>
              <p className="text-sm text-muted-foreground">
                Our platform is available in multiple
                languages for a better experience.
              </p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="py-8">
              <Handshake className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <h3 className="font-medium">
                Trusted Partnerships
              </h3>
              <p className="text-sm text-muted-foreground">
                We work with trusted local businesses to
                ensure quality service.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Our Story Timeline */}
      <section className="space-y-6 text-center">
        <h2 className="text-2xl font-semibold text-center transition-all duration-500 hover:animate-pulse">
          Our Story
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 px-4">
          <div className="text-center">
            <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-2" />
            <h3 className="font-medium">2024</h3>
            <p className="text-sm text-muted-foreground">
              Project launched
            </p>
          </div>
          <div className="h-px w-full md:w-1/4 bg-border hidden md:block" />
          <div className="text-center">
            <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-2" />
            <h3 className="font-medium">2024</h3>
            <p className="text-sm text-muted-foreground">
              Partnerships established
            </p>
          </div>
          <div className="h-px w-full md:w-1/4 bg-border hidden md:block" />
          <div className="text-center">
            <div className="w-4 h-4 bg-primary rounded-full mx-auto mb-2" />
            <h3 className="font-medium">2025</h3>
            <p className="text-sm text-muted-foreground">
              Multilingual version introduced
            </p>
          </div>
        </div>
      </section>

      <div className="text-center">
        <Button>Get in Touch</Button>
      </div>
    </div>
  );
}
