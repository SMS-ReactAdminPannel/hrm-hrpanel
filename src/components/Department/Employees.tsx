import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, type Key } from "react";
import { ArrowLeft, Plus, Trash2, Users } from "lucide-react";
import axios from "axios";
import { FONTS } from "../../constants/uiConstants";

type Employee = {
  id: string;
  name: string;
  role: string;
};

type Department = {
  id: string;
  name: string;
  description: string;
  requiredRoles: string[];
  employees: Employee[];
};

const EmployeesPage = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const navigate = useNavigate();

  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newEmployee, setNewEmployee] = useState({ name: "", role: "" });

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await axios.get(`/api/departments/${departmentId}`);
        const departmentData = {
          ...res.data,
          employees: Array.isArray(res.data.employees) ? res.data.employees : [],
          requiredRoles: Array.isArray(res.data.requiredRoles) ? res.data.requiredRoles : [],
        };
        setDepartment(departmentData);
        setLoading(false);
      } catch (err) {
        console.error("Failed to load department", err);
        setError("Department not found.");
        setLoading(false);
      }
    };
  
    fetchDepartment();
  }, [departmentId]);
  
  const handleAddEmployee = async () => {
    if (!newEmployee.name.trim() || !newEmployee.role.trim() || !department) return;

    const newEmp = {
      id: Date.now().toString(),
      name: newEmployee.name.trim(),
      role: newEmployee.role.trim(),
    };

    try {
      const res = await axios.post(`/api/departments/${departmentId}/employees`, newEmp);
      setDepartment((prev) =>
        prev ? { ...prev, employees: [...prev.employees, res.data] } : null
      );
      setNewEmployee({ name: "", role: "" });
    } catch (err) {
      console.error("Error adding employee", err);
    }
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    if (!department) return;

    try {
      await axios.delete(`/api/departments/${departmentId}/employees/${employeeId}`);
      setDepartment((prev) =>
        prev
          ? { ...prev, employees: prev.employees.filter((e) => e.id !== employeeId) }
          : null
      );
    } catch (err) {
      console.error("Error deleting employee", err);
    }
  };

  const filledRoles = department?.employees.map((emp) => emp.role) || [];
  const vacantRoles =
    department?.requiredRoles.filter((role) => !filledRoles.includes(role)) || [];

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;
  if (!department) return null;

  return (
    <div className="min-h-screen p-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <button
            onClick={() => navigate("/departments")}
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-white/30 bg-white/20 px-4 py-2.5 text-white backdrop-blur-sm transition hover:bg-white/30"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Departments
          </button>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {department.name}
            </h1>
            <p className="text-base text-white/80 sm:text-lg">{department.description}</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl bg-white/55 shadow-2xl">
          <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <h2 className="flex items-center gap-3 text-2xl font-bold text-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              {department.name} Overview
            </h2>
          </div>

          <div className="p-6">
            <div className="mb-6 grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <div className="rounded-xl bg-blue-100 p-4 shadow">
                <h4 className="text-xl font-medium text-blue-700">Total Employees</h4>
                <p className="text-2xl font-bold text-blue-800">{department.employees.length}</p>
              </div>
              <div className="rounded-xl bg-indigo-100 p-4 shadow">
                <h4 className="text-xl font-medium text-indigo-700">Active Roles</h4>
                <p className="text-2xl font-bold text-indigo-800">
                  {[...new Set(department.employees.map((e) => e.role))].length}
                </p>
              </div>
              <div className="rounded-xl bg-indigo-200 border p-4 shadow-sm">
                <div>
                  <p className="text-xl text-indigo-600">Vacant Roles</p>
                  <p className="text-xl font-bold text-slate-800">{vacantRoles.length}</p>
                </div>
              </div>
            </div>

            {/* <div className="mb-6 w-full max-w-md rounded-xl bg-slate-50 p-4 sm:p-6 shadow-md">
              <h3 className="mb-4 text-lg font-semibold text-slate-800">Add New Employee</h3>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="text"
                  placeholder="Employee Name"
                  value={newEmployee.name}
                  onChange={(e) =>
                    setNewEmployee((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500/20"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={newEmployee.role}
                  onChange={(e) =>
                    setNewEmployee((prev) => ({ ...prev, role: e.target.value }))
                  }
                  className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-blue-500/20"
                />
                <button
                  onClick={handleAddEmployee}
                  className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-2.5 text-white hover:bg-blue-700"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </button>
              </div>
            </div> */}

            <div className="overflow-hidden rounded-xl border border-slate-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-100">
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6">EMP ID</th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6">EMPLOYEE</th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6">ROLE</th>
                      <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {department.employees.length > 0 ? (
                      department.employees.map((employee, index) => (
                        <tr key={employee.id} className="transition hover:bg-slate-50">
                          <td className="px-4 py-4 text-sm font-medium text-slate-900">{index + 1}</td>
                          <td className="px-4 py-4 text-sm text-slate-700">{employee.name}</td>
                          <td className="px-4 py-4 text-sm text-slate-700">{employee.role}</td>
                          <td className="px-4 py-4">
                            <button
                              onClick={() =>
                                typeof employee.id === "string"
                                  ? handleDeleteEmployee(employee.id)
                                  : undefined
                              }
                              className="h-8 w-8 flex items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="px-4 py-12 text-center">
                          <div className="flex flex-col items-center space-y-3">
                            <div className="h-16 w-16 flex items-center justify-center rounded-full bg-slate-100">
                              <Users className="h-8 w-8 text-slate-400" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-900">No employees added yet</p>
                              <p className="text-sm text-slate-500">Use the form above to add employees</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
