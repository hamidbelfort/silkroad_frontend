"use client";

import { Line } from "react-chartjs-2";
import { getExchangeHistory } from "@/lib/api/exchange";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Skeleton } from "@/components/ui/skeleton";
import { ExchangeRateHistory } from "@/lib/types/exchange";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function ExchangeChart() {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<ExchangeRateHistory[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getExchangeHistory();
        setHistory(data);
      } catch (err) {
        console.error("Error fetching exchange history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const chartLabel = t("title.yuanRate");
  const chartData = {
    labels: history.map(
      (h) => new Date(h.createdAt).toLocaleDateString("en-US") //تاریخ میلادی
    ),
    datasets: [
      {
        label: "Yuan Rate (元汇率)",
        data: history.map((h) => h.basePrice),
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59, 130, 246, 0.3)",
        tension: 0.3,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title.rmbPriceHistory")}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* <div className="h-[400px]">
          <Line data={chartData} />
        </div> */}
        <div className="h-[350px] md:h-[400px] w-full md:col-span-2 bg-white dark:bg-muted rounded-md p-4">
          {loading || history.length === 0 ? (
            <Skeleton className="h-full w-full" />
          ) : (
            <div className="h-[400px]">
              <Line data={chartData} options={{ responsive: true }} />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
