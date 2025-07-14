// lib/authService.ts
"use client";
import axiosInstance from "../axios/axiosInstance";
import Cookies from "js-cookie";
import { UserResponse } from "../types/user";
interface LoginPayload {
  email: string;
  password: string;
}
interface LoginResponse {
  token: string;
  userId: string;
  role: "ADMIN" | "OPERATOR" | "CUSTOMER";
  preferredLanguage: string;
}

interface RegisterPayload {
  fullname: string;
  email: string;
  password: string;
}
interface RegisterResponse {
  success: boolean;
  message: string;
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

    const { token, userId } = response.data;

    // ذخیره توکن در کوکی
    Cookies.set("token", token, {
      expires: 7,
      secure: true,
      sameSite: "strict",
    });
    // همچنین می‌تونیم نقش کاربر رو هم در کوکی یا localStorage ذخیره کنیم
    //localStorage.setItem("userRole", role);
    localStorage.setItem("userId", userId);
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = error as string;
    }
    console.log("Auth--Error logging in:", errorMessage);
    /*toast.error("Login failed", {
      duration: 3000,
      description: errorMessage,
    });*/
    throw error;
  }
};

export const registerUser = async (
  payload: RegisterPayload
): Promise<RegisterResponse | null> => {
  try {
    const res = await axiosInstance.post(
      "/api/auth/register",
      payload
    );
    //console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("Failed to get user info :" + err);
    return null;
  }
};
export const getUserInfo = async (
  userId: string
): Promise<UserResponse | null> => {
  try {
    const res = await axiosInstance.get(
      `/api/auth/${userId}`
    );
    return res.data;
  } catch {
    return null;
  }
};
export const updateLanguage = async (lang: "en" | "zh") => {
  const res = await axiosInstance.post(
    "/api/auth/language",
    { language: lang }
  );
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
