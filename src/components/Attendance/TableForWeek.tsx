

import type React from "react"
import { useEffect, useState } from "react"
import AttendencePopPage from '../../components/Attendance/AttendencePopup/AttendencePopupPage'

declare global {
  interface Window {
    BX24: any
  }
}

interface WeeklyCalendarProps {
  startHour?: number
  endHour?: number
  startDate?: Date
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ startHour = 0, endHour = 23, startDate = new Date() }) => {
  const [bookedSlots, setBookedSlots] = useState<{ [key: string]: boolean }>({})
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => {
    // Initialize with the start of the week for the provided startDate
    const getStartOfWeek = (date: Date) => {
      const day = date.getDay()
      const diff = date.getDate() - day
      const startOfWeek = new Date(date)
      startOfWeek.setDate(diff)
      return startOfWeek
    }
    return getStartOfWeek(new Date(startDate))
  })

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]

  // Get start of week (Sunday)
  const getStartOfWeek = (date: Date) => {
    const day = date.getDay()
    const diff = date.getDate() - day
    const startOfWeek = new Date(date)
    startOfWeek.setDate(diff)
    return startOfWeek
  }

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(currentWeekStart)
    d.setDate(d.getDate() + i)
    return d
  })

  // Generate time slots like the second code
  const timeSlots = Array.from({ length: 24 }, (_, i) => `${i}:00`)

  // Navigation functions
  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentWeekStart)
    previousWeek.setDate(previousWeek.getDate() - 7)
    setCurrentWeekStart(previousWeek)
  }

  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeekStart)
    nextWeek.setDate(nextWeek.getDate() + 7)
    setCurrentWeekStart(nextWeek)
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentWeekStart(getStartOfWeek(today))
  }

  const 
  toggleSlot = (date: Date, hour: number) => {
    const key = `${date.toDateString()}-${hour}`
    setBookedSlots((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const isSlotBooked = (date: Date, hour: number) => {
    const key = `${date.toDateString()}-${hour}`
    return bookedSlots[key]
  }

  // Optional: Load Bitrix Events
  const loadBitrixEvents = () => {
    if (typeof window.BX24 !== "undefined") {
      window.BX24.callMethod(
        "calendar.event.get",
        {
          type: "user",
          ownerId: window.BX24.getUserId(),
        },
        (res: any) => {
          console.log("Bitrix Events:", res.data())
          // Map Bitrix events to bookedSlots here if needed
        },
      )
    }
  }

  useEffect(() => {
    loadBitrixEvents()
  }, [])

  const monthYear = currentWeekStart.toLocaleString("default", {
    month: "long",
    year: "numeric",
  })

  // for attendencePopPage 
  const [openpopup,setopenpopup]=useState(false)
  const handleopenpopup = () =>{
    setopenpopup(true);
  }
  const handleclosepopup = () =>{
    setopenpopup(false);
  }

  return (
    <div className="max-w-6xl mb-6 border rounded shadow bg-white font-sans overflow-x-auto">
      <div className="flex justify-between items-center px-4 py-3">
        <span className="font-semibold text-lg text-gray-400">{monthYear}</span>
        <div className="flex items-center gap-2">
          
          <button
            className="p-2 rounded hover:bg-gray-100 transition-colors"
            aria-label="Previous week"
            onClick={goToPreviousWeek}
            type="button"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M13 15l-5-5 5-5" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className="px-3 py-1 rounded text-gray-400 font-semibold hover:bg-gray-100 transition-colors"
            onClick={goToToday}
            type="button"
          >
            Today
          </button>
          <button
            className="p-2 rounded hover:bg-gray-100 transition-colors"
            aria-label="Next week"
            onClick={goToNextWeek}
            type="button"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M7 5l5 5-5 5" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Time slots layout similar to second code */}
      <div className="overflow-auto" style={{ height: "calc(100% - 80px)" }}>
        {/* Header with days */}
        <div className="sticky top-0 bg-white border-b border-gray-100 z-10">
          <div className="flex">
            <div className="w-16 bg-gray-50"></div>
            {weekDates.map((date, idx) => {
              const isToday = date.toDateString() === new Date().toDateString()
              return (
                <div
                  key={idx}
                  className={`flex-1 p-2 text-center text-sm font-medium border-r border-gray-100 ${isToday ? "bg-blue-100" : "bg-gray-50"}`}
                >
                  <div className="flex flex-row items-center justify-end gap-1">
                    <span className="font-medium text-gray-400">{daysOfWeek[date.getDay()]}</span>
                    <span
                      className={`text-lg ${
                        isToday ? "bg-blue-300 text-white rounded-full px-2 text-lg font-bold" : "text-gray-400"
                      }`}
                    >
                      {date.getDate()}
                    </span>
                  </div>
                </div>    )
            })}
          </div>
        </div>

        {/* Time Slots */}
        <div className="relative">
          {timeSlots.map((time, index) => (
            <div key={time} className="relative ">
              {/* Time label positioned on the line */}
              <div className="absolute left-0 top-0 w-16 -mt-2 pr-2 text-xs text-gray-900 text-right bg-gray-100">
                {time}
              </div>
              {/* Horizontal line */}
              <div className="border-t border-gray-200 ml-16"></div>
              {/* Time slot area */}
              <div className="flex h-12">
                <div className="w-16 bg-gray-100"></div>
                {weekDates.map((date) => {
                  const hour = Number.parseInt(time.split(":")[0])
                  const booked = isSlotBooked(date, hour)
                  const isToday = date.toDateString() === new Date().toDateString()

                  return (
                    <div
                      key={date.toISOString() + hour}
                      className={`flex-1 relative cursor-pointer transition border-r border-gray-100 hover:bg-gray-100 ${
                        booked ? "bg-blue-600 text-white hover:bg-blue-700" : isToday ? "bg-blue-50" : ""
                      }`}
                      onClick={ handleopenpopup}
                    >
                      <div className="h-full flex items-center justify-center text-xs">{booked ? "Booked" : ""}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      {openpopup && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-red-500  rounded-xl shadow-xl max-w-3xl w-full relative">
            <button
              onClick={handleclosepopup}
              className="absolute top-2 right-2 text-gray-700 hover:text-black"
            >
              ✕
            </button>
            <AttendencePopPage />
          </div>
        </div>
      )}
    </div>
    
  )
}

export default WeeklyCalendar
