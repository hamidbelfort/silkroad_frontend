"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";
import { useTranslation } from "react-i18next";
import { createBankAccount } from "@/lib/api/bankAccount";
export default function BankAccountForm() {
  const { t } = useTranslation("common");
  const bankAccountSchema = z.object({
    bankName: z.string().min(2, t("valiation.bankName")),
    accountOwner: z
      .string()
      .min(2, t("validation.accountOwner")),
    accountNumber: z
      .string()
      .min(6, t("validation.accountNumber")),
    iban: z
      .string()
      .min(10, t("validation.ibanInvalid"))
      .optional(),
    cardNumber: z
      .string()
      .min(16, t("validation.cardNumber"))
      .optional(),
    expiryMonth: z
      .string()
      .min(2, t("validation.expiryDateInvalid"))
      .optional(),
    expiryYear: z
      .string()
      .min(2, t("validation.expiryDateInvalid")),
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

  const onSubmit = async (data: BankAccountFormValues) => {
    try {
      // فراخوانی API برای ذخیره
      const accountData = { ...data, id: "", userId: "" };
      const res = await createBankAccount(accountData);
      if (res.success) {
        toast.success(
          t("message.bankAccountCreateSuccess")
        );
        reset();
      }
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
          placeholder="eg: Melli Bank"
        />
        {errors.bankName && (
          <p className="text-sm text-red-500">
            {errors.bankName.message}
          </p>
        )}
      </div>
      <div>
        <Label>{t("bankAccount.accountOwner")}</Label>
        <Input
          {...register("accountOwner")}
          placeholder="eg: John Doe"
        />
        {errors.accountOwner && (
          <p className="text-sm text-red-500">
            {errors.accountOwner.message}
          </p>
        )}
      </div>
      <div>
        <Label>{t("bankAccount.accountNumber")}</Label>
        <Input
          {...register("accountNumber")}
          maxLength={13}
          inputMode="numeric"
        />
        {errors.accountNumber && (
          <p className="text-sm text-red-500">
            {errors.accountNumber.message}
          </p>
        )}
      </div>

      <div>
        <Label>{t("bankAccount.iban")}</Label>
        <Input
          {...register("iban")}
          maxLength={24}
          placeholder="eg: IR 00 0000 0000 0000 0000 0000"
        />
        {errors.iban && (
          <p className="text-sm text-red-500">
            {errors.iban.message}
          </p>
        )}
      </div>

      <div>
        <Label>{t("bankAccount.cardNumber")}</Label>
        <Input
          {...register("cardNumber")}
          maxLength={16}
          placeholder="eg: 0000 0000 0000 0000"
        />
        {errors.cardNumber && (
          <p className="text-sm text-red-500">
            {errors.cardNumber.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label>{t("bankAccount.expiryMonth")}</Label>
          <Input
            {...register("expiryMonth")}
            placeholder="MM"
            maxLength={2}
            max={12}
            min={1}
            inputMode="numeric"
          />
          {errors.expiryMonth && (
            <p className="text-sm text-red-500">
              {errors.expiryMonth.message}
            </p>
          )}
        </div>
        <div>
          <Label>{t("bankAccount.expiryYear")}</Label>
          <Input
            {...register("expiryYear")}
            placeholder="MM"
            maxLength={2}
            max={99}
            min={1}
            inputMode="numeric"
          />
          {errors.expiryYear && (
            <p className="text-sm text-red-500">
              {errors.expiryYear.message}
            </p>
          )}
        </div>
        <div>
          <Label>CVV2</Label>
          <Input
            {...register("cvv2")}
            placeholder="eg:1234"
            inputMode="numeric"
          />
          {errors.cvv2 && (
            <p className="text-sm text-red-500">
              {errors.cvv2.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting
          ? t("common.submitting")
          : t("common.submit")}
      </Button>
    </form>
  );
}
