import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export default function ScheduleTable() {
  const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  // Get current date and calculate dates for the week
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  // Get first day of current month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1)
  const startOfWeek = new Date(firstDayOfMonth)

  // Adjust to start from Monday
  const dayOfWeek = firstDayOfMonth.getDay()
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1
  startOfWeek.setDate(firstDayOfMonth.getDate() - daysToSubtract)

  // Generate dates for the week
  const weekDates = weekdays.map((_, index) => {
    const date = new Date(startOfWeek)
    date.setDate(startOfWeek.getDate() + index)
    return date.getDate()
  })

  const timeSlots = Array.from({ length: 11 }, (_, i) => {
    const hour = 9 + i
    return `${hour}:00`
  })

  const currentMonthName = new Date().toLocaleString("default", { month: "long", year: "numeric" })

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-bold text-center">{currentMonthName} Schedule</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20 font-semibold bg-muted/50">Time</TableHead>
                  {weekdays.map((day, index) => (
                    <TableHead key={day} className="text-center font-semibold min-w-32">
                      <div className="flex flex-col">
                        <span>{day}</span>
                        <span className="text-sm text-muted-foreground">{weekDates[index]}</span>
                      </div>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {timeSlots.map((time) => (
                  <TableRow key={time} className="hover:bg-muted/50">
                    <TableCell className="font-medium bg-muted/50 border-r-2 align-top py-1 px-3">
                      <div className="pt-1">{time}</div>
                    </TableCell>
                    {weekdays.map((day) => (
                      <TableCell key={`${time}-${day}`} className="h-12 border-l align-top py-1">
                        {/* Empty cells for schedule entries */}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
