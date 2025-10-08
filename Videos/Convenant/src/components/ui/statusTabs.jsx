import React, { useState } from "react";
import { cn } from "@/lib/utils";

export function StatusTabs({ tabs, defaultTab = 0, onChange }) {
  const [activeIndex, setActiveIndex] = useState(defaultTab);

  const handleClick = (index) => {
    setActiveIndex(index);
    onChange?.(tabs[index].value);
  };

  return (
    <div className="flex gap-2">
      {tabs.map((tab, index) => {
        const isActive = activeIndex === index;

        // ✅ Always green if active, always gray if inactive
        const btnClasses = isActive
          ? "bg-green-700 text-white"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200";

        const badgeClasses = isActive
          ? "bg-white text-green-700"
          : "bg-gray-300 text-gray-800";

        return (
          <button
            key={tab.value}
            onClick={() => handleClick(index)}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              btnClasses
            )}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={cn(
                  "text-xs font-semibold rounded-full px-2 py-0.5",
                  badgeClasses
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
