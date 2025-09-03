// components/exchange/ExchangeRateCard.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Circle, TimerIcon, RefreshCw } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ExchangeRate } from "@/lib/types/exchange";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

// --- Sub-component for the timer ---
const UpdateTimer = ({
  secondsLeft,
  isLoading,
}: {
  secondsLeft: number;
  isLoading: boolean;
}) => {
  const { t } = useTranslation("common");

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // 3. Micro-interaction: Show "Updating..." text when loading
  if (isLoading && secondsLeft === 0) {
    return (
      <div className="flex items-center gap-2 text-sm text-blue-500 mt-4">
        <RefreshCw className="h-4 w-4 animate-spin" />
        <span>Updating price...</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
      <TimerIcon className="h-4 w-4" />
      <span>{t("title.exchange.nextUpdateIn")}:</span>
      <span
        className={`font-semibold font-mono ${
          secondsLeft <= 10
            ? "text-orange-500 animate-pulse"
            : ""
        }`}
      >
        {formatTime(secondsLeft)}
      </span>
    </div>
  );
};

export function ExchangeRateCard({
  rate,
  loading,
}: {
  rate: ExchangeRate | number | null;
  loading: boolean;
}) {
  const { t } = useTranslation("common");
  const UPDATE_INTERVAL_SECONDS = 600;
  const [countdown, setCountdown] = useState(
    UPDATE_INTERVAL_SECONDS
  );

  const renderRate = (
    priceKey: "basePrice" | "buyPrice"
  ) => {
    if (
      typeof rate === "object" &&
      rate &&
      rate[priceKey]
    ) {
      return rate[priceKey].toLocaleString();
    }
    if (
      typeof rate === "number" &&
      priceKey === "basePrice"
    ) {
      return rate.toLocaleString();
    }
    return "---";
  };

  const isRateObject =
    typeof rate === "object" && rate !== null;

  useEffect(() => {
    // Reset timer whenever new data arrives and loading is finished
    if (!loading) {
      setCountdown(UPDATE_INTERVAL_SECONDS);
    }
  }, [rate, loading]);

  useEffect(() => {
    if (countdown <= 0) {
      // Stop the timer, it will be reset by the parent component fetching new data
      return;
    }

    const timerId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [countdown]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Circle
              color="#00b300"
              size={12}
              fill="#00b300"
              className={!loading ? "animate-pulse" : ""}
            />
            <span>{t("label.exchange.liveRmbPrice")}</span>
          </div>
          <Flag code="cn" className="w-6 h-auto" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading && !rate ? ( // Show skeleton only on initial load
          <div className="space-y-4">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-full mt-4" />
          </div>
        ) : (
          <div className="text-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                {t("title.exchange.basePrice")}
              </span>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg">
                  {renderRate("basePrice")} IRR
                </h3>
                <Flag code="ir" className="w-6 h-auto" />
              </div>
            </div>

            {isRateObject && (
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {t("title.exchange.buyPrice")}
                </span>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg">
                    {renderRate("buyPrice")} IRR
                  </h3>
                  <Flag code="ir" className="w-6 h-auto" />
                </div>
              </div>
            )}
            <div className="border-t border-dashed !my-4"></div>
            <UpdateTimer
              secondsLeft={countdown}
              isLoading={loading}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
