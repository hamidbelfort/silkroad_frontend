"use client";
import React, { useEffect, useState } from "react";
import { ExchangeRateCard } from "../components/dashboard/exchange/exchangeRateCard";
import PriceChartCard from "../components/dashboard/exchange/exchangeChartCard2";
import { ExchangeForm } from "../components/dashboard/exchange/exchangeForm";
import { getExchangeRate } from "@/lib/api/exchange";
import { getSetting } from "@/lib/api/settings";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { BankAccount } from "@/lib/types/bankAccount";
import { getBankAccounts } from "@/lib/api/bankAccount";
import { useTranslation } from "react-i18next";
import { ExchangeRate } from "@/lib/types/exchange";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Exchange = () => {
  const { t } = useTranslation("common");
  const [rate, setRate] = useState<ExchangeRate | null>(
    null
  );
  const [loadingRate, setLoadingRate] = useState(true);
  const [accounts, setAccounts] = useState<BankAccount[]>(
    []
  );
  const [loadingAccounts, setLoadingAccounts] =
    useState(true);
  const [disputeThreshold, setDisputeThreshold] =
    useState<number>(Infinity); // Default to a high number
  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    // ... (getExchangeRatePrice and getUserBankAccounts functions remain the same)
    const getExchangeRatePrice = async () => {
      try {
        setLoadingRate(true);
        const res = await getExchangeRate();
        if (res) setRate(res);
      } catch {
        toast.error("Error fetching exchange rate ⚠️");
      } finally {
        setLoadingRate(false);
      }
    };
    const getUserBankAccounts = async (id: string) => {
      if (!id) return;
      try {
        setLoadingAccounts(true);
        const res = await getBankAccounts(id);
        if (res) setAccounts(res);
      } catch {
        toast.error("Error fetching User Bank Accounts ⚠️");
      } finally {
        setLoadingAccounts(false);
      }
    };

    const fetchDisputeThreshold = async () => {
      try {
        const setting = await getSetting(
          "ORDER_DISPUTE_THRESHOLD"
        );
        if (setting && !isNaN(Number(setting.value))) {
          setDisputeThreshold(Number(setting.value));
        }
      } catch (error) {
        console.error(
          "Error fetching dispute threshold:",
          error
        );
        // Keep it at Infinity so the checkbox never shows on error
      }
    };

    getExchangeRatePrice();
    getUserBankAccounts(userId);
    fetchDisputeThreshold(); // Fetch the threshold

    const interval = setInterval(
      getExchangeRatePrice,
      10 * 60 * 1000
    );
    return () => clearInterval(interval);
  }, [userId]);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <ExchangeRateCard
            rate={rate}
            loading={loadingRate}
          />
          <PriceChartCard />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold">
            {t("label.exchange.title")}
          </h1>

          {loadingAccounts ? (
            <Card>
              <CardHeader>
                <Skeleton className="h-8 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-12 w-1/3" />
              </CardContent>
            </Card>
          ) : accounts.length > 0 ? (
            // Pass the threshold to the form
            <ExchangeForm
              exchangeRate={rate?.basePrice || 0}
              accounts={accounts}
              disputeThreshold={disputeThreshold}
            />
          ) : (
            <Card className="flex flex-col items-center justify-center p-8 text-center">
              <CardHeader>
                <CardTitle>
                  No Bank Account Found!
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Please add a bank account before you can
                  start exchanging currency.
                </p>
                <Button>Add Bank Account</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Exchange;
