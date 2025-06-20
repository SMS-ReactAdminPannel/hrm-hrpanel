"use client"

interface SearchBarProps {
  searchTerm: string
  onSearchChange: (value: string) => void
  onAddClick: () => void
}

export function SearchBar({ searchTerm, onSearchChange, onAddClick }: SearchBarProps) {
  return (
    <div className="flex md:flex-row justify-between mb-6 gap-4">
      <div className="text-2xl font-bold px-2 py-2">Deduction Management</div>
      <div className="flex gap-5 ml-auto">
        <div className="relative">
          <div className="absolute inset-y-0 pb-2 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full md:w-80 pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          className="rounded-md w-38 h-9 text-white px-4 py-2 shadow-md transition-colors duration-200 flex items-center justify-center gap-2"
          onClick={onAddClick}
          style={{ backgroundColor: "#006666" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
          Add Deduction
        </button>
      </div>
    </div>
  )
}
