"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import forgotPassImage from "@/public/images/forgot-password.svg";
import { requestOTP } from "@/lib/api/requestPassword";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";
export default function RequestResetForm() {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().email({
      message: t("validation.email"),
    }),
    language: z.string(),
  });

  type FormSchema = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchema) => {
    setLoading(true);
    try {
      const res = await requestOTP(data);
      if (!res?.success)
        toast.error(res?.message || "An error occured", {
          icon: "🚨",
        });

      toast.success("OTP has been sent", { icon: "🎉" });
      router.push(`/reset-password/?email=${data.email}`);
    } catch {
      toast.error("Something bad happend", { icon: "🚨" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-4xl shadow-xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {/* سمت چپ: تصویر و عنوان */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left md:w-1/2 gap-4">
              <h2 className="text-2xl font-bold">
                {t("forms.forgetPass.title")}
              </h2>
              <p className="text-sm text-gray-500">
                {t("forms.forgetPass.CTA")}
              </p>
              <Image
                src={forgotPassImage}
                alt="Forgot password"
                width={250}
                height={250}
                className="object-contain"
              />
            </div>

            {/* سمت راست: فرم */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full md:w-1/2 space-y-4"
            >
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">
                  {t("label.common.email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Input
                type="hidden"
                {...register("language")}
                value={
                  localStorage.getItem("language") || "en"
                }
              />

              <Button
                type="submit"
                className="w-full hover:cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    {t("common.submitting")}
                  </>
                ) : (
                  t("common.sendOTP")
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
