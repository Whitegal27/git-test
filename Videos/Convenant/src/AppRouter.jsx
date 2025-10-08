import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import OTPGuard from "./pages/OtpGuard";

import { AuthLayout, LoadingPage } from "./components";
import { BankingLayout } from "./components/layout/BankingLayout";

import {
  Dashboard,
  AccountsPage,
  LoginPage,
  AccountDetailsPage,
  OTPPage,
  BranchPage,
  BranchDetailsPage,
  SettingsPage,
  ReportingPage
} from "./pages";
import AuditTrailPage from "./pages/audit/AuditTrailPage";
import UserManagementPage from "./pages/user-management/UserManagementPage";
import RoleManagementPage from "./pages/user-management/RoleManagementPage";
import RoleUserDetailsPage from "./pages/user-management/RoleUserDetailsPage";

export function AppRouter() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingPage message="Initializing application..." />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/otp"
          element={
            <OTPGuard>
              <OTPPage />
            </OTPGuard>
          }
        />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <BankingLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Area-based protected routes */}
          <Route
            path="/accounts"
            element={
              <ProtectedRoute requiredArea="Accounts">
                <AccountsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute requiredArea="Reports">
                <ReportingPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audit"
            element={
              <ProtectedRoute requiredArea="Audit">
                <AuditTrailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/branches"
            element={
              <ProtectedRoute requiredArea="Branches">
                <BranchPage />
              </ProtectedRoute>
            }
          />
          <Route path="/branches/:branchId" element={<BranchDetailsPage />} />
          <Route path="/account-details/:userId" element={<AccountDetailsPage />} />

          <Route
            path="/settings"
            element={
              <ProtectedRoute requiredArea="Settings">
                <SettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/user-management"
            element={
              <ProtectedRoute requiredArea="User Management">
                <UserManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-management/roles"
            element={
              <ProtectedRoute requiredArea="User Management">
                <RoleManagementPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-management/roles-details"
            element={
              <ProtectedRoute requiredArea="User Management">
                <RoleUserDetailsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}