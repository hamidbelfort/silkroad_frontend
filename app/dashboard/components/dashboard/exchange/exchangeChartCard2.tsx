// components/exchange/PriceChartCard.tsx
"use client";

import { useEffect, useState } from "react";
import { getExchangeHistory } from "@/lib/api/exchange";
import { ExchangeRateHistory } from "@/lib/types/exchange";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";

export default function PriceChartCard() {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<
    ExchangeRateHistory[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExchangeHistory();
        setHistory(data);
      } catch (err) {
        console.error(
          "Error fetching exchange history",
          err
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formattedData = history.map((h) => ({
    date: new Date(h.createdAt).toLocaleDateString("en-US"),
    price: h.basePrice,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title.rmbPriceHistory")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] md:h-[200px] w-full">
          {loading || history.length === 0 ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={formattedData}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="colorPrice"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="#3b82f6"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="#3b82f6"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12 }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  formatter={(value: number) =>
                    `${value.toLocaleString()} IRR`
                  }
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  fillOpacity={1}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
