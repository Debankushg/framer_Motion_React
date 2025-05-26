import React from "react";
import { Navigate } from "react-router-dom";
import IdleTimerComponent from "./IdleTimeOut";

const ProtectedRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <IdleTimerComponent>{children}</IdleTimerComponent>;
};

export default ProtectedRoute;
