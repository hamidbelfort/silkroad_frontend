"use client";

import { useEffect, useState, useCallback } from "react";
import { getOrdersByStatus } from "@/lib/api/admin";
import { ExchangeOrder } from "@/lib/types/exchangeOrder";
import { OrderStatus } from "@/lib/types/orderStatus";
import {
  Loader,
  MoreVertical,
  Eye,
  Edit,
  Info,
} from "lucide-react";
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
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { OrderDetailsModal } from "@/components/admin/orderDetailsModal";
import { UpdateStatusModal } from "@/components/admin/updateStatusModal";
import { OrderStatusBadge } from "@/components/ui/orderStatusBadge";

const orderStatuses: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.WAITING_REVIEW,
  OrderStatus.WAITING_PAYMENT,
  OrderStatus.PAID,
  OrderStatus.APPROVED,
  OrderStatus.REJECTED,
  OrderStatus.COMPLETED,
  OrderStatus.CANCELED,
];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<ExchangeOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentStatus, setCurrentStatus] =
    useState<OrderStatus>(OrderStatus.PENDING);

  const [selectedOrder, setSelectedOrder] =
    useState<ExchangeOrder | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] =
    useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] =
    useState(false);

  // تابع fetchOrders حالا وضعیت را به عنوان آرگومان می‌گیرد
  const fetchOrdersByStatus = useCallback(
    async (status: OrderStatus) => {
      try {
        setLoading(true);
        const fetchedOrders = await getOrdersByStatus(
          status
        );
        setOrders(fetchedOrders);
      } catch {
        toast.error(
          `Failed to fetch ${status.toLowerCase()} orders.`
        );
      } finally {
        setLoading(false);
      }
    },
    []
  ); // این تابع هیچ وابستگی‌ای ندارد و یک بار ساخته می‌شود

  // این useEffect فقط یک بار در اولین رندر برای گرفتن داده‌های اولیه اجرا می‌شود
  useEffect(() => {
    fetchOrdersByStatus(OrderStatus.PENDING);
  }, [fetchOrdersByStatus]);

  // وقتی کاربر تب را عوض می‌کند، داده‌های جدید را می‌گیریم
  const handleTabChange = (status: string) => {
    const newStatus = status as OrderStatus;
    setCurrentStatus(newStatus);
    fetchOrdersByStatus(newStatus);
  };

  // وقتی وضعیت با موفقیت آپدیت شد، داده‌ها را دوباره می‌گیریم
  const handleStatusUpdateSuccess = useCallback(() => {
    setIsUpdateModalOpen(false);
    toast.success("Order status updated successfully!");
    fetchOrdersByStatus(currentStatus);
  }, [currentStatus, fetchOrdersByStatus]);

  const openDetailsModal = (order: ExchangeOrder) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  const openUpdateModal = (order: ExchangeOrder) => {
    setSelectedOrder(order);
    setIsUpdateModalOpen(true);
  };

  const handleDetailsModalClose = useCallback(() => {
    setIsDetailsModalOpen(false);
  }, []);

  const handleUpdateModalClose = useCallback(() => {
    setIsUpdateModalOpen(false);
  }, []);

  const finalStatuses: OrderStatus[] = [
    OrderStatus.COMPLETED,
    OrderStatus.REJECTED,
    OrderStatus.CANCELED,
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Orders Management
          </h1>
          <p className="text-muted-foreground">
            Manage and review all exchange orders.
          </p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <Tabs
            value={currentStatus}
            onValueChange={handleTabChange}
          >
            {/* --- START OF UI FIX --- */}
            {/* Wrap TabsList in a div to make it horizontally scrollable on small screens */}
            <div className="relative w-full overflow-x-auto">
              <TabsList className="inline-flex h-auto">
                {orderStatuses.map((status) => (
                  <TabsTrigger
                    key={status}
                    value={status}
                    className="whitespace-nowrap"
                  >
                    {status.replace("_", " ")}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {/* --- END OF UI FIX --- */}
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="mt-4">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader className="animate-spin h-8 w-8 text-primary" />
              </div>
            ) : (
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Amount (¥)
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Date
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            <div>
                              {order.user?.fullname ||
                                "N/A"}
                            </div>
                            <div className="text-xs text-muted-foreground hidden sm:block">
                              {order.user?.email}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {order.amount.toLocaleString()}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {new Date(
                              order.createdAt!
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <OrderStatusBadge
                              status={order.status}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            {order.status ===
                              OrderStatus.WAITING_REVIEW && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="mr-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                                onClick={() =>
                                  openDetailsModal(order)
                                }
                              >
                                <Info className="mr-2 h-4 w-4" />
                                Review
                              </Button>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  className="h-8 w-8 p-0"
                                >
                                  <span className="sr-only">
                                    Open menu
                                  </span>
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    openDetailsModal(order)
                                  }
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>View Details</span>
                                </DropdownMenuItem>
                                {!finalStatuses.includes(
                                  order.status
                                ) && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      openUpdateModal(order)
                                    }
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>
                                      Update Status
                                    </span>
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
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
        </CardContent>
      </Card>

      <OrderDetailsModal
        order={selectedOrder}
        isOpen={isDetailsModalOpen}
        onClose={handleDetailsModalClose}
      />
      <UpdateStatusModal
        order={selectedOrder}
        isOpen={isUpdateModalOpen}
        onClose={handleUpdateModalClose}
        onStatusUpdate={handleStatusUpdateSuccess}
      />
    </div>
  );
}
