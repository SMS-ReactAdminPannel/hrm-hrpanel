

import React, { useEffect, useState } from "react";

// If BX24 is available globally, declare it for TypeScript
declare global {
  interface Window {
    BX24: any;
  }
}

interface DailyCalendarProps {
  startHour?: number;
  endHour?: number;
}

const DailyCalendar: React.FC<DailyCalendarProps> = ({
  startHour = 9,
  endHour = 17,
}) => {
  const [bookedSlots, setBookedSlots] = useState<{ [key: string]: boolean }>({});

  const hours = Array.from({ length: endHour - startHour + 1 }, (_, i) => startHour + i);

  const toggleSlot = (hour: number) => {
    const key = `hour-${hour}`;
    setBookedSlots((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Optional: Load events from Bitrix Calendar
  const loadBitrixEvents = () => {
    if (typeof window.BX24 !== "undefined") {
      window.BX24.callMethod(
        "calendar.event.get",
        {
          type: "user",
          ownerId: window.BX24.getUserId(),
        },
        (res: any) => {
          console.log("Bitrix Calendar Events:", res.data());
          // Map Bitrix events to bookedSlots if needed
        }
      );
    }
  };

  useEffect(() => {
    // Uncomment to auto-load events
    loadBitrixEvents();
  }, []);

  return (
    <div className="max-w-xlmt-6 border rounded shadow bg-white font-sans">
      <div className="bg-blue-100 py-3 text-center font-semibold text-lg text-blue-800">
        Daily Calendar
      </div>
      {hours.map((hour) => {
        const key = `hour-${hour}`;
        const isBooked = bookedSlots[key];

        return (
          <div key={key} className="flex border-t">
            <div className="w-28 px-3 py-2 border-r bg-gray-100 text-sm font-medium">
              {hour}:00
            </div>
            <div
              className={`flex-1 px-3 py-2 text-center cursor-pointer transition ${
                isBooked ? "bg-blue-600 text-white" : "hover:bg-blue-100"
              }`}
              onClick={() => toggleSlot(hour)}
            >
              {isBooked ? "Booked" : ""}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DailyCalendar;
