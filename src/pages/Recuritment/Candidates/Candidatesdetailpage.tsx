import { useParams } from "react-router-dom"
import { useState } from "react"
import { Pencil, ArrowRight, ArrowLeft, Star } from "lucide-react"
import EditCandidateModal from "./EditCandidateModal"

const tabs = [
  "About", "Resume", "Survey", "History",
  "Documents", "Scheduled Interviews"
]

export default function CandidateDetailPage() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("About")
  const [showModal, setShowModal] = useState(false)

  const candidate = {
    id,
    name: "Shivam Ramanuj",
    email: "shivam.r@turabit.com",
    phone: "9348754738",
    dob: "Apr. 30, 2025",
    gender: "Female",
    address: "16, Shreeji Park Society, Near Sardar Patel School, Anand Nagar, Ahmedabad",
    country: "-1",
    state: "Gujarat",
    portfolio: "https://shivamramanuj.com",
    recruitmentId: "456",
    department: "S/W Dept",
    source: "Inside software",
    stage: "Initial - (456)",
    job: "Odoo Dev - (S/W Dept)",
    referral: "None",
    avatar: "SR",
    education: "",
    experience: "",
    location: "",
  }


  const [resumeFile, setResumeFile] = useState<File | null>(null)
const [resumeURL, setResumeURL] = useState<string | null>(null)


  return (
    <div className="p-10 bg-[#eff4f5]  min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <div className="flex items-center gap-4">
          {/* <div className="h-16 w-16 rounded bg-red-600 text-white text-2xl font-bold flex items-center justify-center">
            {candidate.avatar}
          </div> */}
          <div>
            <h1 className="text-xl font-semibold">{candidate.name}</h1>
            <p className="text-gray-500 text-sm">{candidate.job}</p>
            <div className="flex gap-4 text-sm mt-1 text-gray-600">
              <span>{candidate.email}</span>
              <span>{candidate.phone}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => setShowModal(true)} className="text-blue-600 hover:text-blue-800">
            <Pencil className="w-6 h-6" />
          </button>
          
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6 space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-medium ${
              activeTab === tab ? "border-b-2 border-red-500 text-black" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "About" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
          <div className="border rounded p-4">
            <h2 className="font-semibold text-lg mb-3">Personal Information</h2>
            <div className="space-y-10 text-sm text-gray-700">
              <div><strong>Date of Birth:</strong> {candidate.dob}</div>
              <div><strong>Gender:</strong> {candidate.gender}</div>
              <div><strong>Address:</strong> {candidate.address}</div>
              <div><strong>Country:</strong> {candidate.country}</div>
              <div><strong>State:</strong> {candidate.state}</div>
              <div><strong>Portfolio:</strong> {candidate.portfolio || "-"}</div>
            </div>
          </div>

          {/* Recruitment Information */}
          <div className="border rounded p-4">
            <h2 className="font-semibold text-lg mb-3">Recruitment Information</h2>
            <div className="space-y-10 text-sm text-gray-700">
              <div><strong>Recruitment ID:</strong> {candidate.recruitmentId}</div>
              <div><strong>Department:</strong> {candidate.department}</div>
              <div><strong>Source:</strong> {candidate.source}</div>
              <div><strong>Current Stage:</strong> {candidate.stage}</div>
              <div><strong>Job Position:</strong> {candidate.job}</div>
              <div><strong>Referral:</strong> {candidate.referral}</div>
            </div>
          </div>
        </div>
        </div>
      )}

      {/* Other Tabs */}
      {activeTab === "Survey" && <div>Survey content here...</div>}
      {activeTab === "Resume" && (
     
        <div className="border rounded p-6 max-w-xl bg-gray-50 mx-auto mt-6">
          <h2 className="text-lg font-semibold mb-4">Resume</h2>
          
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setResumeFile(file)
                setResumeURL(URL.createObjectURL(file)) // For previewing locally
              }
            }}
            className={`bg-[#006666] hover:bg-[#004C4C] text-white px-5 py-2 rounded-xl font-medium transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed`}
          />
      
          {resumeFile && (
            <div className="flex items-center justify-between bg-white p-3 mt-6 border rounded shadow-sm">
              <p className="text-sm text-gray-800">{resumeFile.name}</p>
              <a
                href={resumeURL!}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                View Resume
              </a>
            </div>
          )}
        </div>
      )}
 {/* Edit Modal */}
 {showModal && (
                        <EditCandidateModal
                          candidate={candidate}
                          onClose={() => setShowModal(false)}
                        />
                      )}

              </div>
            )}
      
                      
          
      
  
    
