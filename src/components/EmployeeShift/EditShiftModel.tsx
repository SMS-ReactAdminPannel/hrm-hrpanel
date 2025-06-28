import type React from "react";
import { X } from "lucide-react"
import type {
  Employee,
  FormData,
} from "../../components/EmployeeShift/employee";

const modalAnimationStyle = `
  @keyframes slideUp {
    0% { transform: translateY(100%); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }
  .animate-slideUp {
    animation: slideUp 0.4s ease-out forwards;
  }
`;

interface EditShiftModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  formData: FormData;
  onFormDataChange: (data: FormData) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const EditShiftModal: React.FC<EditShiftModalProps> = ({
  isOpen,
  onClose,
  employee,
  formData,
  onFormDataChange,
  onSubmit,
}) => {
  if (!isOpen || !employee) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onFormDataChange({
      ...formData,
      [name]: value,
    });
  };
  
  
  const departments = ["Production", "Maintenance", "Quality Control"];
  const getSubDepartments = (department: string) => {
    const subDepartmentMap: Record<string, string[]> = {
      Production: ["Assembly Line", "Packaging", "Machine Ops"],
      Maintenance: ["Electrical", "Mechanical"],
      "Quality Control": ["Final Inspection", "Raw Material"],
    };
    return subDepartmentMap[department] || [];
  };

  return (
    <>
      <style>{modalAnimationStyle}</style>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 border">
        <div className="bg-white border rounded-lg w-full max-w-2xl animate-slideUp">
          <button
            onClick={onClose}
            className="absolute top-1   -ml-[2.5rem] text-white hover:text-gray-600 bg-blue-700 rounded-l-full h-10 w-10 flex items-center justify-center shadow"
          >
            <X size={30} />
          </button>
          <div className="">
            <div className="border-b border-gray-200 p-3 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-black">
              Edit Rotating Shift
            </h2>
          </div>
          <form
            onSubmit={onSubmit}
            className="p-6 bg-clip-padding backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 shadow-2xl max-h-[80vh] overflow-auto scrollbar-hide"
          >
            <div className="grid grid-rows-2 gap-4 sm:grid-cols-2">
              <div className="">
                <label
                  htmlFor="employee"
                  className="block text-sm font-medium text-gray-700"
                >
                  Employee
                </label>
                <input
                  type="text"
                  name="employee"
                  id="employee"
                  value={formData.employee}
                  onChange={handleInputChange}
                  className="block w-full  shadow-sm focus:outline-none focus:ring-0 sm:text-sm p-2 border-0 border-b bg-transparent border-gray-400"
                  required
                />
              </div>
              <div className="">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="block w-full  shadow-sm focus:outline-none focus:ring-0 sm:text-sm p-2 border-0 border-b bg-transparent border-gray-400"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="basedOn"
                  className="block text-sm font-medium text-gray-700"
                >
                  Based On
                </label>
                <select
                  id="basedOn"
                  name="basedOn"
                  value={formData.basedOn}
                  onChange={handleInputChange}
                  className="block w-full  shadow-sm focus:outline-none focus:ring-0 sm:text-sm p-2 border-0 border-b bg-transparent border-gray-400"
                >
                  <option value="After">After</option>
                  <option value="Weekend">Weekend</option>
                  <option value="Month">Month</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="rotate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Rotate
                </label>
                <input
                  type="text"
                  name="rotate"
                  id="rotate"
                  value={formData.rotate}
                  onChange={handleInputChange}
                  className="block w-full  shadow-sm focus:outline-none focus:ring-0 sm:text-sm p-2 border-0 border-b bg-transparent border-gray-400"
                  placeholder="e.g. Rotate after 5 days"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="department"
                  className="block text-sm font-medium text-gray-700"
                >
                  Department
                </label>
                <select
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="block w-full  shadow-sm focus:outline-none focus:ring-0 sm:text-sm p-2 border-0 border-b bg-transparent border-gray-400"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="subDepartment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sub-Department
                </label>
                <select
                  id="subDepartment"
                  name="subDepartment"
                  value={formData.subDepartment || ""}
                  onChange={handleInputChange}
                  className="block w-full  shadow-sm focus:outline-none focus:ring-0 sm:text-sm p-2 border-0 border-b bg-transparent border-gray-400"
                  disabled={!formData.department}
                  required
                >
                  <option value="">Select Sub-Department</option>
                  {formData.department &&
                    getSubDepartments(formData.department).map((subDept) => (
                      <option key={subDept} value={subDept}>
                        {subDept}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="block w-full  shadow-sm focus:outline-none focus:ring-0 sm:text-sm p-2 border-0 border-b bg-transparent border-gray-400"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="Category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  name="Category"
                  id="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="block w-full  shadow-sm focus:outline-none focus:ring-0 sm:text-sm p-2 border-0 border-b bg-transparent border-gray-400"
                  placeholder="Category"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="currentShift"
                  className="block text-sm font-medium text-gray-700"
                >
                  Current Shift
                </label>
                <select
                  id="currentShift"
                  name="currentShift"
                  value={formData.currentShift}
                  onChange={handleInputChange}
                  className="w-full  shadow-sm focus:outline-none focus:ring-0 sm:text-sm p-2 border-b bg-transparent border-gray-400"
                  required
                >
                  <option value="">Select shift</option>
                  <option value="Morning">Morning</option>
                  <option value="Night">Night</option>
                  <option value="Regular Shift">Regular Shift</option>
                  <option value="None">None</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="nextShift"
                  className="block text-sm font-medium text-gray-700"
                >
                  Next Shift
                </label>
                <select
                  id="nextShift"
                  name="nextShift"
                  value={formData.nextShift}
                  onChange={handleInputChange}
                  className=" w-full   focus:outline-none focus:ring-0 sm:text-sm p-2 border-0 border-b bg-transparent border-gray-400"
                  required
                >
                  <option value="">Select shift</option>
                  <option value="Morning">Morning</option>
                  <option value="Night">Night</option>
                  <option value="Regular Shift">Regular Shift</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 hover:bg-gray-200 rounded-md focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-[#5e59a9] hover:bg-[#4c4aa1] rounded-md focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditShiftModal;
