import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Role } from "../types/types";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRole?: Role;
  redirectTo?: string;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRole,
  redirectTo = "/role-select",
}) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRole && role !== allowedRole && role !== "admin") {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
