"use client";

import { useEffect, useState } from "react";
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
import { OrderStatusBadge } from "../../../../components/ui/orderStatusBadge";
import { useTranslation } from "react-i18next";
// Main component for the page
export default function OrdersPage() {
  const [orders, setOrders] = useState<ExchangeOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const history = await getMyOrderHistory();
      setOrders(history);
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
        <Skeleton className="h-4 w-28" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-16" />
      </TableCell>
    </TableRow>
  );

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-3xl font-bold">
        {t("orderHistory.myOrders")}
      </h1>
      <p className="text-muted-foreground">
        {t("orderHistory.desc")}
      </p>
      <Card>
        <CardHeader>
          <CardTitle>{t("orderHistory.title")}</CardTitle>
          <CardDescription>
            {t("orderHistory.desc2")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    {t("orderHistory.columns.date")}
                  </TableHead>
                  <TableHead>
                    {t("orderHistory.columns.amount")}(¥)
                  </TableHead>
                  <TableHead>
                    {t("orderHistory.columns.rialAmount")}
                    (IRR)
                  </TableHead>
                  <TableHead>
                    {t("orderHistory.columns.status")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <>
                    {renderSkeleton()}
                    {renderSkeleton()}
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
                        {order.finalAmount.toLocaleString()}
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
                      colSpan={4}
                      className="h-24 text-center"
                    >
                      {t("orderHistory.noOrders")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
