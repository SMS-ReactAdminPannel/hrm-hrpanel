// import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import DoughnutChart from './leaveChart';
import { useState, useEffect } from 'react';
import { FONTS } from '../../constants/uiConstants';
import Calendar from './Calendar';
import HolidayList from './HolidayList';
import AddEventModal from './AddEventModal';
import type { Customer, WorkEvent, DayData } from './types';

ChartJS.register(ArcElement, Tooltip, Legend);

const LeaveComponents = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [days, setDays] = useState<DayData[]>([]);
  const [events, setEvents] = useState<WorkEvent[]>([]);
  const [holidays, setHolidays] = useState<Customer[]>([]);
  const [showModal, setShowModal] = useState(false);

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

    const savedHolidays = localStorage.getItem('holidays');
    if (savedHolidays) {
      const parsedHolidays = JSON.parse(savedHolidays).map((holiday: any) => ({
        ...holiday,
        date: new Date(holiday.date)
      }));
      setHolidays(parsedHolidays);
    } else {
      const sampleHolidays: Customer[] = [
        {
          id: "1",
          date: new Date(2025, 0, 14),
          day: "Tuesday",
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
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevMonthDays = firstDay.getDay();
    const nextMonthDays = 6 - lastDay.getDay();
    const daysArray: DayData[] = [];

    const allEvents = [
      ...events,
      ...holidays.map(h => ({
        id: h.id,
        title: h.holiday,
        date: h.date,
        color: 'bg-red-500'
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

  const addEvent = (eventData: { title: string; date: string; color: string }) => {
    if (!eventData.title.trim()) {
      alert('Please enter a title for the event');
      return;
    }

    const [year, month, day] = eventData.date.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = dayNames[dateObj.getDay()];
    
    const newId = `event-${Date.now()}`;
    
    const newCalendarEvent: WorkEvent = {
      id: newId,
      title: eventData.title,
      date: dateObj,
      color: eventData.color
    };
    
    const updatedEvents = [...events, newCalendarEvent];
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));
    
    const newHoliday: Customer = {
      id: newId,
      date: dateObj,
      day: dayName,
      avatar: "/docs/images/people/profile-picture-5.jpg",
      holiday: eventData.title
    };
    
    const updatedHolidays = [...holidays, newHoliday];
    setHolidays(updatedHolidays);
    localStorage.setItem('holidays', JSON.stringify(updatedHolidays));
    
    setShowModal(false);
  };

  const deleteEvent = (id: string) => {
    const updatedEvents = events.filter(event => event.id !== id);
    setEvents(updatedEvents);
    localStorage.setItem('calendarEvents', JSON.stringify(updatedEvents));

    const updatedHolidays = holidays.filter(holiday => holiday.id !== id);
    setHolidays(updatedHolidays);
    localStorage.setItem('holidays', JSON.stringify(updatedHolidays));
  };

  const navigateToDate = (date: Date) => {
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
  };

  return (
    <div>
      <div className='pb-4 py-4'>
        <h1 className="font-bold" style={FONTS.header}>Leave</h1>
      </div>
      <div className="container flex mx-auto grid grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="space-y-3 w-5/4">
          {/* Charts row */}

          <Calendar
            currentMonth={currentMonth}
            days={days}
            onNavigateMonth={navigateMonth}
            onSetCurrentMonth={setCurrentMonth}
            onShowModal={() => setShowModal(true)}
          
          />
        </div>

        <HolidayList
          holidays={holidays}
          onNavigateToDate={navigateToDate}
          onDeleteEvent={deleteEvent}
        />

        {showModal && (
          <AddEventModal
            onClose={() => setShowModal(false)}
            onAddEvent={addEvent}
          />
        )}
      </div>
    </div>
  );
};

export default LeaveComponents;