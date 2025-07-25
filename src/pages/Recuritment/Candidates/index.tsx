// src/pages/CandidatesPage.tsx
import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getAllcandidates, updateStatus } from "../../../features/Candidates/services";




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
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res: any = await getAllcandidates(); 
        console.log("getAllcandidates raw →", res);
        // controller sends { success: true, data: [...] }
        setCandidates(res?.data?.data ?? []);
      } catch (err) {
        console.error("getAllcandidates failed:", err);
      }
    })();
  }, []);


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


  const filtered = candidates.filter((c) =>
    [c.details?.name, c.details?.position, c.details?.location].some(
      (f) =>
        typeof f === "string" &&
        f.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );



  return (
    <div className="p-2 space-y-6">
    
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="bg-white border-gray-200 flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filter
        </Button>
      </div>

      
      {filtered.length === 0 ? (
        <p className="text-center text-sm text-gray-500 mt-10">
          No candidates found.
        </p>
      ) : (
        <div className="grid gap-8 mx-2">
          {filtered.map((cand) => {
            const d = cand.details ?? {};
            return (
              <Card key={cand._id}>
              
                <CardHeader>
                  <div className="flex items-start justify-between">
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
                        <CardDescription className="flex flex-wrap gap-4 mt-1">
                          {d.position && (
                            <span className="flex items-center text-sm">
                              <Briefcase className="h-4 w-4 mr-1" />
                              {d.position}
                            </span>
                          )}
                          {d.location && (
                            <span className="flex items-center text-sm">
                              <MapPin className="h-4 w-4 mr-1" />
                              {d.location}
                            </span>
                          )}
                          {d.education && (
                            <span className="flex items-center text-sm">
                              <GraduationCap className="h-4 w-4 mr-1" />
                              {d.education}
                            </span>
                          )}
                        </CardDescription>
                      </div>
                    </div>

                  
                    <div className="flex items-center space-x-2">
                      <Badge
                        className={statusColor(d.status)}
                        onClick={() => handleStatusClick(cand)}
                      >
                        {d.status ?? "—"}
                      </Badge>
                      <Button className="bg-white border-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

          
                <CardContent>
                
                  <div className="flex flex-wrap gap-6 mb-4">
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

            
                  <div className="flex gap-2">
                    <Button
                      onClick={() => navigate(`/recruitment/candidatelists/candidatesPage`)}
                      className="flex items-center gap-2"
                    >
                      <Eye className="h-4 w-4" /> View
                    </Button>
                    <Button className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" /> Message
                    </Button>
                    <Button className="flex items-center gap-2 bg-blue-600 text-white border-0">
                      <Calendar className="h-4 w-4" /> Interview
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}


const Info = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    <p className="text-sm font-medium">{label}</p>
    <p className="text-sm text-gray-500 break-all">{value}</p>
  </div>
);
