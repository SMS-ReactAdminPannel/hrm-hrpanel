"use client"

import type { OffboardingRequest } from "./types"

interface RecentRequestsProps {
  requests: OffboardingRequest[]
  onSelectEmployee: (request: OffboardingRequest) => void
}

export const RecentRequests = ({ requests, onSelectEmployee }: RecentRequestsProps) => {
  return (
    <div className="lg:col-span-2 bg-white p-6 rounded-lg border shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Recent Exit Requests</h3>
      </div>
      <div className="space-y-4">
        {requests.slice(0, 3).map((req) => (
          <div
            key={req.id}
            className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            onClick={() => onSelectEmployee(req)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{req.employee.avatar}</div>
                <div>
                  <h4 className="font-medium">{req.employee.name}</h4>
                  <p className="text-sm text-gray-500">
                    {req.employee.department} • {req.exitDetails.type}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${req.progress.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600">{req.progress.percentage}%</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">Due: {req.exitDetails.lastWorkingDay}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
