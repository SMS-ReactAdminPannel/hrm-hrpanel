// import { useState, useEffect } from "react";
// import PayslipView from "../../components/common/Payroll/PaySlip";
// import { FONTS } from "../../constants/uiConstants";
// import ProcessPayrollModal from "../../components/common/Payroll/ProcessPayrollModal";
// import Client from "../../api/httpClient";

// const Payroll = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
//   const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalOption, setModalOption] = useState("all");
//   const [modalDepartment, setModalDepartment] = useState("");
//   const [employees, setEmployees] = useState<any[]>([]);

//   useEffect(() => {
//     fetchPayrollData();
//   }, []);

//   const fetchPayrollData = async () => {
//     try {
//       const res = await Client.hr.payroll.getAllPayrolls();
//       if (res?.success && Array.isArray(res.data)) {
//         setEmployees(res.data);
//       }
//     } catch (error) {
//       console.error("Error fetching payrolls:", error);
//     }
//   };

//   const getStatusBadge = (status: string) => {
//     switch (status) {
//       case "Paid":
//         return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-100 text-green-800">Paid</span>;
//       case "Pending":
//         return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-red-100 text-red-800">Pending</span>;
//       case "Processing":
//         return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-yellow-100 text-yellow-800">Processing</span>;
//       default:
//         return <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
//     }
//   };

//   const uniqueDepartments = Array.from(new Set(employees.map((emp) => emp.department_name)));
//   const departmentOptionsMain = ["All", ...uniqueDepartments];
//   const departmentOptionsModal = [...uniqueDepartments];

//   const filteredEmployees = employees.filter((employee) => {
//     const matchesSearch =
//       employee.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       employee.position_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       employee.department_name?.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesDepartment = selectedDepartment === "All" || employee.department_name === selectedDepartment;

//     return matchesSearch && matchesDepartment;
//   });

//   const totalEmployees = employees.length;
//   const monthlyPayroll = employees.reduce((acc, emp) => acc + (parseFloat(emp.grossSalary) || 0), 0);
//   const pendingPayments = employees.filter(emp => emp.status === "Pending").length;
//   const averageSalary = totalEmployees > 0 ? monthlyPayroll / totalEmployees : 0;

//   return (
//     <div className="flex flex-col w-full min-h-screen bg-transparent opacity-0.3">
//       <div className="flex flex-col gap-6 p-6">
//         {/* Header */}
//         <div className="flex flex-col-3 gap-4 md:flex-row md:items-center md:justify-between">
//           <div>
//             <h1 className="text-black" style={FONTS.header}>Payroll</h1>
//             <p className="text-black" style={FONTS.paragraph}>Manage employee payroll and compensation</p>
//           </div>
//           <div className="flex items-center gap-4">
//             <button
//               className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-[#006666]"
//               onClick={() => setIsModalOpen(true)}
//             >
//               Process Payroll
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//           <div className="bg-[#eff4f5] overflow-hidden shadow rounded-lg p-5">
//             <div className="flex items-center">
//               <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
//               </svg>
//               <div className="ml-5 flex-1">
//                 <dt className="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
//                 <dd className="text-lg font-medium text-gray-900">{totalEmployees}</dd>
//               </div>
//             </div>
//             <p className="text-sm text-gray-600 mt-3">+12 from last month</p>
//           </div>

//           <div className="bg-[#eff4f5] overflow-hidden shadow rounded-lg p-5">
//             <div className="flex items-center">
//               <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
//               </svg>
//               <div className="ml-5 flex-1">
//                 <dt className="text-sm font-medium text-gray-500 truncate">Monthly Payroll</dt>
//                 <dd className="text-lg font-medium text-gray-900">₹{monthlyPayroll.toLocaleString("en-IN")}</dd>
//               </div>
//             </div>
//             <p className="text-sm text-gray-600 mt-3">+8.2% from last month</p>
//           </div>

//           <div className="bg-[#eff4f5] overflow-hidden shadow rounded-lg p-5">
//             <div className="flex items-center">
//               <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3" />
//               </svg>
//               <div className="ml-5 flex-1">
//                 <dt className="text-sm font-medium text-gray-500 truncate">Pending Payments</dt>
//                 <dd className="text-lg font-medium text-gray-900">{pendingPayments}</dd>
//               </div>
//             </div>
//             <p className="text-sm text-gray-600 mt-3">Due in 2 days</p>
//           </div>

//           <div className="bg-[#eff4f5] overflow-hidden shadow rounded-lg p-5">
//             <div className="flex items-center">
//               <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
//               </svg>
//               <div className="ml-5 flex-1">
//                 <dt className="text-sm font-medium text-gray-500 truncate">Average Salary</dt>
//                 <dd className="text-lg font-medium text-gray-900">₹{Math.round(averageSalary).toLocaleString("en-IN")}</dd>
//               </div>
//             </div>
//             <p className="text-sm text-gray-600 mt-3">+3.1% from last year</p>
//           </div>
//         </div>

//         {/* Filters */}
//         <div className="flex items-center justify-between w-full gap-4">
//           <div className="relative">
//             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//               <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//               </svg>
//             </div>
//             <input
//               type="text"
//               placeholder="Search employees..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="block w-full md:w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-[#eff4f5] placeholder-gray-500 focus:outline-none focus:ring-1"
//             />
//           </div>
//           <select
//             value={selectedDepartment}
//             onChange={(e) => setSelectedDepartment(e.target.value)}
//             className="md:w-52 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-sm text-gray-700 focus:outline-none focus:ring-1"
//           >
//             {departmentOptionsMain.map((dept) => (
//               <option key={dept} value={dept}>{dept}</option>
//             ))}
//           </select>
//         </div>

//         {/* Employee Table */}
//         <div className="bg-[#eff4f5] shadow overflow-hidden sm:rounded-md">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-[#006666]">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-md font-medium text-white">Employee</th>
//                   <th className="px-6 py-3 text-left text-md font-medium text-white">Position</th>
//                   <th className="px-6 py-3 text-left text-md font-medium text-white">Department</th>
//                   <th className="px-6 py-3 text-left text-md font-medium text-white">Salary</th>
//                   <th className="px-6 py-3 text-left text-md font-medium text-white">Hours</th>
//                   <th className="px-6 py-3 text-left text-md font-medium text-white">Status</th>
//                   <th className="px-6 py-3 text-left text-md font-medium text-white">Last Payment</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-[#eff4f5] divide-y divide-gray-200">
//                 {filteredEmployees.map((employee) => (
//                   <tr
//                     key={employee._id}
//                     className="hover:bg-gray-100 cursor-pointer"
//                     onClick={() => setSelectedEmployee(employee)}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex flex-col">
//                         <div className="text-sm font-medium text-gray-900">{employee.employee_name}</div>
//                         <div className="text-sm text-gray-500">{employee.employee_id}</div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.position_name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.department_name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{employee.grossSalary?.toLocaleString("en-IN")}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.working_hours}h</td>
//                     <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(employee.status)}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{employee.last_payment_date}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Modals */}
//         {selectedEmployee && (
//           <PayslipView
//             employee={selectedEmployee}
//             onClose={() => setSelectedEmployee(null)}
//           />
//         )}
//         <ProcessPayrollModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           selectedOption={modalOption}
//           setSelectedOption={setModalOption}
//           departmentOptions={departmentOptionsModal}
//           selectedDepartment={modalDepartment}
//           setSelectedDepartment={setModalDepartment}
//         />
//       </div>
//     </div>
//   );
// };

// export default Payroll;




import { useState, useEffect } from "react";
import PayslipView from "../../components/common/Payroll/PaySlip";
import { FONTS } from "../../constants/uiConstants";
import ProcessPayrollModal from "../../components/common/Payroll/ProcessPayrollModal";
import Client from "../../api/httpClient";

const Payroll = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalOption, setModalOption] = useState("all");
  const [modalDepartment, setModalDepartment] = useState("");
  const [employees, setEmployees] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    fetchPayrollData();
    fetchDepartments();
  }, []);

  const fetchPayrollData = async () => {
    try {
      const res = await Client.hr.payroll.getAllPayrolls();
      if (res?.success && Array.isArray(res.data)) {
        setEmployees(res.data);
      }
    } catch (error) {
      console.error("Error fetching payrolls:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await Client.hr.departments.getAllDepartments();
      const departmentList = res?.data?.departments || [];
      setDepartments(departmentList);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };
  

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

  const departmentOptionsMain = ["All", ...departments.map((d) => d.name)];
  const departmentOptionsModal = departments.map((d) => d.name);

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.employee_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.department_name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      selectedDepartment === "All" || employee.department_name === selectedDepartment;

    return matchesSearch && matchesDepartment;
  });

  const totalEmployees = employees.length;
  const monthlyPayroll = employees.reduce((acc, emp) => acc + (parseFloat(emp.grossSalary) || 0), 0);
  const pendingPayments = employees.filter(emp => emp.status === "Pending").length;
  const averageSalary = totalEmployees > 0 ? monthlyPayroll / totalEmployees : 0;

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
              className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-[#006666]"
              onClick={() => setIsModalOpen(true)}
            >
              Process Payroll
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-[#eff4f5] shadow rounded-lg p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
            <dd className="text-lg font-medium text-gray-900">{totalEmployees}</dd>
          </div>
          <div className="bg-[#eff4f5] shadow rounded-lg p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Monthly Payroll</dt>
            <dd className="text-lg font-medium text-gray-900">₹{monthlyPayroll.toLocaleString("en-IN")}</dd>
          </div>
          <div className="bg-[#eff4f5] shadow rounded-lg p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Pending Payments</dt>
            <dd className="text-lg font-medium text-gray-900">{pendingPayments}</dd>
          </div>
          <div className="bg-[#eff4f5] shadow rounded-lg p-5">
            <dt className="text-sm font-medium text-gray-500 truncate">Average Salary</dt>
            <dd className="text-lg font-medium text-gray-900">₹{Math.round(averageSalary).toLocaleString("en-IN")}</dd>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between w-full gap-4">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border rounded-md bg-[#eff4f5]"
          />
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="md:w-52 px-4 py-2 border rounded-md bg-gray-100"
          >
            {departmentOptionsMain.map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Table */}
        <div className="bg-[#eff4f5] shadow rounded-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#006666] text-white text-left">
              <tr>
                <th className="px-6 py-3">Employee</th>
                <th className="px-6 py-3">Position</th>
                <th className="px-6 py-3">Department</th>
                <th className="px-6 py-3">Salary</th>
                <th className="px-6 py-3">Hours</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3">Last Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => (
                <tr
                  key={employee._id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedEmployee(employee)}
                >
                  <td className="px-6 py-4">{employee.employee_name}</td>
                  <td className="px-6 py-4">{employee.position_name}</td>
                  <td className="px-6 py-4">{employee.department_name}</td>
                  <td className="px-6 py-4">₹{employee.grossSalary?.toLocaleString("en-IN")}</td>
                  <td className="px-6 py-4">{employee.working_hours}h</td>
                  <td className="px-6 py-4">{getStatusBadge(employee.status)}</td>
                  <td className="px-6 py-4">{employee.last_payment_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modals */}
        {selectedEmployee && (
          <PayslipView
            employee={selectedEmployee}
            onClose={() => setSelectedEmployee(null)}
          />
        )}
        <ProcessPayrollModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedOption={modalOption}
          setSelectedOption={setModalOption}
          departmentOptions={departmentOptionsModal}
          selectedDepartment={modalDepartment}
          setSelectedDepartment={setModalDepartment}
        />
      </div>
    </div>
  );
};

export default Payroll;
