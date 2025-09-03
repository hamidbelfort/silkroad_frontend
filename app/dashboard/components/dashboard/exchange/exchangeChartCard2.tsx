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
  CartesianGrid,
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
        setLoading(true);
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
    // Changed date format to a more standard one
    date: new Date(h.createdAt).toLocaleDateString(
      "en-CA",
      {
        month: "short",
        day: "numeric",
      }
    ),
    price: h.basePrice,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {t("title.exchange.rmbPriceHistory")}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          {loading ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={formattedData}
                margin={{
                  top: 5,
                  right: 20,
                  left: -10,
                  bottom: 5,
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
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  domain={[
                    "dataMin - 100",
                    "dataMax + 100",
                  ]}
                />
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "0.5rem",
                    border: "1px solid hsl(var(--border))",
                  }}
                  formatter={(value: number) => [
                    `${value.toLocaleString()} IRR`,
                    "Price",
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={2}
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
