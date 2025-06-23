"use client"

import type React from "react"
import {FONTS} from "../../constants/uiConstants"

import { useState } from "react"
import {
  Building,
  User,
  Calendar,
  Mail,
  Phone,
  Users,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Upload,
} from "lucide-react"
import type { OffboardingRequest, ChecklistItemState } from "./types"
import { checklistTemplates} from "./constants"

interface EmployeeDetailsProps {
  employee: OffboardingRequest
  onBack: () => void
  checklistItemsState: {
    [employeeId: number]: {
      [categoryIdx: number]: {
        [itemIdx: number]: ChecklistItemState
      }
    }
  }
  onChecklistUpdate: (
    employeeId: number,
    categoryIdx: number,
    itemIdx: number,
    updates: Partial<ChecklistItemState>,
  ) => void
  onFileViewer: (employeeId: number, categoryIdx: number, itemIdx: number) => void
}

export const EmployeeDetails = ({
  employee,
  onBack,
  checklistItemsState,
  onChecklistUpdate,
  onFileViewer,
}: EmployeeDetailsProps) => {
  const [expandedChecklist, setExpandedChecklist] = useState<{ [key: number]: boolean }>({})

  const checklist = checklistTemplates[employee.exitDetails.type] || []

  const getItemState = (employeeId: number, categoryIdx: number, itemIdx: number): ChecklistItemState => {
    return (
      checklistItemsState[employeeId]?.[categoryIdx]?.[itemIdx] || {
        checked: false,
        file: null,
        showFile: false,
        fileUrl: "",
      }
    )
  }

  const handleFileChange = (
    employeeId: number,
    categoryIdx: number,
    itemIdx: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0] || null
    let fileUrl = ""

    if (file) {
      fileUrl = URL.createObjectURL(file)
    }

    onChecklistUpdate(employeeId, categoryIdx, itemIdx, {
      file,
      fileUrl,
      checked: !!file,
    })
  }

  const toggleCheckbox = (employeeId: number, categoryIdx: number, itemIdx: number) => {
    const currentState = getItemState(employeeId, categoryIdx, itemIdx)
    onChecklistUpdate(employeeId, categoryIdx, itemIdx, {
      checked: !currentState.checked,
    })
  }

  return (
    <div className="space-y-6" style={{ fontFamily: FONTS.paragraph.fontFamily, fontSize: FONTS.paragraph.fontSize }}>
      {/* Employee Header */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-6">
            <div className="text-6xl" style={{...FONTS.header}}>{employee.employee.avatar}</div>
            <div>
              <h2 className="text-2xl !font-bold !text-gray-800" style={{...FONTS.cardheader}}>{employee.employee.name}</h2>
              <p className="text-lg !text-gray-600" style={{...FONTS.paragraph}}>{employee.employee.position}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm !text-gray-500">
                <span className="flex items-center !text-gray-500" style={{...FONTS.paragraph}}>
                  <Building className="w-4 h-4 mr-1" />
                  {employee.employee.department}
                </span>
                <span className="flex items-center !text-gray-500" style={{...FONTS.paragraph}}>
                  <User className="w-4 h-4 mr-1" />
                  ID: {employee.employee.id}
                </span>
                <span className="flex items-center !text-gray-500" style={{...FONTS.paragraph}}>
                  <Calendar className="w-4 h-4 mr-1" />
                  Hired: {employee.employee.hireDate}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <span
              className={`px-3 py-1 rounded-full !text-sm  ${
                employee.exitDetails.status === "Completed"
                  ? "!bg-green-100 !text-green-800"
                  : employee.exitDetails.status === "In Progress"
                    ? "!bg-blue-100 !text-blue-800"
                    : "!bg-yellow-100 !text-yellow-800"
              }`}
             style={{...FONTS.paragraph}}
            >
              {employee.exitDetails.status}
            </span>
            <p className="text-sm !text-gray-500 mt-2" style={{...FONTS.paragraph}}>Priority: {employee.priority}</p>
          </div>
        </div>
      </div>

      {/* Exit Details & Progress */}
      <div className="grid grid-cols-3 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg !font-semibold mb-4 !text-gray-800" style={{...FONTS.cardheader}}>Exit Information</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm !text-gray-500"  style={{...FONTS.paragraph}}>Exit Type:</span>
              <p className="!font-medium !text-gray-800" style={{...FONTS.paragraph}}>{employee.exitDetails.type}</p>
            </div>
            <div>
              <span className="text-sm !text-gray-500" style={{...FONTS.paragraph}}>Reason:</span>
              <p className="font-medium !text-gray-800" style={{...FONTS.paragraph}}>{employee.exitDetails.reason}</p>
            </div>
            <div>
              <span className="text-sm !text-gray-500" style={{...FONTS.paragraph}}>Last Working Day:</span>
              <p className="font-medium !text-gray-800" style={{...FONTS.paragraph}}>{employee.exitDetails.lastWorkingDay}</p>
            </div>
            <div>
              <span className="text-sm !text-gray-500" style={{...FONTS.paragraph}}>Notice Period:</span>
              <p className="font-medium !text-gray-800"style={{...FONTS.paragraph}}>{employee.exitDetails.noticePeriod} days</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg !font-semibold mb-4 !text-gray-800" style={{...FONTS.cardheader}}>Contact Information</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 !text-gray-400" style={{...FONTS.paragraph}}/>
              <span className="!text-sm !text-gray-800" style={{...FONTS.paragraph}}>{employee.employee.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 !text-gray-400" style={{...FONTS.paragraph}}/>
              <span className="!text-sm !text-gray-800" style={{...FONTS.paragraph}}>{employee.employee.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <User className="w-4 h-4 !text-gray-400" style={{...FONTS.paragraph}}/>
              <span className="!text-sm !text-gray-800"style={{...FONTS.paragraph}}>Manager: {employee.employee.manager}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 !text-gray-400" style={{...FONTS.paragraph}}/>
              <span className="!text-sm !text-gray-800" style={{...FONTS.paragraph}}>HR: {employee.assignedHR}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <h3 className="text-lg !font-semibold mb-4 !text-gray-800" style={{...FONTS.cardheader}}>Progress Overview</h3>
          <div className="text-center">
            <div className="text-3xl !font-bold !text-blue-600 mb-2" style={{...FONTS.cardheader}}>{employee.progress.percentage}%</div>
            <div className="w-full bg-gray-200 rounded-full h-3 mb-3">
              <div className="!bg-blue-600 h-3 rounded-full" style={{ width: `${employee.progress.percentage}%` }}></div>
            </div>
            <p className="!text-sm !text-gray-600" style={{...FONTS.paragraph}}>
              {employee.progress.completed} of {employee.progress.total} tasks completed
            </p>
          </div>
        </div>
      </div>

      {/* Offboarding Checklist */}
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 border-b">
          <h3 className="text-lg !font-semibold !text-gray-800" style={{...FONTS.cardheader}}>Offboarding Checklist</h3>
        </div>
        <div className="p-6">
          {checklist.map((category, categoryIdx) => (
            <div key={categoryIdx} className="mb-6 last:mb-0">
              <button
                onClick={() =>
                  setExpandedChecklist({
                    ...expandedChecklist,
                    [categoryIdx]: !expandedChecklist[categoryIdx],
                  })
                }
                className="flex items-center space-x-2 w-full text-left px-4 py-2 bg-gray-50 rounded-md hover:bg-gray-100"
     >
                {expandedChecklist[categoryIdx] ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
                <span className="!font-medium !text-gray-800" style={{...FONTS.paragraph}}>{category.category}</span>
                <span className="text-sm !text-gray-500" style={{...FONTS.paragraph}}>({category.items.length} items)</span>
              </button>

              {expandedChecklist[categoryIdx] && (
                <div className="mt-3 bg-white rounded-md space-y-2 ml-6">
                  {category.items.map((item, itemIdx) => {
                    const itemState = getItemState(employee.id, categoryIdx, itemIdx)

                    return (
                      <div key={itemIdx} className="flex items-center p-2 hover:bg-gray-50 rounded relative">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 rounded"
                          checked={itemState.checked}
                          onChange={() => toggleCheckbox(employee.id, categoryIdx, itemIdx)}
                        />
                        <span className="!text-sm ml-3 flex-1 !text-gray-700" style={{...FONTS.paragraph}}>{item}</span>
                        <div className="ml-auto flex items-center space-x-2">
                          {itemState.file ? (
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-green-600 flex items-center gap-1">
                                <CheckCircle className="w-4 h-4" style={{...FONTS.button}}/> File uploaded
                              </span>
                              <button
                                onClick={() => onFileViewer(employee.id, categoryIdx, itemIdx)}
                                className="text-sm !text-blue-600 hover:text-blue-800 hover:underline"
                               style={{...FONTS.button}}
                              >
                                View file
                              </button>
                              <button
                                onClick={() =>
                                  document
                                    .getElementById(`file-upload-${employee.id}-${categoryIdx}-${itemIdx}`)
                                    ?.click()
                                }
                                className="!text-sm !text-gray-600 hover:text-gray-800 hover:underline"
                                style={{...FONTS.button}}
                              >
                                Replace
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() =>
                                document.getElementById(`file-upload-${employee.id}-${categoryIdx}-${itemIdx}`)?.click()
                              }
                              className="inline-flex items-center gap-2 px-4 py-2 !bg-[#006666] !text-white rounded-md hover:bg-[#005555] transition-colors"
                             style={{...FONTS.button}}
                            >
                              <Upload className="w-4 h-4" style={{...FONTS.button}}/>
                              Upload File
                            </button>
                          )}
                          <input
                            id={`file-upload-${employee.id}-${categoryIdx}-${itemIdx}`}
                            type="file"
                            accept=".pdf,.txt,.doc,.docx,.jpg,.jpeg,.png,.gif"
                            onChange={(e) => handleFileChange(employee.id, categoryIdx, itemIdx, e)}
                            className="hidden"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 border !border-gray-300 !text-white rounded-md !bg-[#006666] !hover:bg-[#005555]"
        style={{...FONTS.button}}
        >
          Back to List
        </button>
        <div className="space-x-3">
          <button className="px-4 py-2 !bg-[#006666] !text-white rounded-md hover:bg-[#005555]" style={{...FONTS.button}}>Generate Reports</button>
        </div>
      </div>
    </div>
  )
}
