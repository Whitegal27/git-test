import React from 'react';
// import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { accountStats } from '@/data/dashboardData';

export function BranchOverviewPage() {
  
  return (
    <div className="space-y-8">
      {/* Account Statistics Cards */}
      <div className="flex flex-wrap -mx-2">
        {accountStats.map((account, index) => (
          <div key={index} className="w-full sm:w-1/2 md:w-1/3 px-2 mb-4">
            <Card
              className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-52 rounded-md pb-4"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {account.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
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