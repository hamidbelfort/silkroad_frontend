"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";
//import DebugComponent from "./debugComponent";
export default function ContactForm() {
  const { t } = useTranslation("common");
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center text-foreground">
        {t("title.contactUs")}
      </h1>
      <div className="bg-background rounded-xl shadow-sm shadow-card-foreground overflow-hidden flex flex-col md:flex-row">
        {/* Left CTA Section */}
        <div className="md:w-1/2 bg-background p-8 flex flex-col items-center justify-center text-center">
          <Image
            src="/images/contactus.svg" // عکسی که آپلود کردی رو تو public بذار
            alt="Contact Illustration"
            width={200}
            height={200}
            priority
            className="w-full min-w-sm max-w-md"
          />
          <h2 className="text-2xl font-semibold mt-8">
            Let’s get in touch!
          </h2>
          <p className="text-muted-foreground mt-2">
            We’re just one message away —<br /> we&apos;re
            here to help, collaborate, or simply say hi.
          </p>
        </div>
        <div className="md:w-1/2 p-8">
          <ContactForm />
          {/* <DebugComponent /> */}
        </div>
      </div>
    </div>
  );
}
