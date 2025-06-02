import React from "react";

type AvatarProps = {
  initials?: string;
};

const Avatar: React.FC<AvatarProps> = ({ initials = "HR" }) => {
  return (
    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold text-white">
      {initials}
    </div>
  );
};

export default Avatar;