"use client";

import { useEffect, useState } from "react";
import { getOrdersByStatus } from "@/lib/api/admin";
import { ExchangeOrder } from "@/lib/types/exchangeOrder";
import { OrderStatus } from "@/lib/types/orderStatus";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";

// Define the statuses you want to show as tabs
const orderStatuses: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.WAITING_PAYMENT,
  OrderStatus.PAID,
  OrderStatus.APPROVED,
  OrderStatus.REJECTED,
  OrderStatus.CANCELED,
  OrderStatus.COMPLETED,
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<ExchangeOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] =
    useState<OrderStatus>(OrderStatus.PENDING);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const fetchedOrders = await getOrdersByStatus(
          currentStatus
        );
        setOrders(fetchedOrders);
      } catch {
        toast.error(
          `Failed to fetch ${currentStatus.toLowerCase()} orders.`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentStatus]); // Refetch when the currentStatus (tab) changes

  const handleTabChange = (status: string) => {
    setCurrentStatus(status as OrderStatus);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Exchange Orders Management
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            value={currentStatus}
            onValueChange={handleTabChange}
          >
            <TabsList>
              {orderStatuses.map((status) => (
                <TabsTrigger key={status} value={status}>
                  {status.replace("_", " ")}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="mt-4">
              {loading ? (
                <p>Loading orders...</p>
              ) : (
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount (Yuan)</TableHead>
                        <TableHead>
                          Final Amount (IRR)
                        </TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.length > 0 ? (
                        orders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-mono">
                              #{order.id}
                            </TableCell>
                            <TableCell>
                              {order.user?.fullname ||
                                "N/A"}
                            </TableCell>
                            <TableCell>
                              {order.amount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {order.finalAmount.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {new Date(
                                order.createdAt!
                              ).toLocaleDateString()}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="h-24 text-center"
                          >
                            No orders found for this status.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
