
import { useEffect, useState } from "react";
import { FONTS } from "../../constants/uiConstants";
import { getClockin } from '../../features/timesheet/services';

interface DailyTimeSheetEntry {
  profilePic?: string;
  clockIn: string;
  clockOut: string;
  regularHours: number;
  overtimeHours: number;
  dailyDoubleOvertime: number;
  totalHours: number;
}

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const WeeklyTimeSheet = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeEntries, setTimeEntries] = useState<DailyTimeSheetEntry[]>([]);

  const fetchTimesheet = async () => {
    try {
      const filters = {
        employeeId: "68468e814eacfb4787b749cd",
        startDate: "2025-06-01",
        endDate: "2025-06-30",
      };

      const response = await getClockin(filters);
      console.log("Filtered timesheet data", response);
      setTimeEntries(response);
    } catch (error) {
      console.log("Error fetching timesheet data:", error);
    }
  };

  useEffect(() => {
    fetchTimesheet();
  }, []);

  const filteredEntries = timeEntries.filter((_, index) =>
    `employee ${index + 1}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-5">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full border-collapse text-sm shadow-lg">
          <thead className="bg-[#5e59a9]/70 backdrop-blur-sm text-white">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#eff4f5] !text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#E6A895]"
                  style={{ ...FONTS.paragraph }}
                />
              </th>
              {daysOfWeek.map((day) => (
                <th key={day} className="px-2 py-2 text-center !font-semibold" style={{ ...FONTS.paragraph }}>
                  {day}
                </th>
              ))}
              <th className="px-6 py-3 text-center" style={{ ...FONTS.cardSubHeader }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan={daysOfWeek.length + 2} className="!text-center !bg-[#eff4f5] py-6 !text-black" style={{ ...FONTS.tableBody }}>
                  No timesheet found.
                </td>
              </tr>
            ) : (
              filteredEntries.map((entry, index) => (
                <tr
                  key={index}
                  className="bg-[#eff4f5] border-b border-slate-200/50 group cursor-pointer"
                  style={{ ...FONTS.tableBody }}
                >
                  <td className="px-2 py-4 flex items-center ">
                    <span className="!font-medium !text-gray-700" style={{ ...FONTS.cardSubHeader }}>
                      Employee {index + 1}
                    </span>
                  </td>

                  {daysOfWeek.map(( i) => (
                    <td key={i} className="py-2 text-center">
                    <div className="flex flex-col items-center text-sm">
                      <span className="text-gray-500">
                        {new Date(entry.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span>-</span>
                      <span className="text-gray-900">
                        {new Date(entry.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </td>
                  
                  ))}

                  <td className="px-6 py-4 text-center !font-semibold !text-green-600" style={{ ...FONTS.tableBody }}>
                    {entry.totalHours} hr
                  </td>
                  
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyTimeSheet;
