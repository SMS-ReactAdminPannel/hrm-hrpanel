import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState, type Key } from "react";
import { ArrowLeft, Plus, Trash2, Users } from "lucide-react";
import { getAllDepartments } from "../../features/Department/service";
import axios from "axios";
import { FONTS } from "../../constants/uiConstants";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllDepartments } from "../../features/Department/redux/departmentThunk";
import { selectDepartments } from "../../features/Department/redux/departmentSelector";

type Employee = {
  id: string;
  name: string;
  role: string;
};

type Department = {
  // id: string;
  // name: string;
  // description: string;
  // requiredRoles: string[];
  // employees: Employee[];

  _id?: string;
  id: string;
  name: string;
  description: string;
  subDescription?: string;
  employeeCount: number;
  employees: Employee[];
};

const EmployeesPage = () => {
  const navigate = useNavigate();

  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newEmployee, setNewEmployee] = useState({ name: "", role: "" });
  const dispatch = useDispatch();
  const fetchDepartments = useSelector(selectDepartments)
   
  
    // const fetchDepartment = async () => {
    //   try {
    //     const response: any = await getAllDepartments();
    //     console.log("page response", response);
    //     const department = response?.data;
    //     console.log("Department data:", department);
    //     setDepartment(department);
    //     console.log("Holidays fetched:", department);
    //   } catch (error) {
    //     console.error("Error fetching holidays:", error);
    //   }
    //  };
   
     useEffect(() => {
       dispatch(fetchAllDepartments())
     }, [dispatch]);
  
  const memoizedDepartments = useMemo(()=> fetchDepartments.data || [], [fetchDepartments.data])
  console.log("memoized", memoizedDepartments)
  useEffect(() => {
  if (departmentId && memoizedDepartments.length > 0) {
    const dept = memoizedDepartments.find((d) => d.id === departmentId);
    if (dept) {
      setDepartment(dept);
      setLoading(false);
    } else {
      setError("Department not found");
      setLoading(false);
    }
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

  // const filledRoles = department?.employees.map((emp) => emp.role) || [];
  // const vacantRoles =
  //   department?.requiredRoles.filter((role) => !filledRoles.includes(role)) || [];

  if (loading) return <div className="text-white p-6">Loading...</div>;
  if (error) return <div className="text-red-500 p-6">{error}</div>;
  if (!department) return null;


  return (
    <div className="min-h-screen">
      <div className="max-w-6xl">
      <div className="mb-5 flex flex-col    ">
        <div className="flex-1 flex justify-start">
          <button
            onClick={() => navigate("/departments")}
            className="inline-flex w-fit items-center gap-2 rounded-xl py-4 text-white transition px-3"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        </div>
        <div className="space-y-1">
        <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {department.name}
        </h1>
        </div>
      </div>

      <div className=" rounded-2xl  w-full">
        <div className="px-3">
        <div className="mb-6 grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="  shadow-sm">
            <p className="text-xl !text-gray-900">Vacant Roles</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
            <tr className="bg-slate-100">
              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6">EMP ID</th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6">EMP NAME </th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6">ROLE</th>
              <th className="px-4 py-4 text-left text-sm font-semibold text-slate-700 sm:px-6">ACTION</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
            {department.employees && department.employees.length > 0 ? (
              department.employees.map((employee, index) => (
              <tr key={employee.id} className="transition hover:bg-slate-50">
                <td className="px-4 py-4 text-sm font-medium text-slate-900">{employee.id ||"no data"}</td>
                <td className="px-4 py-4 text-sm text-slate-700">{employee.name || "no data"}</td>
                <td className="px-4 py-4 text-sm text-slate-700">{employee.role || "no data"}</td>
                <td className="px-4 py-4"></td>
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