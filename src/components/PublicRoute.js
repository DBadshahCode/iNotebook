import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  // If logged in, redirect away from public pages (login/signup) to home
  return token ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
