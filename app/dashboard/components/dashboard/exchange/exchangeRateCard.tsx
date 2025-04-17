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

export default function ExchangeRateCard() {
  const [rate, setRate] = useState<ExchangeRate | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const data = await getExchangeRate();
        console.log(data);
        setRate(data);
      } catch (err) {
        console.error("Error fetching rate:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRate();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex align-baseline">
          <Circle
            color="#00b300"
            height={20}
            width={20}
            className="bg-green-600 mx-2"
          />{" "}
          Live RMB Price
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading || !rate ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
          </div>
        ) : (
          <div className="text-sm">
            <p>
              Base Price :{" "}
              {rate.basePrice?.toLocaleString()} IRR
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
