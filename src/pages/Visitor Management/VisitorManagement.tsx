import { useEffect, useState } from "react";
import { createVisitor, deleteVisitor, getVisitors } from "../../features/VisitorsManagement/service"; // Adjust path as needed
import { Building } from "lucide-react";
import VisitorDetailsModal from "./VisitorDetailsModel";
import VisitorCard from "./VisitorCard";
import AddVisitorForm from "./VisitorAddForm";

type Visitor = {
  _id: string;
  fullName: string;
  phoneNumber: string;
  email?: string;
  company?: string;
  host?: string;
  purposeOfVisit?: string;
  remarks?: string;
  checkInTime?: string;
  checkOutTime?: string;
  visitDate?: string;
  attachment?: string;
};

const VisitorManagement = () => {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const fetchVisitors = async () => {
    try {
      const response: any = await getVisitors();
      const visitors = response?.data ?? [];
      setVisitors(visitors);
<<<<<<< HEAD
      console.log("Visitors fetched:", visitors.data);
=======
      console.log("Visitors fetched:", visitors);
>>>>>>> 885486306bc117ee96c8aaeb9d8967087fe3ac0b
    } catch (error) {
      console.error("Error fetching visitors:", error);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);


  const delVisitor = async (visitorId: string) => {
    try {
      await deleteVisitor(visitorId);
      setVisitors(prev => prev.filter(visitor => visitor._id !== visitorId));
      console.log("Deleted:", visitorId);
    } catch (error) {
      console.error("Error deleting visitor:", error);
    }
  };


  const filteredVisitors = visitors.filter((visitor: any) => {
    const visitDate = visitor?.visitDate
      ? new Date(visitor.visitDate).toISOString().split("T")[0]
      : "";
    const matchesSearch =
      visitor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.phoneNumber.includes(searchTerm) ||
      visitor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      visitor.company?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFromDate = !fromDate || visitDate >= fromDate;
    const matchesToDate = !toDate || visitDate <= toDate;

    return matchesSearch && matchesFromDate && matchesToDate;
  });

  return (
    <div className="rounded-lg pb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Visit History</h2>

      <div className="flex items-center justify-between">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">From Date</label>
            <input
              title="fromDate"
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">To Date</label>
            <input
              title="toDate"
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-md"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-[#006666] text-white px-4 py-2 rounded-md">+ Add Visitor</button>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search Here..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 pl-10 border border-gray-300 rounded-md bg-white"
            />
          </div>
        </div>
      </div>

      <div className={`grid ${filteredVisitors.length === 0 ? "grid-cols-1" : "grid-cols-2"} gap-4 justify-center`}>
        {filteredVisitors.length === 0 ? (
          <div className="text-center py-12 m-auto bg-white w-1/2 m-auto rounded-md">
            <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-500 mb-2">No visit history found</h3>
            <p className="text-gray-400">Visit records will appear here</p>
          </div>
        ) : (
          filteredVisitors.map((visitor: any) => (
            <VisitorCard key={visitor._id} visitor={visitor} onClick={() => setSelectedVisitor(visitor)} />
          ))
        )}
      </div>

      {selectedVisitor && (
        <VisitorDetailsModal
          visitor={selectedVisitor}
          onClose={() => setSelectedVisitor(null)}
          delVisitor={delVisitor}
        />
      )}

      {showAddForm && (
        <AddVisitorForm
          onClose={() => setShowAddForm(false)}
          onSubmit={async (formPayload: FormData) => {
            try {
              const response = await createVisitor(formPayload);
              if (response && response.data) {
                const createdVisitor = response.data.data || response.data;
                setVisitors(prev => [...prev, createdVisitor]);
              }
              setShowAddForm(false);
            } catch (err: any) {
              console.error("Error adding visitor:", err);
              alert("Error adding visitor: " + (err?.message || "Unknown error"));
              setShowAddForm(false);
            }
          }}
        />
      )}
    </div>
  );
};

export default VisitorManagement;