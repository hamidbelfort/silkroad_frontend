"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BankAccountSelector } from "./bankAccountSelector";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";
import { useState } from "react";
import { BankAccount } from "@/lib/types/bankAccount";
const exchangeSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  bankAccount: z.string().min(1, "Please select or enter a bank account"),
});

type ExchangeFormValues = z.infer<typeof exchangeSchema>;

export function ExchangeForm({
  exchangeRate,
  accounts,
}: {
  exchangeRate: number;
  accounts: BankAccount[];
}) {
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ExchangeFormValues>({
    resolver: zodResolver(exchangeSchema),
    defaultValues: { amount: "" },
  });
  const amount = watch("amount");
  const finalAmount = parseFloat(amount) * exchangeRate;
  const [selectedAccount, setSelectedAccount] = useState<BankAccount>();

  const onSubmit = (data: ExchangeFormValues) => {
    console.log("Submitted:", {
      ...data,
      finalAmount,
      selectedAccount,
      status: "pending",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="amount">{t("label.amount")}</Label>
        <div className="flex justify-between">
          <Input id="amount" {...register("amount")} />
          <b>¥</b>
        </div>
        {errors.amount && (
          <p className="text-sm text-red-500">{errors.amount.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>Final Amount</Label>
        <p className="border p-2 rounded-md">
          {isNaN(finalAmount) ? 0 : finalAmount.toLocaleString()} IRR
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Bank Account</Label>
        <BankAccountSelector
          accounts={accounts}
          onSelect={(selected) => {
            //console.log("✅ حساب انتخاب‌شده:", selected);
            setSelectedAccount(selected);
          }}
        />

        {errors.bankAccount && (
          <p className="text-sm text-red-500">{errors.bankAccount.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        {isSubmitting ? (
          <Loader className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          t("label.confirm")
        )}
      </Button>
    </form>
  );
}
