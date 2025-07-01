import { useState, useEffect } from 'react';

function DateInput() {
  const [selectedDate, setSelectedDate] = useState('');
  const [displayDate, setDisplayDate] = useState('');

  useEffect(() => {
    if (selectedDate) {
      const date = new Date(selectedDate);
      const day = date.getDate().toString().padStart(2, '0');
      const month = date.toLocaleString('default', { month: 'short' });
      const year = date.getFullYear();
      setDisplayDate(`${day}-${month}-${year}`);
    } else {
      setDisplayDate('');
    }
  }, [selectedDate]);

  return (
    <div className="mt-4 ml-4">
      <input
        type="date"
        className={`flex items-center gap-2 px-3 py-2 border rounded-md text-sm text-white transition-colors duration-200 h-8 focus:ring-2 focus:ring-gray-300 ${
          selectedDate
            ? "border-gray-300 bg-transparent backdrop-blur-xl bg-white/10"
            : "border-gray-300 bg-transparent backdrop-blur-xl bg-white/10 hover:bg-gray-500/10"
        }`}
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      {selectedDate && (
        <div className="mt-2 text-white">
          Display format: {displayDate}
        </div>
      )}
    </div>
  );
}