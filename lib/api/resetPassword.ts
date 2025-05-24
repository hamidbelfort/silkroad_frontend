import axiosInstance from "../axios/axiosInstance";
import {
  RequestPasswordResponse,
  RequestPasswordType,
} from "../types/requestPassword";

export const requestOTP = async (
  payload: RequestPasswordType
): Promise<RequestPasswordResponse | null> => {
  try {
    const res = await axiosInstance.post(
      "/api/auth/verify-otp",
      payload
    );
    return res.data;
  } catch {
    return null;
  }
};
