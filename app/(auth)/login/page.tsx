"use client";
import { LoginForm } from "@/components/auth/loginForm";
import { useEffect } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
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
    <main className="flex items-center justify-center min-h-screen">
      <LoginForm />
    </main>
  );
}
