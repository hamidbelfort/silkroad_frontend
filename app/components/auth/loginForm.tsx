"use client";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2, Mail, Lock } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginUser } from "@/lib/api/auth";

interface LoginFormInputs {
  email: string;
  password: string;
}
export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation("common");
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email(t("validation.email")),
    password: z.string().min(6, t("validation.password")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(formSchema),
  });
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      setLoading(true);
      const res = await loginUser(data);
      toast.success("Login successful!");
      // انتقال به داشبورد نقش مربوطه
      if (res.role === "ADMIN") {
        router.push("/dashboard/admin");
      } else if (res.role === "OPERATOR") {
        router.push("/dashboard/operator");
      } else {
        router.push("/dashboard/customer");
      }
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Login failed");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">{t("email")}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                className="pl-9"
                {...register("email")}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">{t("password")}</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                className="pl-9"
                {...register("password")}
                required
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Submiting...
              </>
            ) : (
              t("login")
            )}
          </Button>

          <div className="flex justify-between gap-4 w-full text-sm">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              {t("forgotPassword")}
            </Link>
            <Link href="/register" className="text-blue-600 hover:underline">
              Don&lsquo;t have an account?
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
