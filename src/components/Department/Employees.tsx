import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, type Key } from "react";
import { ArrowLeft, Plus, Trash2, Users } from "lucide-react";
import { getdepartmentsdata} from "../../features/Department/service";
import departmentlist from "../../pages/Department/DepartmentList";



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
  // const [newEmployee, setNewEmployee] = useState({ name: "", role: "" });

   
  
    const fetchDepartment = async () => {
      try {
        const response: any = await getdepartmentsdata();
        console.log("page response", response);
        const department = response?.data;
        console.log("Department data:", department);
        setDepartment(department);
        console.log("Holidays fetched:", department);
      } catch (error) {
        console.error("Error fetching holidays:", error);
      }
     };
   
     useEffect(() => {
       fetchDepartment();
     }, []);

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