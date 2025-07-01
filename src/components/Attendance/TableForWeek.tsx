import React, { useEffect, useState } from "react";


declare global {
  interface Window {
    BX24: any;
  }
}

interface WeeklyCalendarProps {
  startHour?: number;
  endHour?: number;
  startDate?: Date; 
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({
  startHour = 9,
  endHour = 17,
  startDate = new Date(), 
}) => {
  const [bookedSlots, setBookedSlots] = useState<{ [key: string]: boolean }>({});

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  // Get start of week (Sunday)
  const getStartOfWeek = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day;
    return new Date(date.setDate(diff));
  };

  const weekStartDate = getStartOfWeek(new Date(startDate));
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStartDate);
    d.setDate(d.getDate() + i);
    return d;
  });

  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

  const toggleSlot = (date: Date, hour: number) => {
    const key = `${date.toDateString()}-${hour}`;
    setBookedSlots((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isSlotBooked = (date: Date, hour: number) => {
    const key = `${date.toDateString()}-${hour}`;
    return bookedSlots[key];
  };

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
          console.log("Bitrix Events:", res.data());
          // Map Bitrix events to bookedSlots here if needed
        }
      );
    }
  };

  useEffect(() => {
    loadBitrixEvents();
  }, []);

  const monthYear = weekStartDate.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-6xl mx-auto mt-6 border rounded shadow bg-white font-sans overflow-x-auto">
      <div className="bg-blue-100 py-3 px-4 font-semibold text-lg text-blue-800">
        {monthYear}
      </div>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-100 text-center">
            <th className="border px-2 py-2 w-24 text-left">Time</th>
            {weekDates.map((date, idx) => (
              <th key={idx} className="border px-2 py-2">
                <div className="font-medium">{daysOfWeek[date.getDay()]}</div>
                <div className="text-xs text-gray-500">
                  {date.toLocaleDateString()}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td className="border px-2 py-2 font-medium text-gray-700 bg-gray-50">
                {hour}:00
              </td>
              {weekDates.map((date) => {
                const booked = isSlotBooked(date, hour);
                return (
                  <td
                    key={date.toISOString()}
                    className={`border px-2 py-3 text-center cursor-pointer transition ${
                      booked ? "bg-blue-600 text-white" : "hover:bg-blue-100"
                    }`}
                    onClick={() => toggleSlot(date, hour)}
                  >
                    {booked ? "Booked" : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WeeklyCalendar;
