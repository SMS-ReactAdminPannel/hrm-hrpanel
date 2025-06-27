import React, { useState, useRef, useEffect, type ChangeEvent } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import type {
  ProfileData,
  Department,
  JobTitle,
  EmploymentType,
} from "../../components/Employee/Employee";
import { FaCameraRetro } from "react-icons/fa";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (profile: ProfileData) => void;
}


const defaultProfile: ProfileData = {
  personal: {
    name: "",
    position: "",
    employeeId: "",
    joinDate: "",
    phone: "",
    email: "",
    birthday: "",
    address: "",
    gender: "",
    profileImage: null,
  },
  emergency: {
    primary: {
      name: "",
      relationship: "",
      phone: "",
      email: "",
      address: "",
    },
    secondary: {
      name: "",
      relationship: "",
      phone: "",
      email: "",
      address: "",
    },
  },
  education: [{ instituteName: "", degree: "", startDate: "", endDate: "" }],
  experience: [""],
  bank: {
    holderName: "",
    accountNumber: "",
    bankName: "",
    branchName: "",
    swiftCode: "",
  },
  passport: {
    number: "",
    nationality: "",
    issueDate: "",
    expiryDate: "",
  },
  department: "Engineering",
  jobTitle: "Manager",
  employmentType: "Full-time",
};

const modalAnimationStyle = `
  @keyframes slideInFromRight {
    0% { transform: translateX(100%); opacity: 0; }
    100% { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideOutToLeft {
    0% { transform: translateX(0); opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
  }

  .animate-slide-in {
    animation: slideInFromRight 0.4s ease-out forwards;
  }

  .animate-slide-out {
    animation: slideOutToLeft 0.4s ease-in forwards;
  }
`;

export const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 400);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0] || null;
  if (file) {
    setProfile((prev) => ({
      ...prev,
      personal: {
        ...prev.personal,
        profileImage: file,
      },
    }));
  }
};


  const handleSubmit = () => {
    onAdd(profile);
    toast.success("Employee added successfully!", {
      className: "bg-[#006666] text-white",
    });
    setProfile(defaultProfile);
    handleClose();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    if (isOpen || isClosing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isClosing]);

  if (!isOpen && !isClosing) return null;

  const profileImageUrl = profile.personal.profileImage
    ? URL.createObjectURL(profile.personal.profileImage)
    : "https://via.placeholder.com/150";

  return (
    <>
      <style>{modalAnimationStyle}</style>
      <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-end z-50">
        <div
          ref={modalRef}
          className={`bg-white p-6 rounded-l-lg w-full max-w-[80%] max-h-[95%] mt-8  right-1 shadow-lg relative ${
            isClosing ? "animate-slide-out" : "animate-slide-in"
          }`}
        >
          <button
            onClick={handleClose}
            className="absolute top-2 left-3 -ml-[3.15rem]  text-white p-1 shadow hover:text-gray-600 rounded-l-full bg-blue-700"
          >
            <X size={30} />
          </button>

          <div className="overflow-y-auto h-[85vh] scrollbar-hide px-2 ">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Add New Employee
            </h2>

            {/* Profile Image Preview */}
            <div className="flex flex-col items-center justify-center my-4  relative ">
              <div>
                <div
                className="w-32 h-32 rounded-full border-4 border-[#006666] shadow cursor-pointer overflow-hidden  "
                onClick={() => fileInputRef.current?.click()}>
                <img
                  src={profileImageUrl}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
               
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
               
              </div>
              <div className="absolute  bottom-1 ml-20 border border-3 rounded-xl p-1 bg-white"  onClick={() => fileInputRef.current?.click()}>
                <FaCameraRetro/>
              </div>
             
            </div>

            <h3 className="text-lg font-semibold mt-4">Personal Info</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {Object.entries(profile.personal).map(([key, val]) =>
                key === "profileImage" ? null : (
                  <input
                    key={key}
                    type={key.toLowerCase().includes("date") ? "date" : "text"}
                    placeholder={key}
                    value={val as string}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        personal: {
                          ...prev.personal,
                          [key]: e.target.value,
                        },
                      }))
                    }
                    className="border p-2 rounded"
                  />
                )
              )}
            </div>

            {/* Dropdowns */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <select
                value={profile.department}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    department: e.target.value as Department["title"],
                  })
                }
                className="border rounded p-2"
              >
                <option value="">Select Department</option>
                {[
                  "Engineering",
                  "Marketing",
                  "HR",
                  "Finance",
                  "Operations",
                ].map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>

              <select
                value={profile.jobTitle}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    jobTitle: e.target.value as JobTitle["department"],
                  })
                }
                className="border rounded p-2"
              >
                <option value="">Select Job Title</option>
                {[
                  "Manager",
                  "Developer",
                  "Designer",
                  "Analyst",
                  "Specialist",
                ].map((job) => (
                  <option key={job} value={job}>
                    {job}
                  </option>
                ))}
              </select>

              <select
                value={profile.employmentType}
                onChange={(e) =>
                  setProfile({
                    ...profile,
                    employmentType: e.target.value as EmploymentType["title"],
                  })
                }
                className="border rounded p-2"
              >
                <option value="">Select Employment Type</option>
                {["Full-time", "Part-time", "Contract", "Intern"].map(
                  (type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  )
                )}
              </select>
            </div>
            <h3 className="text-lg font-semibold mt-6">Emergency Contacts</h3>
            {["primary", "secondary"].map((type) => (
              <div key={type}>
                <p className="font-medium mt-2 capitalize">{type} Contact</p>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(
                    profile.emergency[type as "primary" | "secondary"]
                  ).map(([key, val]) => (
                    <input
                      key={key}
                      placeholder={key}
                      value={val}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          emergency: {
                            ...prev.emergency,
                            [type]: {
                              ...prev.emergency[
                                type as "primary" | "secondary"
                              ],
                              [key]: e.target.value,
                            },
                          },
                        }))
                      }
                      className="border p-2 rounded"
                    />
                  ))}
                </div>
              </div>
            ))}

            <h3 className="text-lg font-semibold mt-6">Education</h3>
            {profile.education.map((edu, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 mt-2">
                {Object.entries(edu).map(([key, val]) => (
                  <input
                    key={key}
                    placeholder={key}
                    type={key.includes("Date") ? "date" : "text"}
                    value={val}
                    onChange={(e) => {
                      const updated = [...profile.education];
                      updated[index][key as keyof typeof edu] = e.target.value;
                      setProfile({ ...profile, education: updated });
                    }}
                    className="border p-2 rounded"
                  />
                ))}
              </div>
            ))}

            <h3 className="text-lg font-semibold mt-6">Experience</h3>
            {profile.experience.map((exp, i) => (
              <input
                key={i}
                placeholder={`Experience ${i + 1}`}
                value={exp}
                onChange={(e) => {
                  const updated = [...profile.experience];
                  updated[i] = e.target.value;
                  setProfile({ ...profile, experience: updated });
                }}
                className="border p-2 rounded w-full mt-2"
              />
            ))}

            <h3 className="text-lg font-semibold mt-6">Bank Information</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {Object.entries(profile.bank).map(([key, val]) => (
                <input
                  key={key}
                  placeholder={key}
                  value={val}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      bank: {
                        ...prev.bank,
                        [key]: e.target.value,
                      },
                    }))
                  }
                  className="border p-2 rounded"
                />
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-6">Passport Information</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {Object.entries(profile.passport).map(([key, val]) => (
                <input
                  key={key}
                  placeholder={key}
                  type={key.includes("Date") ? "date" : "text"}
                  value={val}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      passport: {
                        ...prev.passport,
                        [key]: e.target.value,
                      },
                    }))
                  }
                  className="border p-2 rounded"
                />
              ))}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="bg-[#006666] text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Add Employee
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
