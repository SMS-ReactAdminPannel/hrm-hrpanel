"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { Employee, EmployeeFormData } from "./employee"

interface EmployeeFormProps {
  employee: Employee | null
  employees: Employee[]
  onSubmit: (data: EmployeeFormData) => void
  onCancel: () => void
}

export function EmployeeForm({ employee, employees, onSubmit, onCancel }: EmployeeFormProps) {
  const [formData, setFormData] = useState<EmployeeFormData>({
    name: "",
    position: "",
    department: "",
    email: "",
    phone: "",
    managerId: null,
  })

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name,
        position: employee.position,
        department: employee.department,
        email: employee.email,
        phone: employee.phone,
        managerId: employee.managerId,
      })
    }
  }, [employee])

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
        <input
          type="text"
          name="position"
          value={formData.position}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
        <select
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Manager</label>
        <select
          name="managerId"
          value={formData.managerId || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">No Manager (Top Level)</option>
          {availableManagers.map((manager) => (
            <option key={manager.id} value={manager.id}>
              {manager.name} - {manager.position}
            </option>
          ))}
        </select>
      </div>

      <div className="flex space-x-3 pt-4">
        <button
          type="submit"
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          {employee ? "Update Employee" : "Add Employee"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
