import axiosInstance from "../axios/axiosInstance";
import {
  ResetPasswordResponse,
  ResetPasswordType,
} from "../types/resetPassword";

export const verifyOTP = async (
  payload: ResetPasswordType
): Promise<ResetPasswordResponse | null> => {
  try {
    const res = await axiosInstance.post("/api/auth/verify-otp", payload);
    return res.data;
  } catch {
    return null;
  }
};
