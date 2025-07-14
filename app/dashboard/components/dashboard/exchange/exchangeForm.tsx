"use client";
import { z } from "zod";
import { Controller, useForm, useFormContext } from "react-hook-form";
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
import { Info } from "lucide-react";
const exchangeSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  bankAccountId: z.string().min(1, "Please select a bank account"),
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
    control,
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
  let finalAmount = parseFloat(amount) * exchangeRate;
  //const [selectedAccount, setSelectedAccount] =
  //useState<BankAccount>();

  const onSubmit = async (data: ExchangeFormValues) => {
    // if (!selectedAccount) {
    //   toast.error("Bank Account not selected");
    //   return;
    // }
    const bodyData: ExchangeOrder = {
      amount: parseFloat(data.amount),
      finalAmount,
      bankAccountId: data.bankAccountId,
      status: OrderStatus.PENDING,
    };
    //console.log(bodyData);
    finalAmount = 0;
    const res = await createExchangeOrder(bodyData);
    if (res.success) {
      toast.success("Success 🎉", {
        description: "Your order has been successfully submitted",
        duration: 3000,
      });
      reset();

      finalAmount = 0;
    } else {
      toast.error("Failed ❌", {
        description: res.message,
        duration: 3000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="amount">
          {t("label.exchange.amount")}
          <b>¥</b>
        </Label>
        <Input id="amount" {...register("amount")} type="number" />
        {errors.amount && (
          <p className="text-sm text-red-500">{errors.amount.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label>{t("label.exchange.finalAmount")}</Label>
        <p className="border p-2 rounded-md">
          {isNaN(finalAmount) ? 0 : finalAmount.toLocaleString()} IRR
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex content-baseline gap-4 ">
          <Label>{t("label.exchange.bankAccount")}</Label>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">
                <Info />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t("label.exchange.bankAccountDesc")}</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <Controller
          name="bankAccountId"
          control={control}
          render={({ field }) => (
            <BankAccountSelector
              accounts={accounts}
              onSelect={(selected) => {
                //console.log("✅ حساب انتخاب‌شده:", selected);
                field.onChange(selected.id);
              }}
            />
          )}
        />
      </div>
      {errors.bankAccountId && (
        <p className="text-sm text-red-500">{errors.bankAccountId.message}</p>
      )}
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
