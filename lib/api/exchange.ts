import axiosInstance from "../axios/axiosInstance";
import { ExchangeRate } from "../types/exchange";

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
