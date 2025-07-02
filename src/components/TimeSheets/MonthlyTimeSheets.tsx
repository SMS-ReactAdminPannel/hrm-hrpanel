import { useState } from 'react';
import { FONTS } from '../../constants/uiConstants';


interface MonthlyEntry {
  day: number;
  firstIn: string;
  lastOut: string;
  regular: number;
  overtime: number;
  dailyDoubleOvertime: number;
  tracked: number;
}

interface MonthlyUserData {
  name: string;
  profilePic?: string;
  daysData: MonthlyEntry[];
}

interface MonthlyTimeSheetsProps {
  timesheet: MonthlyUserData[];
}

const MonthlyTimeSheets = ({ timesheet }: MonthlyTimeSheetsProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const getWeekday = (year: number, month: number, day: number) => {
    const date = new Date(year, month, day);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const day = i + 1;
    return {
      day,
      weekday: getWeekday(currentYear, currentMonth, day),
    };
  });

  // const filteredUsers = timesheet.filter(user =>
  //   user.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="py-5 overflow-x-auto" style={{ fontFamily: FONTS.paragraph.fontFamily }}>
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full border-collapse text-sm shadow-lg">
          <thead className="!bg-[#6f70ce] !text-white" style={{...FONTS.tableHeader}}>
            <tr>
              <th className="sticky left-0 !bg-[#6f70ce] px-4 py-3 text-left min-w-[200px] border-r border-[#6f70ce]" style={{...FONTS.paragraph}}>
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-300 text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#E6A895]"
                />
              </th>
              {days.map(({ day, weekday }) => (
                <th key={day} className="px-3 !font-semibold !text-center" style={{...FONTS.tableHeader}}>
                  {day} <br /><span className='!text-gray-700 !text-[10px]' style={{...FONTS.description}}>{weekday}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="overflow-y-hidden">
            {timesheet.length === 0 ? (
              <tr>
                <td colSpan={daysInMonth + 1} className="text-center py-6 bg-white !text-gray-500" style={{...FONTS.tableBody}}>
                  No matching timesheet found.
                </td>
              </tr>
            ) : (
              timesheet.map((user, index) => (
                <tr
                  key={`${user.name}-${index}`}
                  className="bg-[#eff4f5] border-b border-slate-200/50 cursor-pointer"
                >
                  <td className="px-6 py-3 flex items-center sticky left-0 !bg-white z-10 gap-3 border-r">
                    <span className="!font-medium !text-gray-700" style={{...FONTS.paragraph}}>{user.name}</span>
                  </td>
                  {days.map(({ day, weekday }) => {
                    const isSunday = weekday === 'Sun';
                    const entry = user.daysData.find(d => d.day === day);

                    return (
                      <td
                        key={day}
                        className="relative group text-center px-2 py-3 whitespace-nowrap"
                        style={{...FONTS.tableBody}}
                      >
                        {isSunday ? (
                          <span className="!text-red-500 !font-semibold" style={{...FONTS.paragraph}}>R</span>
                        ) : entry ? (
                          <div className="relative flex justify-center">
                            <div className="w-4 h-4 rounded bg-green-300" />
                            <div className="absolute bottom-full mb-2 hidden group-hover:flex bg-white border border-gray-300 shadow-md p-2 rounded-md text-xs text-left w-40 z-50" style={{...FONTS.paragraph}}>
                              <div>
                                <p><strong>First In:</strong> {entry.firstIn}</p>
                                <p><strong>Last Out:</strong> {entry.lastOut}</p>
                                <p><strong>Regular:</strong> {entry.regular}h</p>
                                <p><strong>OT:</strong> {entry.overtime}h</p>
                                <p><strong>Double OT:</strong> {entry.dailyDoubleOvertime}h</p>
                                <p><strong>Tracked:</strong> {entry.tracked}h</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="w-4 h-4 rounded bg-red-400" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyTimeSheets;
