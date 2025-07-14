"use client";
import React, { useEffect, useState } from "react";
import { ExchangeRateCard } from "../components/dashboard/exchange/exchangeRateCard";
import PriceChartCard from "../components/dashboard/exchange/exchangeChartCard2";
import { ExchangeForm } from "../components/dashboard/exchange/exchangeForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getExchangeRate } from "@/lib/api/exchange";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { BankAccount } from "@/lib/types/bankAccount";
import { getBankAccounts } from "@/lib/api/bankAccount";
import { useTranslation } from "react-i18next";
import { ExchangeRate } from "@/lib/types/exchange";
const Exchange = () => {
  const { t } = useTranslation("common");
  const [rate, setRate] = useState<ExchangeRate | null>(null);
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState<BankAccount[]>([]);
  const userId = useAuthStore((state) => state.userId);
  const getExchangeRatePrice = async () => {
    try {
      setLoading(true);
      const res = await getExchangeRate();
      if (res) {
        setRate(res);
      }
    } catch (error) {
      toast.error("Error fetching exchange rate ⚠️");
      console.error("Error fetching exchange rate:", error);
    } finally {
      setLoading(false);
    }
  };
  const getUserBankAccounts = async (userId: string) => {
    try {
      const res = await getBankAccounts(userId);
      if (res && res.length > 0) {
        setAccounts(res);
      }
    } catch (error) {
      toast.error("Error fetching User Bank Accounts ⚠️");
      console.error("Error fetching exchange rate:", error);
    }
  };
  useEffect(() => {
    getExchangeRatePrice();
    getUserBankAccounts(userId);
    const interval = setInterval(getExchangeRatePrice, 10 * 60 * 1000); // هر ۱۰ دقیقه

    // پاکسازی اینتروال هنگام unmount شدن کامپوننت
    return () => clearInterval(interval);
  }, [userId]);
  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold text-center">
        {t("label.exchange.title")}
      </h1>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="hover:cursor-pointer text-xl font-bold">
            Currency Rate Data 💹
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ExchangeRateCard rate={rate} loading={loading} />
              <PriceChartCard />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <ExchangeForm exchangeRate={rate?.basePrice || 0} accounts={accounts} />
    </div>
  );
};

export default Exchange;
