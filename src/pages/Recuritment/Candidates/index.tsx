"use client"
import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  MessageSquare,  
  Calendar,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  Pencil,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getAllcandidates,
  updateStatus,
} from "../../../features/Candidates/services";
import EditCandidateModal from "./EditCandidateModal";
import { FaPlus } from "react-icons/fa";
import AddCandidateModal from "./AddForm";

// Card Components
const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow-sm border p-4">{children}</div>
);

const CardHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4">{children}</div>
);

const CardContent = ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
);

const CardTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);

const CardDescription = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;

const Button = ({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => (
  <button
    className={`px-4 py-2 text-sm rounded-md border ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const Badge = ({
  children,
  className = "",
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={`text-xs font-medium px-2 py-1 rounded cursor-pointer ${className}`}
    {...rest}
  >
    {children}
  </span>
);

const Input = ({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => (
  <input
    className="border text-sm rounded-md px-8 py-2 w-72 focus:outline-none"
    {...{ value, onChange, placeholder }}
  />
);

const Info = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div>
    <p className="text-sm font-medium">{label}</p>
    <p className="text-sm text-gray-500 break-all">{value}</p>
  </div>
);

const statusColor = (s: string = "") =>
  ({
    "interview schedules": "bg-blue-100 text-blue-800",
    "under review": "bg-yellow-100 text-yellow-800",
    shortlisted: "bg-green-100 text-green-800",
  }[s.toLowerCase()] ?? "bg-gray-100 text-gray-800");

const nextStatus = (s: string = "") =>
  s.toLowerCase() === "under review"
    ? "shortlisted"
    : s.toLowerCase() === "shortlisted"
    ? "interview schedules"
    : "under review";

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const navigate = useNavigate();
  const [currentFilter, setCurrentFilter] = useState("");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const filterDropdownRef = useRef(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (openMenuId && !(event.target as Element).closest(".relative")) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const res: any = await getAllcandidates();
      setCandidates(res?.data ?? []);
    } catch (err) {
      console.error("getAllcandidates failed:", err);
    }
  };

  const handleStatusClick = async (cand: any) => {
    const current = cand.details?.status ?? "";
    const updated = nextStatus(current);
    try {
      await updateStatus(cand._id, { status: updated } as any);
      setCandidates((prev) =>
        prev.map((c) =>
          c._id === cand._id
            ? { ...c, details: { ...c.details, status: updated } }
            : c
        )
      );
    } catch (err) {
      console.error("updateStatus failed:", err);
    }
  };

  const handleEditCandidate = (candidate: any) => {
    setSelectedCandidate(candidate);
    setEditModalOpen(true);
    setOpenMenuId(null);
  };

  const handleSaveEdit = async (updatedData: any) => {
    try {
      fetchCandidates(); // Refresh the list
      setEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update candidate:", err);
    }
  };

  const handleAddCandidate = async (newCandidateData: any) => {
    try {
      fetchCandidates(); // Refresh the list
      setAddModalOpen(false);
    } catch (err) {
      console.error("Failed to add candidate:", err);
    }
  };

  const filtered = candidates.filter((c) =>
    [c.details?.name, c.details?.position, c.details?.location].some(
      (f) =>
        typeof f === "string" &&
        f.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const filters = [
  { value: "New Candidates", label: "New Candidates" },
  { value: "Interviewed", label: "Interviewed" },
  { value: "Hired", label: "Hired" }
];

  return (
    <>
    <div className="p-6 space-y-6 min-h-screen">
   <div className="flex">
    <div className="flex items-center justify-between">
    <h1 className="text-3xl font-bold text-white mt-2 leading-relaxed pb-3">
      Candidates
    </h1>

    <div className="flex items-center ml-4 gap-4">
      <button
        className="flex items-center gap-2 px-4 py-1 bg-[#5e59a9] text-white rounded-lg hover:bg-[#5e59a9]/90 transition-colors duration-200"
        onClick={() => setAddModalOpen(true)}
      >
        <FaPlus className="w-3 h-3 text-white" />
        Add Candidates
      </button>
    </div>

    <div className="flex md:flex-row justify-between gap-4 ml-4">
    {/* Search bar */}
    <div className="flex border border-gray-300 rounded-md w-full md:w-80 backdrop-blur-xl bg-white/10">
      <input
        type="text"
        placeholder="Search candidates..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pr-12 pl-4 px-2 py-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg text-white placeholder-gray-300"
      />
      <Search className="text-gray-300 absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
    </div>

    {/* Filter button */}
    <div className="relative" ref={filterDropdownRef}>
      <button
        className={`flex items-center w-40 gap-2 px-3 py-2 border rounded-md text-sm text-gray-300 transition-colors duration-200 h-8 focus:ring-2 focus:ring-gray-300 rounded-lg ${
          currentFilter
            ? "border-gray-300 bg-transparent backdrop-blur-xl bg-white/10"
            : "border-gray-300 bg-transparent backdrop-blur-xl bg-white/10 hover:bg-gray-500/10"
        }`}
        onClick={() => setShowFilterDropdown(!showFilterDropdown)}
      >
      
        {currentFilter || "All Candidates"}
        {showFilterDropdown ? (
          <ChevronUp className="w-4 h-4" />
        ) : (
          <ChevronDown className="w-4 h-4" />
        )}
      </button>

      {showFilterDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl border-gray-200 shadow-lg z-20">
          <button
            className={`block rounded-t-xl w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
              !currentFilter
                ? "bg-[#5e59a9]/10 text-[#5e59a9] font-medium"
                : "text-gray-700"
            }`}
            onClick={() => {
              setCurrentFilter("");
              setShowFilterDropdown(false);
            }}
          >
            All Candidates
          </button>
          {filters.map((filter, idx) => (
            <button
              key={idx}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                currentFilter === filter.value
                  ? "bg-[#5e59a9]/10 text-[#5e59a9] font-medium"
                  : "text-gray-700"
              }${idx === filters.length - 1 ? " rounded-b-xl" : ""}`}
              onClick={() => {
                setCurrentFilter(filter.value);
                setShowFilterDropdown(false);
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>
      )}
    </div>   

    </div>
  </div>
</div>

      {filtered.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-center text-gray-500">
            No candidates found. Try adjusting your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((cand) => {
            const d = cand.details ?? {};
            return (
              <Card key={cand._id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                        {(d.avatar ?? d.name?.slice(0, 2) ?? "NA").toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          {d.name && <CardTitle>{d.name}</CardTitle>}
                          {typeof d.rating === "number" && (
                            <div className="flex items-center text-yellow-500">
                              <Star className="h-4 w-4 fill-yellow-400" />
                              <span className="ml-1 text-sm">{d.rating}</span>
                            </div>
                          )}
                        </div>
                        <CardDescription className="mt-1 space-y-1">
                          {d.position && (
                            <div className="flex items-center">
                              <Briefcase className="h-4 w-4 mr-1 text-gray-400" />
                              <span>{d.position}</span>
                            </div>
                          )}
                          {d.location && (
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                              <span>{d.location}</span>
                            </div>
                          )}
                          {d.education && (
                            <div className="flex items-center">
                              <GraduationCap className="h-4 w-4 mr-1 text-gray-400" />
                              <span>{d.education}</span>
                            </div>
                          )}
                        </CardDescription>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <Badge
                        className={statusColor(d.status)}
                        onClick={() => handleStatusClick(cand)}
                      >
                        {d.status ?? "—"}
                      </Badge>
                      <div className="relative">
                        <Button
                          className="bg-white border-0 hover:bg-gray-50"
                          onClick={() =>
                            setOpenMenuId(openMenuId === cand._id ? null : cand._id)
                          }
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>

                        {openMenuId === cand._id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                            <button
                              onClick={() => handleEditCandidate(cand)}
                              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                              <Pencil className="w-4 h-4 mr-2" />
                              Edit Candidate
                            </button>
                            <button
                              className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Candidate
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4 ml-16">
                    {d.experience && (
                      <Info label="Experience" value={d.experience} />
                    )}
                    {d.email && <Info label="Email" value={d.email} />}
                    {d.phonenumber && (
                      <Info label="Phone" value={d.phonenumber} />
                    )}
                    {d.applieddate && (
                      <Info
                        label="Applied"
                        value={new Date(d.applieddate).toLocaleDateString()}
                      />
                    )}
                  </div>

                  {Array.isArray(d.skills) && d.skills.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {d.skills.map((s: string, idx: number) => (
                          <Badge
                            key={idx}
                            className="bg-gray-100 text-gray-700"
                          >
                            {s}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() =>
                        navigate(`/recruitment/candidatelists/candidatesPage`)
                      }
                      className="flex items-center gap-2 hover:bg-gray-50"
                    >
                      <Eye className="h-4 w-4" /> View
                    </Button>
                    <Button className="flex items-center gap-2 hover:bg-gray-50">
                      <MessageSquare className="h-4 w-4" /> Message
                    </Button>
                    <Button className="flex items-center gap-2 bg-blue-600 text-white border-0 hover:bg-blue-700">
                      <Calendar className="h-4 w-4" /> Interview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Add Candidate Modal */}
      {addModalOpen && (
        <AddCandidateModal
          onClose={() => setAddModalOpen(false)}
          onSave={handleAddCandidate}
        />
      )}

      {/* Edit Candidate Modal */}
      {editModalOpen && selectedCandidate && (
        <EditCandidateModal
          candidate={selectedCandidate}
          onClose={() => setEditModalOpen(false)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
    </>
  );
}