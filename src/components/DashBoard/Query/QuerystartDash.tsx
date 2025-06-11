import {  Ticket, CheckCircle, Clock } from "lucide-react"

export default function SupportTracker() {
  const completionPercentage = 85
  const circumference = 2 * Math.PI * 45
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference

  return (
    <div className="rounded-2xl p-6 shadow-sm h-full ">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl text-black font-semibold">Support Query</h2>
          <p className="text-sm text-black mt-1">Last 7 Days</p>
        </div>
        {/* <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button> */}
      </div>

      {/* Main Content */}
      <div className="flex flex-col h-full gap-6">
        {/* Top Section - Total and Progress */}
        <div className="flex justify-between items-center">
          {/* Total Tickets */}
          <div className="flex flex-col items-center">
            <div className="shadow-md bg-white w-32 h-32 rounded-xl flex flex-col items-center justify-center ml-20">
              <div className="text-4xl  text-black font-semibold">164</div>
              <div className="text-sm text-black mt-1">Total Query</div>
            </div>
          </div>

          {/* Circular Progress */}
          <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-gray-100"
              />
              {/* Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-purple-500 transition-all duration-300 ease-in-out"
              />
            </svg>

            {/* Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-2xl  text-black font-semibold">{completionPercentage}%</div>
              <div className="text-xs text-black text-center leading-tight">Completed Task</div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Metrics */}
        <div className="flex justify-between mt-4">
          {/* New Queries */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <Ticket className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <div className="text-xs text-black">New Queries</div>
              <div className=" text-black font-semibold">142</div>
            </div>
          </div>

          {/* Solved */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-teal-600" />
            </div>
            <div>
              <div className="text-xs text-black">Solved Queries</div>
              <div className=" text-black font-semibold">28</div>
            </div>
          </div>

          {/* Unsolved */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <div className="text-xs text-black">Unsolved Queries</div>
              <div className=" text-black font-semibold">1 Day</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}