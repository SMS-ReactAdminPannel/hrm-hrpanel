// import React, { useState } from "react";
// import type { Employee } from "./Employee"; // Update the path as needed

// interface EditableEmployeeFormProps {
//     employee: Employee;
//     onSave: (updatedEmployee: Employee) => void;
//     onCancel: () => void;
// }

// const EditableEmployeeForm: React.FC<EditableEmployeeFormProps> = ({
//     employee,
//     onSave,
//     onCancel,
// }) => {
//     const [formState, setFormState] = useState<Employee>(employee);

//     const handleChange = (key: keyof Employee, value: string) => {
//         setFormState((prev) => ({
//             ...prev,
//             [key]: value,
//         }));
//     };

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         onSave(formState);
//     };

//     return (
//         <form
//             onSubmit={handleSubmit}
//             className="p-4 border rounded mt-4 bg-gray-50"
//         >
//             <div className="flex justify-end">
//                 <button
//                     type="button"
//                     onClick={onCancel}
//                     className="text-black bg-white border border-black px-2 py-1 rounded"
//                 >
//                     ✕
//                 </button>
//             </div>

//             <div className="grid grid-cols-2 gap-4 mt-2">
//                 <input
//                     type="text"
//                     value={formState.name}
//                     onChange={(e) => handleChange("name", e.target.value)}
//                     className="border p-2 rounded"
//                     placeholder="Name"
//                 />
//                 <input
//                     type="email"
//                     value={formState.email}
//                     onChange={(e) => handleChange("email", e.target.value)}
//                     className="border p-2 rounded"
//                     placeholder="Email"
//                 />
//                 <input
//                     type="text"
//                     value={formState.department}
//                     onChange={(e) => handleChange("department", e.target.value)}
//                     className="border p-2 rounded"
//                     placeholder="Department"
//                 />
//                 <input
//                     type="text"
//                     value={formState.jobTitle}
//                     onChange={(e) => handleChange("jobTitle", e.target.value)}
//                     className="border p-2 rounded"
//                     placeholder="Job Title"
//                 />
//                 <select
//                     value={formState.employmentType}
//                     onChange={(e) =>
//                         handleChange("employmentType", e.target.value as Employee["employmentType"])
//                     }
//                     className="border p-2 rounded"
//                 >
//                     <option value="Full-Time">Full-Time</option>
//                     <option value="Part-Time">Part-Time</option>
//                     <option value="Contract">Contract</option>
//                 </select>
//             </div>

//             <div className="mt-4 flex gap-2">
//                 <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                     Save
//                 </button>
//                 <button
//                     type="button"
//                     onClick={onCancel}
//                     className="bg-gray-400 text-white px-4 py-2 rounded"
//                 >
//                     Cancel
//                 </button>
//             </div>
//         </form>
//     );
// };

// export default EditableEmployeeForm;



