import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return React.createElement(Navigate, { to: "/login", replace: true });
  }

  return React.createElement(React.Fragment, null, children);
};

export default ProtectedRoute;
