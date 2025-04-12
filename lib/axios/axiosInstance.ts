import axios from "axios";
//import { getToken } from "@/lib/cookies/authCookies";
import { toast } from "sonner";
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
// interceptor برای اضافه کردن توکن فقط در درخواست‌هایی که نیاز دارن
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // لیستی از مسیرهایی که نیاز به احراز هویت ندارن
    const publicRoutes = [
      "/auth/login",
      "/auth/register",
      "/auth/forgot-password",
    ];

    // فقط زمانی توکن اضافه کن که مسیر از مسیرهای عمومی نباشه
    if (
      token &&
      !publicRoutes.some((route) =>
        config.url?.includes(route)
      )
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// error handler
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      toast.error(
        "Server Error: " + error.response.data?.message ||
          error.message
      );
    } else if (error.request) {
      toast.error("Network Error: " + error.message);
    } else {
      toast.error("Error: " + error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
