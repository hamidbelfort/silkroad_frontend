import axiosInstance from "@/lib/axios/axiosInstance";
import { Setting } from "../types/settings";

export const fetchAllSettings = async (): Promise<
  Setting[]
> => {
  const res = await axiosInstance.get("/settings");
  return res.data as Setting[];
};

export const updateAppSettings = async (data: {
  orderDisputeThreshold: number;
  adminEmail?: string;
  profitMargin?: number;
}) => {
  const response = await axiosInstance.put(
    "/api/settings",
    data
  );
  return response.data;
};
