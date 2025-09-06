"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { updateBankAccount } from "@/lib/api/bankAccount";
import {
  BankAccount,
  BankAccountResponse,
} from "@/lib/types/bankAccount";
import {
  optionalFixedLengthString,
  requiredString,
  optionalStringLength,
} from "@/lib/validations/zodHelper";
import { ImageUploader } from "@/components/ui/imageUploader";
import { uploadImage } from "@/lib/api/upload";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface EditFormProps {
  open: boolean;
  onClose: () => void;
  account: BankAccount;
  onUpdated: (updated: BankAccountResponse) => void;
}

export function BankAccountEditForm({
  open,
  onClose,
  account,
  onUpdated,
}: EditFormProps) {
  const { t } = useTranslation("common");
  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);
  const schema = z.object({
    id: z.string(),
    userId: z.string(),
    bankName: optionalStringLength(
      5,
      20,
      t("validation.bankName")
    ),
    accountOwner: requiredString(
      "validation.bankAccountOwnerRequired"
    ),
    accountNumber: optionalStringLength(
      8,
      15,
      "validation.accountNumberInvalid"
    ),
    cardNumber: optionalFixedLengthString(
      16,
      "validation.cardNumberInvalid"
    ),
    iban: optionalFixedLengthString(
      24,
      "validation.ibanInvalid"
    ),
    imageUrl: z.string().optional(),
  });

  type FormValues = z.infer<typeof schema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: account,
  });

  const onSubmit = async (values: FormValues) => {
    try {
      if (selectedImage) {
        const url = await uploadImage(
          selectedImage,
          "bankAccount"
        );
        values.imageUrl = url;
      }
      const updated = await updateBankAccount(values);
      onUpdated(updated);
      toast.success("common.bank_account.update_success");
      onClose();
    } catch {
      toast.error("common.bank_account.update_error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("title.editBankAccount")}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>{t("bankAccount.bankName")}</Label>
              <Input {...register("bankName")} />
              {errors.bankName && (
                <p className="text-red-500 text-sm">
                  {errors.bankName.message}
                </p>
              )}
            </div>
            <div>
              <Label>{t("bankAccount.accountOwner")}</Label>
              <Input {...register("accountOwner")} />
              {errors.accountOwner && (
                <p className="text-red-500 text-sm">
                  {errors.accountOwner.message}
                </p>
              )}
            </div>
            <div>
              <Label>
                {t("bankAccount.accountNumber")}
              </Label>
              <Input
                {...register("accountNumber")}
                inputMode="numeric"
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-sm">
                  {errors.accountNumber.message}
                </p>
              )}
            </div>
            <div>
              <Label>{t("bankAccount.cardNumber")}</Label>
              <Input
                {...register("cardNumber")}
                inputMode="numeric"
                maxLength={16}
              />
              {errors.cardNumber && (
                <p className="text-red-500 text-sm">
                  {errors.cardNumber.message}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="iban">
                {t("bankAccount.iban")}
              </Label>
              <Input
                {...register("iban")}
                inputMode="numeric"
                maxLength={24}
              />
              {errors.iban && (
                <p className="text-red-500 text-sm">
                  {errors.iban.message}
                </p>
              )}
            </div>
            <div className="md:col-span-2">
              <ImageUploader
                label={t("upload.cardImage")}
                onFileSelect={(file) =>
                  setSelectedImage(file)
                }
              />
            </div>
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? (
              <>
                {t("common.submitting")}
                <Loader
                  size={20}
                  className="animate-spin"
                />
              </>
            ) : (
              t("common.saveChanges")
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
