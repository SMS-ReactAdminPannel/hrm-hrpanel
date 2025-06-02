import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import { MdTimer } from "react-icons/md"
import { IoSettingsSharp } from "react-icons/io5";
import { PiBowlSteamFill } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";



const EmployeeDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // employee data passed via state
  const employee = location.state?.employee;

  if (!employee) {
    return (
      <div className="p-6 text-center">
        <p>No employee selected.</p>
        <button onClick={() => navigate(-1)} className="mt-4 underline text-blue-600">Go Back</button>
      </div>
    );
  }

  return (
   <div className="p-6 space-y-6 min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-100">
     <div className="justify-end"><button
        onClick={() => navigate(-1)}
        className="mb-4 text-gray-500 hover:text-red-500 "
      >
        <MdKeyboardBackspace size={28} />
      </button></div>
       <div><p className="font-bold">Employee Attendance</p></div>
     <div className="flex gap-6 mt-4">
              {/**/}
              <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-xl">Total Completed project</p>
                  <p>2</p> 
                </div>
                <IoSettingsSharp  className="w-10 h-10 text-green-600" />
              </div>
                <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-xl">Total Worked Duration</p>
                  <p>48Hrs:40mins</p>
                  
                </div>
                <MdTimer className="w-10 h-10 text-green-600" />
              </div>
                <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-xl">Total Brake Time</p>
                  <p>5Hrs</p>
                  
                </div>
                <PiBowlSteamFill  className="w-10 h-10 text-yellow-600" />
              </div>
              <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-200 flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-xl">Total Leave</p>
                  <p className="text-2xl font-bold text-slate-800">4</p>
                </div>
                <CgProfile  className="w-10 h-10 text-red-600" />
              </div>
              
            </div>
   
        <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow-lg mt-10">
    <h2 className="text-3xl font-bold mb-4">{employee.Name}</h2>
      <p><strong>ID:</strong> {employee.ID}</p>
      <p><strong>Designation:</strong> {employee.Designation}</p>
      <p><strong>Status:</strong> {employee.Status}</p>
      <p><strong>Check In:</strong> {employee.CheckIn}</p>
      <p><strong>Check Out:</strong> {employee.CheckOut}</p>
      <p><strong>Duration:</strong> {employee.Duration}</p>
    </div>
</div>
  );
};

export default EmployeeDetails;
