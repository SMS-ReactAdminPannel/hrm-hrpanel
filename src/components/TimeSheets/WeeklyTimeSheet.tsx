import { useState } from 'react';

const TimeSheet = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const usersData = [
        {
            name: 'John Doe',
            profilePic: 'https://randomuser.me/api/portraits/men/1.jpg',
            timeEntries: [
                { day: 'Monday', hoursWorked: 8, isHoliday: false },
                { day: 'Tuesday', hoursWorked: 7.5, isHoliday: false },
                { day: 'Wednesday', hoursWorked: 8, isHoliday: false },
                { day: 'Thursday', hoursWorked: 6, isHoliday: false },
                { day: 'Friday', hoursWorked: 7, isHoliday: false },
                { day: 'Saturday', hoursWorked: 4, isHoliday: false },
                { day: 'Sunday', hoursWorked: 0, isHoliday: true },
            ],
        },
        {
            name: 'Jane Smith',
            profilePic: 'https://randomuser.me/api/portraits/women/2.jpg',
            timeEntries: [
                { day: 'Monday', hoursWorked: 7, isHoliday: false },
                { day: 'Tuesday', hoursWorked: 8, isHoliday: false },
                { day: 'Wednesday', hoursWorked: 8, isHoliday: false },
                { day: 'Thursday', hoursWorked: 7, isHoliday: false },
                { day: 'Friday', hoursWorked: 6.5, isHoliday: false },
                { day: 'Saturday', hoursWorked: 3, isHoliday: false },
                { day: 'Sunday', hoursWorked: 0, isHoliday: true },
            ],
        },
        {
            name: 'Alex Johnson',
            profilePic: 'https://randomuser.me/api/portraits/men/3.jpg',
            timeEntries: [
                { day: 'Monday', hoursWorked: 8, isHoliday: false },
                { day: 'Tuesday', hoursWorked: 8, isHoliday: false },
                { day: 'Wednesday', hoursWorked: 6, isHoliday: false },
                { day: 'Thursday', hoursWorked: 8, isHoliday: false },
                { day: 'Friday', hoursWorked: 5, isHoliday: false },
                { day: 'Saturday', hoursWorked: 2, isHoliday: false },
                { day: 'Sunday', hoursWorked: 0, isHoliday: true },
            ],
        },
        {
            name: 'Emily Brown',
            profilePic: 'https://randomuser.me/api/portraits/women/4.jpg',
            timeEntries: [
                { day: 'Monday', hoursWorked: 6, isHoliday: false },
                { day: 'Tuesday', hoursWorked: 7, isHoliday: false },
                { day: 'Wednesday', hoursWorked: 8, isHoliday: false },
                { day: 'Thursday', hoursWorked: 8, isHoliday: false },
                { day: 'Friday', hoursWorked: 7.5, isHoliday: false },
                { day: 'Saturday', hoursWorked: 0, isHoliday: false },
                { day: 'Sunday', hoursWorked: 0, isHoliday: true },
            ],
        },
        {
            name: 'Michael Lee',
            profilePic: 'https://randomuser.me/api/portraits/men/5.jpg',
            timeEntries: [
                { day: 'Monday', hoursWorked: 9, isHoliday: false },
                { day: 'Tuesday', hoursWorked: 9, isHoliday: false },
                { day: 'Wednesday', hoursWorked: 9, isHoliday: false },
                { day: 'Thursday', hoursWorked: 8, isHoliday: false },
                { day: 'Friday', hoursWorked: 6, isHoliday: false },
                { day: 'Saturday', hoursWorked: 0, isHoliday: false },
                { day: 'Sunday', hoursWorked: 0, isHoliday: true },
            ],
        },
    ];

    const filteredUsers = usersData.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className="p-5">

            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 text-sm">
                    <thead className="bg-[#006666] text-white">
                        <tr>
                            <th className="border border-gray-300 px-6 py-3 text-left"><input
                                type="text"
                                placeholder="Search by name..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full border border-gray-300 text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#E6A895]"
                            /></th>
                            {daysOfWeek.map((day) => (
                                <th key={day} className="border border-gray-300 px-6 py-3 text-center">
                                    {day}
                                </th>
                            ))}
                            <th className="border border-gray-300 px-6 py-3 text-center">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={daysOfWeek.length + 2}
                                    className="text-center py-6 text-gray-500"
                                >
                                    No matching employees found.
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => {
                                const totalHours = user.timeEntries.reduce(
                                    (sum, entry) => sum + entry.hoursWorked,
                                    0
                                );
                                return (
                                    <tr key={user.name} className="hover:bg-gray-50">
                                        <td className="border border-gray-300 px-6 py-4 flex items-center gap-3">
                                            <img
                                                src={user.profilePic}
                                                alt={user.name}
                                                className="w-9 h-9 rounded-full object-cover"
                                            />
                                            <span className="font-medium text-gray-700">{user.name}</span>
                                        </td>
                                        {user.timeEntries.map((entry) => (
                                            <td
                                                key={entry.day}
                                                className={`border border-gray-300 px-6 py-4 text-center ${entry.isHoliday ? 'text-red-500 font-semibold' : ''
                                                    }`}
                                            >
                                                {entry.isHoliday ? 'Holiday' : `${entry.hoursWorked} hr`}
                                            </td>
                                        ))}
                                        <td className="border border-gray-300 px-6 py-4 text-center font-semibold text-green-600">
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

export default TimeSheet;
