"use client"

import { useEffect, useState } from "react"
import HttpClient from "../../api/httpClient"
import { API_END_POINTS } from "../../api/httpEndpoints"

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

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      const res = await HttpClient.get(API_END_POINTS.jobPosting.getAll)
      setJobs(res.data)
    } catch (err) {
      console.error("Failed to fetch jobs", err)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

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
      await HttpClient.post(API_END_POINTS.jobPosting.create, payload)
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

  const handleDelete = async (jobId: string) => {
    try {
      await HttpClient.delete(`${API_END_POINTS.jobPosting.delete}/${jobId}`)
      setJobs((prev) => prev.filter((job) => job._id !== jobId))
    } catch (error) {
      console.error("Delete failed", error)
    }
  }

  const handleEditClick = () => {
    if (selectedJob) {
      setEditFormData({
        title: selectedJob.title,
        description: selectedJob.description || "",
        roles: selectedJob.roles.join(", "),
      })
      setIsEditMode(true)
    }
  }

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedJob) return

    try {
      const payload = {
        title: editFormData.title,
        description: editFormData.description,
        roles: editFormData.roles.split(",").map((r) => r.trim()),
      }
      await HttpClient.update(`${API_END_POINTS.jobPosting.update}/${selectedJob._id}`, payload)
      setIsEditMode(false)
      setSelectedJob(null)
      fetchJobs()
    } catch (error) {
      console.error("Failed to update job", error)
    }
  }

  const closeModal = () => {
    setSelectedJob(null)
    setIsEditMode(false)
  }

  return (
    <div className="px-6 py-10 min-h-screen">
      {/* Header */}
      <div className="flex justify-center items-center mb-6 relative">
        <h1 className="text-4xl font-bold">Open Job Listings</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-indigo-500 hover:bg-indigo-200 text-white px-5 py-2 rounded-xl font-medium transition shadow-md absolute right-0"
        >
          + Create Post
        </button>
      </div>

      <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
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
              <button onClick={() => handleDelete(job._id)} className="bg-red-100 text-red-700 text-xs px-3 py-1 rounded-full">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Job Details / Edit Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl p-6 relative">
            <button className="absolute top-4 right-4 text-gray-700 hover:text-red-500 text-2xl" onClick={closeModal}>
              &times;
            </button>
            {!isEditMode ? (
              <>
                <h2 className="text-xl font-bold mb-2">{selectedJob.title}</h2>
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
                  <button onClick={handleEditClick} className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded hover:bg-indigo-200 transition">
                    Edit
                  </button>
                  <button onClick={closeModal} className="bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition">
                    Close
                  </button>
                </div>
              </>
            ) : (
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
            )}
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm ">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto  scrollbar-hide">
            <button className="absolute top-4 right-4 text-gray-700 hover:text-red-500 text-2xl" onClick={() => setShowCreateModal(false)}>
              &times;
            </button>
            <h2 className="text-xl font-bold mb-6">Create Job Posting</h2>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
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
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-indigo-500 hover:bg-indigo-200 text-white py-2 px-4 rounded shadow "
                >
                  Create Job Posting
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default OpenRecruitments
