import React from "react";
import { Navigate } from "react-router-dom";
import AccessDeniedPage from "./AccessDeniedPage"; // ✅ import Access Denied page

const ProtectedRoute = ({ children, requiredArea }) => {
  const token = localStorage.getItem("token");
  const userData = JSON.parse(localStorage.getItem("loginResponse")); // user data
  

  // 1️⃣ If no token → redirect to login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 2️⃣ If route requires area-based access
  if (requiredArea && userData) {
    const hasAccess = userData.roles?.some((role) =>
      role.areas?.some(
        (area) =>
          area.name?.toLowerCase() === requiredArea.toLowerCase() &&
          area.permissions?.some(
            (perm) => perm.name?.toLowerCase() === "view"
          )
      )
    );

    // 3️⃣ If user doesn’t have access → show Access Denied page
    if (!hasAccess) {
      return <AccessDeniedPage />;
    }
  }

  // 4️⃣ Otherwise → render the protected page
  return children;
};

export default ProtectedRoute;