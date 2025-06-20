import React from 'react';
import type { DayData } from './types';

interface CalendarProps {
  currentMonth: Date;
  days: DayData[];
  onNavigateMonth: (direction: 'prev' | 'next') => void;
  onSetCurrentMonth: (date: Date) => void;
  onShowModal: () => void;
}

const Calendar: React.FC<CalendarProps> = ({
  currentMonth,
  days,
  onNavigateMonth,
  onSetCurrentMonth,
  onShowModal
}) => {
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onNavigateMonth('prev')}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() => onSetCurrentMonth(new Date())}
            className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600"
          >
            Today
          </button>
          <button
            onClick={() => onNavigateMonth('next')}
            className="p-2 rounded-md hover:bg-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={onShowModal}
            className="px-4 py-2 text-sm rounded-md bg-green-500 text-white hover:bg-green-600"
          >
            Add Event
          </button>
        </div>
      </div>

      {/* Day Names */}
      <div className="grid grid-cols-7 gap-px bg-gray-200">
        {dayNames.map((day) => (
          <div
            key={day}
            className="py-2 text-center text-xs font-medium text-gray-500 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-px bg-gray-50">
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`bg-white min-h-32 p-1 ${!day.isCurrentMonth ? 'opacity-50' : ''}`}
          >
            <div
              className={`text-right p-1 ${day.isToday ? 'bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center ml-auto' : ''}`}
            >
              {day.date.getDate()}
            </div>
            <div className="mt-1 space-y-1 overflow-y-auto max-h-24">
              {day.events.map((event) => (
                <div
                  key={event.id}
                  className={`${event.color} text-white text-xs p-1 rounded truncate`}
                >
                  <div className="font-medium">{event.title}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;