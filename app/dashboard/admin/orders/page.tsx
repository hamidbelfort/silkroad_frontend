"use client";

import { useReducer, useCallback } from "react";
import { getOrdersByStatus } from "@/lib/api/admin";
import { ExchangeOrder } from "@/lib/types/exchangeOrder";
import { OrderStatus } from "@/lib/types/orderStatus";
import {
  Loader,
  MoreVertical,
  Eye,
  Edit,
  Info,
  Hourglass,
  CreditCard,
  BadgeDollarSign,
  BadgeCheck,
  BadgeX,
  CheckCircle2,
  CircleSlash,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";
import { OrderDetailsModal } from "@/components/admin/orderDetailsModal";
import { UpdateStatusModal } from "@/components/admin/updateStatusModal";
import { OrderStatusBadge } from "@/components/ui/orderStatusBadge";

// --- UI Configuration for Tabs ---
const statusConfig = {
  [OrderStatus.PENDING]: { icon: Hourglass, color: "text-yellow-500" },
  [OrderStatus.WAITING_REVIEW]: { icon: Info, color: "text-orange-500" },
  [OrderStatus.WAITING_PAYMENT]: { icon: CreditCard, color: "text-blue-500" },
  [OrderStatus.PAID]: { icon: BadgeDollarSign, color: "text-sky-500" },
  [OrderStatus.APPROVED]: { icon: BadgeCheck, color: "text-green-600" },
  [OrderStatus.REJECTED]: { icon: BadgeX, color: "text-red-500" },
  [OrderStatus.COMPLETED]: { icon: CheckCircle2, color: "text-emerald-600" },
  [OrderStatus.CANCELED]: { icon: CircleSlash, color: "text-gray-500" },
};
const orderStatuses = Object.keys(statusConfig) as OrderStatus[];

// --- State Management with useReducer ---
type State = {
  orders: ExchangeOrder[];
  loading: boolean;
  currentStatus: OrderStatus | null;
  selectedOrder: ExchangeOrder | null;
  isDetailsModalOpen: boolean;
  isUpdateModalOpen: boolean;
};

type Action =
  | { type: "FETCH_START"; payload: OrderStatus }
  | { type: "FETCH_SUCCESS"; payload: ExchangeOrder[] }
  | { type: "FETCH_ERROR" }
  | { type: "OPEN_DETAILS_MODAL"; payload: ExchangeOrder }
  | { type: "OPEN_UPDATE_MODAL"; payload: ExchangeOrder }
  | { type: "CLOSE_MODALS" };

const initialState: State = {
  orders: [],
  loading: false,
  currentStatus: null,
  selectedOrder: null,
  isDetailsModalOpen: false,
  isUpdateModalOpen: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        currentStatus: action.payload,
        orders: [],
      };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, orders: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false };
    case "OPEN_DETAILS_MODAL":
      return {
        ...state,
        selectedOrder: action.payload,
        isDetailsModalOpen: true,
      };
    case "OPEN_UPDATE_MODAL":
      return {
        ...state,
        selectedOrder: action.payload,
        isUpdateModalOpen: true,
      };
    case "CLOSE_MODALS":
      return {
        ...state,
        selectedOrder: null,
        isDetailsModalOpen: false,
        isUpdateModalOpen: false,
      };
    default:
      return state;
  }
}

export default function AdminOrdersPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    orders,
    loading,
    currentStatus,
    selectedOrder,
    isDetailsModalOpen,
    isUpdateModalOpen,
  } = state;

  const handleTabChange = useCallback(async (statusValue: string) => {
    const status = statusValue as OrderStatus;
    dispatch({ type: "FETCH_START", payload: status });
    try {
      const fetchedOrders = await getOrdersByStatus(status);
      dispatch({ type: "FETCH_SUCCESS", payload: fetchedOrders });
    } catch {
      toast.error(`Failed to fetch ${status.toLowerCase()} orders.`);
      dispatch({ type: "FETCH_ERROR" });
    }
  }, []);

  const handleStatusUpdateSuccess = useCallback(() => {
    dispatch({ type: "CLOSE_MODALS" });
    toast.success("Order status updated successfully!");
    if (currentStatus) {
      handleTabChange(currentStatus);
    }
  }, [currentStatus, handleTabChange]);

  const finalStatuses: OrderStatus[] = [
    OrderStatus.COMPLETED,
    OrderStatus.REJECTED,
    OrderStatus.CANCELED,
  ];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Orders Management</h1>
        <p className="text-muted-foreground">
          Manage and review all exchange orders.
        </p>
      </div>
      <Card>
        <CardHeader>
          <Tabs onValueChange={handleTabChange}>
            <TabsList>
              <TooltipProvider delayDuration={0}>
                {orderStatuses.map((status) => {
                  const config = statusConfig[status];
                  const Icon = config.icon;
                  return (
                    <Tooltip key={status}>
                      <TooltipTrigger asChild>
                        <TabsTrigger
                          value={status}
                          className="data-[state=active]:shadow-sm"
                        >
                          {/* Mobile View: Icon */}
                          <Icon
                            className={`h-5 w-5 sm:hidden ${config.color}`}
                          />
                          {/* Desktop View: Text */}
                          <span className="hidden sm:inline">
                            {status.replace("_", " ")}
                          </span>
                        </TabsTrigger>
                      </TooltipTrigger>
                      <TooltipContent className="sm:hidden">
                        <p>{status.replace("_", " ")}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </TooltipProvider>
            </TabsList>
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
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {!currentStatus ? (
                      <TableRow>
                        <TableCell
                          colSpan={4}
                          className="h-48 text-center text-muted-foreground"
                        >
                          Please select a status tab to view orders.
                        </TableCell>
                      </TableRow>
                    ) : orders.length > 0 ? (
                      orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            <div>{order.user?.fullname || "N/A"}</div>
                            <div className="text-xs text-muted-foreground hidden sm:block">
                              {order.user?.email}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {order.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <OrderStatusBadge status={order.status} />
                          </TableCell>
                          <TableCell className="text-right">
                            {order.status === OrderStatus.WAITING_REVIEW && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="mr-2 border-orange-500 text-orange-600 hover:bg-orange-50"
                                onClick={() =>
                                  dispatch({
                                    type: "OPEN_DETAILS_MODAL",
                                    payload: order,
                                  })
                                }
                              >
                                <Info className="mr-2 h-4 w-4" />
                                Review
                              </Button>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    dispatch({
                                      type: "OPEN_DETAILS_MODAL",
                                      payload: order,
                                    })
                                  }
                                >
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                {!finalStatuses.includes(order.status) && (
                                  <DropdownMenuItem
                                    onClick={() =>
                                      dispatch({
                                        type: "OPEN_UPDATE_MODAL",
                                        payload: order,
                                      })
                                    }
                                  >
                                    <Edit className="mr-2 h-4 w-4" />
                                    Update Status
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
                          colSpan={4}
                          className="h-48 text-center text-muted-foreground"
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
        onClose={() => dispatch({ type: "CLOSE_MODALS" })}
      />
      <UpdateStatusModal
        order={selectedOrder}
        isOpen={isUpdateModalOpen}
        onClose={() => dispatch({ type: "CLOSE_MODALS" })}
        onStatusUpdate={handleStatusUpdateSuccess}
      />
    </div>
  );
}
