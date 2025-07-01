import { useEffect, useState } from "react";
import { Users, Clock, UserX, Plus } from "lucide-react";
import type {
  Employee,
  Department,
  WorkModeData,
} from "../../components/Employee/Employee";
import { EmployeeStatsCard } from "../../components/Employee/EmployeeCards";
import { WorkModeStats } from "../../components/Employee/WorkModeStats";
import { EmployeeTable } from "../../components/Employee/EmployeeTable";
import { AddEmployeeModal } from "../../components/Employee/EmployeeModel";
import { FONTS } from "../../constants/uiConstants";
import { getAllDepartments } from "../../features/Department/service";
import { SearchFilterBar } from "../../components/Employee/SearchFilter";
import { Pagination } from "../../components/Paginetion/pagination";
import Client from "../../api";

const apiClient = new Client();

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Employee;
    direction: "ascending" | "descending";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | "">(
    ""
  );
  const [showAddForm, setShowAddForm] = useState(false);

  const itemsPerPage = 10;

  const workModeData: WorkModeData[] = [
    { name: "Remote", value: 4 },
    { name: "Hybrid", value: 3 },
    { name: "On-site", value: 3 },
  ];

  const requestSort = (key: keyof Employee) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await getAllDepartments();
        setDepartments(res);
      } catch (error) {
        console.error("Failed to load departments", error);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await apiClient.employee.employeeuser.getAllProfile();
        const employees = response.data.map((user: any) => ({
          id: user.employeeUser_id ,
          name: `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim(),
          email: user.email,
          contactNumber: user.phone_number,
          department: user.department?.department_name || "N/A",
          jobTitle: user.role || "N/A",
          hireDate: user.createdAt || "",
          employmentType: user.employment_type || "N/A", 
        }));
        console.log("emp", employees)
        setEmployees(employees);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };

    fetchDepartments();
    fetchEmployees();
  }, []);

  const getSortedAndFilteredEmployees = () => {
    const filtered = employees.filter((employee) => {
      const matchesSearch = Object.values(employee).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesDepartment =
        selectedDepartment && typeof selectedDepartment !== "string"
          ? employee.department.toLowerCase() ===
            selectedDepartment.name.toLowerCase()
          : true;
      return matchesSearch && matchesDepartment;
    });

    if (sortConfig !== null) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  };

  const filteredEmployees = getSortedAndFilteredEmployees();
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const paginatedEmployees = filteredEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getNewEmployeesCount = () => {
    return employees.filter((emp) => {
      const hireDate = new Date(emp.hireDate);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return hireDate >= thirtyDaysAgo;
    }).length;
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleDepartmentChange = (department: Department | "") => {
    setSelectedDepartment(department);
    setCurrentPage(1);
    setFilterOpen(false);
  };

  const handleAddEmployee = (newEmployee: Employee) => {
    setEmployees((prev) => [...prev, newEmployee]);
  };

  const handleDeleteEmployee = (employeeId: string) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees(employees.filter((emp) => emp.id !== employeeId));
    }
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="flex flex-wrap justify-start items-center mb-6 gap-8">
        <h1
          className="text-3xl font-bold text-white"
          style={{ ...FONTS.header }}
        >
          Employee Management
        </h1>

        <div className="flex items-center justify-start gap-2">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center h-8 gap-2 bg-[#4c469f] hover:bg-[#3b3780] text-white px-4 py-2.5 rounded-md shadow-md w-48"
            style={{ ...FONTS.button }}
          >
            <Plus size={18} />
            <span className="text-sm">Add Employee</span>
          </button>

          <SearchFilterBar
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            filterOpen={filterOpen}
            onFilterToggle={() => setFilterOpen(!filterOpen)}
            selectedDepartment={selectedDepartment}
            onDepartmentChange={handleDepartmentChange}
            departments={departments}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
        <EmployeeStatsCard
          title="Total Employees"
          value={employees.length}
          subtitle="Across all departments"
          icon={<Users className="w-6 h-6 text-indigo-600" />}
          bgColor="bg-indigo-50"
          textColor="text-indigo-600"
        />
        <EmployeeStatsCard
          title="New Employees"
          value={getNewEmployeesCount()}
          subtitle="Last 30 days"
          icon={<Clock className="w-6 h-6 text-emerald-600" />}
          bgColor="bg-emerald-50"
          textColor="text-emerald-600"
        />
        <EmployeeStatsCard
          title="Resigned Employees"
          value={0}
          subtitle="This quarter"
          icon={<UserX className="w-6 h-6 text-amber-600" />}
          bgColor="bg-amber-50"
          textColor="text-amber-600"
        />
        <WorkModeStats workModeData={workModeData} />
      </div>

      <EmployeeTable
        employees={employees}
        sortConfig={sortConfig}
        onSort={requestSort}
        onDelete={handleDeleteEmployee}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <AddEmployeeModal
        isOpen={showAddForm}
        onClose={() => setShowAddForm(false)}
        onAdd={handleAddEmployee}
      />
    </div>
  );
};

export default EmployeeManagement;
