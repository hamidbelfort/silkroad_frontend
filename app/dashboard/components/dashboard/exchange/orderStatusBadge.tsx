import { Badge } from "@/components/ui/badge";
import { OrderStatus } from "@/lib/types/orderStatus"; // مسیر فایل تایپ خودت رو وارد کن

// یک دیکشنری برای مدیریت استایل و متن هر وضعیت
const statusConfig: Record<OrderStatus, { text: string; className: string }> = {
  [OrderStatus.PENDING]: {
    text: "Pending",
    className: "bg-gray-100 text-gray-800 border-gray-300",
  },
  [OrderStatus.WAITING_PAYMENT]: {
    text: "Waiting Payment",
    className: "bg-blue-100 text-blue-800 border-blue-300",
  },
  [OrderStatus.PAID]: {
    text: "Paid",
    className: "bg-sky-100 text-sky-800 border-sky-300",
  },
  [OrderStatus.APPROVED]: {
    text: "Approved",
    className: "bg-indigo-100 text-indigo-800 border-indigo-300",
  },
  [OrderStatus.REJECTED]: {
    text: "Rejected",
    className: "bg-red-100 text-red-800 border-red-300",
  },
  [OrderStatus.CANCELED]: {
    // Note: The enum has CANCELED, so I'm matching that
    text: "Canceled",
    className: "bg-red-100 text-red-800 border-red-300",
  },
  [OrderStatus.COMPLETED]: {
    text: "Completed",
    className: "bg-green-100 text-green-800 border-green-300",
  },
  [OrderStatus.WAITING_REVIEW]: {
    text: "Waiting Review",
    className: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
};

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  // اگر وضعیتی تعریف نشده بود، یک حالت پیش‌فرض نمایش بده
  const config = statusConfig[status] || {
    text: status,
    className: "bg-gray-100",
  };

  return (
    <Badge variant="outline" className={`font-semibold ${config.className}`}>
      {config.text}
    </Badge>
  );
}
