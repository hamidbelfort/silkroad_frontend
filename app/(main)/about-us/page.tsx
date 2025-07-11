"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CheckCircle, Globe, Handshake, Building } from "lucide-react";
import Link from "next/link"; // (تغییر) ایمپورت کردن کامپوننت Link برای لینک‌دهی
import { useTranslation } from "react-i18next";

const timelineEvents = [
  {
    year: "pages.about.sections.timeline.a.year",
    description: "pages.about.sections.timeline.a.desc",
  },
  {
    year: "pages.about.sections.timeline.a.year",
    description: "pages.about.sections.timeline.b.desc",
  },
  {
    year: "pages.about.sections.timeline.a.year",
    description: "pages.about.sections.timeline.c.desc",
  },
];

export default function AboutUs() {
  const { t } = useTranslation();
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10 space-y-20">
      {/* Hero Section - (تغییر) طراحی مجدد با گرادیان برای جذابیت بیشتر */}
      <div className="relative bg-gradient-to-r from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 h-48 flex items-center justify-center text-center rounded-2xl p-6">
        <div className="relative z-10 text-foreground">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            {t("pages.about.title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("pages.about.desc")}
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="text-center space-y-4">
        <div className="flex items-center justify-center">
          {/* (تغییر) رنگ آیکن برای هماهنگی و حس مثبت به text-primary تغییر کرد */}
          <CheckCircle className="w-10 h-10 text-primary mr-2" />
          <h2 className="text-3xl font-semibold">
            {t("pages.about.sections.missions.title")}
          </h2>
        </div>
        <p className="max-w-3xl mx-auto text-muted-foreground text-lg">
          {t("pages.about.sections.missions.desc")}
        </p>
      </section>

      <Separator />

      {/* Values Section */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center">Our Values</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Card className="text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent className="py-8">
              <CheckCircle className="w-10 h-10 mx-auto mb-4 text-green-600" />
              <h3 className="text-xl font-medium">
                {t("pages.about.sections.values.security")}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                {t("pages.about.sections.values.securityDesc")}
              </p>
            </CardContent>
          </Card>
          <Card className="text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent className="py-8">
              <Globe className="w-10 h-10 mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-medium">
                {t("pages.about.sections.values.support")}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                {t("pages.about.sections.values.supportDesc")}
              </p>
            </CardContent>
          </Card>
          <Card className="text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
            <CardContent className="py-8">
              <Handshake className="w-10 h-10 mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-medium">
                {t("pages.about.sections.values.partners")}
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                {t("pages.about.sections.values.partnersDesc")}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      {/* Our Story Timeline - (تغییر) بازطراحی کامل برای بهبود ظاهر و واکنش‌گرایی */}
      <section className="space-y-8">
        <h2 className="text-3xl font-semibold text-center transition-all duration-500 hover:animate-pulse">
          {t("pages.about.sections.timeline.title")}
        </h2>
        <div className="relative max-w-2xl mx-auto">
          {/* خط تایم‌لاین (عمودی در موبایل، افقی در دسکتاپ) */}
          <div className="absolute left-1/2 md:left-0 md:top-1/2 w-0.5 md:w-full h-full md:h-0.5 bg-border -translate-x-1/2 md:translate-x-0 md:-translate-y-1/2" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 md:gap-0">
            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className="relative bg-background p-4 rounded-lg border w-48 text-center transition-transform duration-300 hover:scale-110"
              >
                <div className="absolute -top-2.5 left-1/2 md:left-1/2 md:-top-2 w-5 h-5 bg-primary rounded-full border-4 border-background -translate-x-1/2" />
                <h3 className="font-semibold text-lg">{event.year}</h3>
                <p className="text-sm text-muted-foreground">
                  {event.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Separator />

      {/* (جدید) بخش همکاران برای افزایش اعتماد */}
      <section className="space-y-8 text-center">
        <h2 className="text-3xl font-semibold">
          {t("pages.about.sections.partners.title")}
        </h2>
        <p className="text-muted-foreground">
          {t("pages.about.sections.partners.desc")}
        </p>
        <div className="flex justify-center items-center gap-8 flex-wrap">
          {/* Placeholder for logos */}
          <div className="flex items-center justify-center h-16 w-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Building className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-center h-16 w-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Building className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-center h-16 w-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Building className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-center h-16 w-32 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <Building className="w-8 h-8 text-muted-foreground" />
          </div>
        </div>
      </section>

      {/* CTA Section - (تغییر) دکمه به لینک تبدیل شده است */}
      <div className="text-center space-y-4">
        <p className="text-lg text-muted-foreground">
          Have any ideas in your mind? Let&apos;s talk.
        </p>
        <Link href="/contact-us" passHref>
          <Button
            size="lg"
            className="text-lg cursor-pointer hover:scale-105 transition-all duration-200"
          ></Button>
        </Link>
      </div>
    </div>
  );
}
