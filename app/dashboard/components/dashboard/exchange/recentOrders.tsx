"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExchangeOrder } from "@/lib/types/exchangeOrder";
import { getMyOrderHistory } from "@/lib/api/exchange";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { OrderStatusBadge } from "../../../../../components/ui/orderStatusBadge";
import { useTranslation } from "react-i18next";

export function RecentOrders() {
  const [orders, setOrders] = useState<ExchangeOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const history = await getMyOrderHistory();
      // Show only the last 3 orders
      setOrders(history.slice(0, 3));
      setLoading(false);
    };
    fetchHistory();
  }, []);

  const renderSkeleton = () => (
    <TableRow>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-20" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-16" />
      </TableCell>
    </TableRow>
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{t("recentOrders.title")}</CardTitle>
          <CardDescription>
            {t("recentOrders.desc")}
          </CardDescription>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/orders">
            {t("recentOrders.viewAll")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                {t("recentOrders.columns.date")}
              </TableHead>
              <TableHead>
                {t("recentOrders.columns.amount")}(¥)
              </TableHead>
              <TableHead>
                {t("recentOrders.columns.status")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <>
                {renderSkeleton()}
                {renderSkeleton()}
              </>
            ) : orders.length > 0 ? (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    {new Date(
                      order.createdAt!
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {order.amount.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge
                      status={order.status}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-24 text-center"
                >
                  {t("recentOrders.noOrders")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
