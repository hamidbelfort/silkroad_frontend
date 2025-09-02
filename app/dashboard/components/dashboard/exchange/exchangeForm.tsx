"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BankAccountSelector } from "./bankAccountSelector";
import { useTranslation } from "react-i18next";
import { Loader, Info, ArrowDownUp } from "lucide-react";
import { BankAccount } from "@/lib/types/bankAccount";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { OrderStatus } from "@/lib/types/orderStatus";
import { ExchangeOrder } from "@/lib/types/exchangeOrder";
import { toast } from "sonner";
import { createExchangeOrder } from "@/lib/api/exchange";
import { useEffect, useRef } from "react";
import { QuickAmountSelector } from "./QuickAmountSelector";

// 1. Schema updated to support two-way calculation
const exchangeSchema = z
  .object({
    yuanAmount: z.coerce
      .number({
        invalid_type_error: "Please enter a number",
      })
      .positive("Amount must be positive")
      .optional(),
    rialAmount: z.coerce
      .number({
        invalid_type_error: "Please enter a number",
      })
      .positive("Amount must be positive")
      .optional(),
    bankAccountId: z.string().min(1, "Please select a bank account"),
  })
  .refine((data) => data.yuanAmount || data.rialAmount, {
    message: "Please enter either a Yuan or Rial amount",
    path: ["yuanAmount"], // Error will be displayed on the first field
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

  const form = useForm<ExchangeFormValues>({
    resolver: zodResolver(exchangeSchema),
    defaultValues: {
      yuanAmount: undefined,
      rialAmount: undefined,
      bankAccountId: "",
    },
  });

  // 2. Watch form values to react to changes
  const yuanAmount = form.watch("yuanAmount");
  const rialAmount = form.watch("rialAmount");
  const lastChangedField = useRef<"yuan" | "rial" | null>(null);

  // 3. Effect to update Rial based on Yuan
  useEffect(() => {
    if (yuanAmount !== undefined && lastChangedField.current === "yuan") {
      const calculatedRial = yuanAmount * exchangeRate;
      // To prevent unnecessary re-renders due to floating point inaccuracies, we round the values
      if (Math.round(rialAmount || 0) !== Math.round(calculatedRial)) {
        form.setValue("rialAmount", parseFloat(calculatedRial.toFixed(2)), {
          shouldValidate: true,
        });
      }
    } else if (
      yuanAmount === undefined &&
      lastChangedField.current === "yuan"
    ) {
      form.setValue("rialAmount", undefined, {
        shouldValidate: true,
      });
    }
  }, [yuanAmount, exchangeRate, rialAmount, form]);

  // 4. Effect to update Yuan based on Rial
  useEffect(() => {
    if (rialAmount !== undefined && lastChangedField.current === "rial") {
      const calculatedYuan = rialAmount / exchangeRate;
      if (Math.round(yuanAmount || 0) !== Math.round(calculatedYuan)) {
        form.setValue("yuanAmount", parseFloat(calculatedYuan.toFixed(2)), {
          shouldValidate: true,
        });
      }
    } else if (
      rialAmount === undefined &&
      lastChangedField.current === "rial"
    ) {
      form.setValue("yuanAmount", undefined, {
        shouldValidate: true,
      });
    }
  }, [rialAmount, exchangeRate, yuanAmount, form]);

  const handleSelectAmount = (amount: number) => {
    // 1. به سیستم میگیم که آخرین تغییر از سمت فیلد یوان بوده
    lastChangedField.current = "yuan";

    // 2. مقدار فیلد یوان رو در فرم آپدیت می‌کنیم
    form.setValue("yuanAmount", amount, { shouldValidate: true });
  };

  const onSubmit = async (data: ExchangeFormValues) => {
    // Ensure both values are available before submitting to the server
    const finalYuanAmount = data.yuanAmount || data.rialAmount! / exchangeRate;
    const finalRialAmount = data.rialAmount || data.yuanAmount! * exchangeRate;

    const bodyData: ExchangeOrder = {
      amount: finalYuanAmount,
      finalAmount: finalRialAmount,
      bankAccountId: data.bankAccountId,
      status: OrderStatus.PENDING,
    };

    const res = await createExchangeOrder(bodyData);
    if (res.success) {
      toast.success("Order Submitted Successfully 🎉", {
        description: "Your order has been submitted for review.",
        duration: 3000,
      });
      form.reset();
    } else {
      toast.error("Error Submitting Order ❌", {
        description: res.message,
        duration: 3000,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="yuanAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yuan Amount (¥)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Yuan amount"
                  {...field}
                  onChange={(e) => {
                    lastChangedField.current = "yuan";
                    field.onChange(
                      e.target.value === "" ? undefined : e.target.valueAsNumber
                    );
                  }}
                  value={field.value ?? ""}
                />
              </FormControl>
              <QuickAmountSelector onSelectAmount={handleSelectAmount} />
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-center my-[-10px]">
          <ArrowDownUp className="h-6 w-6 text-gray-400" />
        </div>

        <FormField
          control={form.control}
          name="rialAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rial Amount (IRR)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter Rial amount"
                  {...field}
                  onChange={(e) => {
                    lastChangedField.current = "rial";
                    field.onChange(
                      e.target.value === "" ? undefined : e.target.valueAsNumber
                    );
                  }}
                  value={field.value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bankAccountId"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <Label>{t("label.exchange.bankAccount")}</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("label.exchange.bankAccountDesc")}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <BankAccountSelector
                  accounts={accounts}
                  onSelect={(selected) => field.onChange(selected.id)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            t("label.confirm")
          )}
        </Button>
      </form>
    </Form>
  );
}
