import { useEffect, useRef } from "react";
import { useAuth } from "../providers/auth-provider";
import type { UserRole } from "../features/auth/services/types";
import { Navigate, Outlet } from "react-router-dom";
import { message, Spin } from "antd";

export interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  allowedRoles,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const messageShown = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !messageShown.current && !isLoading) {
      message.warning("Vui lòng đăng nhập để truy cập trang này.");
      messageShown.current = true;
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return <Outlet />;
};
