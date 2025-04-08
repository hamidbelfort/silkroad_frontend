import axiosInstance from "../axios/axiosInstance";

type LoginData = { email: string; password: string };
type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export const loginUser = (data: LoginData) =>
  axiosInstance.post("/auth/login", data);
export const registerUser = (data: RegisterData) =>
  axiosInstance.post("/auth/register", data);
