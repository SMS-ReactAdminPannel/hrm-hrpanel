import { useState, useEffect } from "react";
import { Plus, Search, Filter, Building, User, UserCheck } from "lucide-react";
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

const GrievanceData: Grievance[] = [
  {
    id: 1,
    title: "Equipment Malfunction",
    description: "My workstation computer crashes frequently, causing data loss and productivity issues. IT support has been contacted multiple times but the issue persists.",
    status: "solved",
    employee: "Mohan",
    empid: "EMP001",
    mail: "mohan@company.com",
    department: "Engineering",
    role: "Software Developer",
    date: "2024-06-10"
  },
  {
    id: 2,
    title: "Overtime Payment Discrepancy",
    description: "Overtime hours worked in May 2024 were not properly compensated according to company policy. Requesting review of timesheets and appropriate payment adjustment.",
    status: "unsolved",
    employee: "Hema sree",
    empid: "EMP002",
    mail: "hemasree@company.com",
    department: "Finance",
    role: "Financial Analyst",
    date: "2024-06-20"
  }
]

const GrievanceManagement = () => {
  const [grievances, setGrievances] = useState<Grievance[]>(GrievanceData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "solved" | "unsolved">("all");
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);



  /*const markAsSolved = async (id: string) => {
    if (!id) {
      console.warn("markAsSolved called with invalid ID:", id);
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

const fetchGrievances = async () => {
  try {
    const response: any = await getAllGrievances();
    console.log("API Response:", response);

    const grievances = response?.data ?? []; 
    setGrievances(grievances);
  } catch (error) {
    console.error("Error fetching grievances:", error);
  }
};

  useEffect(() => {
    setSelectedGrievance(null);
  }, [filter]);


  useEffect(() => {
    fetchGrievances();
  }, []);
*/




  const handleStatusChange = async (id: number, newStatus: "solved" | "unsolved") => {
    try {
      await updateGrievanceStatus(id.toString(), { status: newStatus });

      setGrievances((prev) =>
        prev.map((g) => (g.id === id ? { ...g, status: newStatus } : g))
      );
      if (selectedGrievance?.id === id) {
        setSelectedGrievance({ ...selectedGrievance, status: newStatus });
      }
    } catch (error) {
      console.error("Failed to update grievance status:", error);
    }
  };

  const filteredGrievances = grievances.filter((g) => {
    const matchesSearch =
      g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.employee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || g.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (selectedGrievance) {
    return (
      <GrievanceDetailCard
        grievance={selectedGrievance}
        onBack={() => setSelectedGrievance(null)}
        onStatusChange={handleStatusChange}
      />
    );
  }

  return (
    <div className="min-h-screen">

      <div className="mb-6 ml-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900" style={{...FONTS.header}}>Grievance Management</h1>
        </div>
        <div className="flex flex-wrap gap-4 mb-6 mt-7">
          <div className="inline-block bg-white rounded-lg shadow-sm p-6 min-w-[250px]">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Total Grievances</p>
                <p className="text-2xl font-semibold text-gray-900">{grievances.length}</p>
              </div>
            </div>
          </div>

          <div className="inline-block bg-white rounded-lg shadow-sm p-6 min-w-[250px]">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Solved</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {grievances.filter((g) => g.status === "solved").length}
                </p>
              </div>
            </div>
          </div>

          <div className="inline-block bg-white rounded-lg shadow-sm p-6 min-w-[250px]">
            <div className="flex items-center">
              <div className="bg-red-100 p-3 rounded-full">
                <User className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Unsolved</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {grievances.filter((g) => g.status === "unsolved").length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="mb-6 ml-7 px-4 py-6">
        <div className=" sm:flex-row gap-4">
          <div className="relative inline-block flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search grievances..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-30 pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white/30 backdrop-blur-md"
            />
          </div>

          <div className="relative inline-block ml-10">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "solved" | "unsolved")}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg bg-white/30 backdrop-blur-md"
            >
              <option value="all">All Status</option>
              <option value="solved">Solved</option>
              <option value="unsolved">Unsolved</option>
            </select>
          </div>
        </div>
      </div>



      <div className="mb-6 ml-7 px-4 py-6">
        {filteredGrievances.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No grievances found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGrievances.map((grievance) => (
              <GrievanceCard
                key={grievance.id}
                grievance={grievance}
                onClick={() => setSelectedGrievance(grievance)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GrievanceManagement;