import { Card, CardContent } from "../../components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const topStats = [
  { title: "Total Vacancies", value: 96, color: "bg-orange-100", border: "border-orange-400" },
  { title: "Ongoing Recruitments", value: 18, color: "bg-red-100", border: "border-red-400" },
  { title: "Hired Candidates", value: 3, color: "bg-green-100", border: "border-green-400" },
  { title: "Conversion Rate", value: "16.7%", color: "bg-blue-100", border: "border-blue-400" },
  { title: "OAR", value: "66.7%", color: "bg-indigo-100", border: "border-indigo-400" },
];

const offerData = [
  { name: "Not Sent", value: 60, color: "#ccc" },
  { name: "Sent", value: 15, color: "#f2e93d" },
  { name: "Accepted", value: 10, color: "#00bfff" },
  { name: "Rejected", value: 5, color: "#ff6b6b" },
  { name: "Joined", value: 10, color: "#00cc66" },
];

const joiningsData = [
  { month: "Jan", count: 2 },
  { month: "Feb", count: 3 },
  { month: "Mar", count: 5 },
  { month: "Apr", count: 1 },
];

export default function RecruitmentDashboard() {
  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-[#f5f7fa] to-[#ebf0f4] min-h-screen">

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {topStats.map((stat, idx) => (
          <Card key={idx} className={`rounded-2xl border-t-4 ${stat.border} ${stat.color} shadow`}>
            <CardContent className="p-4 text-center">
              <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <Card className="col-span-1">
          <CardContent className="p-4">
            <h3 className="text-md font-semibold mb-4 text-gray-800">Offer Letter Status</h3>
            <div className="flex justify-center">
              <PieChart width={200} height={200}>
                <Pie
                  data={offerData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                >
                  {offerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </CardContent>
        </Card>

        {/* Skill Zone */}
        <Card className="col-span-1">
          <CardContent className="p-4">
            <h3 className="text-md font-semibold mb-4 text-gray-800">Skill Zone Summary</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex justify-between">
                <span>Designer</span>
                <span>2 Candidates</span>
              </li>
              <li className="flex justify-between">
                <span>Social Media Influencer</span>
                <span>0 Candidates</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Onboard Candidate */}
        <Card className="col-span-1">
          <CardContent className="p-4">
            <h3 className="text-md font-semibold mb-4 text-gray-800">Candidate Onboard</h3>
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-purple-500 text-white w-10 h-10 flex items-center justify-center font-bold">HA</div>
              <div>
                <p className="font-medium text-gray-900">Haroon</p>
                <p className="text-sm text-gray-500">FD-002 – Finance Dept.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Joinings Per Month Chart */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-md font-semibold mb-4 text-gray-800">Joinings Per Month (2025)</h3>
            <BarChart width={350} height={200} data={joiningsData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#60a5fa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </CardContent>
        </Card>

        {/* Hiring Pipeline Table */}
        <Card>
          <CardContent className="p-4">
            <h3 className="text-md font-semibold mb-4 text-gray-800">Hiring Pipeline</h3>
            <table className="w-full text-sm text-left border-t border-gray-200">
              <thead className="text-gray-600">
                <tr>
                  <th className="py-2">Position</th>
                  <th className="py-2">Initial</th>
                  <th className="py-2">Test</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2">Odoo Developer</td>
                  <td className="py-2">6</td>
                  <td className="py-2">0</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}