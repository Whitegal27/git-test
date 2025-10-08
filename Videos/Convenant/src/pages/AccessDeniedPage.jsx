import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AccessDeniedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full text-center bg-white p-10 rounded-2xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">
          Access Denied
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          You do not have permission to view this page.
        </p>
        <Button
          onClick={() => navigate("/dashboard")}
          className="bg-[#007046] text-white hover:bg-[#005f3a] px-6 py-3 rounded-lg text-base font-medium"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default AccessDeniedPage;