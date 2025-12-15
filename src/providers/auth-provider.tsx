import React, { createContext, useContext, useState, useEffect } from "react";
import type {
  User,
  AuthContextType,
  LoginPayload,
} from "../features/auth/services/types";
import { login as loginApi } from "../features/auth/services/auth-api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 1. Khi F5 trang: Check localStorage để khôi phục user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Lỗi parse user từ storage", error);
        localStorage.removeItem("user");
      }
    }
    setIsLoading(false);
  }, []);

  // 2. Hàm Login
  const login = async (payload: LoginPayload) => {
    // Gọi API thật (hoặc Mock từ file auth-api.ts)
    const userData = await loginApi(payload);

    // Lưu vào State và LocalStorage
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 3. Hàm Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook dùng chung
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth phải được dùng bên trong AuthProvider");
  }
  return context;
};
