
import { useState } from "react"
import { MdTimer, MdPerson, MdCheck, MdSchedule } from "react-icons/md"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"

// Sample data for people who have taken permission
const permissionData = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@company.com",
    department: "Engineering",
    requestedAt: "2024-01-15 09:30 AM",
    status: "approved",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    department: "Marketing",
    requestedAt: "2024-01-15 02:15 PM",
    status: "pending",
  },
]

export default function PermissionCard() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = () => {
    setIsModalOpen(true)
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getStatusIcon = (status: string) => {
    return status === "approved" ? <MdCheck className="w-4 h-4" /> : <MdSchedule className="w-4 h-4" />
  }

  return (
    <>
      {/* Permission Card */}
      <div
        className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 flex items-center justify-between cursor-pointer"
        onClick={handleCardClick}
      >
        <div>
          <p className="text-slate-600 text-xl">Permission</p>
          <p className="text-2xl font-bold text-slate-800">{permissionData.length}</p>
        </div>
        <MdTimer className="w-10 h-10 text-yellow-400" />
      </div>

      {/* Modal showing people who have taken permission */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-slate-800">
              Permission Requests ({permissionData.length})
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {permissionData.map((person) => (
              <Card key={person.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Custom initials circle instead of Avatar */}
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                        {getInitials(person.name)}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <MdPerson className="w-4 h-4 text-slate-500" />
                          <h3 className="font-semibold text-slate-800">{person.name}</h3>
                        </div>
                        <p className="text-sm text-slate-600 ml-6">{person.email}</p>
                        <p className="text-xs text-slate-500 ml-6 font-medium">{person.department}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      {/* Custom status indicator instead of Badge */}
                      <div
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                          person.status === "approved"
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {getStatusIcon(person.status)}
                        <span className="capitalize">{person.status}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-2">{person.requestedAt}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {permissionData.length === 0 && (
              <div className="text-center py-8 text-slate-500">
                <MdTimer className="w-12 h-12 mx-auto mb-2 text-slate-300" />
                <p>No permission requests found</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
