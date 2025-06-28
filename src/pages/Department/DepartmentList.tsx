


import React, { useState, useEffect } from "react";
import { Plus, Trash2, Users, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getdepartmentsdata } from "../../features/Department/service.ts";
import { FONTS } from "../../constants/uiConstants.tsx";
import { Search } from "lucide-react";


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


const DepartmentList: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");
  const [newDeptDescription, setNewDeptDescription] = useState("");
  const [newDeptSubDescription, setNewDeptSubDescription] = useState("");
  const [departments, setdepartments] = useState<Department[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Navigate to employees
  const handleCardClick = (dept: Department) => {
    navigate("/employees", { state: { department: dept } });
  };

  // Get name initials
  const getInitials = (name?: string) =>
    name ? name.trim().split(" ").map((n) => n[0]).join("").toUpperCase() : "";

  // Fetch departments
  const fetchdepartments = async () => {
    try {
      const response = await getdepartmentsdata();
      const visitors = response?.data ?? [];
      console.log("what is happening", response);
      console.log("visitors", visitors);
      setdepartments(visitors);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  useEffect(() => {
    fetchdepartments();
  }, []);

  
  const filteredDepartments = departments.filter((dept) =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (dept.description && dept.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
   

    <div className="min-h-screen">

  <div className="max-w-7xl mx-auto px-4">
    <div className="mb-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        {/* Title */}
        <div className="text-left">
          <h1 style={FONTS.header} className="text-4xl font-bold text-white mb-2">
            Departments
          </h1>
          <p className="text-white/80">Manage your organization's departments</p>
        </div>
        {/* Button and Search Bar */}
        <div className=" relative right-[37%] mb-5 flex items-center gap-4">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex gap-1 rounded-xl bg-[#4c469f] px-3 py-2.5 text-sm font-medium text-white"
          >
            <Plus className="h-5 w-5" />
            Create Department
          </button>
          <div className="relative w-72 rounded-xl backdrop-blur-md border border-white/30 ">
            <Search className="absolute left-3 top-2.5 text-white/60" size={18} />
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full py-2 px-9 rounded-lg bg-transparent border-none text-sm text-white/60 placeholder-white/60 focus:outline-none"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Department Cards */}
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredDepartments && filteredDepartments.map((dept, index) => (
        <div
          key={dept._id ?? `${dept.name}-${index}`}
          role="button"
          tabIndex={0}
          className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.01] transition duration-200 cursor-pointer"
        >
          <div className="relative bg-blue-100 flex justify-between items-start">
            <div className="bg-blue-500 text-white font-bold rounded-full w-12 h-12 mt-2 ml-2 mb-4 flex items-center justify-center text-lg shadow">
              {getInitials(dept.name)}
            </div>
            <h3 className="text-xl font-bold text-slate-800 mt-4 ml-3 flex-1 text-left">
              {dept.name}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                // handleDeleteDepartment(dept._id!, e);
              }}
              className="text-red-400 p-4"
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
              <div
                className="text-xs bg-blue-100 text-blue-700 rounded-full px-3 py-1 font-medium"
                onClick={() => handleCardClick(dept)}
              >
                Click to view
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* No Departments */}
    {filteredDepartments.length === 0 && (
      <div className="flex justify-center items-center h-64 text-white">
        <p>No departments found. Try a different search.</p>
      </div>
    )}
  </div>

  {/* Create Department Modal (unchanged) */}
  {isCreateModalOpen && (
      <div className="fixed inset-0 backdrop-blur-sm flex items-start  justify-center z-50 p-5">
      <style>{`
        @keyframes slideDown {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-down {
          animation: slideDown 0.8s ease-out;
        }
      `}</style>
    
      <div className="relative w-[80%] h-[80%] mt-10 ml-[17%]  animate-slide-down">
        {/* Close Button Outside Left */}
        <button
          onClick={() => setIsCreateModalOpen(false)}
          className="absolute -left-9 top-5 w-[3%] h-[7%]  z-50 bg-blue-900 rounded-l-3xl p-1"
        >
          <X className="h-5 w-5 text-white ml-1" />
        </button>
        <div className="bg-white shadow-xl p-6 w-full h-full rounded-2xl relative ">
          <h2 className="text-lg font-semibold mb-4 !text-gray-800"
          style={{...FONTS.header}}>Create Department</h2>
    
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <label className="w-40 text-sm !text-gray-700" style={{ ...FONTS.cardSubHeader }}>Department Name</label>
              <span className="">:</span>
              <input
                type="text"
                value={newDeptName}
                onChange={(e) => setNewDeptName(e.target.value)}
                placeholder="Department Name"
                className="flex-1 px-4 py-2 text-sm rounded"
              />
              <hr className="border border-gray-900 text-gray-900"/>
            
              <label className="w-40 text-sm !text-gray-700" style={{ ...FONTS.cardSubHeader }}>Description</label>
              <span className="">:</span>
              <input
                type="text"
                value={newDeptDescription}
                onChange={(e) => setNewDeptDescription(e.target.value)}
                placeholder="Description"
                className="flex-1 px-4 py-2 text-sm rounded"
              />
            
              <label className="w-40 text-sm !text-gray-700" style={{ ...FONTS.cardSubHeader }}>Sub Description</label>
              <span className="">:</span>
              <input
                type="text"
                value={newDeptSubDescription}
                onChange={(e) => setNewDeptSubDescription(e.target.value)}
                placeholder="Sub Description"
                className="flex-1 px-4 py-2 text-sm rounded"
              />
            </div>
          </div>
    
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="px-4 py-2 text-sm !text-gray-700 !bg-gray-300 border-2 border-gray-300 rounded-xl hover:!bg-gray-400" style={{...FONTS.button}}
            >
              Cancel
            </button>
            <button
              // onClick={handleCreateDepartment}
              className="px-4 py-2 text-sm bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"  style={{...FONTS.button}}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  
  )}
</div>

  );
};

export default DepartmentList;
