import { useState } from "react";
import PayslipView from "../../components/common/Payroll/PaySlip";
import { FONTS } from "../../constants/uiConstants";
import ProcessPayrollModal from "../../components/common/Payroll/ProcessPayrollModal";

const Payroll = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOption, setModalOption] = useState("all");
  const [modalDepartment, setModalDepartment] = useState("");

  const employees = [
    {
      id: "EMP001",
      name: "John Smith",
      position: "Software Engineer",
      department: "Engineering",
      salary: "$85,000",
      status: "Paid",
      lastPayment: "2024-01-15",
      hoursWorked: 160,
    },
    {
      id: "EMP002",
      name: "Sarah Johnson",
      position: "Product Manager",
      department: "Product",
      salary: "$95,000",
      status: "Pending",
      lastPayment: "2024-01-15",
      hoursWorked: 155,
    },
    {
      id: "EMP003",
      name: "Mike Davis",
      position: "Designer",
      department: "Design",
      salary: "$75,000",
      status: "Paid",
      lastPayment: "2024-01-15",
      hoursWorked: 162,
    },
    {
      id: "EMP004",
      name: "Emily Brown",
      position: "HR Manager",
      department: "Human Resources",
      salary: "$80,000",
      status: "Paid",
      lastPayment: "2024-01-15",
      hoursWorked: 158,
    },
    {
      id: "EMP005",
      name: "David Wilson",
      position: "Marketing Specialist",
      department: "Marketing",
      salary: "$65,000",
      status: "Processing",
      lastPayment: "2024-01-15",
      hoursWorked: 160,
    },
    {
      id: "EMP006",
      name: "Lisa Anderson",
      position: "Accountant",
      department: "Finance",
      salary: "$70,000",
      status: "Paid",
      lastPayment: "2024-01-15",
      hoursWorked: 159,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">Paid</span>;
      case "Pending":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-800">Pending</span>;
      case "Processing":
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">Processing</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

const uniqueDepartments = Array.from(new Set(employees.map((emp) => emp.department)));


  const departmentOptionsMain = ["All", ...uniqueDepartments];

  
  const departmentOptionsModal = [...uniqueDepartments];

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment = selectedDepartment === "All" || employee.department === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="flex flex-col w-full min-h-screen bg-transparent opacity-0.3">
      <div className="flex flex-col gap-6 p-6">
        {/* Header */}
        <div className="flex flex-col-3 gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-black" style={FONTS.header}>Payroll</h1>
            <p className="text-black" style={FONTS.paragraph}>Manage employee payroll and compensation</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-[#3a357f] "
              onClick={() => setIsModalOpen(true)}
            >
              Process Payroll
            </button>
          </div>
        </div>


        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Total Employees Card */}
          <div className="bg-[#eff4f5] overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
                    <dd className="text-lg font-medium text-gray-900">247</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-600">+12 from last month</p>
              </div>
            </div>
          </div>

          {/* Monthly Payroll Card */}
          <div className="bg-[#eff4f5] overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Monthly Payroll</dt>
                    <dd className="text-lg font-medium text-gray-900">$1,847,250</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-600">+8.2% from last month</p>
              </div>
            </div>
          </div>

          {/* Pending Payments Card */}
          <div className="bg-[#eff4f5] overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Payments</dt>
                    <dd className="text-lg font-medium text-gray-900">23</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-600">Due in 2 days</p>
              </div>
            </div>
          </div>

          {/* Average Salary Card */}
          <div className="bg-[#eff4f5] overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Average Salary</dt>
                    <dd className="text-lg font-medium text-gray-900">$78,450</dd>
                  </dl>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm text-gray-600">+3.1% from last year</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between w-full gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full md:w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-[#eff4f5] placeholder-gray-500 focus:outline-none focus:ring-1"
            />
          </div>

          <div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="md:w-52 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm text-gray-700 focus:outline-none focus:ring-1"
            >
              {departmentOptionsMain.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-[#eff4f5] shadow overflow-hidden sm:rounded-md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#3a357f] ">
                <tr>
                  <th className="px-6 py-3 text-left text-md font-medium text-white">Employee</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-white">Position</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-white">Department</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-white">Salary</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-white">Hours</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-white">Status</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-white">Last Payment</th>
                </tr>
              </thead>
              <tbody className="bg-[#eff4f5] divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedEmployee(employee)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                        <div className="text-sm text-gray-500">{employee.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{employee.salary}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.hoursWorked}h</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(employee.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.lastPayment}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Payslip Modal */}
            {selectedEmployee && (
              <PayslipView
                employee={selectedEmployee}
                onClose={() => setSelectedEmployee(null)}
              />
            )}

            {/* Process Payroll Modal */}
            <ProcessPayrollModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              selectedOption={modalOption}
              setSelectedOption={setModalOption}
              departmentOptions={departmentOptionsModal} // Only unique depts
              selectedDepartment={modalDepartment}
              setSelectedDepartment={setModalDepartment}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
