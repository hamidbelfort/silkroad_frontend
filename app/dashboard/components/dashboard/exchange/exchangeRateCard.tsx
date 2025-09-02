// components/exchange/ExchangeRateCard.tsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle, TimerIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ExchangeRate } from "@/lib/types/exchange";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags";

export function ExchangeRateCard({
  rate,
  loading,
}: {
  rate: ExchangeRate | number | null;
  loading: boolean;
}) {
  const { t } = useTranslation("common");
  const UPDATE_INTERVAL_SECONDS = 600; // ۱۰ دقیقه
  const [countdown, setCountdown] = useState(UPDATE_INTERVAL_SECONDS);

  const renderRate = (priceKey: "basePrice" | "buyPrice") => {
    if (typeof rate === "object" && rate && rate[priceKey]) {
      return rate[priceKey].toLocaleString();
    }
    if (typeof rate === "number" && priceKey === "basePrice") {
      return rate.toLocaleString();
    }
    return "---";
  };
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    // اضافه کردن صفر پشت اعداد تک رقمی
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };
  const UpdateTimer = ({ secondsLeft }: { secondsLeft: number }) => {
    const { t } = useTranslation("common");
    const formattedTime = formatTime(secondsLeft);

    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4">
        <TimerIcon className="h-4 w-4" />
        <span>{t("title.exchange.nextUpdateIn")}:</span>
        {/* استفاده از font-mono برای ظاهر بهتر تایمر */}
        <span
          className={`font-semibold font-mono ${
            countdown <= 5 ? "animate-pulse" : ""
          }`}
        >
          {formattedTime}
        </span>
      </div>
    );
  };
  const isRateObject = typeof rate === "object" && rate !== null;
  useEffect(() => {
    // هر بار که داده جدید می‌آید، تایمر را ریست کن
    setCountdown(UPDATE_INTERVAL_SECONDS);
  }, [rate]);

  useEffect(() => {
    if (countdown <= 0) return; // اگر شمارش تمام شد، متوقف شو

    const timerId = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId); // پاکسازی تایمر
  }, [countdown]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Circle
              color="#00b300"
              size={12}
              fill="#00b300"
              className={loading ? "" : "animate-pulse"}
            />
            <span>{t("label.exchange.liveRmbPrice")}</span>
          </div>
          <Flag code="cn" style={{ width: 24 }} />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-6 w-40" />
          </div>
        ) : (
          <div className="text-md space-y-3">
            {/* 👇 تغییر ۴: نمایش قیمت‌ها تمیزتر شد */}
            <div className="flex items-center justify-between">
              <span>{t("title.exchange.basePrice")}</span>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{renderRate("basePrice")} IRR</h3>
                <Flag code="ir" style={{ width: 24 }} />
              </div>
            </div>

            {/* اگر داده کامل بود قیمت خرید را هم نمایش بده */}
            {isRateObject && (
              <div className="flex items-center justify-between">
                <span>{t("title.exchange.buyPrice")}</span>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold">
                    {renderRate("buyPrice")} IRR
                  </h3>
                  <Flag code="ir" style={{ width: 24 }} />
                </div>
              </div>
            )}
            <div className="border-t border-dashed my-4"></div>
            <UpdateTimer secondsLeft={countdown} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
