"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getProfile, postProfile } from "@/lib/api/profile";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/authStore";
import { ImageUploader } from "@/components/ui/imageUploader";
import { uploadImage } from "@/lib/api/upload";
export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);
  const { t } = useTranslation("common");
  const { userId } = useAuthStore();
  const userProfileSchema = z.object({
    avatar: z.string().optional(),
    address: z
      .string()
      .min(5, t("validation.address"))
      .optional(),
    bio: z
      .string()
      .max(300, t("validation.bio300"))
      .optional(),
    whatsapp: z
      .string()
      .min(8, t("validation.whatsapp"))
      .optional(),
    wechat: z
      .string()
      .min(3, t("validation.weChat"))
      .optional(),
  });

  type UserProfileFormValues = z.infer<
    typeof userProfileSchema
  >;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UserProfileFormValues>({
    resolver: zodResolver(userProfileSchema),
  });

  useEffect(() => {
    const getProfileData = async () => {
      setLoading(true);
      console.log(userId);
      const data = await getProfile(userId);
      console.log(data);
      if (data) {
        setValue("address", data?.address || "");
        setValue("bio", data?.bio || "");
        setValue("whatsapp", data?.whatsapp || "");
        setValue("wechat", data?.wechat || "");
        setLoading(false);
      }
      setLoading(false);
    };
    getProfileData();
  }, [userId, setValue]);

  const onSubmit = async (
    values: UserProfileFormValues
  ) => {
    try {
      if (selectedImage) {
        const url = await uploadImage(
          selectedImage,
          "profile"
        );
        values.avatar = url;
      }
      await postProfile(values);
      toast.success(t("validation.profileUpdateSuccess"));
    } catch {
      toast.error(t("valiation.profileSubmitError"));
    }
  };

  return loading ? (
    <Skeleton className="h-[300px] w-full" />
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl md:min-w-sm lg:min-w-md"
    >
      <div className="flex flex-col gap-2">
        <Label>{t("profile.address")}</Label>
        <Input
          {...register("address")}
          placeholder="Example:No 123, Street name, City, Country"
        />
        {errors.address && (
          <p className="text-sm text-red-500">
            {errors.address.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <ImageUploader
          label={t("upload.profileImage")}
          onFileSelect={(file) => setSelectedImage(file)}
        />
        <Label>{t("profile.bio")}</Label>
        <Textarea
          {...register("bio")}
          placeholder="write something about yourself"
        />
        {errors.bio && (
          <p className="text-sm text-red-500">
            {errors.bio.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>{t("profile.whatsapp")}</Label>
        <Input
          {...register("whatsapp")}
          placeholder="eg : +989123456789"
        />
        {errors.whatsapp && (
          <p className="text-sm text-red-500">
            {errors.whatsapp.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>{t("profile.wechat")}</Label>
        <Input
          {...register("wechat")}
          placeholder="WeChat ID or Number"
        />
        {errors.wechat && (
          <p className="text-sm text-red-500">
            {errors.wechat.message}
          </p>
        )}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? t("message.submitting")
          : t("message.saveChanges")}
      </Button>
    </form>
  );
}
