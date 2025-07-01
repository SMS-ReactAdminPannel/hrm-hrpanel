"use client"
import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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
        onClose()
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscapeKey)
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [onClose])

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

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute pr-36 bg-black inset-0 bg-opacity-50 z-50 flex items-end justify-center"
      >
        {/* Floating Close Button */}
        <motion.button 
          onClick={onClose}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className=" left-8 bottom-[680px] ml-36  mb-[680px] w-11 h-11 flex items-center justify-center rounded-l-3xl bg-blue-700 shadow-lg z-10"
        >
          <X className="w-6 pr-1 text-white" />
        </motion.button>

        {/* Modal Content */}
        <motion.div
          ref={modalRef}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ 
            type: "spring",
            damping: 25,
            stiffness: 300,
            mass: 0.5
          }}
          className="bg-white rounded-t-3xl shadow-2xl w-[1200px]  h-[750px] overflow-hidden relative"
        >
          {/* Header */}
          <div className="relative ml-4 mt-3 bg-white px-3 py-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">Edit Candidate Details</h3>
          </div>

          {/* Form Content */}
          <div className="px-6 py-4 h-[calc(100%-120px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 p-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Position</label>
                <input
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Education</label>
                <input
                  name="education"
                  value={formData.education}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Experience</label>
                <input
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                <input
                  name="skills"
                  value={formData.skills.join(', ')}
                  onChange={handleSkillsChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="under review">Under Review</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview schedules">Interview Scheduled</option>
                </select>
              </div>
            </form>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}