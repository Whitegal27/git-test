import React from "react";
import { Navigate } from "react-router-dom";

const OTPGuard = ({ children }) => {
  const otpAllowed = sessionStorage.getItem("otpAllowed");

  if (otpAllowed !== "true") {
    // Redirect to login if user tries to access /otp directly
    return <Navigate to="/" replace />;
  }

  return children;
};

export default OTPGuard;
