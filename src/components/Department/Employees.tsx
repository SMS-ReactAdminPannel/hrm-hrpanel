import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Users } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDepartments } from "../../features/Department/redux/departmentThunk";
import { selectDepartments } from "../../features/Department/redux/departmentSelector";
import axios from "axios";

type Employee = {
  id: string;
  name: string;
  role: string;
};

type Department = {
  _id?: string;
  id: string;
  name: string;
  description: string;
  subDescription?: string;
  employeeCount: number;
  employees: Employee[];
};

const EmployeesPage = () => {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchDepartments = useSelector(selectDepartments);

  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newEmployee, setNewEmployee] = useState({ name: "", role: "" });

  const memoizedDepartments = useMemo(
    () => fetchDepartments.data || [],
    [fetchDepartments.data]
  );

  console.log("mem00", memoizedDepartments)
  useEffect(() => {
    dispatch(fetchAllDepartments());
  }, [dispatch]);

  useEffect(() => {
    if (!departmentId) {
      setError("Invalid department ID");
      setLoading(false);
      return;
    }

    if (memoizedDepartments.length > 0) {
      const dept = memoizedDepartments.find((d) => d.id === departmentId);
      if (dept) {
        setDepartment(dept);
        setError("");
      } else {
        setError("Department not found");
      }
      setLoading(false);
    }
  }, [memoizedDepartments, departmentId]);

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

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;
  if (!department) return null;

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-start">
          <button
            onClick={() => navigate("/departments")}
            className="inline-flex items-center gap-2 rounded-xl py-2 px-4 text-white bg-gray-700 hover:bg-gray-600 transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>

        <h1 className="text-3xl font-bold text-white">{department.name}</h1>

        <div className="space-y-4">
          <div className="bg-slate-100 p-4 rounded-xl">
            <p className="text-xl text-gray-900">Vacant Roles</p>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">EMP ID</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">EMP NAME</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">ROLE</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {department.employees && department.employees.length > 0 ? (
                    department.employees.map((employee) => (
                      <tr key={employee.id} className="hover:bg-slate-50 transition">
                        <td className="px-4 py-3 text-sm font-medium text-slate-900">{employee.id}</td>
                        <td className="px-4 py-3 text-sm text-slate-700">{employee.name}</td>
                        <td className="px-4 py-3 text-sm text-slate-700">{employee.role}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => handleDeleteEmployee(employee.id)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
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
                          <p className="text-sm font-medium text-slate-900">No employees added yet</p>
                          <p className="text-sm text-slate-500">Use the form below to add employees</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add Employee Form */}
          <div className="mt-6 space-y-3">
            <input
              type="text"
              placeholder="Employee Name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border focus:outline-none"
            />
            <input
              type="text"
              placeholder="Employee Role"
              value={newEmployee.role}
              onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
              className="w-full px-4 py-2 rounded-xl border focus:outline-none"
            />
            <button
              onClick={handleAddEmployee}
              className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-500 transition"
            >
              Add Employee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeesPage;
