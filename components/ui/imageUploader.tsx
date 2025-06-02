"use client";

import { ChangeEvent, useRef, useState } from "react"; // useRef را اضافه کنید
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ShieldClose, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface Props {
  label: string;
  onFileSelect: (file: File | null) => void;
}

export function ImageUploader({
  label,
  onFileSelect,
}: Props) {
  const { t } = useTranslation("common");
  const [previewUrl, setPreviewUrl] = useState<
    string | null
  >(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // یک ref برای input ایجاد کنید

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      handleFileRemove(); // اگر فایلی انتخاب نشد، حالت حذف را اعمال کنید
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    onFileSelect(file);
  };

  const handleFileRemove = () => {
    setPreviewUrl(null);
    onFileSelect(null);
    // فایل را از input حذف کنید
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // مقدار input را خالی کنید
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor="image-upload" className="block">
        {label}
      </Label>
      <div className="flex justify-between gap-2">
        <Input
          id="image-upload"
          type="file"
          accept="image/*"
          className="hover:cursor-pointer"
          onChange={handleFileChange}
          ref={fileInputRef} // ref را به Input اعمال کنید
        />
        <Button
          variant={"destructive"}
          type="button"
          className="hover:bg-destructive/80 hover:cursor-pointer"
          onClick={handleFileRemove}
        >
          <ShieldClose className="mr-2 h-4 w-4" />
        </Button>
      </div>
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
          <ImageIcon className="h-4 w-4 animate-pulse" />
          {t("upload.pending")}
        </div>
      )}
    </div>
  );
}
