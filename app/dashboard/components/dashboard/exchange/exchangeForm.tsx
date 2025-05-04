"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { BankAccountSelector } from "./bankAccountSelector";
import { useTranslation } from "react-i18next";
import { Loader } from "lucide-react";
const exchangeSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  bankAccount: z
    .string()
    .min(1, "Please select or enter a bank account"),
});

type ExchangeFormValues = z.infer<typeof exchangeSchema>;

export function ExchangeForm({
  exchangeRate,
}: {
  exchangeRate: number;
}) {
  const { t } = useTranslation("common");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ExchangeFormValues>({
    resolver: zodResolver(exchangeSchema),
  });

  const [finalAmount, setFinalAmount] = useState(0);

  useEffect(() => {
    const amount = parseFloat(watch("amount")) || 0;
    setFinalAmount(amount * exchangeRate);
  }, [exchangeRate, watch]);

  const onSubmit = (data: ExchangeFormValues) => {
    console.log("Submitted:", {
      ...data,
      finalAmount,
      status: "pending",
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <Label htmlFor="amount">{t("label.amount")}</Label>
        <Input id="amount" {...register("amount")} />
        {errors.amount && (
          <p className="text-sm text-red-500">
            {errors.amount.message}
          </p>
        )}
      </div>

      <div>
        <Label>Final Amount</Label>
        <p className="border p-2 rounded-md">
          {finalAmount.toLocaleString()} IRR
        </p>
      </div>

      <div>
        <Label>Bank Account</Label>
        <BankAccountSelector />
        {errors.bankAccount && (
          <p className="text-sm text-red-500">
            {errors.bankAccount.message}
          </p>
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
