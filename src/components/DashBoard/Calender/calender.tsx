import React, { useState } from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
  isToday,
  type Locale,
}
 from 'date-fns';

interface CalendarProps {
  locale?: Locale;
}

const Calendar: React.FC<CalendarProps> = ({ locale }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { locale });
  const endDate = endOfWeek(monthEnd, { locale });

  const days = eachDayOfInterval({ start: startDate, end: endDate });
  
  const header = format(currentMonth, 'MMMM yyyy');

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const weekdays = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          ‹
        </button>
        <h2 className="font-semibold text-lg dark:text-gray-200">{header}</h2>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded">
          ›
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-sm text-gray-500 dark:text-gray-400">
        {weekdays.map(d => (
          <div key={d} className="text-center font-medium">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map(day => (
          <div
            key={day.toString()}
            className={`p-2 text-center rounded cursor-pointer
              ${!isSameMonth(day, monthStart) ? 'text-gray-300 dark:text-gray-600' : 'text-gray-900 dark:text-gray-100'}
              ${isToday(day) ? 'bg-blue-500 text-white' : 'hover:bg-blue-100 dark:hover:bg-gray-800'}`}
          >
            {format(day, 'd')}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
