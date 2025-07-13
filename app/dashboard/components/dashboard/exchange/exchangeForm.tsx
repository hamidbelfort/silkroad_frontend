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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { OrderStatus } from "@/lib/types/orderStatus";
import { ExchangeOrder } from "@/lib/types/exchangeOrder";
import { toast } from "sonner";
import { createExchangeOrder } from "@/lib/api/exchange";
const exchangeSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  bankAccount: z
    .string()
    .min(1, "Please select or enter a bank account"),
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
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ExchangeFormValues>({
    resolver: zodResolver(exchangeSchema),
    defaultValues: { amount: "" },
  });
  const amount = watch("amount");
  const finalAmount = parseFloat(amount) * exchangeRate;
  const [selectedAccount, setSelectedAccount] =
    useState<BankAccount>();

  const onSubmit = async (data: ExchangeFormValues) => {
    console.log("Submitted:", {
      ...data,
      finalAmount,
      selectedAccount,
      status: OrderStatus.PENDING,
    });
    if (!selectedAccount) {
      toast.error("Bank Account not selected");
    }
    const bodyData: ExchangeOrder = {
      amount: parseFloat(data.amount),
      finalAmount,
      bankAccountId:
        selectedAccount?.id ?? "unknown bank account",
      status: OrderStatus.PENDING,
    };
    const res = await createExchangeOrder(bodyData);
    if (res.success) {
      toast.success("Success 🎉", {
        description:
          "Your order has been successfully submitted",
        duration: 3000,
      });
      reset();
    } else {
      toast.success("Failed ⚠", {
        description: res.message,
        duration: 3000,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="amount">
          {t("label.exchange.amount")}
          <b>¥</b>
        </Label>
        <Input
          id="amount"
          {...register("amount")}
          type="number"
        />
        {errors.amount && (
          <p className="text-sm text-red-500">
            {errors.amount.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>{t("label.exchange.finalAmount")}</Label>
        <p className="border p-2 rounded-md">
          {isNaN(finalAmount)
            ? 0
            : finalAmount.toLocaleString()}{" "}
          IRR
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <Label>{t("label.exchange.bankAccount")}</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline">?</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("label.exchange.bankAccountDesc")}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <BankAccountSelector
          accounts={accounts}
          onSelect={(selected) => {
            //console.log("✅ حساب انتخاب‌شده:", selected);
            setSelectedAccount(selected);
          }}
        />

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
