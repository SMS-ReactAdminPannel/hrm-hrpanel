// Imports
import React, { useState, useEffect, useMemo } from "react";
import { Plus, Trash2, Users, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  deleteDepartment,
  getAllDepartments,
  createDepartment,
} from "../../features/Department/service.ts";
import { FONTS } from "../../constants/uiConstants.tsx";
import { useDispatch, useSelector } from "react-redux";
import { selectDepartments } from "../../features/Department/redux/departmentSelector.tsx";
import { fetchAllDepartments } from "../../features/Department/redux/departmentThunk.tsx";

// Types
type Employee = {
  id: string;
  name: string;
  role: string;
};

type Department = {
  department_name: string;
  _id?: string;
  id: string;
  name: string;
  description: string;
  subDescription?: string;
  employeeCount: number;
  employees: Employee[];
};

// Component
const DepartmentList: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptDescription, setNewDeptDescription] = useState("");
  const [newDeptSubDescription, setNewDeptSubDescription] = useState("");
  const [departments, setDepartments] = useState<Department[]>([]);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const fetchDepartments = useSelector(selectDepartments)

  useEffect(()=>{
    dispatch(fetchAllDepartments())
  }, [dispatch])

  const memoizedDepartments = useMemo(()=> fetchDepartments.data || [], [fetchDepartments.data])

  console.log("memo", memoizedDepartments)

  // Fetch all departments
  // const fetchDepartments = async () => {
  //   try {
  //     const res = await getAllDepartments();
  //     console.log("Response", res)
  //     setDepartments(res.data || []);
  //   } catch (error) {
  //     console.error("Failed to fetch departments:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchDepartments();
  // }, []);

  // Create department
  const handleCreateDepartment = async () => {
    const name = newDeptName.trim();
    const description = newDeptDescription.trim();

    if (!name || !description) {
      alert("Both name and description are required.");
      return;
    }

    const payload = {
      name,
      description,
      subDescription: newDeptSubDescription.trim(),
      total_employee: 0,
    };

    try {
      const res = await createDepartment(payload);
      const newDept: Department = {
        ...res.data,
        employees: [],
        employeeCount: 0,
      };

      setDepartments((prev) => [...prev, newDept]);
      setNewDeptName("");
      setNewDeptDescription("");
      setNewDeptSubDescription("");
      setIsCreateModalOpen(false);
    } catch (error) {
      console.error("Failed to create department:", error);
      alert("Failed to create department.");
    }
  };

  // Delete department
  const handleDeleteDepartment = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteDepartment(id);
      setDepartments((prev) => prev.filter((dept) => dept._id !== id));
    } catch (error: any) {
      console.error("Failed to delete department:", error?.response || error?.message || error);
      alert("Failed to delete department.");
    }
  };

  // Navigate to employees
  const handleCardClick = (dept: Department) => {
    navigate("/employees", { state: { department: dept } });
  };

  // Get name initials
  const getInitials = (name?: string) =>
    name ? name.trim().split(" ").map((n) => n[0]).join("").toUpperCase() : "";

  return (
    <div className="min-h-screen">
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>

      <div className="max-w-7xl mx-auto">
        <div className="relative mb-8">
          <div className="text-left">
            <h1 style={FONTS.header} className="text-4xl font-bold text-white">Departments</h1>
            <p className="text-white/80">Manage your organization's departments</p>
          </div>
          <div className="absolute top-0 right-0">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-blue-700"
            >
              <Plus className="h-5 w-5" />
              Create Department
            </button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {memoizedDepartments.map((dept, index) => (
            <div
              key={dept._id ?? `${dept.name}-${index}`}
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(dept)}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.01] transition duration-200 cursor-pointer"
            >
              <div className="relative bg-blue-100 p-6 flex justify-between items-start">
                <div className="bg-blue-500 text-white font-bold rounded-full w-12 h-12 mt-4 flex items-center justify-center text-lg shadow">
                  {getInitials(dept.name)}
                </div>
                <h3 className="text-xl font-bold text-slate-800 pt-2 m-1 px-8 mb-2">
                  {dept.name}
                </h3>
                <button
                  onClick={(e) => handleDeleteDepartment(dept._id!, e)}
                  className="bg-red-400 hover:bg-red-300 text-white rounded-full p-2 shadow"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="p-6">
                <div className="bg-blue-50 p-3 rounded-md mb-3">
                  <p className="text-slate-700 text-sm line-clamp-2">{dept.description}</p>
                  {dept.subDescription && (
                    <p className="text-slate-500 text-xs mt-1 line-clamp-1">{dept.subDescription}</p>
                  )}
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">
                      {dept.employeeCount ?? dept.employees?.length ?? 0} Employee
                      {(dept.employeeCount ?? dept.employees?.length ?? 0) !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <div className="text-xs bg-blue-100 text-blue-700 rounded-full px-3 py-1 font-medium">
                    Click to view
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {departments.length === 0 && (
          <div className="flex justify-center items-center h-64 text-white">
            <p>No departments yet. Click 'Create Department' to add one.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative animate-slide-up">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-bold border-b mb-4">Create Department</h2>
            <div className="space-y-4">
              <input
                type="text"
                value={newDeptName}
                onChange={(e) => setNewDeptName(e.target.value)}
                placeholder="Department Name"
                className="w-full border rounded px-4 py-2 text-sm"
              />
              <input
                type="text"
                value={newDeptDescription}
                onChange={(e) => setNewDeptDescription(e.target.value)}
                placeholder="Description"
                className="w-full border rounded px-4 py-2 text-sm"
              />
              <input
                type="text"
                value={newDeptSubDescription}
                onChange={(e) => setNewDeptSubDescription(e.target.value)}
                placeholder="Sub Description"
                className="w-full border rounded px-4 py-2 text-sm"
              />
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="px-4 py-2 text-sm bg-slate-100 rounded hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateDepartment}
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;


