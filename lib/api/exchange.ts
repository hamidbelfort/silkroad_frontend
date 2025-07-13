import axiosInstance from "../axios/axiosInstance";
import { ExchangeRate } from "../types/exchange";
import {
  ExchangeOrder,
  OrderResponse,
} from "../types/exchangeOrder";

export const getExchangeRate =
  async (): Promise<ExchangeRate | null> => {
    try {
      const response = await axiosInstance.get(
        "/api/exchange"
      );
      return response.data;
    } catch {
      return null;
    }
  };
export const getExchangeHistory = async () => {
  const response = await axiosInstance.get(
    "/api/exchange/history"
  );
  return response.data;
};
export const createExchangeOrder = async (
  data: ExchangeOrder
): Promise<OrderResponse> => {
  try {
    const response = await axiosInstance.post(
      "/api/exchange",
      data
    );
    return response.data;
  } catch (e: unknown) {
    const res: OrderResponse = {
      success: false,
      message: `Server Error :${(e as Error).message}`,
    };
    return res;
  }
};
