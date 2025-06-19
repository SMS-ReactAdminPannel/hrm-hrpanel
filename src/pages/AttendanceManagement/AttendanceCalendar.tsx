import { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { format } from 'date-fns';
import { FaRegCalendarAlt, FaUserCheck, FaUserTimes } from 'react-icons/fa';
import '../AttendanceManagement/AttendanceCalendar.css';

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
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const currentDate = calendarApi.getDate();
      currentDate.setFullYear(year);
      calendarApi.gotoDate(currentDate);
      setShowYearDropdown(false);
    }
  };

  // Custom header toolbar with year dropdown
  const renderHeaderToolbar = () => {
    return {
      left: 'prev',
      center: 'title',
      right: 'next yearDropdown'
    };
  };

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
<div className="dashboard-header bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
  <div className="flex items-center justify-between">
    <div className="header-title flex items-center space-x-3">
      <div className="p-3 bg-blue-50 rounded-lg">
        <FaRegCalendarAlt className="header-icon text-blue-600 text-xl" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Employee Attendance</h1>
        <p className="text-sm text-gray-500">Track and manage daily attendance records</p>
      </div>
    </div>

  </div>
</div>
   {/* Calendar Container */}
      <div className="calendar-container relative">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={renderHeaderToolbar()}
          customButtons={customButtons}
          height="72vh"
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
                    <span className="attendance-status weekend" title="Weekend"></span>
                  ) : (
                    <>
                      {isPresent && (
                        <span className="attendance-status present" title="Present"></span>
                      )}
                      {isAbsent && (
                        <span className="attendance-status absent" title="Absent"></span>
                      )}
                    </>
                  )}
                </div>

                {/* Custom Tooltip */}
                {hoveredDate && hoveredDate.getDate() === dayNumber && !isSunday && (
                  <div className="absolute z-1100 bg-white border border-gray-200 shadow-lg p-3 rounded-lg text-xs text-left w-48 top-full mt-2 left-1/2 transform -translate-x-1/2">
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