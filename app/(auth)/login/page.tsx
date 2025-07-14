"use client";
import { LoginForm } from "@/components/auth/loginForm";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import illustration from "@/public/images/login.svg";
export default function LoginPage() {
  const { t } = useTranslation("common");

  const isLoggedIn = useAuthStore(
    (state) => state.isLoggedIn
  );
  const router = useRouter();
  //console.log("isLoggedIn : " + isLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  });
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
          {t("forms.login.title")}
        </h2>
        <p className="text-neutral-700 text-base leading-relaxed">
          {t("forms.login.CTA")}
        </p>
        <p className="text-sm text-neutral-700 italic">
          {t("forms.login.features")}
        </p>
      </div>
      {/* Right column: Login form */}
      <div className="w-full lg:w-1/2 w-max-sm px-8 my-auto">
        <LoginForm />
      </div>
    </div>
  );
}
