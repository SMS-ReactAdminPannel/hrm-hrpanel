import React, { useState } from "react"
import {
  Search, Filter, MoreHorizontal, Eye, MessageSquare, Calendar,
  Star, MapPin, Briefcase, GraduationCap
} from "lucide-react"
import {  useNavigate } from "react-router-dom"
// import CandidateDetailPage from "./Candidatesdetailpage"

// Simple utility components built with TailwindCSS
const Card = ({ children }: { children: React.ReactNode }) => <div className="bg-white rounded-xl shadow-sm border p-4">{children}</div>
const CardHeader = ({ children }: { children: React.ReactNode }) => <div className="mb-4">{children}</div>
const CardContent = ({ children }: { children: React.ReactNode }) => <div>{children}</div>
const CardTitle = ({ children }: { children: React.ReactNode }) => <h2 className="text-lg font-semibold">{children}</h2>
const CardDescription = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <p className={`text-sm text-gray-500 ${className ?? ""}`}>{children}</p>
)
const Button = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <button className={`px-4 py-2 text-sm rounded-md border ${className}`} onClick={onClick}>{children}</button>
)
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => <span className={`text-xs font-medium px-2 py-1 rounded ${className}`}>{children}</span>
const Input = ({ value, onChange, placeholder }: { value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string }) => (
  <input
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className="border text-sm rounded-md px-8 py-2 w-72 focus:outline-none"
  />
)

const CandidatesPage = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const navigate = useNavigate()

 

  const candidates = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 123-4567",
      position: "Frontend Developer",
      experience: "5 years",
      location: "San Francisco, CA",
      education: "BS Computer Science",
      status: "Interview Scheduled",
      rating: 4.5,
      appliedDate: "2024-01-15",
      avatar: "SJ",
      skills: ["React", "TypeScript", "CSS"],
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@email.com",
      phone: "+1 (555) 234-5678",
      position: "Product Manager",
      experience: "7 years",
      location: "New York, NY",
      education: "MBA, BS Engineering",
      status: "Under Review",
      rating: 4.2,
      appliedDate: "2024-01-14",
      avatar: "MC",
      skills: ["Product Strategy", "Analytics", "Leadership"],
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily.davis@email.com",
      phone: "+1 (555) 345-6789",
      position: "UX Designer",
      experience: "4 years",
      location: "Remote",
      education: "BFA Design",
      status: "Shortlisted",
      rating: 4.8,
      appliedDate: "2024-01-13",
      avatar: "ED",
      skills: ["Figma", "User Research", "Prototyping"],
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Interview Scheduled": return "bg-blue-100 text-blue-800"
      case "Under Review": return "bg-yellow-100 text-yellow-800"
      case "Shortlisted": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const filtered = candidates.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase())
  )
  
  return (
    <div className="p-2 space-y-6 ">
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
          <Filter className="h-4 w-4 bg-white" /> Filter
        </Button>
      </div>

      <div className="grid gap-8 mx-2">
        {filtered.map((c) => (
          <Card key={c.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-700">
                    {c.avatar}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <CardTitle>{c.name}</CardTitle>
                      <div className="flex items-center text-yellow-500">
                        <Star className="h-4 w-4 fill-yellow-400" />
                        <span className="ml-1 text-sm">{c.rating}</span>
                      </div>
                    </div>
                    <CardDescription className="flex flex-wrap gap-4 mt-1">
                      <span className="flex items-center text-sm"><Briefcase className="h-4 w-4 mr-1" />{c.position}</span>
                      <span className="flex items-center text-sm"><MapPin className="h-4 w-4 mr-1" />{c.location}</span>
                      <span className="flex items-center text-sm"><GraduationCap className="h-4 w-4 mr-1" />{c.education}</span>
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(c.status)}>{c.status}</Badge>
                  <Button className="bg-white border-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6 mb-4 ">
                <div><p className="text-sm font-medium">Experience</p><p className="text-sm text-gray-500">{c.experience}</p></div>
                <div><p className="text-sm font-medium">Email</p><p className="text-sm text-gray-500">{c.email}</p></div>
                <div><p className="text-sm font-medium">Phone</p><p className="text-sm text-gray-500">{c.phone}</p></div>
                <div><p className="text-sm font-medium">Applied</p><p className="text-sm text-gray-500">{c.appliedDate}</p></div>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium mb-2">Skills</p>
                <div className="flex flex-wrap gap-2">
                  {c.skills.map((s, i) => (
                    <Badge key={i} className="bg-gray-100 text-gray-700">{s}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
              <Button
                 onClick={() => navigate(`/recruitment/candidatesDetailPage`)}
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
        ))}
      </div>
       
    </div>  
  )
}


export default CandidatesPage;

