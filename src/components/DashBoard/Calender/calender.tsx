import { useState } from 'react';
import {
  format,
  parse,
  startOfToday,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  addMonths,
  getDay,
  isSameMonth,
  isToday,
} from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export const CalendarNav = () => (
  <div>
    <button><ChevronLeftIcon className="w-5 h-5" /></button>
    <button><ChevronRightIcon className="w-5 h-5" /></button>
  </div>
);


const colStartClasses = [
  '', 'col-start-2', 'col-start-3', 'col-start-4',
  'col-start-5', 'col-start-6', 'col-start-7'
];

export const Calendar = () => {
  const today = startOfToday();
  const [monthLabel, setMonthLabel] = useState(format(today, 'MMM-yyyy'));
  const firstDay = parse(monthLabel, 'MMM-yyyy', new Date());
  const days = eachDayOfInterval({
    start: startOfMonth(firstDay),
    end: endOfMonth(firstDay),
  });

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-screen-lg mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">
          {format(firstDay, 'MMMM, yyyy')}
        </h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setMonthLabel(format(addMonths(firstDay, -1), 'MMM-yyyy'))}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => setMonthLabel(format(addMonths(firstDay, +1), 'MMM-yyyy'))}
            className="p-1 hover:bg-gray-200 rounded"
          >
            <ChevronRightIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-xs uppercase tracking-wide text-gray-500 mb-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="text-center">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-2">
        {days.map((day, idx) => (
          <div
            key={day.toISOString()}
            className={`${idx === 0 ? colStartClasses[getDay(day)] : ''} flex justify-center`}
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-full
                ${isToday(day) ? 'bg-blue-600 text-white' : 
                isSameMonth(day, firstDay) ? 'text-gray-900 hover:bg-gray-100' : 'text-gray-300'}`}
            >
              {format(day, 'd')}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
