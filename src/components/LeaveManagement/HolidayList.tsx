import React from 'react';
import type { Customer } from './types';
import { FONTS } from '../../constants/uiConstants';

interface HolidayListProps {
  holidays: any[];
  onNavigateToDate: (date: Date) => void;
  onDeleteEvent: (id: string) => void;
}

const HolidayList: React.FC<HolidayListProps> = ({
  holidays,
  onNavigateToDate,
  onDeleteEvent
}) => {
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="w-3/4 ml-auto p-5 rounded-lg shadow bg-white">
      <div className="flex items-center justify-between mb-4">
        <h5 
          className="text-xl font-bold !text-gray-900 ml-2" 
          
          style={{...FONTS.header3}}
        >
          Holidays List
        </h5>
      </div>
      <div className="space-y-4">
        {holidays.length > 0 ? (
          holidays.map((holiday) => {
            const holidayDate = new Date(holiday.holiday_date);
            const dayName = dayNames[holidayDate.getDay()];
            
            return (
              <div 
                key={holiday.id} 
                className="flex items-center justify-between p-3 border-b-2 border-gray-200 hover:bg-gray-100 cursor-pointer"
                onClick={() => onNavigateToDate(holidayDate)}
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="text-xl font-semibold text-gray-900 " style={{fontFamily: FONTS.header.fontFamily}}>{holiday.holiday_name}</p>
                    <p className="text-sm font-semibold text-gray-900" style={{fontFamily: FONTS.paragraph.fontFamily}}>{holiday.holiday_type}</p>
                    <p className="text-sm text-gray-500">
                      {holiday.holiday_date}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteEvent(holiday.uuid);
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
  );
};

export default HolidayList;