"use client";
import { useState } from "react";
import {
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOTP } from "@/lib/api/resetPassword";
import { Loader } from "lucide-react";
import { useTranslation } from "react-i18next";

const formSchema = z
  .object({
    otp: z
      .string()
      .length(6, { message: "OTP must be 6 digits" }),
    newPassword: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.newPassword === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

type FormSchema = z.infer<typeof formSchema>;

export default function VerifyResetPasswordForm() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    setLoading(true);
    try {
      const res = await verifyOTP({
        email,
        otp: data.otp,
        newPassword: data.newPassword,
      });
      if (!res?.success)
        throw toast.error(
          res?.message || "Something went wrong",
          { icon: "🚨" }
        );

      toast.success("Password reset successfully", {
        icon: "🎉",
      });
      router.push("/login");
    } catch (err) {
      toast.error((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              {t("forms.resetPass.title")}
            </h2>
            <p className="text-sm text-gray-500">
              {t("forms.resetPass.CTA")}
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="otp">
                {t("common.otpCode")}
              </Label>
              <InputOTP
                maxLength={6}
                onChange={(val) => setValue("otp", val)}
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              {errors.otp && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.otp.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="newPassword">
                {t("label.common.newPassword")}
              </Label>
              <Input
                id="newPassword"
                type="password"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="confirmPassword">
                {t("label.common.confirmPassword")}
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader className="mr-2 animate-spin" />
                  {t("common.submitting")}
                </>
              ) : (
                t("label.common.resetPassword")
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
