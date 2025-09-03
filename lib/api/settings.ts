import axiosInstance from "@/lib/axios/axiosInstance";
import { Setting, SettingKey } from "../types/settings";

export const fetchAllSettings = async (): Promise<
  Setting[]
> => {
  const res = await axiosInstance.get("/api/settings");
  return res.data as Setting[];
};

export const updateAppSettings = async (data: {
  orderDisputeThreshold?: number;
  adminEmail?: string;
  profitMargin?: number;
}) => {
  const payload = [];
  if (data.adminEmail !== undefined) {
    payload.push({
      key: SettingKey.ADMIN_EMAIL,
      value: data.adminEmail,
    });
  }

  if (data.profitMargin !== undefined) {
    payload.push({
      key: SettingKey.PROFIT_MARGIN,
      value: data.profitMargin.toString(),
    });
  }

  if (data.orderDisputeThreshold !== undefined) {
    payload.push({
      key: SettingKey.ORDER_DISPUTE_THRESHOLD,
      value: data.orderDisputeThreshold.toString(),
    });
  }
  const response = await axiosInstance.put(
    "/api/settings",
    payload
  );
  return response.data;
};
/**
 * Fetches a specific setting from the server by its key.
 * @param key The key of the setting to fetch (e.g., "ORDER_DISPUTE_THRESHOLD").
 * @returns The setting object or null if not found.
 */
export const getSetting = async (
  key: string
): Promise<Setting | null> => {
  try {
    const response = await axiosInstance.get(
      `/api/settings/${key}`
    );
    return response.data;
  } catch {
    return null;
  }
};
