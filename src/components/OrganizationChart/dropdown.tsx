import { useState, useRef, useEffect } from "react"

interface DropdownProps {
  trigger: React.ReactNode
  children: React.ReactNode
  align?: "left" | "right"
}

export function Dropdown({ trigger, children, align = "right" }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>

      {isOpen && (
        <div
          className={`absolute top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 ${
            align === "right" ? "right-0" : "left-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
}

export function DropdownItem({ onClick, children, className = "" }: DropdownItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors flex items-center ${className}`}
    >
      {children}
    </button>
  )
}
