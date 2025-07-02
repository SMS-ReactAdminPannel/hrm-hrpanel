import  { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
import DatePicker from 'react-datepicker';


const AttendencePopPage = () => {
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [reminderOpen, setReminderOpen] = useState(false);
//   const [editorContent, setEditorContent] = useState('');

const [opencolour,setopencolour] = useState(false);

const handleopencolour =()=> {
    setopencolour(true);
}

const handlclosecolour =()=> {
    setopencolour(false);
}

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080', '#00CED1'];

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-6 relative">
     
      <div className="absolute top-3 right-4 text-blue-600 underline cursor-pointer"
      onClick ={handleopencolour}>
        choose colour '#FF0000'
      </div>

     
      <h2 className="text-2xl font-semibold mb-2">Card Title</h2>
      <hr className="border-t-4 border-gray-300 mb-4" />

      
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setShowPicker(!showPicker)}
      >
        Live Date
      </button>


      
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Give Time</label>
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Add Location Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Location</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>

      {/* Add Remind Button */}
      <div className="mb-4">
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={() => setReminderOpen(!reminderOpen)}
        >
          Add Remind
        </button>
      </div>

      {/* Bottom Slide Panel */}
      {reminderOpen && (
        <div className="fixed bottom-0 left-0 w-full bg-gray-100 p-6 shadow-xl transition-all">
          <h3 className="text-lg font-bold mb-2">Reminder Settings</h3>
          <p className="text-sm text-gray-600">Reminder data goes here...</p>
        </div>
      )}

      {/* Rich Text Editor */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Description</label>
        {/* <ReactQuill
          value={editorContent}
          onChange={setEditorContent}
          className="bg-white"
        /> */}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6">
        <button className="bg-gray-300 text-black px-4 py-2 rounded">
          Cancel
        </button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create
        </button>
      </div>
      {opencolour && (
        <div className="mt-2 bg-white shadow-md rounded-lg p-2 border w-40">
          <div className="grid grid-cols-3 gap-2">
            {colors.map((color, idx) => (
              <div
                key={idx}
                className="w-6 h-6 rounded cursor-pointer border"
                style={{ backgroundColor: color }}
                title={color}
                onClick={handlclosecolour}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendencePopPage;
