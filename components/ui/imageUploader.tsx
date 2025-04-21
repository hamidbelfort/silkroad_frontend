"use client";

import { ChangeEvent, useState } from "react";
//import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/lib/api/upload";
import { toast } from "sonner";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface Props {
  folder?: string; // مثلا "slider" یا "profile"
  onUploadComplete: (url: string) => void;
}

export function ImageUploader({
  folder = "general",
  onUploadComplete,
}: Props) {
  const { t } = useTranslation("common");
  const [previewUrl, setPreviewUrl] = useState<
    string | null
  >(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);

    try {
      setUploading(true);
      const imageUrl = await uploadImage(file, folder);
      onUploadComplete(imageUrl);
      toast.success(t("upload.success"));
    } catch (error) {
      console.error("Error while uploading image: ", error);
      toast.error(t("upload.fail"));
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="image-upload" className="block">
        {t("upload.choose")}
      </Label>
      <Input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />

      {previewUrl && (
        <div className="mt-2">
          <p className="text-sm text-muted-foreground mb-1">
            {t("upload.preview")}
          </p>
          <Image
            src={previewUrl}
            alt="preview"
            className="rounded border max-w-xs shadow"
          />
        </div>
      )}

      {uploading && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ImageIcon className="animate-spin h-4 w-4" />
          {t("upload.uploading")}
        </div>
      )}
    </div>
  );
}
