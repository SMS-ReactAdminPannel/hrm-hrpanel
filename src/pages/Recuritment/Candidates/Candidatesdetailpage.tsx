import { useParams, useNavigate } from "react-router-dom"
import { useState } from "react"
import { FileText, Image, File, Upload, FolderOpen, ArrowUp, Pencil, Eye, Trash2 } from "lucide-react"
import EditCandidateModal from "./EditCandidateModal"
import { FONTS } from "../../../constants/uiConstants"
import { FaArrowLeftLong } from "react-icons/fa6"

const tabs = ["About", "Resume", "Documents", "Scheduled Interviews"]

export default function CandidateDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("About")
  const [showModal, setShowModal] = useState(false)

  const [candidate, setCandidate] = useState({
    id,
    name: "Rangaraya Sakthivelu",
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
    position: "Frontend Developer",
    skills: ["React", "JavaScript"],
    status: "under review"
  })

  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeURL, setResumeURL] = useState<string | null>(null)
  const [documentFiles, setDocumentFiles] = useState<File[]>([])
  const [documentURLs, setDocumentURLs] = useState<string[]>([])

  const interviewData = [
    {
      companyName: "Meta",
      position: "Frontend Developer",
      date: "2025-07-01",
      time: "10:00 AM",
      interviewer: "John Smith",
      mode: "Zoom",
      status: "Scheduled"
    },
    {
      companyName: "Yoho",
      position: "Backend Engineer",
      date: "2025-07-02",
      time: "2:00 PM",
      interviewer: "Sarah Miller",
      mode: "In-Person",
      status: "Completed"
    },
    {
      companyName: "Meta",
      position: "Data Analyst",
      date: "2025-07-02",
      time: "2:00 PM",
      interviewer: "Sarah Miller",
      mode: "In-Person",
      status: "Cancelled"
    },
    {
      companyName: "TCS",
      position: "App developer",
      date: "2025-07-02",
      time: "2:00 PM",
      interviewer: "Sarah Miller",
      mode: "In-Person",
      status: "Scheduled"
    }
  ]

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFile(file)
      setResumeURL(URL.createObjectURL(file))
    }
  }

  const handleDeleteResume = () => {
    setResumeFile(null)
    setResumeURL(null)
  }

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 0) {
      setDocumentFiles([...documentFiles, ...files])
      setDocumentURLs([...documentURLs, ...files.map(file => URL.createObjectURL(file))])
    }
  }

  const handleDeleteDocument = (index: number) => {
    const newFiles = [...documentFiles]
    const newURLs = [...documentURLs]
    newFiles.splice(index, 1)
    newURLs.splice(index, 1)
    setDocumentFiles(newFiles)
    setDocumentURLs(newURLs)
  }

  return (
    <div className="p-10 bg-[#eff4f5] min-h-screen rounded-lg">
      {/* Back Button */}
      <div className="mb-3">
        <button onClick={() => navigate(`/recruitment/candidatelists`)} className="text-gray-700 hover:text-black">
          <FaArrowLeftLong className="w-6 h-6" />
        </button>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <div>
          <h1 className="text-xl font-semibold" style={{ fontSize: FONTS.header2.fontSize }}>
            {candidate.name}
          </h1>
          <p className="text-gray-500 text-sm" style={{ fontSize: FONTS.paragraph.fontSize }}>
            {candidate.job}
          </p>
          <div className="flex gap-4 text-sm mt-1 text-gray-600">
            <span>{candidate.email}</span>
            <span>{candidate.phone}</span>
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
        {tabs.map(tab => (
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

      {/* About Tab */}
      {activeTab === "About" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded p-4">
            <h2 className="font-semibold text-lg mb-3" style={{ fontSize: FONTS.header3.fontSize }}>
              Personal Information
            </h2>
            <div className="space-y-4 text-sm text-gray-700">
              <div><strong>Date of Birth:</strong> {candidate.dob}</div>
              <div><strong>Gender:</strong> {candidate.gender}</div>
              <div><strong>Address:</strong> {candidate.address}</div>
              <div><strong>Country:</strong> {candidate.country}</div>
              <div><strong>State:</strong> {candidate.state}</div>
              <div><strong>Portfolio:</strong> {candidate.portfolio || "-"}</div>
            </div>
          </div>

          <div className="border rounded p-4">
            <h2 className="font-semibold text-lg mb-3" style={{ fontSize: FONTS.header3.fontSize }}>
              Recruitment Information
            </h2>
            <div className="space-y-4 text-sm text-gray-700">
              <div><strong>Recruitment ID:</strong> {candidate.recruitmentId}</div>
              <div><strong>Department:</strong> {candidate.department}</div>
              <div><strong>Source:</strong> {candidate.source}</div>
              <div><strong>Current Stage:</strong> {candidate.stage}</div>
              <div><strong>Job Position:</strong> {candidate.job}</div>
              <div><strong>Referral:</strong> {candidate.referral}</div>
            </div>
          </div>
        </div>
      )}

      {/* Resume Tab */}
      {activeTab === "Resume" && (
        <div className="max-w-2xl mx-auto mt-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Resume Upload</h2>
            {/* Upload Box */}
            <label className="cursor-pointer flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition">
              <input type="file" accept=".pdf,.doc,.docx" onChange={handleResumeUpload} className="hidden" />
              <ArrowUp className="w-6 h-6 text-gray-600 mb-2" />
              <span className="text-sm text-gray-700">Click to select or drag and drop</span>
            </label>
            {resumeFile && (
              <div className="mt-6 bg-blue-50 p-4 rounded">
                <div className="flex justify-between items-center">
                  <span>{resumeFile.name} ({(resumeFile.size / 1024).toFixed(1)} KB)</span>
                  <div className="flex space-x-2">
                    <button onClick={() => window.open(resumeURL!, '_blank')}>
                      <Eye className="w-5 h-5 text-[#006666]" />
                    </button>
                    <button onClick={handleDeleteResume}>
                      <Trash2 className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Documents Tab */}
      {activeTab === "Documents" && (
        <div className="max-w-2xl mx-auto mt-6">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Documents</h2>
            <label className="cursor-pointer flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg bg-gray-50 hover:bg-gray-100 transition">
              <input type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" multiple onChange={handleDocumentUpload} className="hidden" />
              <Upload className="w-6 h-6 text-gray-600 mb-2" />
              <span className="text-sm text-gray-700">Click to select or drag and drop</span>
            </label>

            {documentFiles.length > 0 ? (
              <ul className="mt-4 space-y-3">
                {documentFiles.map((file, idx) => (
                  <li key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                    <span className="truncate">{file.name}</span>
                    <div className="flex space-x-2">
                      <button onClick={() => window.open(documentURLs[idx], '_blank')}>
                        <Eye className="w-5 h-5 text-[#006666]" />
                      </button>
                      <button onClick={() => handleDeleteDocument(idx)}>
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-gray-500 text-center">No documents uploaded yet.</p>
            )}
          </div>
        </div>
      )}

      {/* Scheduled Interviews Tab */}
      {activeTab === "Scheduled Interviews" && (
        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white divide-y divide-gray-200 rounded-xl shadow-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Interviewer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mode</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {interviewData.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{item.companyName}</td>
                  <td className="px-6 py-4">{item.position}</td>
                  <td className="px-6 py-4">
                    {item.date} <br /> {item.time}
                  </td>
                  <td className="px-6 py-4">{item.interviewer}</td>
                  <td className="px-6 py-4">{item.mode}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' :
                      item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>{item.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <EditCandidateModal
          candidate={{ details: candidate }}
          onClose={() => setShowModal(false)}
          onSave={(updatedData) => {
            setCandidate((prev) => ({
              ...prev,
              ...updatedData
            }))
            setShowModal(false)
          }}
        />
      )}
    </div>
  )
}
