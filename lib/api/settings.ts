import axiosInstance from "@/lib/axios/axiosInstance";

export const getAppSettings = async () => {
  const response = await axiosInstance.get("/api/settings");
  return response.data;
};

export const updateAppSettings = async (data: {
  orderDisputeThreshold: number;
}) => {
  const response = await axiosInstance.put(
    "/api/settings",
    data
  );
  return response.data;
};
