import axiosInstance from "../axios/axiosInstance";
import { FaqType, FaqResponse } from "../types/faq";
export const getFaqs = async (): Promise<FaqType[] | null> => {
  try {
    const res = await axiosInstance.get("/api/faq/list");
    return res.data;
  } catch (err) {
    console.log("Failed to get faqs : " + err);
    throw err;
  }
};
export const getFaq = async (id: string): Promise<FaqType | null> => {
  try {
    const res = await axiosInstance.get(`/api/faq/${id}`);
    return res.data;
  } catch (err) {
    console.log("Failed to get faq : " + err);
    throw err;
  }
};
export const createFaq = async (payload: FaqType): Promise<FaqResponse> => {
  try {
    const res = await axiosInstance.post<FaqResponse>("/api/faq", payload);
    return res.data;
  } catch (err) {
    console.log("Failed to create faq : " + err);
    throw err;
  }
};
export const updateFaq = async (
  id: string,
  payload: FaqType
): Promise<FaqResponse> => {
  try {
    const res = await axiosInstance.put<FaqResponse>(`/api/faq/${id}`, payload);
    return res.data;
  } catch (err) {
    console.log("Failed to update faq : " + err);
    throw err;
  }
};
export const deleteFaq = async (id: string): Promise<FaqResponse> => {
  try {
    const res = await axiosInstance.delete<FaqResponse>(`/api/faq/${id}`);
    return res.data;
  } catch (err) {
    console.log("Failed to delete faq : " + err);
    throw err;
  }
};
