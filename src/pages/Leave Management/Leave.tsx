import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState, useEffect } from 'react';
import { FONTS } from '../../constants/uiConstants';
import { MdSick } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";


ChartJS.register(ArcElement, Tooltip, Legend);

type Customer = {
  id: string;
  date: Date;
  day: string;
  avatar: string;
  holiday: string;
};

interface WorkEvent {
  id: string;
  title: string;
  date: Date;
  color: string;
}

interface DayData {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  events: WorkEvent[];
}

const Leave = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [days, setDays] = useState<DayData[]>([]);
  const [events, setEvents] = useState<WorkEvent[]>([]);
  const [holidays, setHolidays] = useState<Customer[]>([]); // Separate state for holidays
  const [showModal, setShowModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    color: 'bg-blue-500'
  });

  // Sample initial data
  useEffect(() => {

    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      const parsedEvents = JSON.parse(savedEvents).map((event: any) => ({
        ...event,
        date: new Date(event.date)
      }));
      setEvents(parsedEvents);
    }

    // Load holidays from localStorage if they exist
    const savedHolidays = localStorage.getItem('holidays');
    if (savedHolidays) {
      const parsedHolidays = JSON.parse(savedHolidays).map((holiday: any) => ({
        ...holiday,
        date: new Date(holiday.date)
      }));
      setHolidays(parsedHolidays);
    } else {
      // Only set sample holidays if no saved holidays exist
      const sampleHolidays: Customer[] = [
        {
          id: "1",
          date: new Date(2025, 0, 14),
          day: "Tuesday", // Fixed: January 14, 2025 is actually a Tuesday
          avatar: "/docs/images/people/profile-picture-1.jpg",
          holiday: "Republic Day",
        },

      ];
      setHolidays(sampleHolidays);
      localStorage.setItem('holidays', JSON.stringify(sampleHolidays));
    }
  }, []);


  // Generate calendar days
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Get first and last days of the month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    // Get days from previous month to show
    const prevMonthDays = firstDay.getDay();

    // Get days from next month to show
    const nextMonthDays = 6 - lastDay.getDay();

    const daysArray: DayData[] = [];

    // Combine regular events and holidays (converted to events)
    const allEvents = [
      ...events,
      ...holidays.map(h => ({
        id: h.id,
        title: h.holiday,
        date: h.date,
        color: 'bg-red-500' // Default color for holidays
      }))
    ];

    // Previous month days
    for (let i = prevMonthDays; i > 0; i--) {
      const date = new Date(year, month, -i + 1);
      daysArray.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        events: allEvents.filter(
          e => e.date.getDate() === date.getDate() &&
            e.date.getMonth() === date.getMonth() &&
            e.date.getFullYear() === date.getFullYear()
        )
      });
    }

    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      const isToday =
        date.getDate() === new Date().getDate() &&
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear();
      daysArray.push({
        date,
        isCurrentMonth: true,
        isToday,
        events: allEvents.filter(
          e => e.date.getDate() === date.getDate() &&
            e.date.getMonth() === date.getMonth() &&
            e.date.getFullYear() === date.getFullYear()
        )
      });
    }

    // Next month days
    for (let i = 1; i <= nextMonthDays; i++) {
      const date = new Date(year, month + 1, i);
      daysArray.push({
        date,
        isCurrentMonth: false,
        isToday: false,
        events: allEvents.filter(
          e => e.date.getDate() === date.getDate() &&
            e.date.getMonth() === date.getMonth() &&
            e.date.getFullYear() === date.getFullYear()
        )
      });
    }

    setDays(daysArray);
  }, [currentMonth, events, holidays]);

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(
      new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth() + (direction === 'prev' ? -1 : 1),
        1
      )
    );
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Add holiday to both calendar and holiday list
  const addEvent = () => {
    if (!newEvent.title.trim()) {
      alert('Please enter a title for the event');
      return;
    }

    const [year, month, day] = newEvent.date.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dayName = dayNames[dateObj.getDay()];

    // Create new event ID
    const newId = `event-${Date.now()}`;

    // Add to events (calendar)
    const newCalendarEvent: WorkEvent = {
      id: newId,
      title: newEvent.title,
      date: dateObj,
      color: newEvent.color
    };

    const updatedEvents = [...events, newCalendarEvent];
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));

    // Add to holidays list
    const newHoliday: Customer = {
      id: newId,
      date: dateObj,
      day: dayName,
      avatar: "/docs/images/people/profile-picture-5.jpg",
      holiday: newEvent.title
    };

    const updatedHolidays = [...holidays, newHoliday];
    setHolidays(updatedHolidays);
    localStorage.setItem('holidays', JSON.stringify(updatedHolidays));

    // Close modal and reset form
    setShowModal(false);
    setNewEvent({
      title: '',
      date: new Date().toISOString().split('T')[0],
      color: 'bg-blue-500'
    });
  };

  const deleteEvent = (id: string) => {

    // Remove from events
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));

    // Remove from holidays
    const updatedHolidays = holidays.filter(holiday => holiday.id !== id);
    setHolidays(updatedHolidays);
    localStorage.setItem('holidays', JSON.stringify(updatedHolidays));
  };


  const navigateToDate = (date: Date) => {
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  return (
    <div >
      <div>
        <h1 className=" font-bold" style={FONTS.header}>Leave</h1>
      </div>
    <div className="container flex mx-auto grid grid-cols-2 lg:grid-cols-2 gap-6">
      
      {/* Main grid layout */}
      <div className="space-y-3 w-5/4">
         {/* Calendar section */}
          <div className="bg-white rounded-md shadow-md overflow-hidden">
            {/* Calendar Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
              <div className="flex items-start space-x-2">
                <button
                  onClick={() => navigateMonth('prev')}
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
                <h2 className="text-xl pt-1 font-semibold text-gray-800">
                  {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                </h2>
                <button
                  onClick={() => navigateMonth('next')}
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
              </div>
              <div className='flex gap-2'>
                <button
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                  Today
                </button>
                <button
                  onClick={() => setShowModal(true)}
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
                  className=" py-2 text-center text-xs font-medium text-gray-500 uppercase"
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
      </div>

        {/* Holiday List */}
        <div className=" w-3/4 ml-auto p-5 rounded-lg shadow bg-clip-padding backdrop-filter  backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 border">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold text-gray-900 ml-2" style={{ fontFamily: FONTS.header2.fontFamily, fontSize: FONTS.header2.fontSize, fontWeight: FONTS.header2.fontWeight }}>Holidays List</h5>
          </div>
          <div className="space-y-4">
            {holidays.length > 0 ? (
              holidays.map((holiday) => {
                // Ensure the date is properly formatted
                const holidayDate = new Date(holiday.date);
                const dayName = dayNames[holidayDate.getDay()];

                return (
                  <div
                    key={holiday.id}
                    className="flex items-center justify-between p-3 mb-2 bg-white rounded-md hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigateToDate(holidayDate)}
                  >
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{holiday.holiday}</p>
                        <p className="text-sm text-gray-500">
                          {holidayDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })} ({dayName})
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteEvent(holiday.id);
                      }}
                      className="px-4 py-2 text-red-500 rounded-md hover:text-red-700"
                      title="Delete holiday"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center py-4">No holidays found</p>
            )}
          </div>
        </div>


        {/* Add Event Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">Add New Holiday/Event</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    placeholder="Enter event title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full p-2 border rounded"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                  <select
                    className="w-full p-2 border rounded"
                    value={newEvent.color}
                    onChange={(e) => setNewEvent({ ...newEvent, color: e.target.value })}
                  >
                    <option value="bg-blue-500">Blue</option>
                    <option value="bg-green-500">Green</option>
                    <option value="bg-red-500">Red</option>
                    <option value="bg-purple-500">Purple</option>
                    <option value="bg-yellow-500">Yellow</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-sm rounded-md bg-gray-500 text-white hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addEvent}
                    className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Add Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Leave;