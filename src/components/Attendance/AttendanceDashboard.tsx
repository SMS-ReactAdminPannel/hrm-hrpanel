import { IoIosPeople } from "react-icons/io";
import { MdTimer, MdManageHistory } from "react-icons/md";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface AttendanceDashboardProps {
  employeeCount: number;
  totalDuration: string;
  permissionCount: number;
  onPermissionClick: () => void;
  presentCount: number;
  absentCount: number;
  chartData: { name: string; value: number }[];
  chartColors: string[];
}

export const AttendanceDashboard: React.FC<AttendanceDashboardProps> = ({
  employeeCount,
  totalDuration,
  permissionCount,
  onPermissionClick,
  presentCount,
  absentCount,
  chartData,
  chartColors,
}) => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Employees */}
      <Card
        title="No. of Employees"
        value={employeeCount}
        Icon={<IoIosPeople className="w-10 h-10" />}
      />

      {/* Duration */}
      <Card
        title="Total Duration"
        value={totalDuration}
        Icon={<MdTimer className="w-10 h-10" />}
      />

      {/* Permission */}
      <Card
        title="Permission"
        value={permissionCount}
        Icon={<MdManageHistory className="w-10 h-10" />}
        onClick={onPermissionClick}
      />

      {/* Attendance */}
      <div className="bg-[#eff4f5] rounded-lg p-6 border-gray-100 transition-all duration-200 flex items-center justify-between h-32 hover:shadow-lg">
        <div>
          <p className="text-gray-500 font-medium mb-2 font-family-poppins">Attendance</p>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#5e59a9]/90"></div>
            <p className="text-sm">Present: {presentCount}</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-3 h-3 rounded-full bg-[#5e59a9]/50"></div>
            <p className="text-sm">Absent: {absentCount}</p>
          </div>
        </div>

        <PieChart width={120} height={120}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={30}
            outerRadius={50}
            paddingAngle={3}
            dataKey="value"
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

const Card = ({
  title,
  value,
  Icon,
  onClick,
}: {
  title: string;
  value: string | number;
  Icon: JSX.Element;
  onClick?: () => void;
}) => (
  <div
    className="bg-[#eff4f5] rounded-lg p-6 flex justify-between h-32 hover:shadow-lg transition-all duration-200 cursor-pointer"
    onClick={onClick}
  >
    <div>
      <p className="text-gray-500 font-medium mb-2 font-family-poppins">{title}</p>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
    <div className="text-[#5e59a9]/40">{Icon}</div>
  </div>
);
