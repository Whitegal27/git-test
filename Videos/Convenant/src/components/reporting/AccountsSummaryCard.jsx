import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const AccountsSummaryCard = ({ title, totalAccounts, statusData, totalLabel = "Total Number Of Accounts" }) => {
  const getBackgroundColor = (label) => {
    switch (label.toLowerCase()) {
      case "active":
      case "approved":
        return "bg-[#EFFBF2]";
      case "inactive":
      case "pending":
        return "bg-[#FEF5F0]";
      case "suspended":
      case "declined":
        return "bg-[#FFEBEB]";
      default:
        return "bg-gray-50";
    }
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow h-52 rounded-md pb-4">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-4">
          <CardDescription className="text-xs text-gray-500 font-medium">
            {totalLabel}
          </CardDescription>
          <div className="text-2xl font-bold text-gray-900">
            {totalAccounts.toLocaleString()}
          </div>
        </div>

        <div className="grid grid-cols-3">
          {statusData.map((stat, statIndex) => (
            <div
              key={statIndex}
              className={`text-left px-2 py-2 ${getBackgroundColor(stat.label)}`}
            >
              <div className="text-gray-500 font-medium text-sm leading-5 text-[#2d3657]">
                {stat.label}
              </div>
              <div className="text-sm font-bold text-[18px] leading-[30px] align-middle">
                {stat.count.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountsSummaryCard;