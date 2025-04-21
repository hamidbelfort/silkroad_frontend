"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default function ProtectedLayout({
  children,
}: ProtectedLayoutProps) {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);

  // تا زمانی که auth لود نشده، چیزی نشون نده
  if (!isLoggedIn) {
    return (
      <div className="text-center mt-10">
        Authenticating...
      </div>
    );
  }

  return <>{children}</>;
}
