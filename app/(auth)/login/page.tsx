"use client";
import { LoginForm } from "@/components/auth/loginForm";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import illustration from "@/public/images/login.svg";
export default function LoginPage() {
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
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-start px-12 space-y-6">
        <Image
          src={illustration}
          alt="Login Illustration"
          width={300}
          className="w-full max-w-md"
          priority
        />
        <h2 className="text-3xl font-bold">Welcome Back</h2>
        <p className="text-muted-foreground text-base leading-relaxed">
          Log in to access your dashboard, manage your
          account, and explore more features.
        </p>
        <p className="text-sm text-muted-foreground italic">
          “Secure. Fast. Personalized.”
        </p>
      </div>

      {/* Right column: Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
