import type React from "react"
import { useState, useCallback, memo } from "react"
import { X } from "lucide-react"
import { FONTS } from "../../components/TraningManagement/Fonts"
import type { NewProgramFormData } from "../../components/TraningManagement/Traning"

interface NewProgramFormProps {
  onClose: () => void
  onSubmit: (formData: NewProgramFormData) => void
  categories: string[]
}

export const NewProgramForm = memo<NewProgramFormProps>(({ onClose, onSubmit, categories }) => {
  const [formData, setFormData] = useState<NewProgramFormData>({
    title: "",
    category: "Leadership",
    duration: "",
    instructor: "",
    startDate: new Date().toISOString().split("T")[0],
  })

  const handleChange = useCallback(
    (field: keyof NewProgramFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormData((prev) => ({ ...prev, [field]: e.target.value }))
    },
    [],
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      if (!formData.title.trim() || !formData.duration.trim() || !formData.instructor.trim()) {
        alert("Please fill in all required fields")
        return
      }
      onSubmit(formData)
    },
    [formData, onSubmit],
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="rounded-xl bg-white p-10 max-w-md mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2
            className="text-xl font-semibold text-gray-900"
            style={{
              fontFamily: FONTS.header.fontFamily,
              fontSize: FONTS.header.fontSize,
              fontWeight: FONTS.header.fontWeight,
            }}
          >
            Create New Program
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-base font-semibold text-gray-700 mb-1" style={FONTS.paragraph}>
              Program Title *
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={handleChange("title")}
              placeholder="Enter program title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-base font-semibold text-gray-700 mb-1" style={FONTS.paragraph}>
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleChange("category")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent"
              style={FONTS.paragraph}
            >
              {categories
                .filter((cat) => cat !== "all")
                .map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label htmlFor="duration" className="block text-base font-semibold text-gray-700 mb-1" style={FONTS.paragraph}>
              Duration *
            </label>
            <input
              id="duration"
              type="text"
              value={formData.duration}
              onChange={handleChange("duration")}
              placeholder="e.g., 4 weeks, 2 months"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label
              htmlFor="instructor"
              className="block text-base font-semibold text-gray-700 mb-1"
              style={FONTS.paragraph}
            >
              Instructor *
            </label>
            <input
              id="instructor"
              type="text"
              value={formData.instructor}
              onChange={handleChange("instructor")}
              placeholder="Enter instructor name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-base font-semibold text-gray-700 mb-1" style={FONTS.paragraph}>
              Start Date
            </label>
            <input
              id="startDate"
              type="date"
              value={formData.startDate}
              onChange={handleChange("startDate")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006666] focus:border-transparent"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              style={FONTS.paragraph}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-[#006666] text-white rounded-lg hover:bg-[#005555] transition-colors"
              style={FONTS.paragraph}
            >
              Create Program
            </button>
          </div>
        </form>
      </div>
    </div>
  )
})

NewProgramForm.displayName = "NewProgramForm"
