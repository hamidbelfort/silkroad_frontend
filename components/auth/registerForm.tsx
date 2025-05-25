"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  Lock,
  Phone,
  User,
  Loader,
  Activity,
  LogIn,
} from "lucide-react";
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
  phone: string;
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
    phone: z
      .string()
      .min(10, t("validation.phone"))
      .max(15, t("validation.phone")),
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
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-center items-center text-2xl text-center">
            {t("title.register")} <Activity />
          </div>
          <h3 className="text-center text-sm underline text-muted-foreground mt-2">
            {t("title.register_sub")}
          </h3>
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
              placeholder="eg : John Doe"
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
              <Phone className="w-4 h-4" />
            </span>
            <Input
              placeholder="Phone Number"
              type="tel"
              maxLength={13}
              {...register("phone")}
              className="pl-9"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">
                {errors.phone.message}
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
                <Loader className="animate-spin" />
                Registering...
              </>
            ) : (
              "Register"
            )}
          </Button>
        </form>
        <div className="flex justify-center">
          <Link
            href="/login"
            className="flex flex-row text-sm cursor-pointer mt-6 hover:underline"
          >
            <LogIn className="w-4 h-4 mr-2" />
            {t("alreadyHaveAccount")}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
