// "use client";

// import React, { useState, useEffect } from "react";
// import { Plus, Users, Trash2, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import HttpClient from "../../api/httpClient";
// import { API_END_POINTS } from "../../api/httpEndpoints";

// type Employee = {
//   id: string;
//   name: string;
//   role: string;
// };

// type Department = {
//   _id: string;
//   id: string;
//   name: string;
//   description: string;
//   subDescription: string;
//   employeeCount: number;
//   employees: Employee[];
// };

// const DepartmentList: React.FC = () => {
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [newDeptName, setNewDeptName] = useState("");
//   const [newDeptDescription, setNewDeptDescription] = useState("");
//   const [newDeptSubDescription, setNewDeptSubDescription] = useState("");
//   const [departments, setDepartments] = useState<Department[]>([]);

//   const navigate = useNavigate();

//   const fetchDepartments = async () => {
//     try {
//       const res = await HttpClient.get(API_END_POINTS.department.getAll);
//       setDepartments(res.data);
//     } catch (error) {
//       console.error("Failed to fetch departments:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const handleCreateDepartment = async () => {
//     const trimmedName = newDeptName.trim();
//     const trimmedDesc = newDeptDescription.trim();
//     const trimmedSubDesc = newDeptSubDescription.trim();

//     if (!trimmedName || !trimmedDesc || !trimmedSubDesc) {
//       alert("All fields are required.");
//       return;
//     }

//     const newId = trimmedName.toLowerCase().replace(/\s+/g, "-");

//     const payload = {
//       id: newId,
//       name: trimmedName,
//       description: trimmedDesc,
//       subDescription: trimmedSubDesc,
//     };

//     try {
//       const res = await HttpClient.post(API_END_POINTS.department.create, payload);
//       const newDept: Department = {
//         ...res.data,
//         employees: [],
//         employeeCount: 0,
//       };

//       setDepartments([...departments, newDept]);
//       setNewDeptName("");
//       setNewDeptDescription("");
//       setNewDeptSubDescription("");
//       setIsCreateModalOpen(false);
//     } catch (error: any) {
//       if (error.response) {
//         console.error("Backend error:", error.response.data);
//         alert(`Failed to create department: ${error.response.data.message || "Unknown error"}`);
//       } else if (error.request) {
//         console.error("No response from server:", error.request);
//         alert("No response from server.");
//       } else {
//         console.error("Error setting up request:", error.message);
//         alert("Error creating department.");
//       }
//     }
//   };

//   const handleDeleteDepartment = (id: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     setDepartments(departments.filter((dept) => dept._id !== id));
//   };

//   const handleCardClick = (dept: any) => {
//     navigate("/employees", { state: { department: dept } });
//   };

//   const getInitials = (name: string) =>
//     name
//       .split(" ")
//       .map((n) => n[0])
//       .join("")
//       .toUpperCase();

//   return (
//     <div className="min-h-screen">
//       <div className="max-w-7xl mx-auto">
//         <div className="relative mb-8">
//           <div className="text-left">
//             <h1 className="text-4xl font-bold text-white">Departments</h1>
//             <p className="text-white/80">Manage your organization's departments</p>
//           </div>
//           <div className="absolute top-0 right-0">
//             <button
//               onClick={() => setIsCreateModalOpen(true)}
//               className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-medium text-white shadow transition hover:bg-blue-700"
//             >
//               <Plus className="h-5 w-5" />
//               Create Department
//             </button>
//           </div>
//         </div>

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {departments.map((dept, index) => (
//             <div
//               key={dept._id ?? `${dept.name}-${index}`}
//               role="button"
//               tabIndex={0}
//               onClick={() => handleCardClick(dept)}
//               className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transform hover:scale-[1.01] transition duration-200 cursor-pointer"
//             >
//               <div className="relative bg-blue-100 p-6 flex justify-between items-start">
//                 <div className="bg-blue-500 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center text-lg shadow">
//                   {getInitials(dept.name)}
//                 </div>
//                 <button
//                   onClick={(e) => handleDeleteDepartment(dept._id, e)}
//                   aria-label="Delete Department"
//                   className="bg-red-400 hover:bg-red-300 text-white rounded-full p-2 shadow"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </button>
//               </div>
//               <div className="p-6">
//                 <h3 className="text-xl font-bold text-slate-800 mb-1">{dept.name}</h3>
//                 <p className="text-slate-700 text-sm line-clamp-2">{dept.description}</p>
//                 <p className="text-slate-500 text-xs mt-1 line-clamp-1">{dept.subDescription}</p>
//                 <div className="flex justify-between items-center mt-4 border-t pt-3">
//                   <div className="flex items-center gap-2 text-blue-600">
//                     <Users className="h-4 w-4" />
//                     <span className="text-sm">
//                       {dept.employees.length} Employee{dept.employees.length !== 1 ? "s" : ""}
//                     </span>
//                   </div>
//                   <div className="text-xs bg-blue-100 text-blue-700 rounded-full px-3 py-1 font-medium">
//                     Click to view
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {departments.length === 0 && (
//           <div className="flex justify-center items-center h-64 text-white">
//             <p>No departments yet. Click 'Create Department' to add one.</p>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {isCreateModalOpen && (
//         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
//           <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 border border-white">
//             <button
//               onClick={() => setIsCreateModalOpen(false)}
//               className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
//             >
//               <X className="h-5 w-5" />
//             </button>
//             <h2 className="text-lg font-bold mb-4">Create Department</h2>
//             <div className="space-y-4">
//               <input
//                 type="text"
//                 value={newDeptName}
//                 onChange={(e) => setNewDeptName(e.target.value)}
//                 placeholder="Department Name"
//                 className="w-full border rounded px-4 py-2 text-sm"
//               />
//               <input
//                 type="text"
//                 value={newDeptDescription}
//                 onChange={(e) => setNewDeptDescription(e.target.value)}
//                 placeholder="Description"
//                 className="w-full border rounded px-4 py-2 text-sm"
//               />
//               <input
//                 type="text"
//                 value={newDeptSubDescription}
//                 onChange={(e) => setNewDeptSubDescription(e.target.value)}
//                 placeholder="Sub Description"
//                 className="w-full border rounded px-4 py-2 text-sm"
//               />
//             </div>
//             <div className="flex justify-end gap-3 mt-6">
//               <button
//                 onClick={() => setIsCreateModalOpen(false)}
//                 className="px-4 py-2 text-sm bg-slate-100 rounded hover:bg-slate-200"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCreateDepartment}
//                 className="px-4 py-2 text-sm bg-[#006666]  text-white rounded"
//               >
//                 Create
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DepartmentList;


// 









// import React, { useState, useEffect } from "react";
// import { Plus, Trash2 } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Client from "../../api/httpClient";
// import { getAllDepartments } from "../../features/Department/service";

// type Employee = {
//   id: string;
//   name: string;
//   role: string;
// };

// type Department = {
//   _id?: string;
//   id: string;
//   name: string;
//   description: string;
//   subDescription?: string;
//   employeeCount: number;
//   employees: Employee[];
// };

// const DepartmentList: React.FC = () => {
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [newDeptName, setNewDeptName] = useState("");
//   const [newDeptDescription, setNewDeptDescription] = useState("");
//   const [departments, setDepartments] = useState<Department[]>([]);
//   const navigate = useNavigate();

//   const fetchDepartments = async () => {
//     try {
//       const res = await getAllDepartments()
//       console.log("Fetched Departments:", res.data);
//       setDepartments(res.data);
//     } catch (error) {
//       console.error("Failed to fetch departments:", error);
//     }
//   };

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const handleCreateDepartment = async () => {
//     const name = newDeptName.trim();
//     const description = newDeptDescription.trim();

//     if (!name || !description) {
//       alert("Both name and description are required.");
//       return;
//     }

//     const id = name.toLowerCase().replace(/\s+/g, "-");

//     const payload = {
//       id,
//       name,
//       description,
//       requiredRoles: [],
//     };

//     try {
//       const newDept = await Client.hr.department.createDepartment(payload);
//       setDepartments([...departments, { ...newDept, employees: [], employeeCount: 0 }]);
//       setNewDeptName("");
//       setNewDeptDescription("");
//       setIsCreateModalOpen(false);
//     } catch (error: any) {
//       console.error("Failed to create department:", error);
//       alert("Failed to create department.");
//     }
//   };

//   const handleDeleteDepartment = async (id: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     try {
//       await Client.hr.department.deleteDepartment(id);
//       setDepartments(departments.filter((dept) => dept.id !== id));
//     } catch (error) {
//       console.error("Failed to delete department:", error);
//       alert("Failed to delete department.");
//     }
//   };

//   const handleCardClick = (dept: Department) => {
//     navigate("/employees", { state: { department: dept } });
//   };

//   const getInitials = (name?: string) =>
//     name
//       ? name
//           .trim()
//           .split(" ")
//           .map((n) => n[0])
//           .join("")
//           .toUpperCase()
//       : "";
  

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-xl font-semibold">Departments</h1>
//         <button
//           onClick={() => setIsCreateModalOpen(true)}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           <Plus size={16} />
//           Create Department
//         </button>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {departments.map((dept) => (
//           <div
//             key={dept.id}
//             className="bg-white shadow rounded-lg p-4 cursor-pointer relative hover:shadow-md transition"
//             onClick={() => handleCardClick(dept)}
//           >
//             <div className="absolute top-2 right-2 text-red-500 hover:text-red-700">
//               <Trash2
//                 size={18}
//                 onClick={(e) => handleDeleteDepartment(dept.id, e)}
//               />
//             </div>
//             <div className="flex items-center justify-between mb-2">
//               <div className="bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm font-medium">
//                 {getInitials(dept.name)}
//               </div>
//               <div className="text-sm text-gray-500">
//                 {dept.employeeCount} employees
//               </div>
//             </div>
//             <h2 className="text-lg font-semibold mb-1">{dept.name}</h2>
//             <p className="text-sm text-gray-600">{dept.description}</p>
//           </div>
//         ))}
//       </div>

//       {/* Create Modal */}
//       {isCreateModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-md relative">
//             <button
//               className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
//               onClick={() => setIsCreateModalOpen(false)}
//             >
//               ✕
//             </button>
//             <h3 className="text-lg font-semibold mb-4">Create Department</h3>
//             <input
//               type="text"
//               placeholder="Department Name"
//               value={newDeptName}
//               onChange={(e) => setNewDeptName(e.target.value)}
//               className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
//             />
//             <textarea
//               placeholder="Description"
//               value={newDeptDescription}
//               onChange={(e) => setNewDeptDescription(e.target.value)}
//               className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
//             />
//             <button
//               onClick={handleCreateDepartment}
//               className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
//             >
//               Create
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DepartmentList;




import React, { useState, useEffect } from "react";
import { Plus, Trash2, Users, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  deleteDepartment,
  getAllDepartments,
  createDepartment,
  updateDepartment,
} from "../../features/Department/service.ts";
import Client from "../../api/index.ts";

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
  const [departments, setDepartments] = useState<Department[]>([]);
  const navigate = useNavigate();

  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      const res = await getAllDepartments();
      setDepartments(res.data || []);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Create department
  const handleCreateDepartment = async () => {
    const name = newDeptName.trim();
    const description = newDeptDescription.trim();
  
    if (!name || !description) {
      alert("Both name and description are required.");
      return;
    }
  
    const id = name.toLowerCase().replace(/\s+/g, "-");
  
    const payload = {
      name: name,
      description: newDeptDescription.trim(),
      subDescription: newDeptSubDescription,
      total_employee: 0,
    };
  
    try {
      const res = await createDepartment(payload);
      const newDept: Department = {
        ...res.data,
        // subDescription: newDeptSubDescription,
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
  

  // ✅ Fixed Delete department
  const handleDeleteDepartment = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      //  await new Client().hr.departments.deleteDepartment(id)
      const res = await deleteDepartment(id);
      
      // setDepartments(departments.filter((dept) => dept.id !== id));
    } catch (error: any) {
      console.error("Failed to delete department:", error?.response || error?.message || error);
      alert("Failed to delete department.");
    }
  };
  

  // Navigate to department's employee list
  const handleCardClick = (dept: Department) => {
    navigate("/employees", { state: { department: dept } });
  };

  // Get name initials
  const getInitials = (name?: string) =>
    name
      ? name
          .trim()
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      : "";
 
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-8">
          <div className="text-left">
            <h1 className="text-4xl font-bold text-white">Departments</h1>
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
          {departments.map((dept, index) => (
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
                <h3 className="text-xl font-bold text-slate-800   pt-2 m-1 px-8 mb-2  ">
    {dept.name}
  </h3>
                <button
                  onClick={(e) => handleDeleteDepartment(dept._id, e)}
                  aria-label="Delete Department"
                  className="bg-red-400 hover:bg-red-300 text-white rounded-full p-2 shadow"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="p-6">
  {/* Heading: Department Name */}
  

  {/* Description block with blue background */}
  <div className="bg-blue-50 p-3 rounded-md mb-3">
    <p className="text-slate-700 text-sm line-clamp-2">{dept.description}</p>
    {dept.subDescription && (
      <p className="text-slate-500 text-xs mt-1 line-clamp-1">{dept.subDescription}</p>
    )}
  </div>

  {/* Footer: Employee count + CTA */}
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
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 border border-white">
            <button
              onClick={() => setIsCreateModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 className="text-lg font-bold mb-4">Create Department</h2>
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
                className="px-4 py-2 text-sm bg-indigo-600 text-white rounded"
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

