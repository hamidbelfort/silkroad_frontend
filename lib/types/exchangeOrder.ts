import { OrderStatus } from "./orderStatus";
import { User } from "./user";

export interface ExchangeOrder {
  id?: string;
  userId: string;
  amount: number;
  finalAmount: number;
  bankAccountId: string;
  isDisputed?: boolean;
  language?: string;
  status: OrderStatus;
  paymentRef?: string;
  createdAt?: string;
  updatedAt?: string;
  expiredAt?: string;
  // این خط مهم‌ترین تغییره
  // به تایپ‌اسکریپت می‌گیم که این سفارش ممکنه شامل اطلاعات کاربر هم باشه
  user?: Partial<User>;
}
export interface OrderResponse {
  success: boolean;
  message: string;
}
