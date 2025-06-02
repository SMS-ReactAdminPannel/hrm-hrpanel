import React from "react";

type TabsTriggerProps = {
  value: string;
  isActive: boolean;
  onClick: (value: string) => void;
  children: React.ReactNode;
};

const TabsTrigger: React.FC<TabsTriggerProps> = ({ value, isActive, onClick, children }) => {
  return (
    <button
      onClick={() => onClick(value)}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
        isActive
          ? "border-blue-600 text-blue-600"
          : "border-transparent text-gray-600 hover:text-black hover:border-gray-300"
      }`}
    >
      {children}
    </button>
  );
};

export default TabsTrigger;