import { create } from "zustand";
import { persist } from "zustand/middleware";
interface User {
  userId: string;
  role: "admin" | "operator" | "customer";
}

interface AuthState {
  token: string;
  userId: string;
  role: "admin" | "operator" | "customer" | "";
  isLoggedIn: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: "",
      userId: "",
      role: "",
      isLoggedIn: false,
      setAuth: (user: User, token: string) => {
        set({
          token,
          userId: user.userId,
          role: user.role,
          isLoggedIn: true,
        });
      },
      logout: () => {
        set({
          token: "",
          userId: "",
          role: "",
          isLoggedIn: false,
        });
      },
    }),
    {
      name: "auth-token", // key ذخیره در localStorage
    }
  )
);
