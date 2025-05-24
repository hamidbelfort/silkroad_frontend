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
export default function RequestResetForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const formSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
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
      data.language = localStorage.getItem("language") || "en";
      const res = await requestOTP(data);
      if (!res?.success) throw new Error(res?.message || "An error occured");

      toast.success("OTP has been sent");
      router.push(`/reset-password/verify?email=${data.email}`);
    } catch {
      toast.error("Something bad happend");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardContent className="p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Forget Password</h2>
            <p className="text-sm text-gray-500">Please enter your email</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Send OTP"}
            </Button>
          </form>

          <div className="w-full flex justify-center pt-4">
            <Image
              src={forgotPassImage}
              alt="Forgot password"
              width={150}
              height={150}
              className="object-contain"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
