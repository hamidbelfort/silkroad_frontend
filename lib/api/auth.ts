// lib/authService.ts
"use client";
import { toast } from "sonner";
import axiosInstance from "../axios/axiosInstance";
import Cookies from "js-cookie";
interface LoginPayload {
  email: string;
  password: string;
}
interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "OPERATOR" | "CUSTOMER";
  };
}

interface RegisterPayload {
  fullname: string;
  email: string;
  password: string;
}

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  try {
    const response =
      await axiosInstance.post<LoginResponse>(
        "/api/auth/login",
        payload
      );

    const { token } = response.data;
    const { role } = response.data.user;

    // ذخیره توکن در کوکی
    Cookies.set("token", token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    // همچنین می‌تونیم نقش کاربر رو هم در کوکی یا localStorage ذخیره کنیم
    localStorage.setItem("userRole", role);
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = error as string;
    }
    toast.error("Login failed", {
      duration: 3000,
      description: errorMessage,
    });
    throw error;
  }
};

export const registerUser = async (
  payload: RegisterPayload
) => {
  const res = await axiosInstance.post(
    "/api/auth/register",
    payload
  );
  // const token = res.data?.token;
  // if (token) {
  //   Cookies.set("token", token);
  // }
  console.log(res.data);
  return res.data;
};
export function getUserRole():
  | "admin"
  | "operator"
  | "customer" {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );
  return user?.role || "customer"; // پیش‌فرض مشتری
}
