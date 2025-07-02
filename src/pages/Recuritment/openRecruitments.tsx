import { useEffect, useState } from "react"
import HttpClient from "../../api/httpClient"
import { API_END_POINTS } from "../../api/httpEndpoints"
import { FONTS } from "../../constants/uiConstants"
import { motion, AnimatePresence } from "framer-motion"
import { createJob, deleteJob, getAllJobs, updateJob } from "../../features/JobPosting/service"
import { X } from "lucide-react"
import { toast } from "react-toastify";


// Type for each job posting
type Job = {
  _id: string
  company: string
  title: string
  roles: string[]
  description?: string
  capacity: number
  applied: number
  postedSince: string
  logo?: string
  location?: string
  salaryMin?: number
  salaryMax?: number
}

const OpenRecruitments = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [modalAnimating, setModalAnimating] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [jobToDelete, setJobToDelete] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    company: "",
    title: "",
    roles: "",
    description: "",
    capacity: "",
    location: "",
    salaryMin: "",
    salaryMax: "",
  })

  const [editFormData, setEditFormData] = useState({
    title: "",
    description: "",
    roles: "",
  })

  const fetchJobs = async () => {
    try {
      const response = await getAllJobs()
      console.log("Jobs fetched:", response)
      setJobs(response?.jobs || [])
    } catch (error) {
      console.error("Failed to fetch jobs:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleCreateJob = async (data: any) => {
    try{
      const response = await createJob(data)
      toast.success("New Job Created Successfully", {
     style: {
     background: "white", 
     color: "green",
       },
     });
      console.log("created")
    }catch(error){
      console.log(error)
    }
  }

  const handleUpdateJob = async (data: any, id: string) => {
    try {
      const response = await updateJob(id, data);
      toast.success("Job Details Updated Succesfully", {
        style: {
          background: "white",
          color: "green",
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const payload = {
        ...formData,
        roles: formData.roles.split(",").map((r) => r.trim()),
        capacity: parseInt(formData.capacity),
        salaryMin: parseInt(formData.salaryMin),
        salaryMax: parseInt(formData.salaryMax),
      }
      await handleCreateJob(payload)
      setShowCreateModal(false)
      setFormData({
        company: "",
        title: "",
        roles: "",
        description: "",
        capacity: "",
        location: "",
        salaryMin: "",
        salaryMax: "",
      })
      fetchJobs()
    } catch (err) {
      console.error("Failed to create job", err)
    }
  }

  const handleDeleteClick = (jobId: string) => {
    setJobToDelete(jobId)
    setShowDeleteModal(true)
    setModalAnimating(true)
  }

  const confirmDelete = async () => {
    if (!jobToDelete) return;
    
    console.log("Deleting job with ID:", jobToDelete);
    try {
      const response = await deleteJob(jobToDelete);
      toast.success("Job Deleted Succesfully", {
        style: {
          background: "white",
          color: "green",
        },
      });
      console.log("Delete API response:", response);
      fetchJobs();
    } catch (error) {
      console.error("Delete failed:", error);
    } finally {
      setShowDeleteModal(false)
      setJobToDelete(null)
    }
  }

  const cancelDelete = () => {
    setShowDeleteModal(false)
    setJobToDelete(null)
  }

  const handleEditClick = () => {
    console.log(selectedJob?._id)
    if (selectedJob) {
      setEditFormData({
        title: selectedJob.title,
        description: selectedJob.description || "",
        roles: selectedJob.roles.join(", "),
      })
      setIsEditMode(true)
      setModalAnimating(true)
    }
  }

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedJob) return;

    try {
      const payload = {
        title: editFormData.title || selectedJob.title,
        description: editFormData.description || selectedJob.description,
        roles: editFormData.roles.split(",").map((r) => r.trim()),
        company: selectedJob.company,
        capacity: selectedJob.capacity,
        location: selectedJob.location,
        salaryMin: selectedJob.salaryMin,
        salaryMax: selectedJob.salaryMax,
        applied: selectedJob.applied,
        postedSince: selectedJob.postedSince,
      };

      console.log("Edit form data", payload)

      const updatedJob = await handleUpdateJob(payload, selectedJob._id);

      console.log("updated job",updatedJob)

      setJobs(prevJobs =>
        prevJobs.map(job =>
          job._id === selectedJob._id ? { ...job, ...payload } : job
        )
      );

      setIsEditMode(false);
      setSelectedJob(null);
    } catch (error) {
      console.error("Failed to update job", error);
    }
  };

  const closeModal = () => {
    setModalAnimating(false)
    setTimeout(() => {
      setSelectedJob(null)
      setIsEditMode(false)
    }, 300)
  }

  const handleCreateModalClose = () => {
    setModalAnimating(false)
    setTimeout(() => {
      setShowCreateModal(false)
    }, 300)
  }

  const handleDeleteModalClose = () => {
    setModalAnimating(false)
    setTimeout(() => {
      setShowDeleteModal(false)
    }, 300)
  }

  useEffect(() => {
    if (showCreateModal || selectedJob || showDeleteModal) {
      setModalAnimating(true)
    }
  }, [showCreateModal, selectedJob, showDeleteModal])

  return (
    <div className="px-6 py-10 min-h-screen">
      {/* Header */}
      <div className="flex justify-center items-center mb-6 relative">
        <h1 className="text-4xl font-bold " style={{...FONTS.header}}>Open Job Listings</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-[#5e59a9] text-white px-5 py-2 rounded-xl !font-medium transition shadow-md absolute right-0"
          style={{...FONTS.button}}
        >
          + Create Post
        </button>
      </div>

      <p className="text-center mb-10 max-w-2xl mx-auto"
         style={{...FONTS.paragraph}}
      >
        We're hiring! Join our team and be part of a vibrant workplace where your talents make a difference.
      </p>

      {/* Job Cards */}
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white rounded-2xl border p-5 shadow-md">
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-sm font-medium text-gray-700">{job.company}</div>
                <div className="text-xs text-gray-500">{job.postedSince}</div>
              </div>
              <div className="text-2xl">{job.logo || "🏢"}</div>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              {job.roles.map((role, i) => (
                <span key={i} className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full">{role}</span>
              ))}
            </div>
            <h2 className="text-lg font-semibold mb-2">{job.title}</h2>
            <div className="text-xs text-gray-500 mb-1">{job.applied} Applied of {job.capacity} Capacity</div>
            <div className="w-full bg-gray-200 h-2 rounded-full mb-3">
              <div
                className="h-2 bg-red-500 rounded-full"
                style={{ width: `${(job.applied / job.capacity) * 100}%` }}
              />
            </div>
            <div className="flex justify-between items-center">
              <button onClick={() => setSelectedJob(job)} className="text-indigo-500 border border-indigo-400 text-xs px-4 py-1 rounded-md">
                Details
              </button>
              <button onClick={() => handleDeleteClick(job._id)} className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Job Details Modal */}
      {selectedJob && !isEditMode && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
            modalAnimating ? "bg-black/50" : "bg-black/0"
          }`}
        >
          <div
            className={`relative bg-white rounded-xl shadow-xl w-full max-w-2xl mt-24 h-[90vh] transform transition-all duration-300 ${
              modalAnimating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 left-2 -ml-[3rem] text-white hover:text-gray-600 bg-blue-700 rounded-l-full h-10 w-10 flex items-center justify-center shadow"
            >
              <X/>
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 p-6 border-b border-gray-200">
              <div className="w-14 h-14 rounded-full bg-indigo-500 text-white text-lg font-bold flex items-center justify-center">
                {selectedJob.company.substring(0, 2).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold !text-gray-900" style={{...FONTS.cardheader}}>
                {selectedJob.title}
              </h2>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <p className="text-gray-600 text-sm mb-4">{selectedJob.description || "No description provided."}</p>
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-2">Job Positions:</h4>
                <ul className="space-y-2 text-sm text-gray-800">
                  {selectedJob.roles.map((role, index) => (
                    <li key={index}>• {role}</li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={handleEditClick}
                  className="bg-[#5e59a9] text-white px-4 py-2 rounded hover:bg-indigo-200 transition"
                >
                  Edit
                </button>
                <button
                  onClick={closeModal}
                  className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {selectedJob && isEditMode && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
            modalAnimating ? "bg-black/50" : "bg-black/0"
          }`}
        >
          <div
            className={`relative bg-white rounded-xl shadow-xl w-[1200px] mt-24 h-[700px] ml-36 transform transition-all duration-300 ${
              modalAnimating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-3 left-2 -ml-[3rem] text-white hover:text-gray-600 bg-blue-700 rounded-l-full h-10 w-10 flex items-center justify-center shadow"
            >
              <X/>
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 p-6 border-b border-gray-200">
              <div className="w-14 h-14 rounded-full bg-indigo-500 text-white text-lg font-bold flex items-center justify-center">
                {selectedJob.company.substring(0, 2).toUpperCase()}
              </div>
              <h2 className="text-xl font-bold !text-gray-900" style={{...FONTS.cardheader}}>
                Edit Job Posting
              </h2>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[120vh]">
              <form className="space-y-4" onSubmit={handleUpdate}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Title</label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditFormChange}
                    className="w-full border rounded px-3 py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditFormChange}
                    className="w-full border rounded px-3 py-2"
                    rows={4}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Roles (comma-separated)</label>
                  <input
                    type="text"
                    name="roles"
                    value={editFormData.roles}
                    onChange={handleEditFormChange}
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
            modalAnimating ? "bg-black/50" : "bg-black/0"
          }`}
        >
          <div
            className={`relative bg-white rounded-xl shadow-xl ml-24 w-full max-w-6xl h-[95vh] mt-14 transform transition-all duration-300 ${
              modalAnimating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={handleCreateModalClose}
              className="absolute top-3 left-2 -ml-[3rem] text-white hover:text-gray-600 bg-blue-700 rounded-l-full h-10 w-10 flex items-center justify-center shadow"
            >
              <X/>
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 p-6 border-b border-gray-200">
              <div className="w-14 h-14 rounded-full bg-indigo-500 text-white text-lg font-bold flex items-center justify-center">
                JP
              </div>
              <h2 className="text-xl font-bold !text-gray-900" style={{...FONTS.cardheader}}>
                Create Job Posting
              </h2>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[70vh]">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {[
                  { label: "Company Name", name: "company", placeholder: "e.g., SCHULL TECHNOLOGIES LIMITED" },
                  { label: "Job Title", name: "title", placeholder: "e.g., Django Developer" },
                  { label: "Job Roles/Skills", name: "roles", placeholder: "e.g. Django Dev, Training Coordinator" },
                  { label: "Capacity", name: "capacity", type: "number", placeholder: "e.g. 10" },
                  { label: "Job Description", name: "description", textarea: true },
                  { label: "Location", name: "location", placeholder: "e.g., Remote, Bangalore" },
                  { label: "Min Salary", name: "salaryMin", type: "number" },
                  { label: "Max Salary", name: "salaryMax", type: "number" },
                ].map((field, idx) => (
                  <div key={idx}>
                    <label
                      className="block text-sm !font-bold !text-gray-600 mb-1"
                      style={{ ...FONTS.cardSubHeader }}
                    >
                      {field.label}
                    </label>
                    {field.textarea ? (
                      <textarea
                        name={field.name}
                        value={(formData as any)[field.name]}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        rows={4}
                        placeholder={field.placeholder}
                        required
                      />
                    ) : (
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        value={(formData as any)[field.name]}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2"
                        placeholder={field.placeholder}
                        required={field.name !== "location"}
                      />
                    )}
                  </div>
                ))}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCreateModalClose}
                    className="flex-1 bg-gray-300 !text-gray-800 py-2 px-4 rounded hover:bg-gray-400"
                    style={{ ...FONTS.button }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded"
                    style={{ ...FONTS.button }}
                  >
                    Create Job Posting
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
 <AnimatePresence>
  {showDeleteModal && (
    <motion.div
      key="overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
    >
      <motion.div
        key="modal"
        initial={{ y: 300, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 300, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this job posting? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleDeleteModalClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  )
}

export default OpenRecruitments