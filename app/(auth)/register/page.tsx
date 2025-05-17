"use client";
import RegisterForm from "@/components/auth/registerForm";
import Image from "next/image";
import illustration from "@/public/images/my-app.svg";
import { useTranslation } from "react-i18next";
const RegisterPage = () => {
  const { t } = useTranslation("common");
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left column: Illustration + CTA */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center items-start mx-2 px-6 space-y-6 bg-gradient-to-br from-blue-100 via-blue-300 to-purple-200 rounded-b-lg">
        <Image
          src={illustration}
          alt="Login Illustration"
          width={50}
          className="w-full min-w-sm max-w-md"
          priority
        />
        <h2 className="text-3xl font-bold text-neutral-800">
          {t("forms.register.title")}
        </h2>
        <p className="text-neutral-700 text-base leading-relaxed">
          {t("forms.register.CTA")}
        </p>
        <p className="text-sm text-neutral-700 italic">
          {t("forms.register.features")}
        </p>
      </div>
      <div className="w-full lg:w-1/2 w-max-sm px-8 my-auto">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
