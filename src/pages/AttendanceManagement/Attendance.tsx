import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import { AttendanceTable } from "../../components/Attendance/AttendanceTable";
import { AttendancePermissionModal } from "../../components/Attendance/AttendancePermissionModal";
import { AttendanceFiltersBar } from "../../components/Attendance/AttendanceFilterBa";
import { AttendanceDashboard } from "../../components/Attendance/AttendanceDashboard";

interface AttendanceRecord {
  ID: string;
  Name: string;
  Designation: string;
  Status: string;
  CheckIn: string;
  CheckOut: string;
  Duration: string;
}

interface Person {
  id: string;
  name: string;
  email: string;
  status: "approved" | "pending";
}

const AttendancePage = () => {
  const navigate = useNavigate();

  const [designationFilter, setDesignationFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [isOpen, setIsOpen] = useState(false);

  const attendanceData: AttendanceRecord[] = [
    {
      ID: "EMP001",
      Name: "Alice Johnson",
      Designation: "Manager",
      Status: "Present",
      CheckIn: "09:00 AM",
      CheckOut: "05:00 PM",
      Duration: "8h",
    },
    {
      ID: "EMP002",
      Name: "Bob Smith",
      Designation: "Developer",
      Status: "Absent",
      CheckIn: "-",
      CheckOut: "-",
      Duration: "-",
    },
    // Add more dummy data as needed
  ];

  const dummyData: Person[] = [
    { id: "1", name: "John Doe", email: "john@example.com", status: "approved" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", status: "pending" },
  ];

  const filteredDetails = useMemo(() => {
    return attendanceData.filter((item) => {
      const matchesDesignation = designationFilter ? item.Designation === designationFilter : true;
      const matchesSearch = searchQuery
        ? item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.ID.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesDesignation && matchesSearch;
    });
  }, [attendanceData, designationFilter, searchQuery]);

  const paginatedDetails = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredDetails.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredDetails, currentPage]);

  const presentCount = attendanceData.filter((item) => item.Status === "Present").length;
  const absentCount = attendanceData.filter((item) => item.Status === "Absent").length;

  const chartData = [
    { name: "Present", value: presentCount },
    { name: "Absent", value: absentCount },
  ];

  const chartColors = ["#5e59a9", "#a8a2f2"];

  // ✅ Navigation to EmployeeDetails page
  const handleEmployeeClick = (item: AttendanceRecord) => {
    navigate(`/attendance/${item.ID}`);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <AttendanceDashboard
        employeeCount={attendanceData.length}
        totalDuration="9 Hrs"
        permissionCount={dummyData.length}
        onPermissionClick={() => setIsOpen(true)}
        presentCount={presentCount}
        absentCount={absentCount}
        chartData={chartData}
        chartColors={chartColors}
      />

      <div className="mt-6">
        <AttendanceFiltersBar
          designationFilter={designationFilter}
          setDesignationFilter={setDesignationFilter}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onPermissionClick={() => setIsOpen(true)}
        />
      </div>

      <AttendanceTable
        paginatedDetails={paginatedDetails}
        filteredDetails={filteredDetails}
        currentPage={currentPage}
        rowsPerPage={rowsPerPage}
        onPageChange={setCurrentPage}
        onEmployeeClick={handleEmployeeClick} // 👈 👌 THIS is the click handler passed correctly
      />

      <AttendancePermissionModal isOpen={isOpen} onClose={() => setIsOpen(false)} dummyData={dummyData} />
    </div>
  );
};

export default AttendancePage;
