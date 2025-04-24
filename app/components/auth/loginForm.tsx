"use client";
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
import { useAuthStore } from "@/store/authStore";
import { LanguageManager } from "@/lib/languageManager";
interface LoginFormInputs {
  email: string;
  password: string;
}
export function LoginForm() {
  //const [loading, setLoading] = useState(false);
  const { t } = useTranslation("common");
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
      //setLoading(true);
      const res = await loginUser(data);
      if (res.userId) {
        const { userId, role, token, preferredLanguage } = res;
        //console.log(role as "admin" | "operator" | "customer");
        //مشخصات کاربر رو در استور ذخیره کنیم
        useAuthStore.getState().setAuth(
          {
            userId,
            role: role as "admin" | "operator" | "customer",
          },
          token
        );
        localStorage.setItem("token", token);
        LanguageManager.set(preferredLanguage || "en");
        toast.success("Login successful!");
        // انتقال به داشبورد نقش مربوطه
        router.push("/dashboard");
      } else {
        toast.error("Login Failed");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        /*toast.error("Login failed", {
          duration: 3000,
          description: error.cause as string,
          action: {
            label: "x",
            onClick: () => {
              toast.dismiss();
            },
          },
        });*/
        console.log(error.message);
      }
    } finally {
      //setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full max-w-md lg:min-w-md mx-auto my-auto">
        <CardHeader>
          <CardTitle>
            <div className="text-2xl text-center">{t("title.login")}</div>
            <h3 className="text-center text-sm underline text-muted-foreground mt-2">
              {t("title.login_sub")}
            </h3>
          </CardTitle>
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
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
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
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
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

          <div className="flex justify-between gap-8 w-full text-sm mt-4">
            <Link
              href="/forgot-password"
              className="text-foreground hover:underline"
            >
              {t("forgotPassword")}
            </Link>
            <Link href="/register" className="text-foreground hover:underline">
              {t("dontHaveAccount")}
            </Link>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
}
