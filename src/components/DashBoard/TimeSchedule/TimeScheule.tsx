import type React from "react";
import { useState } from "react";
import { Calendar, ChevronDown, Plus, X } from "lucide-react";

interface Task {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  color: string;
}

interface TaskColor {
  name: string;
  value: string;
}

const taskColors: TaskColor[] = [
  { name: "Teal", value: "bg-teal-200 border-l-teal-500" },
  { name: "Green", value: "bg-green-200 border-l-green-500" },
  { name: "Orange", value: "bg-orange-200 border-l-orange-500" },
  { name: "Purple", value: "bg-purple-200 border-l-purple-500" },
  { name: "Blue", value: "bg-blue-200 border-l-blue-500" },
  { name: "Pink", value: "bg-pink-200 border-l-pink-500" },
];

const DailySchedule: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Online Interview with UI Candidate",
      startTime: "08:30",
      endTime: "09:30",
      color: "bg-teal-200 border-l-teal-500",
    },
    {
      id: "2",
      title: "Replying email to applicants",
      startTime: "09:30",
      endTime: "10:00",
      color: "bg-green-200 border-l-green-500",
    },
    {
      id: "3",
      title: "Weekly meeting",
      startTime: "10:30",
      endTime: "11:00",
      color: "bg-orange-200 border-l-orange-500",
    },
    {
      id: "4",
      title: "Psychology test",
      startTime: "10:45",
      endTime: "11:15",
      color: "bg-purple-200 border-l-purple-500",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [newTask, setNewTask] = useState({
    title: "",
    startTime: "",
    endTime: "",
    color: taskColors[0].value,
  });

  const currentTime = "09:35";
  const currentDate = "Jan 28, 2024";

  const timeSlots: string[] = [];
  for (let hour = 8; hour <= 11; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, "0")}:00`);
  }

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return (hours - 8) * 60 + minutes;
  };

  const getTaskStyle = (task: Task): React.CSSProperties => {
    const startMinutes = timeToMinutes(task.startTime);
    const endMinutes = timeToMinutes(task.endTime);
    const duration = endMinutes - startMinutes;

    return {
      top: `${(startMinutes / 180) * 100}%`,
      height: `${(duration / 180) * 100}%`,
    };
  };

  const getCurrentTimePosition = (): string => {
    const minutes = timeToMinutes(currentTime);
    return `${(minutes / 180) * 100}%`;
  };

  const handleAddTask = (): void => {
    if (newTask.title && newTask.startTime && newTask.endTime) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        startTime: newTask.startTime,
        endTime: newTask.endTime,
        color: newTask.color,
      };
      setTasks([...tasks, task]);
      setNewTask({ title: "", startTime: "", endTime: "", color: taskColors[0].value });
      setIsModalOpen(false);
    }
  };

  const handleDeleteTask = (taskId: string): void => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className="">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white overflow-hidden rounded-xl">
          <div className="p-6 sm:p-8 ">
            {/* Header */}
            <div className="flex flex-row sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h1 className="text-xl font-bold text-[#006666] tracking-tight">Today Schedule</h1>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors">
                  <Calendar className="w-1 h-1 text-gray-500" />
                  <span className="font-medium">{currentDate}</span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#006666]  text-white rounded-lg hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  Add Task
                </button>
              </div>
            </div>

            {/* Schedule Timeline */}
            <div className="relative">
              {/* Time labels */}
              <div className="flex justify-between text-sm font-medium text-gray-500 mb-6 px-2">
                {timeSlots.map((time) => (
                  <div key={time} className="flex-1 text-center">
                    {time}
                  </div>
                ))}
              </div>

              {/* Timeline container */}
              <div className="relative h-64 bg-gradient-to-b from-gray-50 to-gray-100 rounded-xl border border-gray-200 overflow-hidden overflow-y-auto scrollbar-hide">
                {/* Time grid lines */}
                {timeSlots.map((_, index) => (
                  <div
                    key={index}
                    className="absolute top-0 bottom-0 border-l border-gray-200"
                    style={{ left: `${(index / (timeSlots.length - 1)) * 100}%` }}
                  />
                ))}

                {/* Current time indicator */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#006666] z-20 shadow-sm"
                  style={{ left: getCurrentTimePosition() }}
                >
                  <div className="absolute -top-1 -left-6 bg-[#006666] text-white text-xs font-semibold px-2 py-1 rounded-md shadow-md">
                    {currentTime}
                  </div>
                </div>

                {/* Tasks */}
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className={`absolute left-3 right-3 ${task.color} border-l-4 rounded-r-lg p-1  shadow-sm hover:shadow-md transition-shadow duration-200 z-10 cursor-pointer group`}
                    style={getTaskStyle(task)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-800 truncate leading-tight">{task.title}</div>
                        <div className="text-xs text-gray-600 mt-1 font-medium">
                          {task.startTime} - {task.endTime}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="opacity-0 group-hover:opacity-100 ml-2 p-1 text-gray-400 hover:text-red-500 transition-all duration-200"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Add New Task</h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title"
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
                    <input
                      type="time"
                      value={newTask.startTime}
                      onChange={(e) => setNewTask({ ...newTask, startTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
                    <input
                      type="time"
                      value={newTask.endTime}
                      onChange={(e) => setNewTask({ ...newTask, endTime: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color Theme</label>
                  <select
                    value={newTask.color}
                    onChange={(e) => setNewTask({ ...newTask, color: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-colors"
                  >
                    {taskColors.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleAddTask}
                  className="w-full bg-[#006666] text-white py-2 px-4 rounded-lg hover:bg-[#006666] shadow-md hover:shadow-lg transition-all duration-200 font-medium"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DailySchedule
