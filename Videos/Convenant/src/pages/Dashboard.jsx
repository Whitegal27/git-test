import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { accountStats } from "@/data/dashboardData";
import AuthService from "../services/authService";

export function Dashboard() {
  const [user, setUser] = useState(null);

  // Fetch user info on component mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userInfo = await AuthService.getUserInfo();
        console.log(userInfo.data);
        setUser(userInfo.data);
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Overview of all accounts {user ? `- Welcome, ${user.fullName}` : ""}
        </p>
      </div>

      {/* Account Statistics Cards */}
      <div className="flex flex-wrap -mx-2 items-stretch">
        {accountStats.map((account, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4 flex">
            <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-md pb-4 flex flex-col h-full w-full">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {account.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="flex items-center gap-4 mb-4">
                  <CardDescription className="text-xs text-gray-500 font-medium">
                    {account.totalLabel}
                  </CardDescription>
                  <div className="text-2xl font-bold text-gray-900">
                    {account.total}
                  </div>
                </div>

                <div className="grid grid-cols-3">
                  {account.stats.map((stat, statIndex) => {
                    const getBackgroundColor = (label) => {
                      switch (label.toLowerCase()) {
                        case "active":
                          return "bg-[#EFFBF2]";
                        case "inactive":
                          return "bg-[#FEF5F0]";
                        case "suspended":
                          return "bg-[#FFEBEB]";
                        default:
                          return "bg-gray-50";
                      }
                    };

                    return (
                      <div
                        key={statIndex}
                        className={`text-left px-2 py-2 ${getBackgroundColor(
                          stat.label
                        )}`}
                      >
                        <div className="text-gray-500 font-medium text-sm leading-5 text-[#2d3657]">
                          {stat.label}
                        </div>
                        <div className="text-sm font-bold text-[18px] leading-[30px] align-middle">
                          {stat.value}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}