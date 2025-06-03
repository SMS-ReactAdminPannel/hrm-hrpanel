import React from "react";

type TabsListProps = {
  children: React.ReactNode;
};

const TabsList: React.FC<TabsListProps> = ({ children }) => {
  return (
    <div className="flex space-x-2 border-b">{children}</div>
  );
};

export default TabsList;