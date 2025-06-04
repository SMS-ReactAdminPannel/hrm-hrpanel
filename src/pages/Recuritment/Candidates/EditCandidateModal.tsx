
import { Dialog } from "@headlessui/react"
import { X } from "lucide-react"
import { useState } from "react"

export default function EditCandidateModal({ candidate, onClose }: { candidate: any; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: candidate.name || "",
    email: candidate.email || "",
    phone: candidate.phone || "",
    dob: candidate.dob || "",
    gender: candidate.gender || "",
    address: candidate.address || "",
    state: candidate.state || "",
    portfolio: candidate.portfolio || "",
    department: candidate.department || "",
    stage: candidate.stage || "",
    job: candidate.job || "",
    referral: candidate.referral || "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated Candidate Data:", formData)
    onClose()
  }

  return (
    <Dialog open={true} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Panel className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
          <Dialog.Title className="text-xl font-semibold mb-6">Edit Candidate Details</Dialog.Title>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
              <input
                name="dob"
                type="date"
                value={formData.dob}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <input
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-3 py-2"
              />
            </div>
            <div>
  <label className="block text-sm font-medium text-gray-700">Address</label>
  <textarea
    name="address"
    value={formData.address}
    onChange={handleChange}
    rows={3}
    className="w-full mt-1 border rounded px-3 py-2 resize-none"
  />
</div>

            <div>
              <label className="block text-sm font-medium text-gray-700">State</label>
              <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Portfolio URL</label>
              <input
                name="portfolio"
                type="url"
                value={formData.portfolio}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Department</label>
              <input
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Stage</label>
              <input
                name="stage"
                value={formData.stage}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Job Position</label>
              <input
                name="job"
                value={formData.job}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Referral</label>
              <input
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                className="w-full mt-1 border rounded px-3 py-2"
              />
            </div>

            <div className="col-span-2 mt-6 flex justify-end">
              <button
                type="button"
                onClick={onClose}
                className="mr-4 px-4 py-2 text-gray-600 border border-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-red-600 text-white px-5 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
