"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import {createBankAccount} from '@/lib/api/bankAccount';
export default function BankAccountForm() {
  const { t } = useTranslation("common");
  const bankAccountSchema = z.object({
    bankName: z.string().min(2, t("valiation.bankName")),
    accountOwner: z
      .string()
      .min(2, t("validation.accountOwner")),
    accountNumber: z
      .string()
      .min(6, t("validation.accountNumber"))
      .optional(),
    iban: z
      .string()
      .min(10, t("validation.ibanInvalid"))
      .optional(),
    cardNumber: z
      .string()
      .min(16, t("validation.cardNumber"))
      .optional(),
    expiryDate: z
      .string()
      .min(5, t("validation.expiryDateInvalid"))
      .optional(),
    cvv2: z
      .string()
      .min(3, t("validation.cvv2Invalid"))
      .optional(),
    cardImage: z.string().optional(),
  });

  type BankAccountFormValues = z.infer<
    typeof bankAccountSchema
  >;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountSchema),
  });

  const onSubmit = async (
    data: BankAccountFormValues
  ) => {
    try {
      // فراخوانی API برای ذخیره
      const res=await createBankAccount(data);
      });
      toast.success(t("message.bankAccountCreateSuccess"));
      reset();
    } catch {
      toast.error(t("message.bankAccountCreateError"));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-xl"
    >
      <div>
        <Label>{t("bankAccount.bankName")}</Label>
        <Input
          {...register("bankName")}
          placeholder="مثلاً ملت"
        />
        {errors.bankName && (
          <p className="text-sm text-red-500">
            {errors.bankName.message}
          </p>
        )}
      </div>

      <div>
        <Label>شماره حساب</Label>
        <Input {...register("accountNumber")} />
        {errors.accountNumber && (
          <p className="text-sm text-red-500">
            {errors.accountNumber.message}
          </p>
        )}
      </div>

      <div>
        <Label>شماره شبا</Label>
        <Input {...register("iban")} />
        {errors.iban && (
          <p className="text-sm text-red-500">
            {errors.iban.message}
          </p>
        )}
      </div>

      <div>
        <Label>شماره کارت</Label>
        <Input {...register("cardNumber")} />
        {errors.cardNumber && (
          <p className="text-sm text-red-500">
            {errors.cardNumber.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>تاریخ انقضا</Label>
          <Input
            {...register("expiryDate")}
            placeholder="مثلاً 01/27"
          />
          {errors.expiryDate && (
            <p className="text-sm text-red-500">
              {errors.expiryDate.message}
            </p>
          )}
        </div>
        <div>
          <Label>CVV2</Label>
          <Input {...register("cvv2")} />
          {errors.cvv2 && (
            <p className="text-sm text-red-500">
              {errors.cvv2.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "در حال ثبت..." : "ثبت حساب بانکی"}
      </Button>
    </form>
  );
}
