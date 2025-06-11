import { useState } from 'react';

interface DailyTimeSheetProps {
  timesheet: {
    name: string;
    profilePic?: string;
    firstIn: string;
    lastOut: string;
    regular: number;
    overtime: number;
    dailyDoubleOvertime: number;
    tracked: number;
  }[];
}

const DailyTimeSheet = ({ timesheet }: DailyTimeSheetProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = timesheet.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-5">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full border-collapse text-sm shadow-lg">
          <thead className="bg-[#006666] text-white">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-300 bg-[#eff4f5] text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#E6A895]"
                />
              </th>
              <th className="px-6 py-3 text-center">First In</th>
              <th className="px-6 py-3 text-center">Last Out</th>
              <th className="px-6 py-3 text-center">Regular (hr)</th>
              <th className="px-6 py-3 text-center">Overtime (hr)</th>
              <th className="px-6 py-3 text-center">Double OT (hr)</th>
              <th className="px-6 py-3 text-center">Tracked (hr)</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-500">
                  No matching employees found.
                </td>
              </tr>
            ) : (
              timesheet.map((user, index) => (
                <tr
                  key={index}
                  className="bg-[#eff4f5] border-b border-slate-200/50 group cursor-pointer"
                >
                  <td className="px-6 py-4 flex items-center gap-3 border-b border-slate-200/50">
                    <span className="font-medium text-gray-700">{user.name}</span>
                  </td>
                  <td className="px-6 py-4 text-center">{user.firstIn}</td>
                  <td className="px-6 py-4 text-center">{user.lastOut}</td>
                  <td className="px-6 py-4 text-center">{user.regular}</td>
                  <td className="px-6 py-4 text-center text-orange-500">{user.overtime}</td>
                  <td className="px-6 py-4 text-center text-red-500">{user.dailyDoubleOvertime}</td>
                  <td className="px-6 py-4 text-center font-semibold text-green-600">{user.tracked}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyTimeSheet;
