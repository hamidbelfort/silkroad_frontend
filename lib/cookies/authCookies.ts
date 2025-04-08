import Cookies from "js-cookie";

// نام کلید توکن در کوکی
const TOKEN_KEY = "token";

// ذخیره توکن در کوکی
export const setToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7, // 7 روز بمونه
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
};

// گرفتن توکن از کوکی
export const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

// حذف توکن از کوکی
export const removeToken = () => {
  Cookies.remove(TOKEN_KEY, { path: "/" });
};
