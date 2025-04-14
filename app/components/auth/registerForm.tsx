"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { TermsCheckbox } from "./termsCheckbox";
import { registerUser } from "@/lib/api/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RegisterFormInputs {
  fullname: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const { t } = useTranslation("common");
  //const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAgreed, setIsAgreed] = useState(false);
  const formSchema = z.object({
    fullname: z.string().min(2, t("validation.required")),
    email: z.string().email(t("validation.email")),
    password: z.string().min(6, t("validation.password")),
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await registerUser(data);
      toast.success("Registration successful!");
      router.push("/login");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Registration failed");
      }
      toast.error(error || "Registration failed");
    }
  };

  return (
    <main>
      <Card className="w-full max-w-md mx-auto my-auto">
        <CardHeader>
          <CardTitle className="text-center">
            Register to Silkroad
          </CardTitle>
        </CardHeader>
        <CardContent className="my-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <User className="w-4 h-4" />
              </span>
              <Input
                placeholder="eg : Mike Smith"
                {...register("fullname")}
                className="pl-9"
              />
              {errors.fullname && (
                <p className="text-sm text-red-500">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Mail className="w-4 h-4" />
              </span>
              <Input
                placeholder="Email"
                type="email"
                {...register("email")}
                className="pl-9"
              />
              {errors.email && (
                <p className="text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock className="w-4 h-4" />
              </span>
              <Input
                placeholder="Password"
                type="password"
                {...register("password")}
                className="pl-9"
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <TermsCheckbox
              onChange={(checked) => setIsAgreed(checked)}
            />
            <Button
              type="submit"
              disabled={!isAgreed || isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" />
                  Registering...
                </>
              ) : (
                "Register"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
