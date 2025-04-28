"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  createSlider,
  deleteSlider,
  getSliders,
  updateSlider,
} from "@/lib/api/slider";
import { format } from "date-fns";
import { ImageUploader } from "@/components/ui/imageUploader";
import { useTranslation } from "react-i18next";
import { uploadImage } from "@/lib/api/upload";
const sliderSchema = z.object({
  title: z.string().min(2),
  imageUrl: z.string().url(),
  description: z.string().optional(),
  link: z.string().url().optional(),
  isActive: z.boolean(),
});

type SliderFormValues = z.infer<typeof sliderSchema>;

interface SliderItem extends SliderFormValues {
  id: string;
  createdAt: string;
}

export default function SliderManagementPage() {
  const { t } = useTranslation("common");
  const [sliders, setSliders] = useState<SliderItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<SliderFormValues>({
    resolver: zodResolver(sliderSchema),
    defaultValues: {
      title: "",
      description: "",
      link: "",
      imageUrl: "",
      isActive: true,
    },
  });
  useEffect(() => {
    fetchSliders();
  }, []);

  const fetchSliders = async () => {
    try {
      const res = await getSliders();
      const data = await res.json();
      setSliders(data);
    } catch (err: unknown) {
      console.log(err as Error);
      toast.error("Failed to load sliders.");
    }
  };
  const onSubmit = async (data: SliderFormValues) => {
    try {
      if (editId) {
        const img = await uploadImage(selectedImage!, "slider");
        if (img) {
          const res = await updateSlider(editId, data);
          if (res.success) {
            toast.success("Slider updated!");
            setEditId(null);
          }
        }
      } else {
        if (!selectedImage) {
          toast.error("Please select an image");
          return;
        }
        const img = await uploadImage(selectedImage!, "slider");
        if (img) {
          const res = await createSlider(data);
          if (res.success) {
            toast.success("Slider created!");
            reset();
            fetchSliders();
          }
        }
      }
    } catch {
      toast.error("Something went wrong.");
    }
  };

  const onDelete = async (id: string) => {
    try {
      await deleteSlider(id);
      toast.success("Slider deleted!");
      fetchSliders();
    } catch {
      toast.error("Delete failed.");
    }
  };

  const onEdit = (slider: SliderItem) => {
    setEditId(slider.id);
    setValue("title", slider.title);
    setValue("imageUrl", slider.imageUrl);
    setValue("description", slider.description || "");
    setValue("link", slider.link || "");
    setValue("isActive", slider.isActive);
  };
  return (
    <div className="max-w-6xl mx-auto space-y-6 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{editId ? "Edit Slider" : "Add New Slider"}</CardTitle>
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
            <Button type="submit">
              {editId ? t("common.update") : t("common.create")}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Slider List</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sliders.map((slider) => (
              <div
                key={slider.id}
                className="flex items-center justify-between border p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={slider.imageUrl!}
                    alt={slider.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{slider.title}</p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(slider.createdAt), "yyyy-MM-dd")}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => onEdit(slider)}>
                    Edit
                  </Button>
                  <ConfirmDialog
                    trigger={<Button variant="destructive"></Button>}
                    title="Delete slider?"
                    description="Are you sure you want to delete this slider? This action is irreversible."
                    confirmText="Yes, Delete"
                    cancelText="Cancel"
                    variant="destructive"
                    onConfirm={() => onDelete(slider.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
