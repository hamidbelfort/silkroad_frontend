// components/exchange/ExchangeRateCard.tsx
"use client";

import { useEffect, useState } from "react";
import { getExchangeRate } from "@/lib/api/exchange";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Circle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ExchangeRate } from "@/lib/types/exchange";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

export function ExchangeRateCard({
  onRateChange,
}: {
  onRateChange?: (rate: number) => void;
}) {
  const [rate, setRate] = useState<ExchangeRate | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] =
    useState<string>("");
  const { t } = useTranslation("common");
  useEffect(() => {
    const fetchRate = async () => {
      try {
        setLoading(true);
        const data = await getExchangeRate();
        setRate(data);
        if (onRateChange)
          onRateChange(data?.basePrice || 0);
        setLastUpdated(new Date().toLocaleTimeString());
      } catch (err) {
        console.error("Error fetching rate:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRate();
    const interval = setInterval(fetchRate, 10 * 60 * 1000); // هر ۱۰ دقیقه
    return () => clearInterval(interval);
  }, [onRateChange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Circle color="#00b300" size={16} />
          <span className="flex justify-between gap-2">
            Live RMB Price
            <Flag code="cn" style={{ width: 20 }} />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading || !rate ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-32" />
          </div>
        ) : (
          <div className="text-sm space-y-1">
            <div className="flex lg:flex-row sm:flex-col gap-2">
              {t("title.basePrice")} :{" "}
              <h3 className="font-semibold mx-2">
                {rate.basePrice.toLocaleString()}ريال/IRR
              </h3>
              <Flag code="ir" style={{ width: 20 }} />
            </div>
            <div className="flex lg:flex-row sm:flex-col gap-2">
              {t("title.buyPrice")} :{" "}
              <h3 className="font-semibold mx-2">
                {rate.buyPrice.toLocaleString()}ريال/IRR
              </h3>
              <Flag code="ir" style={{ width: 20 }} />
            </div>
            <div className="text-muted-foreground flex lg:flex-row sm:flex-col gap-2 mt-4">
              {t("title.lastUpdated")} : {lastUpdated}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
