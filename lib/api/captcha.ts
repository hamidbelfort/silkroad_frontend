import axiosInstance from "../axios/axiosInstance";
import { Captcha } from "../types/captcha";
export const requestCaptcha =
  async (): Promise<Captcha | null> => {
    try {
      const res = await axiosInstance.get("/api/captcha");
      return res.data;
    } catch (error) {
      console.log(`Error requesting captcha: ${error}`);
      return null;
    }
  };
