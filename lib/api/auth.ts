// lib/authService.ts
import axiosInstance from "../axios/axiosInstance";
import Cookies from "js-cookie";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (payload: LoginPayload) => {
  const res = await axiosInstance.post("/auth/login", payload);
  const token = res.data?.token;
  if (token) {
    Cookies.set("token", token);
  }
  return res.data;
};

export const registerUser = async (payload: RegisterPayload) => {
  const res = await axiosInstance.post("/auth/register", payload);
  const token = res.data?.token;
  if (token) {
    Cookies.set("token", token);
  }
  console.log(res.data);
  return res.data;
};
