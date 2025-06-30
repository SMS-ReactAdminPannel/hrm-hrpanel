"use client"

import type React from "react"
import { useState } from "react"
import type { Employee, EmployeeFormData } from "./employee"

interface EmployeeFormProps {
  employee?: Employee | null
  employees: Employee[]
  parentEmployee?: Employee | null
  onSubmit: (data: EmployeeFormData) => void
  onCancel: () => void
}

export function EmployeeForm({ employee, employees, parentEmployee, onSubmit, onCancel }: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: employee?.name || "",
    position: employee?.position || "",
    department: employee?.department || "",
    email: employee?.email || "",
    phone: employee?.phone || "",
    managerId: employee?.managerId || parentEmployee?.id || null,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value === "" ? null : value,
    }))
  }

  const availableManagers = employees.filter((emp) => emp.id !== employee?.id)

  return (
    <form onSubmit={handleSubmit}>
      <div className=" grid grid-cols-2 gap-4">
        <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
          Position
        </label>
        <input
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
        <select
          title="Select Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select Department</option>
          <option value="Executive">Executive</option>
          <option value="Technology">Technology</option>
          <option value="Finance">Finance</option>
          <option value="Marketing">Marketing</option>
          <option value="Product">Product</option>
        </select>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="managerId" className="block text-sm font-medium text-gray-700 mb-1">
          Manager
        </label>
        <select
          id="managerId"
          name="managerId"
          value={formData.managerId || ""}
          onChange={handleChange}
          disabled={!!parentEmployee}
          className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
        >
          <option value="">No Manager (CEO/Top Level)</option>
          {availableManagers.map((manager) => (
            <option key={manager.id} value={manager.id}>
              {manager.name} - {manager.position}
            </option>
          ))}
        </select>
        {parentEmployee && (
          <p className="text-sm text-gray-600 mt-1">
            This employee will report to: <strong>{parentEmployee.name}</strong>
          </p>
        )}
      </div>
      </div>

      <div className="flex gap-6 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-1 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {employee ? "Update" : "Add"} Employee
        </button>
      </div>
    </form>
  )
}

