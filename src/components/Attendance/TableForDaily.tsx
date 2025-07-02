


import { useState, ButtonHTMLAttributes, ReactNode, MouseEventHandler } from "react"
import { ChevronLeft, ChevronRight} from "lucide-react"

const timeSlots = [
  "0:00",
  "1:00",
  "2:00",
  "3:00",
  "4:00",
  "5:00",
  "6:00",
  "7:00",
  "8:00",
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]


// import { ReactNode, MouseEventHandler, ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  className?: string
  variant?: "default" | "outline"
  size?: "default" | "sm" | "icon"
}

const Button = ({
  children,
  onClick,
  className = "",
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    icon: "h-10 w-10",
  }

  return (
    <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}




// Simple cn utility function
const cn = (...classes: (string | undefined | false | null)[]) => {
  return classes.filter(Boolean).join(" ")
}

export default function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 6, 13))


  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDayName = (date: Date) => {
    return date.toLocaleDateString("en-US", { weekday: "long" })
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setDate(newDate.getDate() - 1)
    } else {
      newDate.setDate(newDate.getDate() + 1)
    }
    setCurrentDate(newDate)
  }

  const goToToday = () => {
    setCurrentDate(new Date())
  }

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const currentDateStr = currentDate.toDateString()

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const isCurrentMonth = date.getMonth() === month
      const isToday = date.toDateString() === new Date().toDateString()
      const isSelected = date.toDateString() === currentDateStr

      days.push({
        date: date.getDate(),
        isCurrentMonth,
        isToday,
        isSelected,
        fullDate: new Date(date),
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  

  return (
    <div className="w-[100%] h-[10%] bg-white rounded-xl shadow-md border border-gray-100  ">
      <div className="flex h-full">
        {/* Main Calendar Area */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex items-center justify-between p-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-medium text-gray-700">{formatDate(currentDate)}</h1>
              <span className="text-xs text-gray-500">{getDayName(currentDate)}</span>
            </div>

            <div className="flex items-center gap-1">
             

              <Button variant="outline" size="sm" onClick={goToToday} className="text-xs bg-transparent h-6 px-2">
                Today
              </Button>

              <div className="flex">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate("prev")}
                  className=" px-1 h-6  hover:bg-gray-100"
                >
                  <ChevronLeft className="h-2 w-2" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate("next")}
                  className="  px-1 h-6  hover:bg-gray-100"
                >
                  <ChevronRight className="h-2 w-2" />
                </Button>
              </div>
            </div>
          </div>

          
          <div className="overflow-auto " style={{ height: "calc(100% - 40px)" }}>
        
            <div className="sticky top-0 bg-white border-b border-gray-100 z-10 mb-2">
              <div className="flex">
                <div className="w-8 bg-gray-50"></div>
                {/* <div className="flex-1 p-1 text-center text-xs font-medium">{getDayName(currentDate)}</div> */}
              </div>
            </div>

            {/* Time Slots */}
            <div className="relative ">
              {timeSlots.map((time, index) => (
                <div key={time} className="relative ">
                  <div className="absolute left-0 top-0  w-8 -mt-2 pr-1 text-xs text-gray-900 text-right bg-gray-100 ">
                    {time}
                  </div>
                  <div className="border-t border-gray-200 ml-8 "></div>
                  <div className="flex h-8">
                    <div className="w-8 bg-gray-100 "></div>
                    <div className="flex-1 relative  cursor-pointer">
                      {/* Events would be rendered here */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <div className="w-[20%] border-l-1 border-gray-900">
          <div className="p-2">
            <div className="text-center mb-2">
              <h2 className="text-xs font-medium text-gray-900">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
            </div>

            {/* Mini Calendar */}
            <div className="grid grid-cols-7 gap-0.5 text-center">
              {daysOfWeek.map((day) => (
                <div key={day} className="p-0.5 font-medium text-gray-500 text-xs">
                  {day.substring(0, 1)}
                </div>
              ))}

              {calendarDays.map((day, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentDate(day.fullDate)}
                  className={cn(
                    "p-0.5 text-xs rounded hover:bg-gray-100 transition-colors",
                    !day.isCurrentMonth && "text-gray-300",
                    day.isToday && "bg-blue-100 text-white rounded-xl font-medium",
                    day.isSelected && "bg-blue-500 text-white font-medium hover:bg-blue-600",
                  )}
                >
                  {day.date}
                </button>
              ))}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  )
}
