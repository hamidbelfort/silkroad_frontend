import axiosInstance from "../axios/axiosInstance";

export const getExchangeRate = async () => {
  const response = await axiosInstance.get("/api/exchange");
  return response.data;
};
export const getExchangeHistory = async () => {
  const response = await axiosInstance.get(
    "/api/exchange/history"
  );
  return response.data;
};
