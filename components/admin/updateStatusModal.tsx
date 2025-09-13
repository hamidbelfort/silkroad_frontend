import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExchangeOrder } from "@/lib/types/exchangeOrder";
import { OrderStatus } from "@/lib/types/orderStatus";
import { updateOrderStatus } from "@/lib/api/admin"; // We need to create this API function
import { toast } from "sonner";
import { Loader } from "lucide-react";

interface UpdateStatusModalProps {
  order: ExchangeOrder | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: () => void; // To refetch data after update
}

// These are the statuses an admin can manually change an order to.
const availableStatuses: OrderStatus[] = [
  OrderStatus.PENDING,
  OrderStatus.WAITING_PAYMENT,
  OrderStatus.PAID,
  OrderStatus.APPROVED,
  OrderStatus.REJECTED,
  OrderStatus.COMPLETED,
];

export function UpdateStatusModal({
  order,
  isOpen,
  onClose,
  onStatusUpdate,
}: UpdateStatusModalProps) {
  const [selectedStatus, setSelectedStatus] =
    useState<OrderStatus | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!order) return null;

  const handleSubmit = async () => {
    if (!selectedStatus) {
      toast.error("Please select a new status.");
      return;
    }
    setIsSubmitting(true);
    try {
      await updateOrderStatus(order.id!, selectedStatus);
      toast.success("Order status updated successfully!");
      onStatusUpdate(); // Trigger data refetch on the main page
      onClose(); // Close the modal
    } catch (error: unknown) {
      toast.error(
        (error as Error).message ||
          "Failed to update status."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update Status for Order #{order.id}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <Select
            onValueChange={(value) =>
              setSelectedStatus(value as OrderStatus)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select new status..." />
            </SelectTrigger>
            <SelectContent>
              {availableStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedStatus}
          >
            {isSubmitting && (
              <Loader className="mr-2 h-4 w-4 animate-spin" />
            )}
            Confirm Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
