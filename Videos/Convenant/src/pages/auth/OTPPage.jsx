import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/convenant_logo.png";
import LoginBg from "../../assets/Login.png";
import AuthService from "../../services/authService.js";
import { useToast } from '../../components/ui/use-toast';

export function OTPPage() {
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast(); // ✅ useToast hook

  const handleOTPComplete = async (value) => {
    if (value.length === 6) {
      setIsLoading(true);
  
      try {
        const otpAllowed = sessionStorage.getItem("otpAllowed");
        if (otpAllowed !== "true") {
          toast({
            title: "Session Expired",
            description: "Please login again.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }
  
        const username = localStorage.getItem("pendingUser");
        if (!username) {
          toast({
            title: "Session Expired",
            description: "Please login again.",
            variant: "destructive",
          });
          navigate("/");
          return;
        }
  
        const payload = { username, otp: value };
        const result = await AuthService.verifyOtp(payload);
  
        if (result.success && result.data?.accessToken) {
          localStorage.setItem("token", result.data.accessToken);
          localStorage.setItem("refreshToken", result.data.refreshToken);
          localStorage.setItem("expiresIn", result.data.expiresIn);
          localStorage.setItem("loginTime", Date.now());
          localStorage.setItem("loginResponse", JSON.stringify(result.data.user));
  
          // Clear temporary OTP flag
          sessionStorage.removeItem("otpAllowed");
  
          toast({
            title: "OTP Verified",
            description: "You have successfully logged in.",
            variant: "default",
          });
  
          navigate("/dashboard");
        } else {
          toast({
            title: "OTP Failed",
            description: result.message || "OTP verification failed",
            variant: "destructive",
          });
        }
      } catch (err) {
        toast({
          title: "Error",
          description: err.response?.data?.message || "An error occurred",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResendOTP = () => {
    // Call resend API if available
    toast({
      title: "OTP Sent",
      description: "A new OTP has been sent to your email.",
      variant: "default",
    });
    console.log('Resending OTP...');
  };

  return (
    <div
      className="h-screen w-full fixed inset-0 bg-no-repeat bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="relative z-10 w-full max-w-md flex flex-col justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          <div className="flex flex-start">
            <img src={Logo} alt="convenant mfb logo" className="w-[160px] h-[74px]" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
            <p className="text-gray-600">
              Enter OTP sent to your email
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => {
                  const numericValue = value.replace(/\D/g, "");
                  setOtp(numericValue);

                  if (numericValue.length === 6) {
                    handleOTPComplete(numericValue);
                  }
                }}
                disabled={isLoading}
              >
                <InputOTPGroup className="gap-3">
                  {Array.from({ length: 6 }).map((_, index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      onKeyDown={(e) => {
                        if (!/[0-9]/.test(e.key) && e.key !== "Backspace" && e.key !== "Tab") {
                          e.preventDefault();
                        }
                      }}
                      className="w-12 h-12 text-lg font-semibold border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {isLoading && (
              <div className="flex justify-center">
                <div className="flex items-center gap-2 text-green-600">
                  <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm">Verifying...</span>
                </div>
              </div>
            )}

            <div>
              <p className="text-gray-600 text-sm">
                Didn't get a code?{" "}
                <button
                  onClick={handleResendOTP}
                  className="text-green-600 hover:text-green-700 font-medium hover:underline"
                  disabled={isLoading}
                >
                  Click to resend
                </button>
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 w-full text-center mt-8">
          <p className="text-xs text-gray-500">
            Copyright © 2025 Covenant Microfinance Bank Ltd.
          </p>
        </div>
      </div>
    </div>
  );
}