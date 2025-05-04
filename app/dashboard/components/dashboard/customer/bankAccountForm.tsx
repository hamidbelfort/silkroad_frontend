"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createBankAccount } from "@/lib/api/bankAccount";
import { BankAccount } from "@/lib/types/bankAccount";
import {
  optionalFixedLengthString,
  optionalStringLength,
  requiredString,
} from "@/lib/validations/zodHelper";
import { ImageUploader } from "@/components/ui/imageUploader";
import { useTranslation } from "react-i18next";
import { useAuthStore } from "@/store/authStore";
import { uploadImage } from "@/lib/api/upload";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { formatCardNumber } from "@/lib/utils/cardFormat";

interface BankAccountFormProps {
  onSuccess: (account: BankAccount) => void;
}

export function BankAccountForm({
  onSuccess,
}: BankAccountFormProps) {
  const { t } = useTranslation("common");
  const { userId } = useAuthStore();
  const [selectedImage, setSelectedImage] =
    useState<File | null>(null);
  const schema = z.object({
    userId: z.string(),
    bankName: requiredString(t("validation.bankName")),
    accountOwner: requiredString(
      "valiation.bankAccountOwnerRequired"
    ),
    accountNumber: optionalStringLength(
      6,
      15,
      t("validation.accountNumber")
    ),
    cardNumber: optionalFixedLengthString(
      16,
      t("validation.cardNumberInvalid")
    ),
    iban: optionalFixedLengthString(
      24,
      t("validation.ibanInvalid")
    ),
    imageUrl: z.string().optional(),
  });
  type FormValues = z.infer<typeof schema>;
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      userId,
      bankName: "",
      accountNumber: "",
      accountOwner: "",
      cardNumber: "",
      iban: "",
      imageUrl: "",
    },
  });
  const onSubmit = async (values: FormValues) => {
    try {
      if (selectedImage) {
        const url = await uploadImage(
          selectedImage,
          "bankAccount"
        );
        setValue("imageUrl", url);
      }
      const saved = await createBankAccount(values);
      onSuccess(saved.data!);
      toast.success("Bank account added successfully");
      reset({
        userId,
        bankName: "",
        accountOwner: "",
        accountNumber: "",
        cardNumber: "",
        iban: "",
        imageUrl: "",
      });
    } catch (error) {
      toast.error("Failed to save bank account");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 sm:min-w-sm"
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
          <Label>{t("bankAccount.accountNumber")}</Label>
          <Input
            {...register("accountNumber")}
            maxLength={15}
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
            value={formatCardNumber(watch("cardNumber"))}
            onChange={(e) => {
              const raw = e.target.value.replace(/\D/g, "");
              setValue("cardNumber", raw);
              console.log(raw);
            }}
            maxLength={19}
            inputMode="numeric"
          />
          {errors.cardNumber && (
            <p className="text-red-500 text-sm">
              {errors.cardNumber.message}
            </p>
          )}
        </div>
        <div className="md:col-span-2">
          <Label>{t("bankAccount.iban")}</Label>
          <Input
            {...register("iban")}
            maxLength={24}
            inputMode="numeric"
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
            onFileSelect={(file) => setSelectedImage(file)}
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
            <Loader className="animate-spin" size={20} />
          </>
        ) : (
          t("common.submit")
        )}
      </Button>
    </form>
  );
}
