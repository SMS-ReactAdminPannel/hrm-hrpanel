import { useState, useRef, useEffect } from "react"
import { normalizeOptions } from "./utils"
import type { SelectOption } from "./types"

interface CustomSelectProps {
  label: string
  value: string
  options: (string | SelectOption)[]
  onChange: (value: string) => void
  className?: string
}

export function CustomSelect({ label, value, options, onChange, className = "" }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const normalizedOptions = normalizeOptions(options)
  const selectedLabel = normalizedOptions.find((opt) => opt.value === value)?.label || value

  return (
    <div className={`space-y-2 relative ${className}`} ref={dropdownRef}>
      <label className="block text-sm font-medium text-black">{label}</label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3 border border-gray-300 rounded-lg text-left flex justify-between items-center bg-white hover:border-gray-400 transition-colors"
      >
        {selectedLabel}
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {normalizedOptions.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              className={`p-3 hover:bg-blue-100 cursor-pointer transition-colors ${
                value === option.value ? "bg-blue-50 font-medium" : ""
              }`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
