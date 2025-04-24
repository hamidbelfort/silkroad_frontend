"use client";

import { ChangeEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface Props {
  onFileSelect: (file: File) => void;
}

export function ImageUploader({ onFileSelect }: Props) {
  const { t } = useTranslation("common");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    onFileSelect(file);
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
            width={300}
            height={200}
          />
        </div>
      )}

      {!previewUrl && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ImageIcon className="h-4 w-4" />
          {t("upload.waiting")}
        </div>
      )}
    </div>
  );
}
