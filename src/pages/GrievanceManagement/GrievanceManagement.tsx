import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const GrievanceManagement = () => {
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [filter, setFilter] = useState<"all" | "solved" | "unsolved">("all");
  const [selectedGrievance, setSelectedGrievance] = useState<Grievance | null>(null);

  const filteredGrievances = grievances.filter((g) =>
    filter === "all" ? true : g.status === filter
  );

  const markAsSolved = async (id: string) => {
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

  return (
    <div className="min-h-screen bg-white mt-5">
      <div className="max-w-full ">
        <h1 className="!text-gray-700 mb-6" style={{...FONTS.header}}>
          Grievances
        </h1>

        <div className="flex space-x-4 mb-2">
          {(["all", "unsolved", "solved"] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-md font-medium capitalize border transition-all bg-white duration-200 text-sm ${
                filter === status
                  ? "bg-[#5e59a9] text-white border-[#5e59a9]"
                  : "text-bg-[#5e59a9] border-bg-[#5e59a9] hover:bg-[#e6f4f4]"
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
                <p className="text-center text-gray-400 mt-12 " style={{...FONTS.paragraph}}>No grievances to show.</p>
              ) : (
                filteredGrievances.map((grievance) => (
                  <motion.div
                    key={grievance.id}
                    onClick={() => setSelectedGrievance(grievance)}
                    className="cursor-pointer"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <GrievanceCard grievance={grievance} />
                  </motion.div>
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
              <p className="text-center text-gray-400 mt-12" style={{...FONTS.paragraph}}>Select a grievance to view details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrievanceManagement;