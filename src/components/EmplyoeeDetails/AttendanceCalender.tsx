import React from "react";

// Props interface: take year, month, and the array of present days
interface AttendanceCalendarProps {
  year: number;
  month: number;
  attendanceDays: number[] 
}

// Weekday labels
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const generateWeeksInMonth = (year: number, month: number) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayIndex = new Date(year, month - 1, 1).getDay(); // 0 = Sun ... 6 = Sat
  const weeks: ( { day: number; weekday: string } | null )[][] = [];
  let currentWeek: ( { day: number; weekday: string } | null )[] = [];

  // Fill initial nulls for days before the 1st
  for (let i = 0; i < firstDayIndex; i++) {
    currentWeek.push(null);
  }

  // Fill days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const weekday = weekdays[date.getDay()];
    currentWeek.push({ day, weekday });

    // When reach end of week or end of month, push and reset
    if (currentWeek.length === 7 || day === daysInMonth) {
      // pad with nulls if end of month but week not complete
      while (currentWeek.length < 7) {
        currentWeek.push(null);
      }
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }

  return weeks;
};


export const AttendanceCalendar: React.FC<AttendanceCalendarProps> = ({
  year,
  month,
  attendanceDays,
}) => {
  // Generate weeks for this month/year
  const weeks = generateWeeksInMonth(year, month);
  const daysInMonth = new Date(year, month, 0).getDate();
  const sundayCount = weeks.reduce((count, week) => {

    return count + week.filter(cell => cell && cell.weekday === "Sun").length;
  }, 0);
  const presentCount = attendanceDays.length;
  const absentCount = daysInMonth - sundayCount - presentCount;


   return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {weekdays.map((weekday) => (
              <th
                key={weekday}
                className={`border px-4 py-3 text-center text-sm font-medium ${
                  weekday === "Sun"
                    ? "bg-red-50 text-red-800"
                    : "bg-[#5e59a9]/60 text-white"
                }`}
              >
                {weekday}
              </th>
            ))}
          </tr>
        </thead>

                  <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((dayData, dayIndex) => {
                // If null cell (before 1st or after last day)
                if (!dayData) {
                  return (
                    <td
                      key={dayIndex}
                      className="border border-gray-200 px-4 py-3 bg-gray-50"
                    ></td>
                  );
                }

                const { day, weekday } = dayData;
                const isSunday = weekday === "Sun";
                const isPresent = attendanceDays.includes(day);

                // Tooltip data: if you need to customize per-day, parent could pass a map instead.
                // Here we use static times as in your example:
                const tooltipData = {
                  firstIn: "09:00 AM",
                  lastOut: "06:00 PM",
                  required: "8h",
                };

                return (
                  <td
                    key={dayIndex}
                    className={`relative group text-center px-4 py-3 border border-gray-200 ${
                      isSunday ? "bg-red-50" : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <span
                        className={`text-sm font-medium ${
                          isSunday ? "text-red-800" : ""
                        }`}
                      >
                        {day}
                      </span>

                      {isSunday ? (
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-800 font-semibold text-sm">
                          R
                        </span>
                      ) : (
                        <span
                          className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${
                            isPresent
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          } font-semibold text-sm`}
                        >
                          {isPresent ? "P" : "A"}
                        </span>
                      )}

                           {/* Tooltip (only for non-Sundays) */}
                      {!isSunday && (
                        <div className="absolute z-40 hidden group-hover:block bg-white border border-gray-200 shadow-lg p-3 rounded-lg text-xs text-left w-48 top-full mt-2 left-1/2 transform -translate-x-1/2">
                          <div className="flex justify-between items-center mb-2 pb-1 border-b border-gray-100">
                            <p className="font-semibold">
                              {/* You can compute month name dynamically if desired */}
                              {new Date(year, month - 1, day).toLocaleString("en-US", {
                                month: "long",
                              })}{" "}
                              {day}, {year}
                            </p>
                            <span
                              className={`px-1.5 py-0.5 rounded text-xs font-medium ${
                                isPresent
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {isPresent ? "Present" : "Absent"}
                            </span>
                          </div>

                          {isPresent ? (
                            <>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <p className="text-gray-500">First In</p>
                                  <p className="font-medium">{tooltipData.firstIn}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Last Out</p>
                                  <p className="font-medium">{tooltipData.lastOut}</p>
                                </div>
                              </div>
                              <div className="mt-2">
                                <p className="text-gray-500">Duration</p>
                                <p className="font-medium">{tooltipData.required}</p>
                              </div>
                            </>
                          ) : (
                            <p className="text-gray-600">No attendance record for this day.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default AttendanceCalendar;
