"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createSlider } from "@/lib/api/slider";
import { ImageUploader } from "@/components/ui/imageUploader";
import { useTranslation } from "react-i18next";
import { optionalUrl, requiredImage } from "@/lib/validations/zodHelper";
import { Loader } from "lucide-react";
import SliderList from "./sliderList";

export default function SliderManagementPage() {
  const { t } = useTranslation("common");
  const sliderSchema = z.object({
    title: z.string().min(10, t("validation.slider.title")),
    imageUrl: requiredImage(2),
    description: z.string().optional(),
    link: optionalUrl(t("valiation.slider.url")),
    isActive: z.boolean(),
  });

  type SliderFormValues = z.infer<typeof sliderSchema>;

  interface SliderItem extends SliderFormValues {
    id: string;
    createdAt: string;
  }
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SliderFormValues>({
    resolver: zodResolver(sliderSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      imageUrl: undefined,
      isActive: true,
    },
  });
  const onSubmit = async (data: SliderFormValues) => {
    try {
      if (!selectedImage) {
        toast.error("Please select an image");
        return;
      }
      const res = await createSlider(data);
      if (res.success) {
        toast.success("Slider created!");
        setRefreshFlag((prev) => !prev);
        reset();
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="lg:max-w-6xl sm:w-fit mx-auto space-y-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Slider</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input {...register("title")} />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>
            <div>
              <ImageUploader
                label={t("upload.sliderImage")}
                onFileSelect={(file) => setSelectedImage(file)}
              />
              {errors.imageUrl && (
                <p className="text-sm text-red-500">
                  {errors.imageUrl.message}
                </p>
              )}
            </div>
            <div>
              <Label>Description</Label>
              <Textarea {...register("description")} />
            </div>
            <div>
              <Label>Link</Label>
              <Input {...register("link")} />
              {errors.link && (
                <p className="text-sm text-red-500">{errors.link.message}</p>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={!!watch("isActive")}
                onCheckedChange={(val) => setValue("isActive", val)}
              />
              <Label>Active</Label>
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader className="animate-spin" size={20} />
              ) : (
                t("common.create")
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      <SliderList refreshFlag={refreshFlag} />
    </div>
  );
}
