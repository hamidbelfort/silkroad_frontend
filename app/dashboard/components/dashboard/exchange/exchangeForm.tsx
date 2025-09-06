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
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox"; // 1. Import Checkbox component

// 2. Add hasDispute to the schema
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
    bankAccountId: z
      .string()
      .min(1, "Please select a bank account"),
    hasDispute: z.boolean().default(false).optional(),
  })
  .refine((data) => data.yuanAmount || data.rialAmount, {
    message: "Please enter either a Yuan or Rial amount",
    path: ["yuanAmount"],
  });

type ExchangeFormValues = z.infer<typeof exchangeSchema>;

// 3. Accept disputeThreshold as a prop
export function ExchangeForm({
  exchangeRate,
  accounts,
  disputeThreshold,
}: {
  exchangeRate: number;
  accounts: BankAccount[];
  disputeThreshold: number;
}) {
  const { t } = useTranslation("common");

  const form = useForm<ExchangeFormValues>({
    resolver: zodResolver(exchangeSchema),
    defaultValues: {
      yuanAmount: undefined,
      rialAmount: undefined,
      bankAccountId: "",
      hasDispute: false,
    },
  });

  const yuanAmount = form.watch("yuanAmount");
  const rialAmount = form.watch("rialAmount");
  const lastChangedField = useRef<"yuan" | "rial" | null>(
    null
  );

  // This derived state determines if the checkbox should be visible
  const showDisputeCheckbox =
    yuanAmount !== undefined &&
    yuanAmount > disputeThreshold;

  // Reset dispute checkbox if amount goes below threshold
  useEffect(() => {
    if (!showDisputeCheckbox) {
      form.setValue("hasDispute", false);
    }
  }, [showDisputeCheckbox, form]);

  useEffect(() => {
    if (
      yuanAmount !== undefined &&
      lastChangedField.current === "yuan"
    ) {
      const calculatedRial = yuanAmount * exchangeRate;
      const roundedRial = Math.round(calculatedRial);
      if (rialAmount !== roundedRial) {
        form.setValue("rialAmount", roundedRial, {
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

  useEffect(() => {
    if (
      rialAmount !== undefined &&
      lastChangedField.current === "rial"
    ) {
      const calculatedYuan = rialAmount / exchangeRate;
      const roundedYuan = parseFloat(
        calculatedYuan.toFixed(2)
      );
      if (yuanAmount !== roundedYuan) {
        form.setValue("yuanAmount", roundedYuan, {
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

  // 4. Update onSubmit logic
  const onSubmit = async (data: ExchangeFormValues) => {
    const finalYuanAmount =
      data.yuanAmount ||
      parseFloat(
        (data.rialAmount! / exchangeRate).toFixed(2)
      );
    const finalRialAmount =
      data.rialAmount ||
      Math.round(data.yuanAmount! * exchangeRate);

    // Determine status based on dispute logic
    const isDisputed =
      data.hasDispute && finalRialAmount > disputeThreshold;
    const status = isDisputed
      ? OrderStatus.WAITING_REVIEW
      : OrderStatus.PENDING;

    // Set expiration for 12 hours from now
    const expiresAt = new Date(
      Date.now() + 12 * 60 * 60 * 1000
    ).toISOString();

    const bodyData: ExchangeOrder = {
      amount: finalYuanAmount,
      finalAmount: finalRialAmount,
      bankAccountId: data.bankAccountId,
      status: status,
      expiredAt: expiresAt,
    };

    const res = await createExchangeOrder(bodyData);
    if (res.success) {
      toast.success("Order Submitted Successfully 🎉", {
        description:
          "Your order has been submitted for review.",
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

  const handleSelectAmount = (amount: number) => {
    lastChangedField.current = "yuan";
    form.setValue("yuanAmount", amount, {
      shouldValidate: true,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {" "}
        {/* Increased spacing */}
        <FormField
          control={form.control}
          name="yuanAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Yuan Amount (¥)</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="decimal"
                  placeholder="Enter Yuan amount"
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(
                      /,/g,
                      ""
                    );
                    const numValue = parseFloat(rawValue);
                    lastChangedField.current = "yuan";
                    if (rawValue === "")
                      field.onChange(undefined);
                    else if (!isNaN(numValue))
                      field.onChange(numValue);
                  }}
                  value={
                    field.value !== undefined
                      ? field.value.toLocaleString("en-US")
                      : ""
                  }
                />
              </FormControl>
              <QuickAmountSelector
                onSelectAmount={handleSelectAmount}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center my-[-15px]">
          {" "}
          {/* Adjusted spacing */}
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
                  type="text"
                  inputMode="decimal"
                  placeholder="Enter Rial amount"
                  onChange={(e) => {
                    const rawValue = e.target.value.replace(
                      /,/g,
                      ""
                    );
                    const numValue = parseInt(rawValue, 10);
                    lastChangedField.current = "rial";
                    if (rawValue === "")
                      field.onChange(undefined);
                    else if (!isNaN(numValue))
                      field.onChange(numValue);
                  }}
                  value={
                    field.value !== undefined
                      ? field.value.toLocaleString("en-US")
                      : ""
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 5. Conditionally render the dispute checkbox */}
        {showDisputeCheckbox && (
          <FormField
            control={form.control}
            name="hasDispute"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 transition-all animate-in fade-in-50">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    I want to dispute the exchange rate
                  </FormLabel>
                  <FormDescription>
                    Your order amount exceeds the threshold.
                    By checking this, a specialist will
                    contact you to agree on a final rate.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="bankAccountId"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <Label>
                  {t("label.exchange.bankAccount")}
                </Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {t("label.exchange.bankAccountDesc")}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormControl>
                <BankAccountSelector
                  accounts={accounts}
                  onSelect={(selected) =>
                    field.onChange(selected.id)
                  }
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
