import { useState } from 'react';
import { FONTS } from '../../constants/uiConstants';

const DailyTimeSheet = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const usersData = [
        {
            name: 'John Doe',
            profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
            firstIn: '08:00 AM',
            lastOut: '05:00 PM',
            regular: 8,
            overtime: 1,
            dailyDoubleOvertime: 0,
            tracked: 9,
        },
        {
            name: 'Jane Smith',
            profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
            firstIn: '09:00 AM',
            lastOut: '06:00 PM',
            regular: 7.5,
            overtime: 0.5,
            dailyDoubleOvertime: 0,
            tracked: 8,
        },
        {
            name: 'Alex Johnson',
            profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
            firstIn: '07:30 AM',
            lastOut: '04:30 PM',
            regular: 8,
            overtime: 0,
            dailyDoubleOvertime: 0,
            tracked: 8,
        },
        {
            name: 'Emily Brown',
            profilePic: 'https://randomuser.me/api/portraits/women/4.jpg',
            firstIn: '08:15 AM',
            lastOut: '06:15 PM',
            regular: 8,
            overtime: 1,
            dailyDoubleOvertime: 1,
            tracked: 10,
        },
        {
            name: 'Michael Lee',
            profilePic: 'https://randomuser.me/api/portraits/men/5.jpg',
            firstIn: '06:00 AM',
            lastOut: '04:00 PM',
            regular: 8,
            overtime: 2,
            dailyDoubleOvertime: 0,
            tracked: 10,
        },
    ];

    const filteredUsers = usersData.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-5"
            style={{ fontFamily: FONTS.paragraph.fontFamily }}   >
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
                                    className="w-full border border-gray-300 text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#E6A895]"
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
                            filteredUsers.map((user) => (
                                <tr key={user.name} className="bg-white border-b border-slate-200/50 hover:bg-gray-200 group cursor-pointer">
                                    <td className="px-6 py-4 flex items-center gap-3 border-b border-slate-200/50  cursor-pointer">
                                        <img
                                            src={user.profilePic}
                                            alt={user.name}
                                            className="w-9 h-9 rounded-full object-cover"
                                        />
                                        <span className="font-medium text-gray-700">{user.name}</span>
                                    </td>
                                    <td className=" px-6 py-4 text-center">{user.firstIn}</td>
                                    <td className=" px-6 py-4 text-center">{user.lastOut}</td>
                                    <td className=" px-6 py-4 text-center">{user.regular}</td>
                                    <td className=" px-6 py-4 text-center text-orange-500">{user.overtime}</td>
                                    <td className=" px-6 py-4 text-center text-red-500">{user.dailyDoubleOvertime}</td>
                                    <td className=" px-6 py-4 text-center font-semibold text-green-600">{user.tracked}</td>
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
