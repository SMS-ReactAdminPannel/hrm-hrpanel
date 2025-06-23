"use client"

import { Eye } from "lucide-react"
import type { TeamMember } from "./use-onboarding-state"


interface TeamOverviewProps {
  teamMembers: TeamMember[]
  onViewEmployee: (employee: TeamMember) => void
  onNavigateToDocuments: () => void
}

export function TeamOverview({ teamMembers, onViewEmployee, onNavigateToDocuments }: TeamOverviewProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 bg-green-800" >
              <tr  className="bg-blue-500 font-bold text-white" >
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Onboarding Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200" onClick={onNavigateToDocuments}>
              {teamMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{member.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{member.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{member.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        member.onboardingStatus === "Completed"
                          ? "bg-green-100 text-green-800"
                          : member.onboardingStatus === "In Progress"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {member.onboardingStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onViewEmployee(member)
                      }}
                      className="text-[#006666] hover:text-[#005555] flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
