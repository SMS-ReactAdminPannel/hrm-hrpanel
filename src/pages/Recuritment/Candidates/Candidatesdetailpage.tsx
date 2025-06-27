import { useParams } from "react-router-dom"
import { useState } from "react"
import { FileText, Image, File, Upload, FolderOpen, ArrowUp, Pencil, Eye, Trash2 } from "lucide-react"
import EditCandidateModal from "./EditCandidateModal"
import { FONTS } from "../../../constants/uiConstants"

const tabs = [
  "About", "Resume",
  "Documents", "Scheduled Interviews"
]

export default function CandidateDetailPage() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState("About")
  const [showModal, setShowModal] = useState(false)

  const interviewData = [
  {
    companyName: "Yoho",
    position: "Frontend Developer",
    date: "2025-07-01",
    time: "10:00 AM",
    interviewer: "John Smith",
    mode: "Zoom"
  },
  {
    companyName: "Google",
    position: "Backend Engineer",
    date: "2025-07-02",
    time: "2:00 PM",
    interviewer: "Sarah Miller",
    mode: "In-Person"
  },
  {
    companyName: "Meta",
    position: "Data Analyst",
    date: "2025-07-02",
    time: "2:00 PM",
    interviewer: "Sarah Miller",
    mode: "In-Person"
  },
  {
    companyName: "TCS",
    position: "App developer",
    date: "2025-07-02",
    time: "2:00 PM",
    interviewer: "Sarah Miller",
    mode: "In-Person"
  },

];


  const candidate = {
    id,
    name: "Rangaraya Sakthivel",
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

  // Resume state
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeURL, setResumeURL] = useState<string | null>(null)

  // Documents state
  const [documentFiles, setDocumentFiles] = useState<File[]>([])
  const [documentURLs, setDocumentURLs] = useState<string[]>([])

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
    <div className="p-10 bg-[#eff4f5] min-h-screen backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold"
              style={{ fontSize: FONTS.header2.fontSize }}>{candidate.name}</h1>
            <p className="text-gray-500 text-sm"
              style={{ fontSize: FONTS.paragraph.fontSize }}>{candidate.job}</p>
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
              <h2 className="font-semibold text-lg mb-3"
                style={{ fontSize: FONTS.header3.fontSize }}>Personal Information</h2>
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
              <h2 className="font-semibold text-lg mb-3"
                style={{ fontSize: FONTS.header3.fontSize }}>Recruitment Information</h2>
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

      {/* Resume Tab */}
     {activeTab === "Resume" && (
  <div className="max-w-2xl mx-auto mt-6">
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Resume Upload</h2>
        
        {/* Upload Area */}
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          
          <label className="cursor-pointer mb-2">
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleResumeUpload}
              className="hidden"
            />
            <span className="bg-[#006666] hover:bg-[#004C4C] text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg inline-flex items-center">
              <ArrowUp className="w-5 h-5 mr-2" />
              Select Resume File
            </span>
          </label>
          
          <p className="text-sm text-gray-500 mt-2">or drag and drop file here</p>
          <p className="text-xs text-gray-400 mt-1">Supports: PDF, DOC, DOCX (Max 10MB)</p>
        </div>

        {/* Uploaded File */}
        {resumeFile && (
          <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-[#006666]" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{resumeFile.name}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="text-xs text-gray-800">{(resumeFile.size / 1024).toFixed(1)} KB</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-[#006666]">Ready to submit</span>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => window.open(resumeURL!, '_blank')}
                  className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                  title="View"
                >
                  <Eye className="w-6 h-6 text-[#006666]" />
                </button>
                <button
                  onClick={handleDeleteResume}
                  className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-100 transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-1.5">
              <div className="bg-[#006666] h-1.5 rounded-full" style={{width: '100%'}}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
)}

{activeTab === "Documents" && (
  <div className="max-w-4xl mx-auto mt-6">
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Documents</h2>
        
        {/* Upload Area */}
        <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors mb-6">
          <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          
          <label className="cursor-pointer mb-2">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              onChange={handleDocumentUpload}
              multiple
              className="hidden"
            />
            <span className="bg-[#006666] hover:bg-[#004C4C] text-white px-6 py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg inline-flex items-center">
              <Upload className="w-5 h-5 mr-2" />
              Select Documents
            </span>
          </label>
          
          <p className="text-sm text-gray-500 mt-2">or drag and drop files here</p>
          <p className="text-xs text-gray-400 mt-1">Supports: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</p>
        </div>

        {/* Uploaded Files List */}
        {documentFiles.length > 0 ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700">
                Uploaded Documents ({documentFiles.length})
              </h3>
              <button 
                onClick={() => setDocumentFiles([])}
                className="text-xs text-red-500 hover:text-red-700 flex items-center"
              >
                <Trash2 className="w-3 h-3 mr-1" /> Clear All
              </button>
            </div>
            
            <div className="divide-y divide-gray-200">
              {documentFiles.map((file, index) => (
                <div key={index} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex  items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {file.type.includes('pdf') ? (
                        <div className="bg-red-100  bg-[#006666] p-2 rounded-lg">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                      ) : file.type.includes('image') ? (
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <Image className="w-5 h-5 text-blue-600" />
                        </div>
                      ) : (
                        <div className="bg-indigo-100 p-2 rounded-lg">
                          <File className="w-5 h-5 text-indigo-600" />
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-800 truncate max-w-xs">{file.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-800">{(file.size / 1024).toFixed(1)} KB</span>
                          <span className="text-xs text-gray-400">•</span>
                          <span className="text-xs text-gray-500">
                            {file.type.split('/')[1].toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => window.open(documentURLs[index], '_blank')}
                        className="p-2 text-gray-500 hover:text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
                        title="View"
                      >
                        <Eye className="w-6 h-6 text-[#006666]" />
                      </button>
                      <button
                        onClick={() => handleDeleteDocument(index)}
                        className="p-2 text-gray-500 hover:text-red-600 rounded-full hover:bg-red-100 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <FolderOpen className="w-12 h-12 mx-auto text-gray-400" />
            <h3 className="mt-3 text-sm font-medium text-gray-900">No documents uploaded</h3>
            <p className="mt-1 text-sm text-gray-500">Upload your documents to get started</p>
          </div>
        )}
      </div>
    </div>
  </div>
)}

      {/* Other Tabs */}
     {activeTab === "Scheduled Interviews" && (
  <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
    {interviewData.map((interview, index) => (
      <div
        key={index}
        className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {interview.candidateName}
        </h3>
        <p className="text-xl font-bold"><span className="">Company:</span> {interview.companyName}</p>
        <p className=""><span className="text-gray-600">Date:</span> {interview.date}</p>
        <p className=""><span className="text-gray-600">Time:</span> {interview.time}</p>
        <p className=""><span className="text-gray-600">Interviewer:</span> {interview.interviewer}</p>
        <p className=""><span className="text-gray-600">Mode:</span> {interview.mode}</p>
      </div>
    ))}
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
  )
}