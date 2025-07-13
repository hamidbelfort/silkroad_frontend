import { OrderStatus } from "./orderStatus";

export interface ExchangeOrder {
  id?: string;
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
}
export interface OrderResponse {
  success: boolean;
  message: string;
}
