import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { getAllDepartments } from "../../../features/Department/service";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedOption: string;
  setSelectedOption: (value: string) => void;
  // departmentOptions: string[];
  selectedDepartment: string;
  setSelectedDepartment: (value: string) => void;
}

// Inject animation styles into <head>
const modalAnimationStyle = `
  @keyframes slideUp {
    0% { transform: translateY(100%); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
  }

  @keyframes slideDown {
    0% { transform: translateY(0); opacity: 1; }
    100% { transform: translateY(100%); opacity: 0; }
  }

  .animate-slide-up {
    animation: slideUp 0.4s ease-out forwards;
  }

  .animate-slide-down {
    animation: slideDown 0.4s ease-out forwards;
  }
`;

if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = modalAnimationStyle;
  document.head.appendChild(style);
}

const ProcessPayrollModal: React.FC<Props> = ({
  isOpen,
  onClose,
  selectedOption,
  setSelectedOption,
  // departmentOptions,
  selectedDepartment,
  setSelectedDepartment,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [positionOptions, setPositionOptions] = useState<string[]>([]);
  const [isClosing, setIsClosing] = useState(false);
  const [departments, setDepartments] = useState<string[]>([]);

useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const response = await getAllDepartments();
      setDepartments(response.data.map((dept: any) => dept.name)); // Assuming dept has a 'name' property
      console.log("Departments data succesfull:", response.data);
    } catch (err) {
      console.error("Failed to load departments", err);
    }
  };

  fetchDepartments();
}, []);



  const departmentToPositions: { [key: string]: string[] } = {
    Engineering: ["Software Engineer", "QA Engineer"],
    Product: ["Product Manager", "Product Analyst"],
    Design: ["UI Designer", "UX Designer"],
    "Human Resources": ["HR Manager", "Recruiter"],
    Marketing: ["Marketing Manager", "SEO Specialist"],
    Finance: ["Accountant", "Finance Analyst"]
  };

  useEffect(() => {
    if (selectedDepartment) {
      const positions = departmentToPositions[selectedDepartment];
      if (positions) {
        setPositionOptions(positions);
      } else {
        setPositionOptions([]);
        console.warn("No positions found for:", selectedDepartment);
      }
      setSelectedPosition("");
    }
  }, [selectedDepartment]);

  const isValid =
    selectedOption === "all" ||
    (selectedOption === "department" && selectedDepartment && selectedPosition);

  const target =
    selectedOption === "all"
      ? "All Employees"
      : selectedDepartment && selectedPosition
      ? `${selectedDepartment} - ${selectedPosition}`
      : "Incomplete selection";

  const handleProcess = () => {
    if (isValid) setShowConfirmModal(true);
  };

  const handleConfirm = () => {
    setShowConfirmModal(false);
    setShowFinalModal(true);
  };

  const handleFinalConfirm = () => {
    if (confirm.trim().toLowerCase() === "confirm") {
      alert(`Payroll processed for: ${target}`);
      setConfirm("");
      setShowFinalModal(false);
      onClose();
    } else {
      alert("Please type 'confirm' to proceed.");
    }
  };
  const handleClose = () => {
  setIsClosing(true);
  setTimeout(() => {
    setIsClosing(false); // reset for next open
    onClose(); // close the modal fully
  }, 400); // match your animation duration
};
useEffect(() => {
  if (isOpen) {
    setSelectedOption("all");
    setSelectedDepartment("");
    setSelectedPosition("");
    setPositionOptions([]);
    setConfirm("");
    setShowConfirmModal(false);
    setShowFinalModal(false);
  }
}, [isOpen]);


  return (
    <>
    
      {/* Main Modal */}
   {isOpen && (
<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
  <div
    className={`relative rounded-xl shadow-lg p-6 w-full max-w-2xl 
      bg-clip-padding backdrop-filter backdrop-blur bg-black/40 
      backdrop-saturate-100 backdrop-contrast-100 
      ${isClosing ? "animate-slide-down" : "animate-slide-up"}`}
  >
    {/* Close button OUTSIDE on the left */}
   <button
            onClick={handleClose}
            className="absolute top-2 left-3 -ml-[3.15rem] text-white p-1 shadow hover:text-gray-600 rounded-l-full bg-blue-700"
          >
            <X size={30} />
          </button>



      <h2 className="text-xl font-semibold text-white mb-4">Process Payroll</h2>



            <label className="block mb-2 text-sm font-medium text-white">Select Payroll Option</label>
<select
  value={selectedOption}
  onChange={(e) => setSelectedOption(e.target.value)}
  className="w-full border border-gray-300 rounded-md px-4 py-2"
>
  <option value="all">All Employees</option>
  <option value="department">By Department</option>
</select>


{selectedOption === "department" && (
  <div className="mb-4">
    <label className="block mb-2 text-sm font-medium text-white">
      Select Department
    </label>
    <select
      value={selectedDepartment}
      onChange={(e) => setSelectedDepartment(e.target.value)}
      className="w-full border border-gray-300 rounded-md px-4 py-2"
    >
      <option value="">-- Select --</option>
      {departments.map((dept) => (
        <option key={dept} value={dept}>
          {dept}
        </option>
      ))}
    </select>
  </div>
)}


            {selectedOption === "department" && selectedDepartment && (
              <div className="mb-4">
                <label className="block mb-2 text-sm font-medium text-white">
                  Select Sub Department
                </label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2"
                >
                  <option value="">-- Select --</option>
                  {positionOptions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                disabled={!isValid}
                onClick={handleProcess}
                className={`px-4 py-2 text-sm rounded-md text-white ${
                  isValid ? "bg-[#4c469f]" : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Process
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="animate-slide-up bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">Are you sure?</h3>
            <p className="mb-6">
              You are about to process payroll for <strong>{target}</strong>.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-sm bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 text-sm bg-[#4c469f] text-white rounded-md"
              >
                Yes, Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final Confirmation Modal */}
      {showFinalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="animate-slide-up bg-white rounded-xl shadow-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to confirm the payroll process
            </h3>
            <input
              type="text"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Type confirm to continue.."
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowFinalModal(false)}
                className="px-4 py-2 text-sm bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalConfirm}
                className="px-4 py-2 text-sm bg-[#4c469f] text-white rounded-md"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProcessPayrollModal;
