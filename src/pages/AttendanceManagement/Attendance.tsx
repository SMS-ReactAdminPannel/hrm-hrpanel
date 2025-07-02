import React, { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { CiSearch } from "react-icons/ci";
import { FaBriefcase } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdManageHistory, MdTimer } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FONTS } from "../../constants/uiConstants";
import { getDailyAttendance } from "../../features/Attendance/service";
import { ChevronDown, ChevronUp, Search, Calendar } from "lucide-react";
import { FaBuilding } from "react-icons/fa";
import { getAllDepartments } from "../../features/Department/service";

// Utility function to format date as "DD-MMM-YYYY" or "Today"/"Yesterday"
const formatDisplayDate = (dateString: string) => {
  if (!dateString) return "Select date";
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const inputDate = new Date(dateString);
  inputDate.setHours(0, 0, 0, 0);

  if (inputDate.getTime() === today.getTime()) {
    return "Today";
  } else if (inputDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = monthNames[inputDate.getMonth()];
    const year = inputDate.getFullYear();
    return `${day}-${month}-${year}`;
  }
};

// DatePicker Component
const DatePicker = ({ selectedDate, onChange }: { selectedDate: string; onChange: (date: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate || new Date()).getMonth());
  const [currentYear, setCurrentYear] = useState(new Date(selectedDate || new Date()).getFullYear());
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const handleDayClick = (day: number) => {
    const newDate = new Date(currentYear, currentMonth, day);
    onChange(newDate.toISOString().split('T')[0]);
    setIsOpen(false);
  };

  const changeMonth = (increment: number) => {
    let newMonth = currentMonth + increment;
    let newYear = currentYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    setCurrentMonth(newMonth);
    setCurrentYear(newYear);
  };

  const isSelected = (day: number) => {
    if (!day || !selectedDate) return false;
    const date = new Date(currentYear, currentMonth, day).toISOString().split('T')[0];
    return date === selectedDate;
  };

  const isToday = (day: number) => {
    if (!day) return false;
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  const isYesterday = (day: number) => {
    if (!day) return false;
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      day === yesterday.getDate() &&
      currentMonth === yesterday.getMonth() &&
      currentYear === yesterday.getFullYear()
    );
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = generateDays();

  return (
    <div className="relative" ref={datePickerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 border rounded-md text-sm text-white transition-colors duration-200 h-8 focus:ring-2 focus:ring-gray-300 ${
          selectedDate
            ? "border-gray-300 bg-transparent backdrop-blur-xl bg-white/10"
            : "border-gray-300 bg-transparent backdrop-blur-xl bg-white/10 hover:bg-gray-500/10"
        }`}
      >
        <Calendar className="w-4 h-4 text-gray-300" />
        {formatDisplayDate(selectedDate)}
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="absolute mt-1 left-0 z-50 bg-white rounded-lg shadow-lg p-4 w-64">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => changeMonth(-1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronDown className="w-4 h-4 rotate-90" />
            </button>
            <div className="font-medium">
              {monthNames[currentMonth]} {currentYear}
            </div>
            <button
              onClick={() => changeMonth(1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <ChevronDown className="w-4 h-4 -rotate-90" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div key={day} className="text-xs text-center text-gray-500 font-medium">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                onClick={() => day && handleDayClick(day)}
                disabled={!day}
                className={`w-8 h-8 rounded-full text-sm flex items-center justify-center
                  ${!day ? "invisible" : ""}
                  ${day && isSelected(day) ? "bg-[#5e59a9] text-white" : ""}
                  ${day && isToday(day) && !(day && isSelected(day)) ? "border border-[#5e59a9] text-[#5e59a9]" : ""}
                  ${day && isYesterday(day) && !(day && isSelected(day)) ? "border border-gray-300 text-gray-700" : "text-gray-700"}
                  hover:bg-gray-100 transition-colors`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between">
            <button
              onClick={() => {
                const today = new Date();
                onChange(today.toISOString().split('T')[0]);
                setCurrentMonth(today.getMonth());
                setCurrentYear(today.getFullYear());
              }}
              className="text-xs text-[#5e59a9] hover:text-[#4a458c]"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const Attendance: React.FC = () => {
  type EmployeeDetail = {
    ID: string;
    Name: string;
    Designation: string;
    Status: string;
    CheckIn: string;
    CheckOut: string;
    Duration: string;
    TotalCompletedProject?: string;
    TotalWorkedDuration?: string;
    TotalBreakTime?: string;
    TotalLeaveDays?: string;
  };

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const details = [
    {
      ID: "EMP001",
      Name: "Alice Johnson",
      Designation: "Manager",
      Status: "Present",
      CheckIn: "9:30 am",
      CheckOut: "6:30pm",
      Duration: "9h",
      TotalCompletedProject: "2",
      TotalWorkedDuration: "215h 40m",
      TotalBreakTime: "24h",
      TotalLeaveDays: "5",
    },
  ];

  const presentCount = details.filter((d) => d.Status === "Present").length;
  const absentCount = details.filter((d) => d.Status === "Absent").length;
  const chartData = [
    { name: "Present", value: presentCount },
    { name: "Absent", value: absentCount },
  ];
  const COLORS = ['#7e79c2', 'rgba(94, 89, 169, 0.45)'];

  const [designationFilter, setDesignationFilter] = useState("");
  const designations = Array.from(new Set(details.map((d) => d.Designation)));

  const [departmentFilter, setDepartmentFilter] = useState("");
  const [showDepartmentDropdown, setShowDepartmentDropdown] = useState(false);
  const departmentDropdownRef = useRef<HTMLDivElement>(null);
  const [departments, setDepartments] = useState<any[]>([]);

  const fetchDepartments = async () => {
    try {
      const response = await getAllDepartments();
      setDepartments(response);
    } catch (error) {
      console.log(error);
    }
  };

  type DailyAttendanceItem = {
    ID: string;
    employee_id: {
      first_name: string;
      role: string;
      department?: string;
    };
    status: string;
    Status?: string;
    clockIn: string;
    clockOut: string;
    totalHours: string;
  };

  const [dailyAttendance, setDailyAttendance] = useState<DailyAttendanceItem[]>([]);

  const fetchDailyAttendance = async () => {
    try {
      const response: any = await getDailyAttendance({ date: selectedDate });
      const attendanceData = response?.Data ?? [];
      setDailyAttendance(attendanceData);
    } catch (error) {
      console.error("Error fetching AttendanceData:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchDailyAttendance();
  }, [selectedDate]);

 const filteredDetails = dailyAttendance.filter((item) => {
  if (!item.employee_id) return false; // 🛡️ Ignore items with null employee_id

  const query = searchQuery.trim().toLowerCase();

  const matchesSearch =
    item.employee_id.role?.toLowerCase().includes(query) ||
    item.status?.toLowerCase().includes(query) ||
    item.employee_id.first_name?.toLowerCase().includes(query);

  const matchesDesignation =
    designationFilter === "" || item.employee_id.role === designationFilter;

  const matchesDepartment =
    departmentFilter === "" ||
    item.employee_id.department === departmentFilter;

  return matchesSearch && matchesDesignation && matchesDepartment;
});


  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const paginatedDetails = filteredDetails.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, designationFilter, departmentFilter]);

  const [showDesignationDropdown, setShowDesignationDropdown] = useState(false);
  const designationDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (designationDropdownRef.current && !designationDropdownRef.current.contains(event.target as Node)) {
        setShowDesignationDropdown(false);
      }
      if (departmentDropdownRef.current && !departmentDropdownRef.current.contains(event.target as Node)) {
        setShowDepartmentDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (employee: DailyAttendanceItem) => {
    navigate("/attendance-id", { state: { employee } });
  };

  const [isOpen, setIsOpen] = useState(false);
  const dummyData = [
    {
      id: 1,
      name: "Kia",
      email: "kia@company.com",
      status: "approved",
    },
    {
      id: 2,
      name: "Sam",
      email: "Sam@company.com",
      status: "pending",
    },
  ];

  const departmentNames = Array.from(new Set(departments.map(dept => dept.name)));

  return (
    <div className="space-y-6 min-h-screen w-full p-1">
      <div className="flex">
        <h1 className="text-3xl font-bold text-white mt-2 leading-relaxed pb-3" style={FONTS.header}>
          Attendance Dashboard
        </h1>

        <div>
          <div className="flex mt-4 ml-4 border border-gray-300 rounded-md md:w-80 backdrop-blur-xl bg-white/10">
            <input
              type="text"
              placeholder="Search by Name, Designation or Status"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pr-12 pl-4 px-2 py-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg text-white placeholder-gray-300"
              style={{ ...FONTS.paragraph }}
            />
            <Search className="text-gray-300 absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
          </div>
        </div>

        <div className="flex flex-row md:flex-row justify-between gap-4">
          <div className="mt-4 ml-4">
            <DatePicker 
              selectedDate={selectedDate}
              onChange={(date) => setSelectedDate(date)}
            />
          </div>

          <div className="flex mb-3 items-center gap-3">
            <div className="relative" ref={designationDropdownRef} style={{ zIndex: 50 }}>
              <button
                className={`flex items-center gap-2 px-3 py-2 border rounded-md text-sm text-white transition-colors duration-200 h-8 focus:ring-2 focus:ring-gray-300 rounded-lg ${
                  designationFilter
                    ? "border-gray-300 bg-transparent backdrop-blur-xl bg-white/10"
                    : "border-gray-300 bg-transparent backdrop-blur-xl bg-white/10 hover:bg-gray-500/10"
                }`}
                onClick={() => setShowDesignationDropdown(!showDesignationDropdown)}
              >
                <FaBriefcase className="text-gray-400" />
                {designationFilter || "All Designations"}
                {showDesignationDropdown ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showDesignationDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl border-gray-200 shadow-lg z-20">
                  <button
                    className={`block rounded-t-xl w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      !designationFilter
                        ? "bg-[#5e59a9]/10 text-[#5e59a9] font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setDesignationFilter("");
                      setShowDesignationDropdown(false);
                    }}
                  >
                    All Designations
                  </button>
                  {designations.map((designation, idx) => (
                    <button
                      key={idx}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        designationFilter === designation
                          ? "bg-[#5e59a9]/10 text-[#5e59a9] font-medium"
                          : "text-gray-700"
                      }${idx === designations.length - 1 ? " rounded-b-xl" : ""}`}
                      onClick={() => {
                        setDesignationFilter(designation);
                        setShowDesignationDropdown(false);
                      }}
                    >
                      {designation}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex mb-3 items-center gap-3">
            <div className="relative" ref={departmentDropdownRef} style={{ zIndex: 50 }}>
              <button
                className={`flex items-center gap-2 px-3 py-2 border rounded-md text-sm text-white transition-colors duration-200 h-8 focus:ring-2 focus:ring-gray-300 rounded-lg ${
                  departmentFilter
                    ? "border-gray-300 bg-transparent backdrop-blur-xl bg-white/10"
                    : "border-gray-300 bg-transparent backdrop-blur-xl bg-white/10 hover:bg-gray-500/10"
                }`}
                onClick={() => setShowDepartmentDropdown(!showDepartmentDropdown)}
              >
                <FaBuilding className="text-gray-400" />
                {departmentFilter || "All Departments"}
                {showDepartmentDropdown ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>

              {showDepartmentDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl border-gray-200 shadow-lg z-20">
                  <button
                    className={`block rounded-t-xl w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                      !departmentFilter
                        ? "bg-[#5e59a9]/10 text-[#5e59a9] font-medium"
                        : "text-gray-700"
                    }`}
                    onClick={() => {
                      setDepartmentFilter("");
                      setShowDepartmentDropdown(false);
                    }}
                  >
                    All Departments
                  </button>
                  {departmentNames.map((dept, idx) => (
                    <button
                      key={idx}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        departmentFilter === dept
                          ? "bg-[#5e59a9]/10 text-[#5e59a9] font-medium"
                          : "text-gray-700"
                      }${idx === departmentNames.length - 1 ? " rounded-b-xl" : ""}`}
                      onClick={() => {
                        setDepartmentFilter(dept);
                        setShowDepartmentDropdown(false);
                      }}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg p-6 border-gray-100 transition-all duration-200 flex items-center justify-between h-32 hover:shadow-md">
          <div>
            <p className="text-gray-500 font-medium mb-2 font-family-poppins">No. of Employees</p>
            <p className="text-2xl font-semibold text-gray-900">{details.length}</p>
          </div>
          <div className="bg-[#ECEBFA] p-3 rounded-full">
            <IoIosPeople className="w-10 h-10 text-[#5E59A9]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border-gray-100 transition-all duration-200 flex items-center justify-between h-32 hover:shadow-lg">
          <div>
            <p className="text-gray-500 font-medium mb-2 font-family-poppins">Work Duration</p>
            <p className="text-2xl font-semibold text-gray-900">9 Hrs</p>
          </div>
          <div className="bg-[#ECEBFA] p-3 rounded-full">
            <MdTimer className="w-10 h-10 text-[#5E59A9]" />
          </div>
        </div>

        <div
          className="bg-white rounded-lg p-6 border-gray-100 transition-all duration-200 flex items-center justify-between h-32 hover:shadow-lg"
          onClick={() => setIsOpen(true)}
        >
          <div>
            <p className="text-gray-500 font-medium mb-2 font-family-poppins">Permission</p>
            <p className="text-2xl font-semibold text-gray-900">{dummyData.length}</p>
          </div>
          <div className="bg-[#ECEBFA] p-3 rounded-full">
            <MdManageHistory className="w-10 h-10 text-[#5E59A9]" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 border-gray-100 transition-all duration-200 flex items-center justify-between h-32 hover:shadow-lg">
          <div>
            <p className="text-gray-500 font-medium mb-2 font-family-poppins">Attendance</p>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#5e59a9]/90"></div>
              <p className="text-sm">Present: {presentCount}</p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-3 h-3 rounded-full bg-[#5e59a9]/50"></div>
              <p className="text-sm">Absent: {absentCount}</p>
            </div>
          </div>

          <PieChart width={120} height={120}>
            <Pie data={chartData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={3} dataKey="value">
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      <div className="overflow-hidden rounded-md mt-6" style={{ ...FONTS.paragraph}}>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#5e59a9]/70 backdrop-blur-sm">
              <tr style={{ ...FONTS.tableHeader }}>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Designation
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Check In
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Check Out
                </th>
                <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100" style={{ ...FONTS.tableBody }}>
              {dailyAttendance && dailyAttendance
             .filter((item) => item.employee_id)
             .map((item) => (
                <tr
                  key={item.ID}
                  className="hover:bg-white/70 hover:backdrop-blur-sm cursor-pointer transition duration-200"
                  onClick={() => handleClick(item)}
                >
                  <td className="px-6 py-1 whitespace-nowrap text-sm font-medium text-gray-900">{item.ID || "NA"}</td>
                  
                  <td className="px-6 py-1 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#5e59a9]/60 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
                        {item.employee_id.first_name?.charAt(0).toUpperCase() || "-"}
                      </div>
                      <span className="font-medium">{item.employee_id?.first_name || "-"}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.employee_id?.role || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.employee_id?.role || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                  ${item.Status === "Present"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.clockOut && !isNaN(new Date(item.clockIn).getTime())
                      ? new Date(item.clockOut).toLocaleTimeString("en-GB", {
                      hour: '2-digit',
                      minute: '2-digit',
                      hour12: false
                       }): "-"} </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {item.clockOut && !isNaN(new Date(item.clockOut).getTime())
                      ? new Date(item.clockOut).toLocaleTimeString("en-GB", {
                       hour: '2-digit',
                       minute: '2-digit',
                       hour12: false }) : "-"} </td>                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.totalHours || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
          <div className="text-sm text-gray-500">
            Showing {Math.min(filteredDetails.length, (currentPage - 1) * rowsPerPage + 1)} to{" "}
            {Math.min(currentPage * rowsPerPage, filteredDetails.length)} of {filteredDetails.length} entries
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg bg-white text-gray-700 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-50"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                />
              </svg>
            </button>

            {Array.from({ length: Math.ceil(filteredDetails.length / rowsPerPage) }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3.5 py-2 rounded-lg transition-all duration-200 ${currentPage === index + 1
                    ? "bg-[#5e59a9]/60 text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-[#5e59a9]/60"
                  }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => (prev < Math.ceil(filteredDetails.length / rowsPerPage) ? prev + 1 : prev))
              }
              disabled={currentPage >= Math.ceil(filteredDetails.length / rowsPerPage)}
              className="px-3 py-2 rounded-lg bg-white text-gray-700 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:bg-gray-50"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl mx-4 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-[#006666]">Permission Requests</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-100">
              {dummyData.map((person) => (
                <div key={person.id} className="py-4 first:pt-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{person.name}</p>
                      <p className="text-sm text-gray-500">{person.email}</p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize
                        ${person.status === "approved"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                        }`}
                    >
                      {person.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-[#006666] text-white rounded-lg hover:bg-[#005555] transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;