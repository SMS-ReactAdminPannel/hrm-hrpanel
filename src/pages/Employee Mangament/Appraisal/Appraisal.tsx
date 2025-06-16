// import React, { useState, useCallback, useMemo, useEffect } from "react";
// import {
//   User,
//   Calendar,
//   Star,
//   TrendingUp,
//   Plus,
//   ArrowLeft,
//   X,
//   Eye,
//   Check,
//   Search,
// } from "lucide-react";
// import { FONTS } from "../../../constants/uiConstants";
// import Reports from "../Reports/Reports";
// import { getAllAppraisals } from "../../../features/Appraisal/service";

// interface Employee {
//   id: string;
//   name: string;
//   position: string;
//   department: string;
//   rating: number;
//   lastAppraisal: string;
//   nextAppraisal: string;
//   status: "pending" | "in-progress" | "completed";
// }

// interface AppraisalCriteria {
//   id: string;
//   category: string;
//   description: string;
//   weight: number;
//   rating: number;
//   comments: string;
// }

// // Memoized StarRating component
// const StarRating = React.memo<{
//   rating: number;
//   readonly?: boolean;
//   onChange?: (rating: number) => void;
// }>(({ rating, readonly = false, onChange }) => {
//   const handleStarClick = useCallback(
//     (star: number) => {
//       if (!readonly && onChange) {
//         onChange(star);
//       }
//     },
//     [readonly, onChange]
//   );

//   return (
//     <div className="flex gap-1">
//       {[1, 2, 3, 4, 5].map((star) => (
//         <Star
//           key={star}
//           className={`w-5 h-5 ${
//             star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
//           } ${!readonly ? "cursor-pointer" : ""}`}
//           onClick={() => handleStarClick(star)}
//         />
//       ))}
//     </div>
//   );
// });

// StarRating.displayName = "StarRating";

// // Memoized SearchInput component
// const SearchInput = React.memo<{
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
// }>(({ value, onChange, placeholder }) => {
//   const handleChange = useCallback(
//     (e: React.ChangeEvent<HTMLInputElement>) => {
//       onChange(e.target.value);
//     },
//     [onChange]
//   );

//   return (
//     <div className="relative">
//       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
//       <input
//         type="text"
//         placeholder={placeholder}
//         className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent transition-all duration-200"
//         value={value}
//         onChange={handleChange}
//       />
//     </div>
//   );
// });

// SearchInput.displayName = "SearchInput";

// // Memoized TextArea component
// const TextArea = React.memo<{
//   value: string;
//   onChange: (value: string) => void;
//   placeholder?: string;
//   rows?: number;
//   id: string;
// }>(({ value, onChange, placeholder, rows = 3, id }) => {
//   const handleChange = useCallback(
//     (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//       onChange(e.target.value);
//     },
//     [onChange]
//   );

//   return (
//     <textarea
//       id={id}
//       value={value}
//       onChange={handleChange}
//       className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-[#006666] focus:border-[#006666]"
//       rows={rows}
//       placeholder={placeholder}
//     />
//   );
// });

// TextArea.displayName = "TextArea";

// const HRMAppraisalSystem = () => {
//   const [activeTab, setActiveTab] = useState<
//     "dashboard" | "appraisal" | "reports"
//   >("dashboard");
//   const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
//     null
//   );
//   const [showAppraisalModal, setShowAppraisalModal] = useState(false);
//   const [modalMode, setModalMode] = useState<"select" | "view" | "create">(
//     "select"
//   );
//   const [modalEmployee, setModalEmployee] = useState<Employee | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [newAppraisalData, setNewAppraisalData] = useState<{
//     employeeId: string;
//     criteria: AppraisalCriteria[];
//   }>({
//     employeeId: "",
//     criteria: [
//       {
//         id: "1",
//         category: "Technical Skills",
//         description: "Proficiency in required technologies and tools",
//         weight: 25,
//         rating: 0,
//         comments: "",
//       },
//       {
//         id: "2",
//         category: "Communication",
//         description: "Verbal and written communication effectiveness",
//         weight: 20,
//         rating: 0,
//         comments: "",
//       },
//       {
//         id: "3",
//         category: "Teamwork",
//         description: "Collaboration and team contribution",
//         weight: 20,
//         rating: 0,
//         comments: "",
//       },
//       {
//         id: "4",
//         category: "Problem Solving",
//         description: "Analytical thinking and solution-oriented approach",
//         weight: 20,
//         rating: 0,
//         comments: "",
//       },
//       {
//         id: "5",
//         category: "Initiative",
//         description: "Proactive approach and self-motivation",
//         weight: 15,
//         rating: 0,
//         comments: "",
//       },
//     ],
//   });
//   const [appraisals, setAppraisals] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//   const fetchAppraisals = async () => {
//   setLoading(true);
//   try {
//     const response: any = await getAllAppraisals();
    
//     // The actual array is at response.data.data
//     const dataArray = Array.isArray(response.data?.data) ? response.data.data : [];
//     console.log('appraisal arrayed data',dataArray)
//     const mapped = dataArray.map((item: any) => ({
//       _id: item._id,
//       Employee: item.Employee || item.name || "",
//       Position: item.Position || item.position || "",
//       Rating: item.Rating || item.rating || 0,
//       Status: item.Status || item.status || "pending",
//       department: item.department || "",
//       ProjectPeriod: item.ProjectPeriod || "",
//       // Add other fields as needed
//     }));
//     setAppraisals(mapped);
//   } catch (error) {
//     console.error("Error fetching appraisals:", error);
//   } finally {
//     setLoading(false);
//   }
// };
// fetchAppraisals();
//   }, []);

//   // Static employee data
//   const employees = useMemo<Employee[]>(
//     () => [
//       {
//         id: "1",
//         name: "Siva Shankar",
//         position: "Senior Developer",
//         department: "Engineering",
//         rating: 4.5,
//         lastAppraisal: "2024-01-15",
//         nextAppraisal: "2024-07-15",
//         status: "completed",
//       },
//       {
//         id: "2",
//         name: "Surya",
//         position: "Product Manager",
//         department: "Product",
//         rating: 4.2,
//         lastAppraisal: "2024-02-20",
//         nextAppraisal: "2024-08-20",
//         status: "in-progress",
//       },
//       {
//         id: "3",
//         name: "Suruthi",
//         position: "UX Designer",
//         department: "Design",
//         rating: 4.8,
//         lastAppraisal: "2024-03-10",
//         nextAppraisal: "2024-09-10",
//         status: "pending",
//       },
//     ],
//     []
//   );

//   // Memoized filtered employees
//   const filteredEmployees = useMemo(() => {
//     if (!searchTerm) return employees;

//     const term = searchTerm.toLowerCase();
//     return employees.filter(
//       (employee) =>
//         employee.name.toLowerCase().includes(term) ||
//         employee.position.toLowerCase().includes(term) ||
//         employee.department.toLowerCase().includes(term)
//     );
//   }, [employees, searchTerm]);

//   // Stable callback for search
//   const handleSearchChange = useCallback((value: string) => {
//     setSearchTerm(value);
//   }, []);

//   // Static appraisal data
//   const appraisalDataMap = useMemo(
//     () => ({
//       "1": [
//         {
//           id: "1",
//           category: "Technical Skills",
//           description: "Proficiency in required technologies and tools",
//           weight: 25,
//           rating: 5,
//           comments:
//             "Excellent technical skills, always up-to-date with latest technologies. Demonstrates strong problem-solving abilities.",
//         },
//         {
//           id: "2",
//           category: "Communication",
//           description: "Verbal and written communication effectiveness",
//           weight: 20,
//           rating: 4,
//           comments:
//             "Good communication skills. Could improve presentation skills for client meetings.",
//         },
//         {
//           id: "3",
//           category: "Teamwork",
//           description: "Collaboration and team contribution",
//           weight: 20,
//           rating: 5,
//           comments:
//             "Outstanding team player. Mentors junior developers and contributes positively to team dynamics.",
//         },
//         {
//           id: "4",
//           category: "Problem Solving",
//           description: "Analytical thinking and solution-oriented approach",
//           weight: 20,
//           rating: 4,
//           comments:
//             "Strong analytical skills. Consistently finds efficient solutions to complex problems.",
//         },
//         {
//           id: "5",
//           category: "Initiative",
//           description: "Proactive approach and self-motivation",
//           weight: 15,
//           rating: 4,
//           comments:
//             "Shows good initiative in taking on challenging projects. Could be more proactive in suggesting process improvements.",
//         },
//       ],
//       "2": [
//         {
//           id: "1",
//           category: "Technical Skills",
//           description: "Proficiency in required technologies and tools",
//           weight: 25,
//           rating: 4,
//           comments:
//             "Good understanding of product management tools and methodologies. Stays current with industry trends.",
//         },
//         {
//           id: "2",
//           category: "Communication",
//           description: "Verbal and written communication effectiveness",
//           weight: 20,
//           rating: 5,
//           comments:
//             "Excellent communication skills. Great at stakeholder management and cross-functional collaboration.",
//         },
//         {
//           id: "3",
//           category: "Teamwork",
//           description: "Collaboration and team contribution",
//           weight: 20,
//           rating: 4,
//           comments:
//             "Works well with different teams. Could improve coordination between engineering and design teams.",
//         },
//         {
//           id: "4",
//           category: "Problem Solving",
//           description: "Analytical thinking and solution-oriented approach",
//           weight: 20,
//           rating: 4,
//           comments:
//             "Good at identifying user problems and market opportunities. Strategic thinking is developing well.",
//         },
//         {
//           id: "5",
//           category: "Initiative",
//           description: "Proactive approach and self-motivation",
//           weight: 15,
//           rating: 4,
//           comments:
//             "Takes initiative in driving product roadmap. Actively seeks feedback from users and stakeholders.",
//         },
//       ],
//       "3": [
//         {
//           id: "1",
//           category: "Technical Skills",
//           description: "Proficiency in required technologies and tools",
//           weight: 25,
//           rating: 5,
//           comments:
//             "Exceptional design skills with mastery of design tools. Creates innovative and user-friendly interfaces.",
//         },
//         {
//           id: "2",
//           category: "Communication",
//           description: "Verbal and written communication effectiveness",
//           weight: 20,
//           rating: 5,
//           comments:
//             "Outstanding communication skills. Excellent at presenting design concepts and rationale to stakeholders.",
//         },
//         {
//           id: "3",
//           category: "Teamwork",
//           description: "Collaboration and team contribution",
//           weight: 20,
//           rating: 5,
//           comments:
//             "Excellent collaborator. Works seamlessly with product and engineering teams to deliver great user experiences.",
//         },
//         {
//           id: "4",
//           category: "Problem Solving",
//           description: "Analytical thinking and solution-oriented approach",
//           weight: 20,
//           rating: 5,
//           comments:
//             "Exceptional problem-solving skills. Conducts thorough user research and creates data-driven design solutions.",
//         },
//         {
//           id: "5",
//           category: "Initiative",
//           description: "Proactive approach and self-motivation",
//           weight: 15,
//           rating: 4,
//           comments:
//             "Shows great initiative in improving design processes and user experience. Leads design thinking workshops.",
//         },
//       ],
//     }),
//     []
//   );

//   const getAppraisalData = useCallback(
//     (employeeId: string): AppraisalCriteria[] => {
//       return (
//         appraisalDataMap[employeeId as keyof typeof appraisalDataMap] || []
//       );
//     },
//     [appraisalDataMap]
//   );

//   const calculateOverallRating = useCallback(
//     (criteria: AppraisalCriteria[]) => {
//       const totalWeightedScore = criteria.reduce(
//         (sum, criterion) => sum + (criterion.rating * criterion.weight) / 100,
//         0
//       );
//       return totalWeightedScore;
//     },
//     []
//   );

//   const getStatusColor = useCallback((status: string) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-100 text-green-800";
//       case "in-progress":
//         return "bg-yellow-100 text-yellow-800";
//       case "pending":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   }, []);

//   // Stable callback for criteria changes
//   const handleCriteriaChange = useCallback(
//     (id: string, field: string, value: any) => {
//       setNewAppraisalData((prev) => ({
//         ...prev,
//         criteria: prev.criteria.map((criterion) =>
//           criterion.id === id ? { ...criterion, [field]: value } : criterion
//         ),
//       }));
//     },
//     []
//   );

//   // Stable callback for comments change
//   const handleCommentsChange = useCallback(
//     (criterionId: string) => {
//       return (value: string) => {
//         handleCriteriaChange(criterionId, "comments", value);
//       };
//     },
//     [handleCriteriaChange]
//   );

//   // Stable callback for rating change
//   const handleRatingChange = useCallback(
//     (criterionId: string) => {
//       return (rating: number) => {
//         handleCriteriaChange(criterionId, "rating", rating);
//       };
//     },
//     [handleCriteriaChange]
//   );

//   const handleSubmitNewAppraisal = useCallback(() => {
//     console.log("Submitting new appraisal:", {
//       employeeId: newAppraisalData.employeeId,
//       criteria: newAppraisalData.criteria,
//       overallRating: calculateOverallRating(newAppraisalData.criteria),
//     });

//     alert("Appraisal submitted successfully!");

//     setNewAppraisalData({
//       employeeId: "",
//       criteria: [
//         {
//           id: "1",
//           category: "Technical Skills",
//           description: "Proficiency in required technologies and tools",
//           weight: 25,
//           rating: 0,
//           comments: "",
//         },
//         {
//           id: "2",
//           category: "Communication",
//           description: "Verbal and written communication effectiveness",
//           weight: 20,
//           rating: 0,
//           comments: "",
//         },
//         {
//           id: "3",
//           category: "Teamwork",
//           description: "Collaboration and team contribution",
//           weight: 20,
//           rating: 0,
//           comments: "",
//         },
//         {
//           id: "4",
//           category: "Problem Solving",
//           description: "Analytical thinking and solution-oriented approach",
//           weight: 20,
//           rating: 0,
//           comments: "",
//         },
//         {
//           id: "5",
//           category: "Initiative",
//           description: "Proactive approach and self-motivation",
//           weight: 15,
//           rating: 0,
//           comments: "",
//         },
//       ],
//     });
//     setShowAppraisalModal(false);
//     setModalMode("select");
//   }, [newAppraisalData, calculateOverallRating]);

//   // Memoized Dashboard component
//   const Dashboard = useMemo(
//     () => (
//       <div className="space-y-6">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
//           <div className="bg-[#eff4f5] rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">
//                   Total Employees
//                 </p>
//                 <p className="text-2xl font-bold text-gray-900">156</p>
//               </div>
//               <div className=" lg:p-2 bg-blue-100 rounded-md">
//                 <User className="w-4 h-4 lg:w-4 lg:h-4 text-blue-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-[#eff4f5] rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">
//                   Pending Reviews
//                 </p>
//                 <p className="text-2xl  font-bold text-gray-900">23</p>
//               </div>
//               <div className=" lg:p-2 bg-red-100 rounded-lg">
//                 <Calendar className="w-4 h-4 lg:w-4 lg:h-4 text-red-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-[#eff4f5] rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Avg Rating</p>
//                 <p className="text-2xl font-bold text-gray-900">4.3</p>
//               </div>
//               <div className=" lg:p-2 bg-yellow-100 rounded-lg">
//                 <Star className="w-4 h-4 lg:w-4 lg:h-4 text-yellow-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-[#eff4f5] rounded-xl shadow-sm border border-gray-200 p-4 lg:p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-medium text-gray-600">Completed</p>
//                 <p className="text-2xl  font-bold text-gray-900">89%</p>
//               </div>
//               <div className=" lg:p-2 bg-green-100 rounded-lg">
//                 <TrendingUp className="w-4 h-4 lg:w-4 lg:h-4 text-green-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Employee List with Search */}
//         <div className="bg-[#eff4f5] rounded-md shadow-sm border border-gray-200">
//           <div className="p-4 md:p-6 border-b border-gray-200 flex flex-row md:flex-row md:justify-between md:items-center gap-4">
//             {/* Search Input */}
//             <div className="w-full  md:max-w-md">
//               <SearchInput
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 placeholder="Search employees name, position, or department..."
//               />
//             </div>

//             {/* New Appraisal Button */}
//             <div className="w-100 md:w-auto">
//               <button
//                 onClick={() => {
//                   setShowAppraisalModal(true);
//                   setModalMode("create");
//                 }}
//                 className="bg-[#006666] text-white px-4 py-2 rounded-md hover:bg-[#005555] transition-colors flex items-center gap-2 w-full md:w-auto justify-center md:justify-start"
//               >
//                 <Plus className="w-4 h-4" />
//                 New Appraisal
//               </button>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-[#006666]">
//                 <tr>
//                   <th className="px-6 py-3 text-left text-md font-medium text-white">
//                     Employee
//                   </th>
//                   <th className="px-6 py-3 text-left text-md font-medium text-white">
//                     Position
//                   </th>
//                   <th className="px-6 py-3 text-left text-md font-medium text-white">
//                     Rating
//                   </th>
//                   <th className="px-6 py-3 text-left text-md font-medium text-white">
//                     Status
//                   </th>
//                   <th className="px-6 py-3 text-left text-md font-medium text-white">
//                     Project period
//                   </th>
//                   <th className="px-6 py-3 text-left text-md font-medium text-white">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-[#eff4f5] divide-y divide-gray-200">
//                 {appraisals.map((employee) => (
//                   <tr key={employee._id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">
//                           {employee.Employee}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {employee.department}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {employee.Position}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="flex items-center gap-2">
//                         <StarRating rating={employee.Rating} readonly />
//                         <span className="text-sm text-gray-600">
//                           ({employee.Rating})
//                         </span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md ${getStatusColor(
//                           employee.Status
//                         )}`}
//                       >
//                         {employee.Status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {employee.ProjectPeriod}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <button
//                         onClick={() => {
//                           setSelectedEmployee(employee);
//                           setActiveTab("appraisal");
//                         }}
//                         className="text-[#006666] hover:text-[#005555] flex items-center gap-1"
//                       >
//                         <Eye className="w-4 h-4" />
//                         <span>View</span>
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>

//             {filteredEmployees.length === 0 && (
//               <div className="text-center py-8">
//                 <div className="text-gray-500">
//                   No employees found matching your search
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     ),
//     [filteredEmployees, searchTerm, handleSearchChange, getStatusColor]
//   );

//   // Memoized AppraisalView component
//   const AppraisalView = useMemo(() => {
//     if (!selectedEmployee) return null;

//     const appraisalCriteria = getAppraisalData(selectedEmployee.id);
//     const overallRating = calculateOverallRating(appraisalCriteria);

//     return (
//       <div className="space-y-6">
//         <button
//           onClick={() => setActiveTab("dashboard")}
//           className="flex items-center gap-2 text-[#006666] hover:text-[#005555] mb-4"
//         >
//           <ArrowLeft className="w-5 h-5" />
//           <span>Back to Dashboard</span>
//         </button>

//         <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
//           <div>
//             <h2 className="text-xl font-semibold text-gray-900">
//               {selectedEmployee.name}
//             </h2>
//             <p className="text-gray-600">
//               {selectedEmployee.position} • {selectedEmployee.department}
//             </p>
//             <div className="flex items-center gap-2 mt-2">
//               <span
//                 className={`inline-flex px-2 py-1 text-xs font-semibold rounded-md ${getStatusColor(
//                   selectedEmployee.status
//                 )}`}
//               >
//                 {selectedEmployee.status}
//               </span>
//               <span className="text-sm text-gray-500">
//                 Last Appraisal: {selectedEmployee.lastAppraisal}
//               </span>
//             </div>
//           </div>

//           <div className="space-y-8">
//             <h3 className="text-lg font-semibold text-gray-900">
//               Performance Evaluation
//             </h3>

//             {appraisalCriteria.map((criteria) => (
//               <div
//                 key={criteria.id}
//                 className="border border-gray-200 rounded-lg p-6 bg-gray-50"
//               >
//                 <div className="flex justify-between items-start mb-4">
//                   <div>
//                     <h4 className="font-medium text-gray-900">
//                       {criteria.category}
//                     </h4>
//                     <p className="text-sm text-gray-600 mt-1">
//                       {criteria.description}
//                     </p>
//                   </div>
//                   <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded border">
//                     {criteria.weight}%
//                   </span>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Rating
//                     </label>
//                     <div className="flex items-center gap-2">
//                       <StarRating rating={criteria.rating} readonly />
//                       <span className="text-sm text-gray-600">
//                         ({criteria.rating}/5)
//                       </span>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Comments
//                     </label>
//                     <div className="bg-white p-3 border border-gray-300 rounded-lg text-sm text-gray-700">
//                       {criteria.comments || "No comments provided"}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}

//             <div className="bg-gradient-to-r from-[#006666] to-[#008080] rounded-lg p-6 text-white">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h4 className="font-semibold text-white text-lg">
//                     Overall Rating
//                   </h4>
//                   <p className="text-green-100">
//                     Weighted average based on criteria
//                   </p>
//                 </div>
//                 <div className="text-right">
//                   <div className="text-4xl font-bold text-white">
//                     {overallRating.toFixed(1)}
//                   </div>
//                   <div className="mt-2">
//                     <StarRating rating={Math.round(overallRating)} readonly />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }, [
//     selectedEmployee,
//     getAppraisalData,
//     calculateOverallRating,
//     getStatusColor,
//   ]);

//   // Memoized AppraisalModal component
//   const AppraisalModal = useMemo(() => {
//     if (!showAppraisalModal) return null;

//     const modalAppraisalData = modalEmployee
//       ? getAppraisalData(modalEmployee.id)
//       : [];
//     const modalOverallRating = modalEmployee
//       ? calculateOverallRating(modalAppraisalData)
//       : 0;
//     const newAppraisalOverallRating = calculateOverallRating(
//       newAppraisalData.criteria
//     );

//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//         <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
//           <div className="p-6 border-b border-gray-200 flex justify-between items-center">
//             <h3 className="text-xl font-semibold text-gray-900">
//               {modalMode === "select" && "Select Employee"}
//               {modalMode === "view" &&
//                 modalEmployee &&
//                 `Appraisal for ${modalEmployee.name}`}
//               {modalMode === "create" && "Create New Appraisal"}
//             </h3>
//             <button
//               onClick={() => {
//                 setShowAppraisalModal(false);
//                 setModalEmployee(null);
//                 setModalMode("select");
//               }}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <X className="w-6 h-6" />
//             </button>
//           </div>

//           <div className="p-6">
//             {modalMode === "select" && (
//               <div className="space-y-4">
//                 <h4 className="font-medium text-gray-900">Select Employee</h4>
//                 <div className="space-y-3">
//                   {employees.map((employee) => (
//                     <div
//                       key={employee.id}
//                       className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
//                       onClick={() => {
//                         setModalEmployee(employee);
//                         setModalMode("view");
//                       }}
//                     >
//                       <div className="flex-1">
//                         <div className="font-medium text-gray-900">
//                           {employee.name}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {employee.position} • {employee.department}
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <div className="flex items-center gap-1">
//                           <StarRating rating={employee.rating} readonly />
//                           <span className="text-sm text-gray-600 ml-2">
//                             ({employee.rating})
//                           </span>
//                         </div>
//                         <span
//                           className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full mt-1 ${getStatusColor(
//                             employee.status
//                           )}`}
//                         >
//                           {employee.status}
//                         </span>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="pt-4">
//                   <button
//                     onClick={() => setModalMode("create")}
//                     className="bg-[#006666] text-white px-4 py-2 rounded-md hover:bg-[#005555] transition-colors flex items-center gap-2 w-full justify-center"
//                   >
//                     <Plus className="w-4 h-4" />
//                     Create New Appraisal
//                   </button>
//                 </div>
//               </div>
//             )}

//             {modalMode === "view" && modalEmployee && (
//               <div className="space-y-8">
//                 <div className="flex items-center gap-4 mb-6">
//                   <button
//                     onClick={() => {
//                       setModalEmployee(null);
//                       setModalMode("select");
//                     }}
//                     className="text-[#006666] hover:text-[#005555]"
//                   >
//                     <ArrowLeft className="w-5 h-5" />
//                   </button>

//                   <div>
//                     <h2 className="text-xl font-semibold text-gray-900">
//                       {modalEmployee.name}
//                     </h2>
//                     <p className="text-gray-600">
//                       {modalEmployee.position} • {modalEmployee.department}
//                     </p>
//                     <div className="flex items-center gap-2 mt-2">
//                       <span
//                         className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
//                           modalEmployee.status
//                         )}`}
//                       >
//                         {modalEmployee.status}
//                       </span>
//                       <span className="text-sm text-gray-500">
//                         Last Appraisal: {modalEmployee.lastAppraisal}
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="space-y-8">
//                   <h3 className="text-lg font-semibold text-gray-900">
//                     Performance Evaluation
//                   </h3>

//                   {modalAppraisalData.map((criteria) => (
//                     <div
//                       key={criteria.id}
//                       className="border border-gray-200 rounded-lg p-6 bg-gray-50"
//                     >
//                       <div className="flex justify-between items-start mb-4">
//                         <div>
//                           <h4 className="font-medium text-gray-900">
//                             {criteria.category}
//                           </h4>
//                           <p className="text-sm text-gray-600 mt-1">
//                             {criteria.description}
//                           </p>
//                         </div>
//                         <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded border">
//                           {criteria.weight}%
//                         </span>
//                       </div>

//                       <div className="space-y-4">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Rating
//                           </label>
//                           <div className="flex items-center gap-2">
//                             <StarRating rating={criteria.rating} readonly />
//                             <span className="text-sm text-gray-600">
//                               ({criteria.rating}/5)
//                             </span>
//                           </div>
//                         </div>

//                         <div>
//                           <label className="block text-sm font-medium text-gray-700 mb-2">
//                             Comments
//                           </label>
//                           <div className="bg-white p-3 border border-gray-300 rounded-lg text-sm text-gray-700">
//                             {criteria.comments || "No comments provided"}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}

//                   <div className="bg-gradient-to-r from-[#006666] to-[#008080] rounded-lg p-6 text-white">
//                     <div className="flex justify-between items-center">
//                       <div>
//                         <h4 className="font-semibold text-white text-lg">
//                           Overall Rating
//                         </h4>
//                         <p className="text-green-100">
//                           Weighted average based on criteria
//                         </p>
//                       </div>
//                       <div className="text-right">
//                         <div className="text-4xl font-bold text-white">
//                           {modalOverallRating.toFixed(1)}
//                         </div>
//                         <div className="mt-2">
//                           <StarRating
//                             rating={Math.round(modalOverallRating)}
//                             readonly
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="flex justify-end gap-3">
//                     <button
//                       className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
//                       onClick={() => {
//                         setShowAppraisalModal(false);
//                         setModalEmployee(null);
//                         setModalMode("select");
//                       }}
//                     >
//                       Close
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {modalMode === "create" && (
//               <div className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="mb-6">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Select Employee
//                     </label>
//                     <div className="relative">
//                       <select
//                         value={newAppraisalData.employeeId}
//                         onChange={(e) =>
//                           setNewAppraisalData((prev) => ({
//                             ...prev,
//                             employeeId: e.target.value,
//                           }))
//                         }
//                         className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-[#006666] focus:border-[#006666]"
//                       >
//                         <option value="">Select an employee</option>
//                         {employees.map((employee) => (
//                           <option key={employee.id} value={employee.id}>
//                             {employee.name} ({employee.position})
//                           </option>
//                         ))}
//                       </select>
//                       <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"></div>
//                     </div>
//                   </div>

//                   {newAppraisalData.employeeId && (
//                     <div className="space-y-6">
//                       {newAppraisalData.criteria.map((criterion) => (
//                         <div
//                           key={criterion.id}
//                           className="border border-gray-200 rounded-lg p-6 bg-gray-50"
//                         >
//                           <div className="flex justify-between items-start mb-4">
//                             <div>
//                               <h4 className="font-medium text-gray-900">
//                                 {criterion.category}
//                               </h4>
//                               <p className="text-sm text-gray-600 mt-1">
//                                 {criterion.description}
//                               </p>
//                             </div>
//                             <span className="text-sm text-gray-500 bg-white px-2 py-1 rounded border">
//                               {criterion.weight}%
//                             </span>
//                           </div>

//                           <div className="space-y-4">
//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Rating
//                               </label>
//                               <div className="flex items-center gap-2">
//                                 <StarRating
//                                   rating={criterion.rating}
//                                   onChange={handleRatingChange(criterion.id)}
//                                 />
//                                 <span className="text-sm text-gray-600">
//                                   ({criterion.rating}/5)
//                                 </span>
//                               </div>
//                             </div>

//                             <div>
//                               <label className="block text-sm font-medium text-gray-700 mb-2">
//                                 Comments
//                               </label>
//                               <TextArea
//                                 id={`comments-${criterion.id}`}
//                                 value={criterion.comments}
//                                 onChange={handleCommentsChange(criterion.id)}
//                                 placeholder="Enter your comments here..."
//                                 rows={3}
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       ))}

//                       <div className="bg-gradient-to-r from-[#006666] to-[#008080] rounded-lg p-6 text-white">
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <h4 className="font-semibold text-white text-lg">
//                               Overall Rating
//                             </h4>
//                             <p className="text-green-100">
//                               Weighted average based on criteria
//                             </p>
//                           </div>
//                           <div className="text-right">
//                             <div className="text-4xl font-bold text-white">
//                               {newAppraisalOverallRating.toFixed(1)}
//                             </div>
//                             <div className="mt-2">
//                               <StarRating
//                                 rating={Math.round(newAppraisalOverallRating)}
//                                 readonly
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       </div>

//                       <div className="flex justify-end gap-3 pt-4">
//                         <button
//                           className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
//                           onClick={() => {
//                             setShowAppraisalModal(false);
//                             setModalMode("select");
//                           }}
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           onClick={handleSubmitNewAppraisal}
//                           disabled={!newAppraisalData.employeeId}
//                           className="bg-[#006666] text-white px-4 py-2 rounded-md hover:bg-[#005555] transition-colors disabled:opacity-50 flex items-center gap-2"
//                         >
//                           <Check className="w-5 h-5" />
//                           Submit Appraisal
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }, [
//     showAppraisalModal,
//     modalMode,
//     modalEmployee,
//     employees,
//     newAppraisalData,
//     getAppraisalData,
//     calculateOverallRating,
//     getStatusColor,
//     handleRatingChange,
//     handleCommentsChange,
//     handleSubmitNewAppraisal,
//   ]);

//   return (
//     <div className=" ">
//       {/* Header */}
//       <header className=" border-gray-200 ">
//         <div className="max-w-full  px-2">
//           <div className="">
//             <div className="flex justify-between items-center gap-3">
//               {activeTab !== "reports" && (
//                 <h1 className=" text-black" style={FONTS.header}>
//                   {" "}
//                   Appraisal{" "}
//                 </h1>
//               )}
//               {activeTab !== "reports" && (
//                 <button
//                   className="text-white bg-[#006666] px-3 py-1 rounded-md"
//                   onClick={() => setActiveTab("reports")}
//                 >
//                   Reports
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-full py-8">
//         {activeTab === "dashboard" && Dashboard}
//         {activeTab === "appraisal" && AppraisalView}
//         {activeTab === "reports" && <Reports setActiveTab={setActiveTab} />}
//       </main>

//       {/* Appraisal Modal */}
//       {AppraisalModal}
//     </div>
//   );
// };

// export default HRMAppraisalSystem;
"use client"

import { useState, useCallback, useMemo, useEffect } from "react"
import { FONTS } from "../../../constants/uiConstants"
import Reports from "../Reports/Reports"
import { getAllAppraisals } from "../../../features/Appraisal/service"
import Dashboard from "../../../components/Appraisal/Dashboard"
import AppraisalView from "../../../components/Appraisal/AppraisalView"
import AppraisalModal from "../../../components/Appraisal/AppraisalModel"

interface Employee {
  id: string
  name: string
  position: string
  department: string
  rating: number
  lastAppraisal: string
  nextAppraisal: string
  status: "pending" | "in-progress" | "completed"
}

interface AppraisalCriteria {
  id: string
  category: string
  description: string
  weight: number
  rating: number
  comments: string
}

const HRMAppraisalSystem = () => {
  const [activeTab, setActiveTab] = useState<"dashboard" | "appraisal" | "reports">("dashboard")
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null)
  const [showAppraisalModal, setShowAppraisalModal] = useState(false)
  const [modalMode, setModalMode] = useState<"select" | "view" | "create">("select")
  const [modalEmployee, setModalEmployee] = useState<Employee | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [newAppraisalData, setNewAppraisalData] = useState<{
    employeeId: string
    criteria: AppraisalCriteria[]
  }>({
    employeeId: "",
    criteria: [
      {
        id: "1",
        category: "Technical Skills",
        description: "Proficiency in required technologies and tools",
        weight: 25,
        rating: 0,
        comments: "",
      },
      {
        id: "2",
        category: "Communication",
        description: "Verbal and written communication effectiveness",
        weight: 20,
        rating: 0,
        comments: "",
      },
      {
        id: "3",
        category: "Teamwork",
        description: "Collaboration and team contribution",
        weight: 20,
        rating: 0,
        comments: "",
      },
      {
        id: "4",
        category: "Problem Solving",
        description: "Analytical thinking and solution-oriented approach",
        weight: 20,
        rating: 0,
        comments: "",
      },
      {
        id: "5",
        category: "Initiative",
        description: "Proactive approach and self-motivation",
        weight: 15,
        rating: 0,
        comments: "",
      },
    ],
  })
  const [appraisals, setAppraisals] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchAppraisals = async () => {
      setLoading(true)
      try {
        const response: any = await getAllAppraisals()
        const dataArray = Array.isArray(response.data?.data) ? response.data.data : []
        console.log("appraisal arrayed data", dataArray)
        const mapped = dataArray.map((item: any) => ({
          _id: item._id,
          Employee: item.Employee || item.name || "",
          Position: item.Position || item.position || "",
          Rating: item.Rating || item.rating || 0,
          Status: item.Status || item.status || "pending",
          department: item.department || "",
          ProjectPeriod: item.ProjectPeriod || "",
        }))
        setAppraisals(mapped)
      } catch (error) {
        console.error("Error fetching appraisals:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAppraisals()
  }, [])

  // Static employee data for modal
  const employees = useMemo<Employee[]>(
    () => [
      {
        id: "1",
        name: "Siva Shankar",
        position: "Senior Developer",
        department: "Engineering",
        rating: 4.5,
        lastAppraisal: "2024-01-15",
        nextAppraisal: "2024-07-15",
        status: "completed",
      },
      {
        id: "2",
        name: "Surya",
        position: "Product Manager",
        department: "Product",
        rating: 4.2,
        lastAppraisal: "2024-02-20",
        nextAppraisal: "2024-08-20",
        status: "in-progress",
      },
      {
        id: "3",
        name: "Suruthi",
        position: "UX Designer",
        department: "Design",
        rating: 4.8,
        lastAppraisal: "2024-03-10",
        nextAppraisal: "2024-09-10",
        status: "pending",
      },
    ],
    [],
  )

  // Static appraisal data
  const appraisalDataMap = useMemo(
    () => ({
      "1": [
        {
          id: "1",
          category: "Technical Skills",
          description: "Proficiency in required technologies and tools",
          weight: 25,
          rating: 5,
          comments:
            "Excellent technical skills, always up-to-date with latest technologies. Demonstrates strong problem-solving abilities.",
        },
        {
          id: "2",
          category: "Communication",
          description: "Verbal and written communication effectiveness",
          weight: 20,
          rating: 4,
          comments: "Good communication skills. Could improve presentation skills for client meetings.",
        },
        {
          id: "3",
          category: "Teamwork",
          description: "Collaboration and team contribution",
          weight: 20,
          rating: 5,
          comments: "Outstanding team player. Mentors junior developers and contributes positively to team dynamics.",
        },
        {
          id: "4",
          category: "Problem Solving",
          description: "Analytical thinking and solution-oriented approach",
          weight: 20,
          rating: 4,
          comments: "Strong analytical skills. Consistently finds efficient solutions to complex problems.",
        },
        {
          id: "5",
          category: "Initiative",
          description: "Proactive approach and self-motivation",
          weight: 15,
          rating: 4,
          comments:
            "Shows good initiative in taking on challenging projects. Could be more proactive in suggesting process improvements.",
        },
      ],
    }),
    [],
  )

  const getAppraisalData = useCallback(
    (employeeId: string): AppraisalCriteria[] => {
      return appraisalDataMap[employeeId as keyof typeof appraisalDataMap] || []
    },
    [appraisalDataMap],
  )

  const calculateOverallRating = useCallback((criteria: AppraisalCriteria[]) => {
    const totalWeightedScore = criteria.reduce((sum, criterion) => sum + (criterion.rating * criterion.weight) / 100, 0)
    return totalWeightedScore
  }, [])

  const getStatusColor = useCallback((status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }, [])

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value)
  }, [])

  const handleViewEmployee = useCallback((employee: any) => {
    setSelectedEmployee(employee)
    setActiveTab("appraisal")
  }, [])

  const handleNewAppraisal = useCallback(() => {
    setShowAppraisalModal(true)
    setModalMode("create")
  }, [])

  const handleCloseModal = useCallback(() => {
    setShowAppraisalModal(false)
    setModalEmployee(null)
    setModalMode("select")
  }, [])

  const handleSelectEmployee = useCallback((employee: Employee) => {
    setModalEmployee(employee)
    setModalMode("view")
  }, [])

  const handleBackToSelect = useCallback(() => {
    setModalEmployee(null)
    setModalMode("select")
  }, [])

  const handleCreateMode = useCallback(() => {
    setModalMode("create")
  }, [])

  const handleEmployeeChange = useCallback((employeeId: string) => {
    setNewAppraisalData((prev) => ({
      ...prev,
      employeeId,
    }))
  }, [])

  const handleCriteriaChange = useCallback((id: string, field: string, value: any) => {
    setNewAppraisalData((prev) => ({
      ...prev,
      criteria: prev.criteria.map((criterion) => (criterion.id === id ? { ...criterion, [field]: value } : criterion)),
    }))
  }, [])

  const handleRatingChange = useCallback(
    (criterionId: string) => {
      return (rating: number) => {
        handleCriteriaChange(criterionId, "rating", rating)
      }
    },
    [handleCriteriaChange],
  )

  const handleCommentsChange = useCallback(
    (criterionId: string) => {
      return (value: string) => {
        handleCriteriaChange(criterionId, "comments", value)
      }
    },
    [handleCriteriaChange],
  )

  const handleSubmitNewAppraisal = useCallback(() => {
    console.log("Submitting new appraisal:", {
      employeeId: newAppraisalData.employeeId,
      criteria: newAppraisalData.criteria,
      overallRating: calculateOverallRating(newAppraisalData.criteria),
    })

    alert("Appraisal submitted successfully!")

    setNewAppraisalData({
      employeeId: "",
      criteria: [
        {
          id: "1",
          category: "Technical Skills",
          description: "Proficiency in required technologies and tools",
          weight: 25,
          rating: 0,
          comments: "",
        },
        {
          id: "2",
          category: "Communication",
          description: "Verbal and written communication effectiveness",
          weight: 20,
          rating: 0,
          comments: "",
        },
        {
          id: "3",
          category: "Teamwork",
          description: "Collaboration and team contribution",
          weight: 20,
          rating: 0,
          comments: "",
        },
        {
          id: "4",
          category: "Problem Solving",
          description: "Analytical thinking and solution-oriented approach",
          weight: 20,
          rating: 0,
          comments: "",
        },
        {
          id: "5",
          category: "Initiative",
          description: "Proactive approach and self-motivation",
          weight: 15,
          rating: 0,
          comments: "",
        },
      ],
    })
    setShowAppraisalModal(false)
    setModalMode("select")
  }, [newAppraisalData, calculateOverallRating])

  const modalAppraisalData = modalEmployee ? getAppraisalData(modalEmployee.id) : []
  const modalOverallRating = modalEmployee ? calculateOverallRating(modalAppraisalData) : 0
  const newAppraisalOverallRating = calculateOverallRating(newAppraisalData.criteria)
  const selectedEmployeeAppraisalData = selectedEmployee ? getAppraisalData("1") : []
  const selectedEmployeeOverallRating = selectedEmployee ? calculateOverallRating(selectedEmployeeAppraisalData) : 0

  return (
    <div className="">
      {/* Header */}
      <header className="border-gray-200">
        <div className="max-w-full px-2">
          <div className="">
            <div className="flex justify-between items-center gap-3">
              {activeTab !== "reports" && (
                <h1 className="text-black" style={FONTS.header}>
                  Appraisal
                </h1>
              )}
              {activeTab !== "reports" && (
                <button
                  className="text-white bg-[#006666] px-3 py-1 rounded-md"
                  onClick={() => setActiveTab("reports")}
                >
                  Reports
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full py-8">
        {activeTab === "dashboard" && (
          <Dashboard
            appraisals={appraisals}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onViewEmployee={handleViewEmployee}
            onNewAppraisal={handleNewAppraisal}
            getStatusColor={getStatusColor}
          />
        )}
        {activeTab === "appraisal" && (
          <AppraisalView
            selectedEmployee={selectedEmployee}
            appraisalCriteria={selectedEmployeeAppraisalData}
            overallRating={selectedEmployeeOverallRating}
            onBack={() => setActiveTab("dashboard")}
            getStatusColor={getStatusColor}
          />
        )}
        {activeTab === "reports" && <Reports setActiveTab={setActiveTab} />}
      </main>

      {/* Appraisal Modal */}
      <AppraisalModal
        showModal={showAppraisalModal}
        modalMode={modalMode}
        modalEmployee={modalEmployee}
        employees={employees}
        newAppraisalData={newAppraisalData}
        modalAppraisalData={modalAppraisalData}
        modalOverallRating={modalOverallRating}
        newAppraisalOverallRating={newAppraisalOverallRating}
        onClose={handleCloseModal}
        onSelectEmployee={handleSelectEmployee}
        onBackToSelect={handleBackToSelect}
        onCreateMode={handleCreateMode}
        onEmployeeChange={handleEmployeeChange}
        onRatingChange={handleRatingChange}
        onCommentsChange={handleCommentsChange}
        onSubmit={handleSubmitNewAppraisal}
        getStatusColor={getStatusColor}
      />
    </div>
  )
}

export default HRMAppraisalSystem

