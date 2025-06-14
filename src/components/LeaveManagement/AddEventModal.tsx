import React, { useState } from 'react';

interface AddEventModalProps {
  onClose: () => void;
  onAddEvent: (eventData: { title: string; date: string; color: string }) => void;
}

const AddEventModal: React.FC<AddEventModalProps> = ({ onClose, onAddEvent }) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: new Date().toISOString().split('T')[0],
    color: 'bg-blue-500'
  });

  const handleSubmit = () => {
    onAddEvent(newEvent);
    setNewEvent({
      title: '',
      date: new Date().toISOString().split('T')[0],
      color: 'bg-blue-500'
    });
  };

  return (
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
              onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
              placeholder="Enter event title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <input
              type="date"
              className="w-full p-2 border rounded"
              value={newEvent.date}
              onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <select
              className="w-full p-2 border rounded"
              value={newEvent.color}
              onChange={(e) => setNewEvent({...newEvent, color: e.target.value})}
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
              onClick={onClose}
              className="px-4 py-2 text-sm rounded-md bg-gray-500 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Add Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEventModal;