

// import { useState, useMemo } from "react"
// import { ChevronLeft, ChevronRight, UserCheck, UserX } from "lucide-react"
// import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, addMonths, subMonths } from "date-fns"

// // Sample attendance data
// const attendanceData = {
//   presentDays: [1, 3, 4, 5, 8, 9, 10, 11, 12, 15, 16, 17, 18, 19, 22, 23, 24, 25, 26, 29, 30],
//   absentDays: [2, 6, 13, 20, 27, 31],
// }

// const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

// export default function AttendanceDashboard() {
//   const [currentDate, setCurrentDate] = useState(new Date())
//   const [showYearDropdown, setShowYearDropdown] = useState(false)
//   const [hoveredDate, setHoveredDate] = useState<Date | null>(null)

//   // Generate years for dropdown (current year ± 5 years)
//   const currentYear = new Date().getFullYear()
//   const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i)

//   // Calendar logic
//   const monthStart = startOfMonth(currentDate)
//   const monthEnd = endOfMonth(currentDate)
//   const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

//   // Create calendar grid with empty cells for proper alignment
//   const days = useMemo(() => {
//     const startDayOfWeek = getDay(monthStart)
//     const emptyDays = Array(startDayOfWeek).fill(null)
//     return [...emptyDays, ...monthDays]
//   }, [monthStart, monthDays])

//   const handlePrevMonth = () => {
//     setCurrentDate(subMonths(currentDate, 1))
//     setShowYearDropdown(false)
//   }

//   const handleNextMonth = () => {
//     setCurrentDate(addMonths(currentDate, 1))
//     setShowYearDropdown(false)
//   }

//   const handleYearChange = (year: number) => {
//     const newDate = new Date(currentDate)
//     newDate.setFullYear(year)
//     setCurrentDate(newDate)
//     setShowYearDropdown(false)
//   }

//   const handleDateMouseEnter = (date: Date) => {
//     setHoveredDate(date)
//   }

//   const handleDateMouseLeave = () => {
//     setHoveredDate(null)
//   }

//   return (
//     <div className="attendance-dashboard   min-h-screen">
      
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden ">
        
//         <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
//           <button
//             type="button"
//             onClick={handlePrevMonth}
//             className="flex items-center gap-2 bg-gray-700 border border-gray-300 rounded px-2 py-1 hover:bg-gray-100 transition-colors"
//           >
//             <ChevronLeft className="w-4 h-4 text-white" />
//           </button>

//           <div className="flex items-center gap-4">
//             <h2 className="text-xl font-semibold text-gray-800">{format(currentDate, "MMMM yyyy")}</h2>

//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setShowYearDropdown(!showYearDropdown)}
//                 className="flex items-center gap-2 bg-transparent border border-gray-300 rounded px-2 py-1 hover:bg-gray-100 text-sm font-medium transition-colors"
//               >
//                 {currentDate.getFullYear()}
//               </button>

//               {showYearDropdown && (
//                 <div className="absolute top-full mt-1 right-0 z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-32 max-h-48 overflow-y-auto">
//                   {years.map((year) => (
//                     <button
//                       key={year}
//                       className={`w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors ${
//                         year === currentDate.getFullYear() ? "bg-blue-50 text-blue-600 font-medium" : ""
//                       }`}
//                       onClick={() => handleYearChange(year)}
//                     >
//                       {year}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           <button
//             type="button"
//             onClick={handleNextMonth}
//             className="flex items-center gap-2 bg-gray-700  border border-gray-300 rounded px-2 py-1 hover:bg-gray-100 transition-colors"
//           >
//             <ChevronRight className="w-4 h-4 text-white" />
//           </button>
//         </div>

//         {/* Calendar Grid */}
//         <div className="p-4 mb-20">
//           {/* Week Day Headers */}
//           <div className="grid grid-cols-7 gap-1 mb-1">
//             {weekDays.map((day) => (
//               <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
//                 {day}
//               </div>
//             ))}
//           </div>

//           {/* Calendar Days */}
//           <div className="grid grid-cols-7 gap-1">
//             {days.map((date, index) => {
//               if (!date) {
//                 return <div key={index} className="p-1 h-16"></div>
//               }

//               const dayNumber = date.getDate()
//               const dayOfWeek = date.getDay()
//               const isSunday = dayOfWeek === 0
//               const isPresent = attendanceData.presentDays.includes(dayNumber)
//               const isAbsent = attendanceData.absentDays.includes(dayNumber)
//               const isToday = format(date, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")

//               return (
//                 <div
//                   key={index}
//                   className={`relative p-1 h-14 border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer ${
//                     isToday ? "bg-blue-50 border-blue-200" : ""
//                   }`}
//                   onMouseEnter={() => handleDateMouseEnter(date)}
//                   onMouseLeave={handleDateMouseLeave}
//                 >
//                   <div className="flex flex-col items-center justify-between h-full">
//                     <span className={`text-sm font-medium ${isToday ? "text-blue-600" : "text-gray-700"}`}>
//                       {dayNumber}
//                     </span>

//                     <div className="flex items-center justify-center">
//                       {isSunday ? (
//                         <span className="w-2 h-2 rounded-full bg-gray-400"></span>
//                       ) : (
//                         <>
//                           {isPresent && <span className="w-2 h-2 rounded-full bg-emerald-500"></span>}
//                           {isAbsent && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
//                         </>
//                       )}
//                     </div>
                    
//                   </div>

//                   {/* Custom Tooltip */}
//                   {hoveredDate &&
//                     hoveredDate.getDate() === dayNumber &&
//                     hoveredDate.getMonth() === date.getMonth() &&
//                     !isSunday && (
//                       <div className="absolute z-50 bg-white border border-gray-300 shadow-xl backdrop-blur-sm p-1 rounded-lg text-xs text-left w-48 top-[80%]  left-1/2 transform -translate-x-full opacity-100 bg-opacity-100">
//                         {/* Tooltip Arrow */}
//                        <div className="flex justify-between items-center  border-b border-gray-200">
//                           <p className="font-semibold text-gray-900">{format(date, "MMMM d, yyyy")}</p>
//                           <span
//                             className={`px-1 py-1 rounded text-xs font-medium ${
//                               isPresent ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                             }`}
//                           >
//                             {isPresent ? "Present" : "Absent"}
//                           </span>
//                         </div>

//                         {isPresent ? (
//                           <>
//                             <div className="grid grid-cols-2 gap-3">
//                               <div>
//                                 <p className="text-gray-600 font-medium">First In</p>
//                                 <p className="font-semibold text-gray-900">08:45 AM</p>
//                               </div>
//                               <div>
//                                 <p className="text-gray-600 font-medium">Last Out</p>
//                                 <p className="font-semibold text-gray-900">05:50 PM</p>
//                               </div>
//                             </div>
//                             <div className="mt-1">
//                               <p className="text-gray-600 font-medium">Duration</p>
//                               <p className="font-semibold text-gray-900">8 hours 5 mins</p>
//                             </div>
//                           </>
//                         ) : (
//                           <p className="text-gray-700 font-medium">No attendance record for this day.</p>
//                         )}
//                       </div>
//                     )}
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Stats Cards */}
//       <div className="flex justify-end items-center gap-4 text-lg mt-6">
//         {/* Present Card */}
//         <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-l-4 border-emerald-500">
//           <div className="p-2 bg-emerald-50 rounded-full">
//             <UserCheck className="text-emerald-600 text-xl" />
//           </div>
//           <div>
//             <p className="font-bold text-gray-800">{attendanceData.presentDays.length}</p>
//             <p className="text-sm text-gray-500">Present</p>
//           </div>
//         </div>

//         {/* Absent Card */}
//         <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-l-4 border-red-500">
//           <div className="p-2 bg-red-50 rounded-full">
//             <UserX className="text-red-600 text-xl" />
//           </div>
//           <div>
//             <p className="font-bold text-gray-800">{attendanceData.absentDays.length}</p>
//             <p className="text-sm text-gray-500">Absent</p>
//           </div>
//         </div>
//       </div>

//       {/* Legend */}
//       <div className="bg-white rounded-xl shadow-lg p-6 ">
//         <div className="relative mb-6">
//           <h3 className="text-xl font-semibold text-gray-800 inline-block pr-4 bg-white relative z-10">
//             Attendance Legend
//           </h3>
//           <div className="absolute bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0"></div>
//         </div>

//         <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
//           {/* Present Legend */}
//           <div className="flex items-center space-x-3">
//             <span className="relative flex h-6 w-6">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500"></span>
//             </span>
//             <div>
//               <p className="font-medium text-gray-800">Present</p>
//               <p className="text-xs text-gray-500">Employee was present</p>
//             </div>
//           </div>

//           {/* Absent Legend */}
//           <div className="flex items-center space-x-3">
//             <span className="relative flex h-6 w-6">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-6 w-6 bg-red-500"></span>
//             </span>
//             <div>
//               <p className="font-medium text-gray-800">Absent</p>
//               <p className="text-xs text-gray-500">Employee was absent</p>
//             </div>
//           </div>

//           {/* Weekend Legend */}
//           <div className="flex items-center space-x-3">
//             <span className="relative flex h-6 w-6">
//               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
//               <span className="relative inline-flex rounded-full h-6 w-6 bg-gray-500"></span>
//             </span>
//             <div>
//               <p className="font-medium text-gray-800">Weekend</p>
//               <p className="text-xs text-gray-500">Non-working day</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';
import {  FaUserCheck, FaUserTimes } from 'react-icons/fa';
import '../AttendanceManagement/AttendanceCalendar.css';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

const AttendanceCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const [hoveredDate, setHoveredDate] = useState(null);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const calendarRef = useRef(null);

  const [tooltipData, setTooltipData] = useState({
    date: '',
    isPresent: false,
    firstIn: '09:00 AM',
    lastOut: '06:00 PM',
    required: '8 hours'
  });

  // Dummy data for attendance
  const attendanceData = {
    presentDays: [1, 2, 5, 6, 7, 8, 9, 12, 13, 14, 15],
    absentDays: [3, 4, 10, 11, 16, 17] 
  };

  // Generate years for dropdown (current year ± 5 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  // Function to handle date hover
  const handleDateMouseEnter = (date) => {
    const dayNumber = date.getDate();
    const dayOfWeek = date.getDay();
    const isSunday = dayOfWeek === 0;
    
    if (!isSunday) {
      const isPresent = attendanceData.presentDays.includes(dayNumber);
      
      setTooltipData({
        date: format(date, 'MMMM d, yyyy'),
        isPresent,
        firstIn: isPresent ? '08:45 AM' : '--',
        lastOut: isPresent ? '05:50 PM' : '--',
        required: isPresent ? '8 hours 5 mins' : '--',
        status: isPresent ? 'Present' : 'Absent'
      });
      
      setHoveredDate(date);
    }
  };

  const handleDateMouseLeave = () => {
    setHoveredDate(null);
  };

  // Function to handle year change
const handleYearChange = (year) => {
  const newDate = new Date(currentDate);
  newDate.setFullYear(year);
  setCurrentDate(newDate);
  setShowYearDropdown(false);
};

  // Custom header toolbar with year dropdown
  const renderHeaderToolbar = () => ({
    left: 'prev',
    center: 'title',
    right: 'next yearDropdown'
  });

  // Custom button for year dropdown
  const customButtons = {
    yearDropdown: {
      text: format(currentDate, 'yyyy'),
      click: () => setShowYearDropdown(!showYearDropdown)
    }
  };

  return (
    <div className="attendance-dashboard">
      {/* Header Section */}
      

      {/* Calendar Container */}
      <div className="calendar-container relative">
        <FullCalendar
          initialDate={currentDate} 
          datesSet={(arg) => setCurrentDate(arg.start)} //  current date state

          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
          initialView="dayGridMonth"
          headerToolbar={renderHeaderToolbar()}
          customButtons={customButtons}
          height="82vh"
          googleCalendarApiKey="AIzaSyB9Tt2fQkHCVQaO9Ky4dTFyOBydPihmRnU"
          events={{
            googleCalendarId: 'en.indian#holiday@group.v.calendar.google.com'
          }}
          dayHeaderContent={(arg) => (
            <div className="day-header">
              {arg.text.substring(0, 3)}
            </div>
          )}
          dayCellContent={(arg) => {
            const dayNumber = arg.date.getDate();
            const dayOfWeek = arg.date.getDay();
            const isSunday = dayOfWeek === 0;
            const isPresent = attendanceData.presentDays.includes(dayNumber);
            const isAbsent = attendanceData.absentDays.includes(dayNumber);

            return (
              <div 
                className="day-cell group relative"
                onMouseEnter={() => handleDateMouseEnter(arg.date)}
                onMouseLeave={handleDateMouseLeave}
              >
                <span className="day-number">{arg.dayNumberText.replace(',', '')}</span>
                
                <div className="status-indicators">
                  {isSunday ? (
                    <span className="attendance-status weekend"></span>
                  ) : (
                    <>
                      {isPresent && (
                        <span className="attendance-status present"></span>
                      )}
                      {isAbsent && (
                        <span className="attendance-status absent"></span>
                      )}
                    </>
                  )}
                </div>

                {/* Custom Tooltip */}
                {hoveredDate && hoveredDate.getDate() === dayNumber && !isSunday && (
                  <div className="absolute z-10 bg-white border border-gray-200 shadow-lg p-3 rounded-lg text-xs text-left w-48 top-full mt-2 left-1/2 transform-translate-xl-2 -translate-x-1/2">
                    <div className="flex justify-between items-center mb-2 pb-1 border-b border-gray-100">
                      <p className="font-semibold">{format(arg.date, 'MMMM d, yyyy')}</p>
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
                      <p className="text-gray-600">
                        No attendance record for this day.
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          }}
          datesSet={({ start }) => setCurrentDate(start)}
        />

        {/* Year Dropdown */}
        {showYearDropdown && (
          <div className="absolute right-4 top-12 z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-32">
            {years.map((year) => (
              <button
                key={year}
                className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                  year === currentDate.getFullYear() ? 'bg-blue-50 text-blue-600 font-medium' : ''
                }`}
                onClick={() => handleYearChange(year)}
              >
                {year}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="flex justify-end items-center gap-4 text-lg mt-6">
        {/* Present Card */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-l-4 border-emerald-500">
          <div className="p-2 bg-emerald-50 rounded-full">
            <FaUserCheck className="text-emerald-600 text-xl" />
          </div>
          <div>
            <p className="font-bold text-gray-800">{attendanceData.presentDays.length}</p>
            <p className="text-sm text-gray-500">Present</p>
          </div>
        </div>

        {/* Absent Card */}
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border-l-4 border-red-500">
          <div className="p-2 bg-red-50 rounded-full">
            <FaUserTimes className="text-red-600 text-xl" />
          </div>
          <div>
            <p className="font-bold text-gray-800">{attendanceData.absentDays.length}</p>
            <p className="text-sm text-gray-500">Absent</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="relative mb-6">
          <h3 className="text-xl font-semibold text-gray-800 inline-block pr-4 bg-white relative z-10">Attendance Legend</h3>
          <div className="absolute bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent z-0"></div>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-3 gap-4">
          {/* Present Legend */}
          <div className="flex items-center space-x-3">
            <span className="relative flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-emerald-500"></span>
            </span>
            <div>
              <p className="font-medium text-gray-800">Present</p>
              <p className="text-xs text-gray-500">Employee was present</p>
            </div>
          </div>
          
          {/* Absent Legend */}
          <div className="flex items-center space-x-3">
            <span className="relative flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-red-500"></span>
            </span>
            <div>
              <p className="font-medium text-gray-800">Absent</p>
              <p className="text-xs text-gray-500">Employee was absent</p>
            </div>
          </div>
          
          {/* Weekend Legend */}
          <div className="flex items-center space-x-3">
            <span className="relative flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-gray-500"></span>
            </span>
            <div>
              <p className="font-medium text-gray-800">Weekend</p>
              <p className="text-xs text-gray-500">Non-working day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceCalendar;