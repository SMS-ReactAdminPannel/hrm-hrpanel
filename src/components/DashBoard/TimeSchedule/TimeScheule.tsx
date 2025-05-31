import React from 'react'

const TimeScheule = () => {
  return (
    <div className='p-4'>
        <div className='flex justify-between'>
            <div className=''>
                <h2 className='text-[#006666]'>
                    Today Scheule
                </h2>
            </div>
            <div className=''>
                <div>

                </div>
                <div>
                    <button>Add Task</button>
                </div>

            </div>
        </div>



    </div>
  )
}

export default TimeScheule





































// // import React from "react";
// // import { schedule } from "./ScheduleData";


//  const schedule = [
//   {
//     title: "Online Interview with UI Candidate",
//     start: "09:00",
//     end: "10:00",
//     color: "bg-teal-200",
//   },
//   {
//     title: "Replying email to applicants",
//     start: "09:15",
//     end: "09:45",
//     color: "bg-green-100",
//   },
//   {
//     title: "Weekly meeting",
//     start: "10:00",
//     end: "10:45",
//     color: "bg-orange-200",
//   },
//   {
//     title: "Psychology test",
//     start: "10:30",
//     end: "11:00",
//     color: "bg-pink-200",
//   },
// ];


// const timeToPercentage = (time: string) => {
//   const [hours, minutes] = time.split(":").map(Number);
//   const totalMinutes = hours * 60 + minutes;
//   const baseMinutes = 8 * 60; // start at 08:00
//   return ((totalMinutes - baseMinutes) / 180) * 100; // % of 3-hour window (08:00–11:00)
// };

// const Schedule = () => {
//   const now = "09:35"; // simulate current time (can be dynamic)

//   return (
//     <div className=" shadow p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-lg font-semibold">Today Schedule</h2>
//         <div className="flex items-center gap-2">
//           <input type="date" className="text-sm border p-1 rounded" />
//           <button className="text-sm text-blue-600 font-medium hover:underline">
//             Add Task
//           </button>
//         </div>
//       </div>

//       {/* Timeline Header */}
//       <div className="relative border-t border-b py-4">
//         <div className="flex justify-between text-sm text-gray-500 px-2">
//           <span>08.00</span>
//           <span>09.00</span>
//           <span>09.35</span>
//           <span>10.00</span>
//           <span>11.00</span>
//         </div>

//         {/* Tasks */}
//         <div className="relative h-28 mt-4 bg-gradient-to-b from-gray-50 via-white to-white">
//           {schedule.map((task, index) => {
//             const left = timeToPercentage(task.start);
//             const width =
//               timeToPercentage(task.end) - timeToPercentage(task.start);

//             return (
//               <div
//                 key={index}
//                 className={`absolute top-${index * 10} left-[${left}%] w-[${width}%] h-8 rounded px-2 text-sm text-gray-800 flex items-center ${task.color}`}
//                 style={{ left: `${left}%`, width: `${width}%` }}
//               >
//                 {task.title}
//               </div>
//             );
//           })}

//           {/* Current Time Indicator */}
//           <div
//             className="absolute top-0 bottom-0 w-0.5 bg-blue-600"
//             style={{ left: `${timeToPercentage(now)}%` }}
//           >
//             <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
//               {now}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Schedule;
