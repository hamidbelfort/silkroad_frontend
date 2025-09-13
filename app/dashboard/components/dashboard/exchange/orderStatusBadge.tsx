"use client";
import { Badge } from "@/components/ui/Badge";
import { OrderStatus } from "@/lib/types/orderStatus"; // مسیر فایل تایپ خودت رو وارد کن
import { useTranslation } from "react-i18next";
// یک دیکشنری برای مدیریت استایل و متن هر وضعیت
const statusConfig: Record<OrderStatus, { text: string; className: string }> = {
  [OrderStatus.PENDING]: {
    text: "orderStatus.pending",
    className: "bg-gray-100 text-gray-800 border-gray-300",
  },
  [OrderStatus.WAITING_PAYMENT]: {
    text: "orderStatus.waitingPayment",
    className: "bg-blue-100 text-blue-800 border-blue-300",
  },
  [OrderStatus.PAID]: {
    text: "orderStatus.paid",
    className: "bg-sky-100 text-sky-800 border-sky-300",
  },
  [OrderStatus.APPROVED]: {
    text: "orderStatus.approved",
    className: "bg-indigo-100 text-indigo-800 border-indigo-300",
  },
  [OrderStatus.REJECTED]: {
    text: "orderStatus.rejected",
    className: "bg-red-100 text-red-800 border-red-300",
  },
  [OrderStatus.CANCELED]: {
    text: "orderStatus.cancelled",
    className: "bg-red-100 text-red-800 border-red-300",
  },
  [OrderStatus.COMPLETED]: {
    text: "orderStatus.completed",
    className: "bg-green-100 text-green-800 border-green-300",
  },
  [OrderStatus.WAITING_REVIEW]: {
    text: "orderStatus.waitingReview",
    className: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const { t } = useTranslation("common");
  // اگر وضعیتی تعریف نشده بود، یک حالت پیش‌فرض نمایش بده
  const config = statusConfig[status] || {
    text: t(status),
    className: "bg-gray-100",
  };

  return (
    <Badge variant="outline" className={`font-semibold ${config.className}`}>
      {config.text}
    </Badge>
  );
}
