import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExchangeOrder } from "@/lib/types/exchangeOrder";
import { OrderStatusBadge } from "../ui/orderStatusBadge";
import { User, Mail, Phone } from "lucide-react";

interface OrderDetailsModalProps {
  order: ExchangeOrder | null;
  isOpen: boolean;
  onClose: () => void;
}

export function OrderDetailsModal({
  order,
  isOpen,
  onClose,
}: OrderDetailsModalProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Order Details #{order.id}
          </DialogTitle>
          <DialogDescription>
            Full details for the exchange order.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Customer Info Card */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
            <h3 className="text-lg font-semibold mb-2">
              Customer Information
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span>{order.user?.fullname || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{order.user?.email || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>
                  {order.user?.phone || "Not provided"}
                </span>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Status:
              </span>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Yuan Amount:
              </span>
              <span className="font-semibold">
                ¥ {order.amount.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Rial Amount:
              </span>
              <span className="font-semibold">
                {order.finalAmount.toLocaleString()} IRR
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Order Date:
              </span>
              <span>
                {new Date(
                  order.createdAt!
                ).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
