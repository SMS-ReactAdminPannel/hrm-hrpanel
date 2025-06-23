import { useState,useEffect } from "react"
import { GrievanceCard } from "../../components/common/GrievanceManagement/GrievanceCard";
import { GrievanceDetailCard } from "../../components/common/GrievanceManagement/GrievanceDetailCard";
import { FONTS } from "../../constants/uiConstants";
import { getAllGrievances, updateGrievanceStatus } from "../../features/Grievance/services";

export type Grievance = {
  id: number;
  title: string;
  description: string;
  status: "solved" | "unsolved";
  employee: string;
  empid: string;
  mail: string;
  department: string;
  role: string;
  date: string;
}; 

const initialGrievances: Grievance[] = [
  {
    id: 1,
    title: "Broken Chair",
    description: "The chair at my desk is broken and causes back pain.",
    status: "unsolved",
    employee: "John Doe",
    empid: "EMP001",
    mail: "john.doe@example.com",
    department: "Facilities",
    role: "Office Assistant",
    date: "2025-06-01",
  },
  {
    id: 2,
    title: "Late Salary",
    description: "My salary was credited late this month.",
    status: "solved",
    employee: "Jane Smith",
    empid: "EMP002",
    mail: "jane.smith@example.com",
    department: "Finance",
    role: "Accountant",
    date: "2025-05-28",
  },
  {
    id: 3,
    title: "System not working",
    description: "My computer has not been starting up since morning.",
    status: "unsolved",
    employee: "Emily Clark",
    empid: "EMP003",
    mail: "emily.clark@example.com",
    department: "IT",
    role: "Support Engineer",
    date: "2025-06-02",
  },
  {
    id: 4,
    title: "Internet Issues",
    description: "The internet connection is very unstable and affecting my work.",
    status: "unsolved",
    employee: "Michael Brown",
    empid: "EMP004",
    mail: "michael.brown@example.com",
    department: "IT",
    role: "Developer",
    date: "2025-06-03",
  },
  {
    id: 5,
    title: "No Air Conditioning",
    description: "The AC in our cabin is not working for the past week.",
    status: "solved",
    employee: "Linda Johnson",
    empid: "EMP005",
    mail: "linda.johnson@example.com",
    department: "Admin",
    role: "Manager",
    date: "2025-05-30",
  },
  {
    id: 6,
    title: "Unhygienic Pantry",
    description: "The pantry area is not cleaned regularly.",
    status: "unsolved",
    employee: "Robert King",
    empid: "EMP006",
    mail: "robert.king@example.com",
    department: "General Services",
    role: "Staff",
    date: "2025-06-03",
  }
];

const GrievanceManagement = () => {
  const [grievances, setGrievances] = useState<Grievance[]>([]);

  const [filter, setFilter] = useState<"all" | "solved" | "unsolved">("all");
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);

  const filteredGrievances = grievances.filter((g) =>
    filter === "all" ? true : g.status === filter
  );

  const markAsSolved = async (id: string) => {
  if (!id) {
    console.warn("markAsSolved called with invalid ID:",id);
    return;
  }

  try {
    const updatedStatus: { status: "solved" } = { status: "solved" };
    await updateGrievanceStatus(id.toString(), updatedStatus);

    setGrievances((prev) =>
      prev.map((g) => (g.id === id ? { ...g, status: "solved" } : g))
    );

    setSelectedGrievance(null);
  } catch (error) {
    console.error("Failed to update grievance status", error);
  }
};

   useEffect(() => {
  setSelectedGrievance(null);
}, [filter]);

const fetchGrievances = async (data:Grievance) => {
  try {
    const response: any = await getAllGrievances(data);
    console.log("API Response:", response);

    const grievances = response?.data ?? []; 
    setGrievances(grievances);
  } catch (error) {
    console.error("Error fetching grievances:", error);
  }
};

  useEffect(() => {
   fetchGrievances();
 }, []);


  return (
    <div className="min-h-screen bg-white mt-5">
      <div className="max-w-full ">
        <h1 className=" text-[black] mb-6" style={FONTS.header}>
          Grievances
        </h1>

        <div className="flex space-x-4 mb-6">
          {(["all", "unsolved", "solved"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full font-medium capitalize border transition-all duration-200 text-sm ${
                filter === status
                  ? "bg-[#006666] text-white border-[#006666]"
                  : "text-[#006666] border-[#006666] hover:bg-[#e6f4f4]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex gap-6">
          <div className="w-1/2">
            <div className="space-y-4">
              {filteredGrievances.length === 0 ? (
                <p className="text-center text-gray-400 mt-12">No grievances to show.</p>
              ) : (
                filteredGrievances.map((grievance) => (
                  <div
                    key={grievance.id}
                    onClick={() => setSelectedGrievance(grievance)}
                    className="cursor-pointer"
                  >
                    <GrievanceCard grievance={grievance} />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="w-1/2 bg-[#fef7f4] border-l border-[#ecdcd7] pl-6">
            {selectedGrievance ? (
              <GrievanceDetailCard
  grievance={selectedGrievance}
  onClose={() => setSelectedGrievance(null)}
 onMarkSolved={() => {
  if (selectedGrievance?.id) {
    markAsSolved(selectedGrievance.id);
  } else {
    console.error("No valid grievance ID to mark as solved");
  }
}}

/>
            ) : (
              <p className="text-center text-gray-400 mt-12">Select a grievance to view details.</p>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default GrievanceManagement;