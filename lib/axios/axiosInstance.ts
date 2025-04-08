import axios from "axios";
import { getToken } from "@/lib/cookies/authCookies";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// اضافه کردن توکن به هر درخواست
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// هندل ارورها
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // ارورهایی که از سمت سرور میان
      console.error(
        "Server Error:",
        error.response.data.message || error.message
      );
    } else if (error.request) {
      // ارورهایی که از سمت کلاینت میان (مثلاً اینترنت قطع باشه)
      console.error("Network Error:", error.message);
    } else {
      console.error("Unknown Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
