"use client"
import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface FormData {
  name: string
  email: string
  phone: string
  position: string
  location: string
  education: string
  experience: string
  skills: string[]
  status: string
  dob: string
  gender: string
  address: string
  portfolio: string
  source: string
  stage: string
  referral: string
}

interface CandidateDetails {
  details: {
    name?: string
    email?: string
    phonenumber?: string
    position?: string
    location?: string
    education?: string
    experience?: string
    skills?: string[]
    status?: string
    dob?: string
    gender?: string
    address?: string
    portfolio?: string
    source?: string
    stage?: string
    referral?: string
  }
}

interface AddCandidateModalProps {
  candidate?: CandidateDetails
  onClose: () => void
  onSave: (data: FormData) => void
}

export default function AddCandidateModal({ 
  candidate, 
  onClose,
  onSave
}: AddCandidateModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    position: "",
    location: "",
    education: "",
    experience: "",
    skills: [],
    status: "",
    dob: "",
    gender: "",
    address: "",
    portfolio: "",
    source: "",
    stage: "",
    referral: ""
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
        status: candidate.details.status || "",
        dob: candidate.details.dob || "",
        gender: candidate.details.gender || "",
        address: candidate.details.address || "",
        portfolio: candidate.details.portfolio || "",
        source: candidate.details.source || "",
        stage: candidate.details.stage || "",
        referral: candidate.details.referral || ""
      });
    }
  }, [candidate]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skills = e.target.value.split(',').map(skill => skill.trim());
    setFormData(prev => ({ ...prev, skills }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="">
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed pl-36 inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center"
        onClick={handleClose}
      >
        <motion.button 
          onClick={handleClose}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ delay: 0.1 }}
          className=" left-8 bottom-[680px] mb-[680px] w-11 h-11 flex items-center justify-center rounded-l-3xl bg-blue-700 shadow-lg z-10"
          aria-label="Close modal"
        >
          <X className="w-6 pr-1 text-white" />
        </motion.button>

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
          className="bg-white rounded-t-3xl shadow-2xl w-[1200px] h-[750px] overflow-hidden relative flex flex-col"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="px-6  py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 id="modal-title" className="text-2xl font-bold text-gray-900">
              {candidate ? "Edit Canditate Details" : "Add New Candidate"}
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                      <input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
                      <input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input
                        id="dob"
                        name="dob"
                        type="date"
                        value={formData.dob}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-lg font-semibold text-gray-800 border-b pb-2">Professional Information</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position*</label>
                      <input
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                      <input
                        id="education"
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                      <input
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                      <input
                        id="skills"
                        name="skills"
                        value={formData.skills.join(', ')}
                        onChange={handleSkillsChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">Portfolio URL</label>
                      <input
                        id="portfolio"
                        name="portfolio"
                        type="url"
                        value={formData.portfolio}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status*</label>
                      <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Status</option>
                        <option value="under review">Under Review</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="interview scheduled">Interview Scheduled</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Recruitment Information</h4>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                    <select
                      id="source"
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Source</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Indeed">Indeed</option>
                      <option value="Company Website">Company Website</option>
                      <option value="Referral">Referral</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="stage" className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                    <select
                      id="stage"
                      name="stage"
                      value={formData.stage}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select Stage</option>
                      <option value="New">New</option>
                      <option value="Screening">Screening</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Hired">Hired</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="referral" className="block text-sm font-medium text-gray-700 mb-1">Referral</label>
                    <input
                      id="referral"
                      name="referral"
                      value={formData.referral}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="candidate-form"
                className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
    </div>
  );
}