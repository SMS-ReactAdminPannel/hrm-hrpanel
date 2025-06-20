"use client"

import type { Task } from "./use-onboarding-state"
import {FONTS} from "../../constants/uiConstants"
interface TasksSectionProps {
  tasks: Task[]
  completedTasks: number[]
  onToggleTask: (taskId: number) => void
  onNavigateToDocuments: () => void
}

export function TasksSection({ tasks, completedTasks, onToggleTask, onNavigateToDocuments }: TasksSectionProps) {
  const getRandomColor = () => {
    const colors = ["#006666"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200"
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "Low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2">
        <div>
          <h2 className="text-xl !font-bold !text-gray-900 mb-2"  style={{...FONTS.cardheader}}>Onboarding Checklist</h2>
          <p className="!text-black"  style={{...FONTS.paragraph}}>Complete these tasks during your first few weeks</p>
        </div>
        <div className="rounded-lg overflow-hidden transition-all p-4 ml-auto">
          <div className="flex items-center justify-between">
            <button
              onClick={onNavigateToDocuments}
              className="px-3 py-2 bg-[#006666] text-white rounded-md hover:bg-[#005555] transition-colors ml-auto"
               style={{...FONTS.button}}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <input
              type="checkbox"
              checked={completedTasks.includes(task.id)}
              onChange={() => onToggleTask(task.id)}
              style={{ accentColor: getRandomColor() }}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1" style={{...FONTS.paragraph}}>
                <p
                  className={`font-medium ${
                    completedTasks.includes(task.id) ? "line-through !text-gray-500" : "!text-gray-900"
                  }`}
                   
                >
                  {task.title}
                </p>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(task.priority)}`}
                >
                  {task.priority}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm !text-gray-500" style={{...FONTS.description}}>
                <span >{task.category}</span>
                <span className="flex items-center gap-1">Due: {task.dueDate}</span>
              </div>
            </div>
            {completedTasks.includes(task.id) && <span className="!text-green-500 text-xl" style={{...FONTS.button}}>✅</span>}
          </div>
        ))}
      </div>
    </div>
  )
}
