type DashboardCardProps = {
  title: string;
  value: number;
  icon: React.ReactNode;
  per: number;
  perColor: string;
  borderColor: string;
  backgroundColor: string;
};

export const CardForProcessBar: React.FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  per,
  perColor,
  backgroundColor,
}) => {
  return (
    <div className="rounded-xl shadow-md p-2 w-full  bg-white max-w-[140px] h-[80px] flex flex-col justify-between">
      {/* Top Section: Icon + Title + Value */}
      <div className=" ">
        {/* Icon */}
        <div className="flex items-center justify-between  pl-2 pr-3">
          <div
            className="w-5 h-5 rounded-md flex  text-white text-xl"
            style={{ backgroundColor }}
          >
            {icon}
          </div>
          <div className=" ">
            <p className="text-xs text-[#006666]">{title}</p>
          </div>
        </div>

        {/* Title and Value */}
        <div className="ml-2 flex-1 items-center justify-center">
          <h3 className="text-lg font-semibold text-[#019191]">{value}</h3>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full ">
        <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${per}%`, backgroundColor: perColor }}
          ></div>
        </div>
        {/* <div className="text-right text-xs font-semibold mt-1" style={{ color: perColor }}>
          {per}%
        </div> */}
      </div>
    </div>
  );
};
