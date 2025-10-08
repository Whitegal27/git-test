import React, { useState } from "react";
import { cn } from "@/lib/utils";

function Tabs({ children, defaultTab = 0, className }) {
  const [activeIndex, setActiveIndex] = useState(defaultTab);
  const tabs = React.Children.toArray(children);

  return (
    <div className={cn("w-full", className)}>
      {/* Tab headers */}
      <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-20 py-1.5 text-sm font-medium transition-all",
              activeIndex === index
                ? "bg-background text-foreground shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.props.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-2">{tabs[activeIndex]}</div>
    </div>
  );
}

function Tab({ children }) {
  return <div className="ring-offset-background">{children}</div>;
}

Tabs.Tab = Tab;
export { Tabs };