import React from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { AuthProvider } from "../providers/auth-provider"; // Context của bạn

// Tạo client ở đây
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 10 * 1000,
      retry: 1,
    },
  },
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={{ token: { colorPrimary: "#1677ff" } }}>
        <BrowserRouter>
          {/* AuthProvider nằm TRONG Router để dùng được navigate() */}
          <AuthProvider>{children}</AuthProvider>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
};
