import type React from "react"
import { EmployeeRow } from "../../components/TraningManagement/EmployeeRow"
import type { Employee, TrainingProgram } from "../../components/TraningManagement/Traning"
import {FONTS} from "../../constants/uiConstants"


interface EmployeeTableProps {
  employees: Employee[]
  selectedProgram?: TrainingProgram | null
}

export const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees, selectedProgram }) => {
  const headings = [
    "Employee ID",
    "Employee",
    "Department",
    selectedProgram ? "Program Progress" : "Overall Progress",
    selectedProgram ? "Enrollment Date" : "Completed Courses",
    "Status",
  ]

  return (
    <div className="rounded-xl shadow-sm backdrop-filter  bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100">
      <div className="py-4 lg:px-[2%] lg:py-6 rounded-xl">
        <h2
          className="text-lg lg:text-xl font-bold !text-gray-900"
          style={{...FONTS.header}}
        >
          {selectedProgram ? `Participants in ${selectedProgram.title}` : "Employee Training Progress"}
        </h2>
        {selectedProgram && (
          <p
            className="text-sm lg:text-base text-gray-700 mt-3"
            style={{...FONTS.paragraph}}
          >
            Showing {employees.length} enrolled participants
          </p>
        )}
      </div>

      <div className="overflow-x-auto rounded-lg ">
        <table className="min-w-full divide-y divide-gray-200  pt-2 pb-2">
          <thead>
            <tr >
              {headings.map((heading, idx) => (
                <th
                  key={idx}
                  className="px-6 py-3 text-left text-sm lg:text-sm font-medium text-white tracking-wider bg-[#5e59a9] border-b  "
                 style={{...FONTS.tableHeader}}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody
            className="divide-y !divide-gray-200 text-sm lg:text-base "
             style={{...FONTS.tableBody}}
          >
            {employees.map((employee) => (
              <EmployeeRow key={employee.id} employee={employee} selectedProgram={selectedProgram} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
