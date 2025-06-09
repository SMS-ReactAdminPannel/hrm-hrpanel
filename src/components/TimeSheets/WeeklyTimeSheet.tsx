import { useState } from "react";
import { FONTS } from "../../constants/uiConstants";

const TimeSheet = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const usersData = [
        {
            name: "John Doe",
            profilePic: "https://randomuser.me/api/portraits/men/1.jpg",
            timeEntries: [
                { day: "Monday", hoursWorked: 8, isHoliday: false, firstIn: "9:00 AM", lastOut: "5:00 PM", requiredHours: 8 },
                { day: "Tuesday", hoursWorked: 7.5, isHoliday: false, firstIn: "9:15 AM", lastOut: "4:45 PM", requiredHours: 8 },
                { day: "Wednesday", hoursWorked: 8, isHoliday: false, firstIn: "9:00 AM", lastOut: "5:00 PM", requiredHours: 8 },
                { day: "Thursday", hoursWorked: 6, isHoliday: false, firstIn: "10:00 AM", lastOut: "4:00 PM", requiredHours: 8 },
                { day: "Friday", hoursWorked: 7, isHoliday: false, firstIn: "9:30 AM", lastOut: "4:30 PM", requiredHours: 8 },
                { day: "Saturday", hoursWorked: 4, isHoliday: false, firstIn: "10:00 AM", lastOut: "2:00 PM", requiredHours: 0 },
                { day: "Sunday", hoursWorked: 0, isHoliday: true, firstIn: "", lastOut: "", requiredHours: 0 },
            ],
        },
        {
            name: "Jane Smith",
            profilePic: "https://randomuser.me/api/portraits/women/2.jpg",
            timeEntries: [
                { day: "Monday", hoursWorked: 7, isHoliday: false, firstIn: "9:30 AM", lastOut: "4:30 PM", requiredHours: 8 },
                { day: "Tuesday", hoursWorked: 8, isHoliday: false, firstIn: "9:00 AM", lastOut: "5:00 PM", requiredHours: 8 },
                { day: "Wednesday", hoursWorked: 8, isHoliday: false, firstIn: "9:00 AM", lastOut: "5:00 PM", requiredHours: 8 },
                { day: "Thursday", hoursWorked: 7, isHoliday: false, firstIn: "9:15 AM", lastOut: "4:15 PM", requiredHours: 8 },
                { day: "Friday", hoursWorked: 6.5, isHoliday: false, firstIn: "10:00 AM", lastOut: "4:30 PM", requiredHours: 8 },
                { day: "Saturday", hoursWorked: 3, isHoliday: false, firstIn: "11:00 AM", lastOut: "2:00 PM", requiredHours: 0 },
                { day: "Sunday", hoursWorked: 0, isHoliday: true, firstIn: "", lastOut: "", requiredHours: 0 },
            ],
        },
        {
            name: "Alex Johnson",
            profilePic: "https://randomuser.me/api/portraits/men/3.jpg",
            timeEntries: [
                { day: "Monday", hoursWorked: 8, isHoliday: false, firstIn: "8:45 AM", lastOut: "4:45 PM", requiredHours: 8 },
                { day: "Tuesday", hoursWorked: 8, isHoliday: false, firstIn: "9:00 AM", lastOut: "5:00 PM", requiredHours: 8 },
                { day: "Wednesday", hoursWorked: 6, isHoliday: false, firstIn: "10:00 AM", lastOut: "4:00 PM", requiredHours: 8 },
                { day: "Thursday", hoursWorked: 8, isHoliday: false, firstIn: "9:00 AM", lastOut: "5:00 PM", requiredHours: 8 },
                { day: "Friday", hoursWorked: 5, isHoliday: false, firstIn: "10:00 AM", lastOut: "3:00 PM", requiredHours: 8 },
                { day: "Saturday", hoursWorked: 2, isHoliday: false, firstIn: "10:30 AM", lastOut: "12:30 PM", requiredHours: 0 },
                { day: "Sunday", hoursWorked: 0, isHoliday: true, firstIn: "", lastOut: "", requiredHours: 0 },
            ],
        },
        {
            name: "Emily Brown",
            profilePic: "https://randomuser.me/api/portraits/women/4.jpg",
            timeEntries: [
                { day: "Monday", hoursWorked: 6, isHoliday: false, firstIn: "10:00 AM", lastOut: "4:00 PM", requiredHours: 8 },
                { day: "Tuesday", hoursWorked: 7, isHoliday: false, firstIn: "9:15 AM", lastOut: "4:15 PM", requiredHours: 8 },
                { day: "Wednesday", hoursWorked: 8, isHoliday: false, firstIn: "9:00 AM", lastOut: "5:00 PM", requiredHours: 8 },
                { day: "Thursday", hoursWorked: 8, isHoliday: false, firstIn: "9:00 AM", lastOut: "5:00 PM", requiredHours: 8 },
                { day: "Friday", hoursWorked: 7.5, isHoliday: false, firstIn: "9:30 AM", lastOut: "5:00 PM", requiredHours: 8 },
                { day: "Saturday", hoursWorked: 0, isHoliday: false, firstIn: "", lastOut: "", requiredHours: 0 },
                { day: "Sunday", hoursWorked: 0, isHoliday: true, firstIn: "", lastOut: "", requiredHours: 0 },
            ],
        },
        {
            name: "Michael Lee",
            profilePic: "https://randomuser.me/api/portraits/men/5.jpg",
            timeEntries: [
                { day: "Monday", hoursWorked: 9, isHoliday: false, firstIn: "8:30 AM", lastOut: "5:30 PM", requiredHours: 8 },
                { day: "Tuesday", hoursWorked: 9, isHoliday: false, firstIn: "8:45 AM", lastOut: "5:45 PM", requiredHours: 8 },
                { day: "Wednesday", hoursWorked: 9, isHoliday: false, firstIn: "9:00 AM", lastOut: "6:00 PM", requiredHours: 8 },
                { day: "Thursday", hoursWorked: 8, isHoliday: false, firstIn: "9:00 AM", lastOut: "5:00 PM", requiredHours: 8 },
                { day: "Friday", hoursWorked: 6, isHoliday: false, firstIn: "10:00 AM", lastOut: "4:00 PM", requiredHours: 8 },
                { day: "Saturday", hoursWorked: 0, isHoliday: false, firstIn: "", lastOut: "", requiredHours: 0 },
                { day: "Sunday", hoursWorked: 0, isHoliday: true, firstIn: "", lastOut: "", requiredHours: 0 },
            ],
        },
    ];


    const filteredUsers = usersData.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    return (
        <div className="py-5 ">
            <div className="overflow-x-auto rounded-lg">
                <table className="min-w-full border-collapse text-sm shadow-lg">
                    <thead className="bg-[#006666] text-white"
                 
                    >
                        <tr>
                            <th className="p-3 text-left">
                                <input
                                    type="text"
                                    placeholder="Search by name..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full bg-[#eff4f5]  text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#E6A895]"
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
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={daysOfWeek.length + 2} className="text-center bg-[#eff4f5]  py-6 text-black">
                                    No matching employees found.
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((user) => {
                                const totalHours = user.timeEntries.reduce((sum, entry) => sum + entry.hoursWorked, 0);
                                return (
                                    <tr
                                        key={user.name}
                                        className="bg-[#eff4f5]  border-b border-slate-200/50  transition-all duration-200 group cursor-pointer"
                                    >
                                        <td className="px-6 py-4 flex items-center gap-3">
                                           
                                            <span className="font-medium text-gray-700">{user.name}</span>
                                        </td>
                                        {user.timeEntries.map((entry) => (
                                            <td
                                                key={entry.day}
                                                className={`px-6 py-4 text-center ${entry.isHoliday ? "text-red-500 font-semibold" : ""}`}
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

export default TimeSheet;
