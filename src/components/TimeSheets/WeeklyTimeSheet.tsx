import { useState } from "react";
// import { FONTS } from "../../constants/uiConstants";

interface TimeEntry {
  day: string;
  hoursWorked: number;
  isHoliday: boolean;
  firstIn: string;
  lastOut: string;
  requiredHours: number;
}

interface WeeklyTimeSheetProps {
  timesheet: {
    name: string;
    profilePic?: string;
    timeEntries: TimeEntry[];
  }[];
}

const WeeklyTimeSheet = ({ timesheet }: WeeklyTimeSheetProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  // const filteredUsers = timesheet.filter((user) =>
  //   user.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return (
    <div className="py-5">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full border-collapse text-sm shadow-lg">
          <thead className="bg-[#006666] text-white">
            <tr>
              <th className="p-3 text-left">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#eff4f5] text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#E6A895]"
                />
              </th>
              {daysOfWeek.map((day) => (
                <th key={day} className="px-6 py-3 text-center">
                  {day}
                </th>
              ))}
              <th className="px-6 py-3 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {timesheet.length === 0 ? (
              <tr>
                <td
                  colSpan={daysOfWeek.length + 2}
                  className="text-center bg-[#eff4f5] py-6 text-black"
                >
                  No timesheet found.
                </td>
              </tr>
            ) : (
              timesheet.map((user) => {
                const totalHours = user.timeEntries.reduce(
                  (sum, entry) => sum + entry.hoursWorked,
                  0
                );
                return (
                  <tr
                    key={user.name}
                    className="bg-[#eff4f5] border-b border-slate-200/50 group cursor-pointer"
                  >
                    <td className="px-6 py-4 flex items-center gap-3">
                      <span className="font-medium text-gray-700">
                        {user.name}
                      </span>
                    </td>
                    {user.timeEntries.map((entry) => (
                      <td
                        key={entry.day}
                        className={`px-6 py-4 text-center ${
                          entry.isHoliday ? "text-red-500 font-semibold" : ""
                        }`}
                      >
                        <span
                          title={
                            entry.isHoliday
                              ? "Holiday"
                              : `First In: ${entry.firstIn}\nLast Out: ${entry.lastOut}\nRequired: ${entry.requiredHours} hr`
                          }
                        >
                          {entry.isHoliday ? "Holiday" : `${entry.hoursWorked} hr`}
                        </span>
                      </td>
                    ))}
                    <td className="px-6 py-4 text-center font-semibold text-green-600">
                      {totalHours} hr
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WeeklyTimeSheet;
