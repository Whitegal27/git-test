import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/convenant_logo.png";
import LoginBg from "../../assets/Login.png";
import AuthService from "../../services/authService.js";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "../../components/ui/use-toast";

export function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast(); // 👈 FIX: don't destructure

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!formData.username || !formData.password) {
      toast({
        title: "Validation Error",
        description: "Username and password are required",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      console.log(formData);
      const result = await AuthService.login(formData);
      console.log(result);

      if (result?.success && result?.data?.requiresOtp) {
        
        localStorage.setItem("pendingUser", formData.username);
        sessionStorage.setItem("otpAllowed", "true");
        // sessionStorage.setItem("loginSession", JSON.stringify({ username: formData.username }));
        toast({
          title: "OTP Required",
          description: "Please check your email for the OTP code",
          variant: "default",
        });

        navigate("/otp", { state: { email: formData.username } });
      } else {
        toast({
          title: "Login Error",
          description: "Unexpected login response",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Login Failed",
        description: err.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast({
      title: "Forgot Password",
      description: "Forgot password flow not implemented yet",
      variant: "default",
    });
  };

  return (
    <div
      className="h-screen w-full fixed inset-0 bg-no-repeat bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBg})` }}
    >
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-opacity-50">
        <div className="flex-grow flex items-center justify-center w-full">
          <Card className="w-full max-w-md mx-auto">
            <CardHeader>
              <div className="flex justify-start">
                <img
                  src={Logo}
                  alt="covenant mfb logo"
                  className="w-[160px] h-[74px]"
                />
              </div>
              <CardDescription className="text-[#121212] font-bold text-2xl leading-[38px]">
                Log in to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter your email"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="w-full h-14 bg-[#F4F4F5] border-0 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] py-3 px-4 placeholder:text-[#71717A]"
                  />
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      disabled={isLoading}
                      className="w-full h-14 bg-[#F4F4F5] border-0 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] py-3 px-4 pr-12 placeholder:text-[#71717A]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Forgot password */}
                <div>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="font-bold text-base leading-6 text-[#007046] hover:underline"
                  >
                    Forgot your password?
                  </button>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full h-14 bg-[#007046] py-2 px-8 gap-2 hover:bg-[#005a37] transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-auto pb-4">
          <p className="text-xs text-gray-500">
            Copyright © 2025 Covenant Microfinance Bank Ltd.
          </p>
        </div>
      </div>
    </div>
  );
}