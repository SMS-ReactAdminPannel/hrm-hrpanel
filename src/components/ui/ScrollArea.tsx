import React from "react";

type ScrollAreaProps = {
  children: React.ReactNode;
};

const ScrollArea: React.FC<ScrollAreaProps> = ({ children }) => {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[800px]">{children}</div>
    </div>
  );
};

export default ScrollArea;