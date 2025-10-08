/* eslint-disable react-refresh/only-export-components */

"use client";

import * as React from "react";
import { Toaster, toast as shadcnToast } from "sonner"; // using Sonner for Shadcn toast

// Hook
export const useToast = () => {
  return React.useCallback(
    ({ title, description, variant = "default" }) => {
      shadcnToast(title, {
        description,
        variant,
      });
    },
    []
  );
};

// Toast Provider component
export const ToastProvider = ({ children }) => {
  return (
    <>
      {children}
      <Toaster richColors position="top-right" />
    </>
  );
};
