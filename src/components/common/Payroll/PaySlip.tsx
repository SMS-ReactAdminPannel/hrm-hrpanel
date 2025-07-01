import { Printer, Send } from "lucide-react";

interface PayslipProps {
  employee: {
    name: string;
    id: string;
    position: string;
    department: string;
    salary: string;
    status: string;
    lastPayment: string;
    hoursWorked: number;
  };
  onClose: () => void;
}

const Payslip = ({ employee, onClose }: PayslipProps) => {
  const earnings = [
    { label: "Basic Salary", amount: 8000 },
    { label: "House Rent Allowance (H.R.A.)", amount: 50 },
    { label: "Conveyance", amount: 50 },
    { label: "Other Allowance", amount: 50 },
  ];

  const deductions = [
    { label: "Tax Deducted at Source (T.D.S.)", amount: 15 },
    { label: "Provident Fund", amount: 200 },
    { label: "ESI", amount: 0 },
    { label: "Other Deductions", amount: 0 },
  ];

  const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0);
  const totalDeductions = deductions.reduce((sum, item) => sum + item.amount, 0);
  const netTotal = totalEarnings - totalDeductions;

  return (
    <div className="fixed inset-0 z-50 bg-white text-gray-800 overflow-y-auto font-sans">
      <div className="max-w-5xl mx-auto py-10 px-6 sm:px-12 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-500 hover:text-red-600 text-3xl font-bold"
          aria-label="Close"
        >
          &times;
        </button>

        <h1 className="text-2xl sm:text-3xl font-bold mb-6 border-b pb-4">Pay Slip</h1>
        <p className="text-sm font-semibold mb-4">
          Payslip <span className="font-normal">{new Date(employee.lastPayment).toLocaleDateString()}</span>
        </p>

        <div className="grid sm:grid-cols-2 gap-8 border-b pb-6 mb-6">
          <div>
            <p className="text-sm text-gray-600">From:</p>
            <h2 className="font-semibold text-base">Yoho Technologies</h2>
            <p className="text-sm text-gray-600">
              SF1, second floor,sri ambal nagar main road<br />
               Keelkattalai,Chennai<br />
              Email: info@yohotechnologies.com<br />
              Phone: +44 888 666 3333
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">To:</p>
            <h2 className="font-semibold text-base">{employee.name}</h2>
            <p className="text-sm text-gray-600">
              {employee.position}<br />
              Employee ID: {employee.id}<br />
              Joining Date: 10 Feb 2017<br />
              Phone: +66 243 456 789
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mb-2">
          <div className=" rounded-md overflow-hidden">
            <div className="grid grid-cols-3 font-semibold px-4 py-2 text-sm">
              <div>#</div>
              <div className="col-span-1">EARNINGS</div>
              <div className="text-right">AMOUNT</div>
            </div>
            <div>
             {earnings.map((item, index) => (
  <div
    key={index}
    className={`flex justify-between px-4 py-2 text-sm ${
      index % 2 === 0 ? "bg-gray-100 " : ""
    }`}
  >
    <span>{index + 1}. {item.label}</span>
    <span>${item.amount.toFixed(2)}</span>
  </div>
))}

            </div>
          </div>

          <div className=" rounded-md overflow-hidden">
            <div className="grid grid-cols-3 font-semibold px-4 py-2 text-sm">
              <div>#</div>
              <div className="col-span-1">DEDUCTIONS</div>
              <div className="text-right">AMOUNT</div>
            </div>
            <div>
             {deductions.map((item, index) => (
  <div
    key={index}
    className={`flex justify-between px-4 py-2  text-sm ${
      index % 2 === 0 ? "bg-gray-100" : ""
    }`}
  >
    <span>{index + 1}. {item.label}</span>
    <span>${item.amount.toFixed(2)}</span>
  </div>
))}

            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div className="text-end text-sm font-bold">
            <span className="inline-block border-b border-gray-300 pb-1">
              Subtotal &nbsp;&nbsp; ${totalEarnings.toFixed(2)}
            </span>
          </div>
          <div className="text-end text-sm font-bold">
            <span className="inline-block border-b border-gray-300 pb-1">
              Subtotal &nbsp;&nbsp; ${totalDeductions.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:items-end mb-10 text-sm">
          <div className="rounded-md">
            <div className="text-sm space-y-2 text-end">
              <div>
                <span className="inline-block border-b border-gray-300 pb-1 font-bold">
                  (ER) - (DE) &nbsp;&nbsp; ${netTotal.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="inline-block border-b border-gray-300 pb-1 font-bold">
                  Total &nbsp;&nbsp; ${netTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-gray-500 italic mb-8">
          <p>
            Terms & Condition<br />
            Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 flex items-center gap-2"
          >
            <Printer size={16} /> Print
          </button>
          <button
            className="px-4 py-2 bg-[#6c5dd3] hover:bg-[#5843c3] text-white rounded flex items-center gap-2"
          >
            <Send size={16} /> Send Invoice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payslip;
