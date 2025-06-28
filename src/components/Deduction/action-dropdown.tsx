"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { Card } from "./types"

interface ActionDropdownProps {
  card: Card
  onEdit: (card: Card) => void
  onDelete: (id: number) => void
}

export function ActionDropdown({ card, onEdit, onDelete }: ActionDropdownProps) {
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowDropdown(!showDropdown)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="text-gray-500 hover:text-blue p-1 rounded-md transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-27 bg-white rounded-md shadow-lg z-10 border border-gray-200">
          <div className="py-1">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onEdit(card)
                setShowDropdown(false)
              }}
              className="block w-full rounded-md text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-100 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(card.id)
                setShowDropdown(false)
              }}
              className="block w-full rounded-md text-left px-4 py-2 text-sm text-red-600 hover:bg-blue-100 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
