import { Printer } from "lucide-react"

interface PayslipProps {
  employee: {
    name: string
    id: string
    position: string
    department: string
    salary: string
    status: string
    lastPayment: string
    hoursWorked: number
  }
  onClose: () => void
}

const PayslipView = ({ employee, onClose }: PayslipProps) => {
  const earnings = [
    { label: "Basic Salary", amount: 1500, deduction: 0, total: 380 },
    { label: "House Rent Allowance (H.R.A.)", amount: 62, deduction: 0, total: 250 },
    { label: "Tax Deducted at Source (T.D.S.)", amount: 0, deduction: 80, total: 120 },
    { label: "C/Bank Loan", amount: 0, deduction: 120, total: 120 },
    { label: "Other Allowance", amount: 121, deduction: 0, total: 120 },
  ]

  const totalEarnings = earnings.reduce((acc, item) => acc + item.amount, 0)
  const totalDeductions = earnings.reduce((acc, item) => acc + item.deduction, 0)
  const netTotal = totalEarnings - totalDeductions

  return (
    <div className="fixed inset-0 z-50 bg-white text-gray-800 overflow-y-auto">
      <div className="max-w-5xl mx-auto py-10 px-6 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-red-600 text-3xl font-bold"
        >
          &times;
        </button>

        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: "#006666" }}>Employee Payslip</h1>
            <p className="text-sm text-gray-500">Generated on {new Date().toDateString()}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-semibold">Order ID: <span style={{ color: "#006666" }}>C{employee.id}</span></p>
            <p className="text-sm bg-gray-100 px-3 py-1 rounded inline-block mt-1">{new Date(employee.lastPayment).toDateString()}</p>
          </div>
        </div>

        {/* Employee Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <p className="text-sm text-gray-500">{employee.position} - {employee.department}</p>
          </div>
          <div className="sm:text-right">
            <p className="text-sm text-gray-600">Status: <span className="font-medium">{employee.status}</span></p>
            <p className="text-sm text-gray-600">Hours Worked: <span className="font-medium">{employee.hoursWorked}</span> hrs</p>
          </div>
        </div>

        {/* Table */}
        <table className="w-full text-sm border mb-6">
          <thead style={{ backgroundColor: "#006666" }} className="text-white">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-right">Earnings</th>
              <th className="py-2 px-4 text-right">Deductions</th>
              <th className="py-2 px-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {earnings.map((item, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{`0${index + 1}`}</td>
                <td className="py-2 px-4">{item.label}</td>
                <td className="py-2 px-4 text-right">{item.amount ? `$${item.amount}` : "-"}</td>
                <td className="py-2 px-4 text-right">{item.deduction ? `$${item.deduction}` : "-"}</td>
                <td className="py-2 px-4 text-right">${item.total}</td>
              </tr>
            ))}
            <tr className="font-bold bg-gray-100">
              <td colSpan={2} className="py-2 px-4 text-right">Total</td>
              <td className="py-2 px-4 text-right">${totalEarnings}</td>
              <td className="py-2 px-4 text-right">${totalDeductions}</td>
              <td className="py-2 px-4 text-right" style={{ color: "#006666" }}>${netTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>

        {/* Note */}
        <p className="text-xs text-gray-500 italic mb-6">
          * Note: This payslip is a computer-generated document and does not require a signature.
        </p>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
          >
            Close
          </button>
          <button
            onClick={() => window.print()}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <Printer size={16} />
            Print
          </button>
        </div>
      </div>
    </div>
  )
}

export default PayslipView
