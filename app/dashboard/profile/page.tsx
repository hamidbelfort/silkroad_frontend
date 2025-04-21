"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getUserProfile,
  updateUserProfile,
} from "@/lib/api/profile";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { z } from "zod";

export const userProfileSchema = z.object({
  avatar: z.string().optional(),
  address: z
    .string()
    .min(5, "آدرس خیلی کوتاه است")
    .optional(),
  bio: z
    .string()
    .max(300, "بیوگرافی نباید بیشتر از ۳۰۰ کاراکتر باشد")
    .optional(),
  whatsapp: z
    .string()
    .min(8, "شماره واتساپ نامعتبر است")
    .optional(),
  wechat: z
    .string()
    .min(3, "آیدی وی‌چت خیلی کوتاه است")
    .optional(),
});

export type UserProfileFormValues = z.infer<
  typeof userProfileSchema
>;

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
  });

  useEffect(() => {
    getUserProfile()
      .then((data) => {
        reset(data); // مقادیر اولیه رو ست کن
      })
      .catch(() =>
        toast.error("خطا در دریافت اطلاعات کاربر")
      )
      .finally(() => setLoading(false));
  }, [reset]);

  const onSubmit = async (
    values: UserProfileFormValues
  ) => {
    try {
      await updateUserProfile(values);
      toast.success("اطلاعات با موفقیت ذخیره شد");
    } catch {
      toast.error("خطا در ذخیره اطلاعات");
    }
  };

  if (loading) {
    return <Skeleton className="h-[300px] w-full" />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl"
    >
      <div>
        <Label>آدرس</Label>
        <Input
          {...register("address")}
          placeholder="مثلاً تهران، خیابان ولیعصر"
        />
        {errors.address && (
          <p className="text-sm text-red-500">
            {errors.address.message}
          </p>
        )}
      </div>

      <div>
        <Label>بیوگرافی</Label>
        <Textarea
          {...register("bio")}
          placeholder="چند خط درباره خودتان بنویسید..."
        />
        {errors.bio && (
          <p className="text-sm text-red-500">
            {errors.bio.message}
          </p>
        )}
      </div>

      <div>
        <Label>شماره واتساپ</Label>
        <Input
          {...register("whatsapp")}
          placeholder="مثلاً 09123456789"
        />
        {errors.whatsapp && (
          <p className="text-sm text-red-500">
            {errors.whatsapp.message}
          </p>
        )}
      </div>

      <div>
        <Label>آیدی وی‌چت</Label>
        <Input
          {...register("wechat")}
          placeholder="آیدی وی‌چت"
        />
        {errors.wechat && (
          <p className="text-sm text-red-500">
            {errors.wechat.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "در حال ذخیره..." : "ذخیره تغییرات"}
      </Button>
    </form>
  );
}
