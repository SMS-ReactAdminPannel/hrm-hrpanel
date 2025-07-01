"use client"
import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"

export default function EditCandidateModal({ 
  candidate, 
  onClose,
  onSave
}: { 
  candidate: any; 
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    location: "",
    education: "",
    experience: "",
    skills: [] as string[],
    status: ""
  });

  const modalRef = useRef<HTMLDivElement>(null)
  const [isAnimating, setIsAnimating] = useState(true)

  useEffect(() => {
    if (candidate?.details) {
      setFormData({
        name: candidate.details.name || "",
        email: candidate.details.email || "",
        phone: candidate.details.phonenumber || "",
        position: candidate.details.position || "",
        location: candidate.details.location || "",
        education: candidate.details.education || "",
        experience: candidate.details.experience || "",
        skills: candidate.details.skills || [],
        status: candidate.details.status || ""
      });
    }
  }, [candidate]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData({ ...formData, skills });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-all duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Floating Close Button */}
      <button 
        onClick={handleClose} 
        className={`absolute top-8 left-8 w-11 h-11 flex items-center justify-center rounded-l-3xl bg-blue-700 transition-all duration-300 shadow-lg z-10 ${
          isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <X className="w-6 pr-1 text-white" />
      </button>

      {/* Modal Content */}
      <div 
        ref={modalRef} 
        className={`bg-white rounded-t-3xl shadow-2xl w-[1100px] h-[calc(100vh-40px)] max-h-[calc(100vh-40px)] overflow-hidden transform transition-all duration-300 ease-out ${
          isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}
      >
        {/* Header */}
        <div className="relative ml-4 mt-3 bg-white px-3 py-4 border-b-1 border-blue-300">
          <h3 className="text-xl font-bold text-gray-900">Edit Candidate Details</h3>
        </div>

        {/* Form Content */}
        <div className="px-6 py-4 h-[calc(100%-160px)] overflow-y-auto">
          <form onSubmit={handleSubmit} className="grid grid-cols-2 md:grid-cols-2 gap-6 p-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray- rounded-xl px-4 py-3 text-sm"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
              <input
                name="education"
                value={formData.education}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
              <input
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
              <input
                name="skills"
                value={formData.skills.join(', ')}
                onChange={handleSkillsChange}
                className="w-full border rounded-xl px-4 py-3 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className="w-full border rounded-xl px-4 py-3 text-sm"
              >
                <option value="under review">Under Review</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="interview schedules">Interview Scheduled</option>
              </select>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-white border-t border-gray-200">
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-3 text-sm text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              className="px-6 py-3 text-sm text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}