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
    (set, get) => ({
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
      get isIn() {
        return get().token;
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
      name: "token", // key ذخیره در localStorage
    }
  )
);
