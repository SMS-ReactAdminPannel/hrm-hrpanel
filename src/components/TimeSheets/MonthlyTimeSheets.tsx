import { useState } from 'react';
import { FONTS } from '../../constants/uiConstants';

const MonthlyTimeSheets = () => {
    const getWeekday = (year: any, month: any, day: any) => {
        const date = new Date(year, month, day);
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    };

    const [searchTerm, setSearchTerm] = useState('');

    const usersData = [
        {
            name: 'John Doe',
            profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
            daysPresent: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15],
        },
        {
            name: 'Jane Smith',
            profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
            daysPresent: [1, 2, 3, 5, 6, 8, 9, 10, 14, 15, 16, 17, 30],
        },
        {
            name: 'Alex Johnson',
            profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
            daysPresent: [1, 2, 3, 4, 5, 8, 10, 12, 13, 14, 15, 16, 17],
        },
        {
            name: 'John Doe',
            profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
            daysPresent: [1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 15],
        },
        {
            name: 'Jane Smith',
            profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
            daysPresent: [1, 2, 3, 5, 6, 8, 9, 10, 14, 15, 16, 17, 30],
        },
        {
            name: 'Alex Johnson',
            profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
            daysPresent: [1, 2, 3, 4, 5, 8, 10, 12, 13, 14, 15, 16, 17],
        },
    ];

    const filteredUsers = usersData.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const daysInMonth = 31;

    const days = Array.from({ length: daysInMonth }, (_, i) => {
        const dayNum = i + 1;
        return {
            day: dayNum,
            weekday: getWeekday(currentYear, currentMonth, dayNum),
        };
    });

    return (
        <div className="py-5 overflow-x-auto" style={{ fontFamily: FONTS.paragraph.fontFamily }}>
            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full border-collapse text-sm shadow-lg">
                    <thead className="bg-[#006666] text-white">
                        <tr>
                            <th className="sticky left-0 bg-[#006666] px-4 py-3 text-left min-w-[200px] border-r border-[#006666]">
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full border border-gray-300 text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#E6A895]"
                                />
                            </th>
                            {days.map(({ day, weekday }) => (
                                <th key={day} className="px-3 text-center whitespace-nowrap">
                                    {day} <br />({weekday})
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="overflow-y-hidden">
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={daysInMonth + 1} className="text-center py-6 bg-white text-gray-500">
                                    No matching employees found.
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user, index) => (
                                <tr
                                    key={`${user.name}-${index}`}
                                    className="bg-white border-b border-slate-200/50 hover:bg-gray-100 cursor-pointer"
                                >
                                    <td className="px-6 py-3 flex items-center bg-white z-20 gap-3 border-r cursor-pointer sticky left-0 bg-white">
                                        <img
                                            src={user.profilePic}
                                            alt={user.name}
                                            className="w-9 h-9 rounded-full object-cover"
                                        />
                                        <span className="font-medium text-gray-500">{user.name}</span>
                                    </td>
                                    {days.map(({ day, weekday }) => {
                                        const isSunday = weekday === 'Sun';
                                        const isPresent = user.daysPresent.includes(day);

                                        const tooltipData = {
                                            firstIn: '09:00 AM',
                                            lastOut: '06:00 PM',
                                            required: '8h',
                                        };

                                        return (
                                            <td
                                                key={day}
                                                className="relative group text-center px-2 py-3 whitespace-nowrap overflow-visible"
                                            >
                                                {isSunday ? (
                                                    <span className="text-red-500 font-semibold">R</span>
                                                ) : (
                                                    <div className="relative flex justify-center">
                                                        <div
                                                            className={`w-4 h-4 rounded cursor-pointer ${isPresent ? 'bg-green-300' : 'bg-red-400'
                                                                }`}
                                                        />
                                                        <div className="absolute bottom-full mb-2 hidden group-hover:flex bg-white border border-gray-300 shadow-md p-2 rounded-md text-xs text-left w-40 z-50">
                                                            <div>
                                                                <p>
                                                                    <strong>First In:</strong> {tooltipData.firstIn}
                                                                </p>
                                                                <p>
                                                                    <strong>Last Out:</strong> {tooltipData.lastOut}
                                                                </p>
                                                                <p>
                                                                    <strong>Required:</strong> {tooltipData.required}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
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
