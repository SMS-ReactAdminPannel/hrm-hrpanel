// import React, { useState, useEffect } from 'react';
// import { Clock, CheckCircle, User, Building, Phone, Mail, Calendar } from 'lucide-react';
// import { getVisitors } from '../../features/VisitorsManagement/service';

// // Types
// // interface Visitor {
// //   id: number;
// //   name: string;
// //   phone: string;
// //   email?: string;
// //   company?: string;
// //   host: string;
// //   department?: string;
// //   purpose: string;
// //   notes?: string;
// //   checkIn: Date;
// //   checkOut?: Date;
// // }

// // interface VisitorFormData {
// //   name: string;
// //   phone: string;
// //   email: string;
// //   company: string;
// //   host: string;
// //   department: string;
// //   purpose: string;
// //   notes: string;
// // }

// const VisitorManagementSystem: React.FC = () => {
//   const [visitors, setVisitors] = useState<Visitor[]>([]);
//   const [visitHistory, setVisitHistory] = useState<Visitor[]>([]);
//   const [historySearch, setHistorySearch] = useState('');
//   const [dateFrom, setDateFrom] = useState('');
//   const [dateTo, setDateTo] = useState('');
//   const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
//   const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
//   const [showAddForm, setShowAddForm] = useState(false);

//   console.log(visitors,"visitorsssssssssssssssssssssssss")

//   const [formData, setFormData] = useState({
//     name: '',
//     phone: '',
//     email: '',
//     company: '',
//     host: '',
//     department: '',
//     purpose: '',
//     notes: '',
//     attachment: null, // added for file
//   });


//   useEffect(() => {
//     const sampleHistory: Visitor[] = [
//       {
//         id: 1,
//         name: "John Smith",
//         phone: "+1-555-0123",
//         email: "john.smith@email.com",
//         company: "Tech Solutions Inc",
//         host: "Sarah Johnson",
//         department: "HR",
//         purpose: "Interview",
//         checkIn: new Date(Date.now() - 86400000),
//         checkOut: new Date(Date.now() - 82800000),
//         notes: "Software developer interview"
//       },
//       {
//         id: 2,
//         name: "Maria Garcia",
//         phone: "+1-555-0124",
//         email: "maria.garcia@email.com",
//         company: "ABC Corp",
//         host: "Mike Davis",
//         department: "Sales",
//         purpose: "Meeting",
//         checkIn: new Date(Date.now() - 7200000),
//         checkOut: new Date(Date.now() - 3600000),
//         notes: "Quarterly review meeting"
//       }
//     ];
//     setVisitHistory(sampleHistory);
//   }, []);

//   useEffect(() => {
//     if (alert) {
//       const timer = setTimeout(() => setAlert(null), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [alert]);

//   const fetchVisitors = async () => {
//     try {
//       const response: any = await getVisitors({}); // Assuming getVisitors is defined in your service file
//       console.log("API Response:", response.data);

//       const visitors = response?.data ?? []; 
//       setVisitors(visitors);
//     } catch (error) {
//       console.error("Error fetching grievances:", error);
//     }
//   };

//     useEffect(() => {
//      fetchVisitors();
//    }, []);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setFormData({ ...formData, attachment: file });
//   };


//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleAddVisitor = () => {
//     const newVisitor: Visitor = {
//       id: Date.now(),
//       name: formData.name,
//       phone: formData.phone,
//       email: formData.email,
//       company: formData.company,
//       host: formData.host,
//       department: formData.department,
//       purpose: formData.purpose,
//       notes: formData.notes,
//       checkIn: new Date()
//     };

//     setVisitors(prev => [...prev, newVisitor]);
//     setShowAddForm(false);
//     setAlert({ message: 'Visitor added successfully!', type: 'success' });
//     setFormData({
//       name: '',
//       phone: '',
//       email: '',
//       company: '',
//       host: '',
//       department: '',
//       purpose: '',
//       notes: '',
//       attachment: null
//     });
//   };

//   const checkOut = (visitorId: number) => {
//     const visitor = visitors.find(v => v.id === visitorId);
//     if (visitor) {
//       const updatedVisitor = { ...visitor, checkOut: new Date() };
//       setVisitHistory(prev => [...prev, updatedVisitor]);
//       setVisitors(prev => prev.filter(v => v.id !== visitorId));
//       setAlert({ message: 'Visitor checked out successfully!', type: 'success' });
//     }
//   };

//   const getFilteredHistory = (): Visitor[] => {
//     let filtered = [...visitHistory];

//     if (dateFrom) {
//       filtered = filtered.filter(visit => visit.checkIn >= new Date(dateFrom));
//     }

//     if (dateTo) {
//       const endDate = new Date(dateTo);
//       endDate.setHours(23, 59, 59);
//       filtered = filtered.filter(visit => visit.checkIn <= endDate);
//     }

//     if (historySearch) {
//       const search = historySearch.toLowerCase();
//       filtered = filtered.filter(visit =>
//         visit.name.toLowerCase().includes(search) ||
//         visit.company?.toLowerCase().includes(search) ||
//         visit.host.toLowerCase().includes(search) ||
//         visit.purpose.toLowerCase().includes(search)
//       );
//     }

//     return filtered.sort((a, b) => b.checkIn.getTime() - a.checkIn.getTime());
//   };

//   const formatDuration = (checkIn: Date, checkOut?: Date): string => {
//     if (!checkOut) return 'In progress';
//     const duration = Math.round((checkOut.getTime() - checkIn.getTime()) / (1000 * 60));
//     return `${duration} minutes`;
//   };

//   const VisitorCard: React.FC<{ visitor: Visitor }> = ({ visitor }) => (
//     <div
//       onClick={() => setSelectedVisitor(visitor)}
//       className="bg-white w-full rounded-md p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
//     >
//       <div className="flex justify-between items-start mb-4">
//         <h3 className="text-xl font-semibold text-gray-800">{visitor.name}</h3>
//         <span className={`px-3 py-1 rounded-full text-sm font-medium ${visitor.checkOut ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
//           {visitor.checkOut ? 'Completed' : 'Checked In'}
//         </span>
//       </div>

//       {visitor.company && (
//         <div className="flex items-center gap-2 text-gray-600 mb-2">
//           <Building className="w-4 h-4" />
//           <span>{visitor.company}</span>
//         </div>
//       )}
//     </div>
//   );

//   const VisitorDetailsModal: React.FC<{ visitor: Visitor; onClose: () => void }> = ({ visitor, onClose }) => {
//     const [editMode, setEditMode] = useState(false);
//     const [editableVisitor, setEditableVisitor] = useState({ ...visitor });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//       const { name, value } = e.target;
//       setEditableVisitor(prev => ({ ...prev, [name]: value }));
//     };

//     const handleSave = () => {
//       setVisitHistory(prev =>
//         prev.map(v => (v.id === editableVisitor.id ? { ...editableVisitor, checkIn: new Date(editableVisitor.checkIn), checkOut: editableVisitor.checkOut ? new Date(editableVisitor.checkOut) : undefined } : v))
//       );
//       setAlert({ message: 'Visitor details updated successfully!', type: 'success' });
//       setEditMode(false);
//       onClose();
//     };

//     return (
//       <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur">
//         <div className="bg-white pt-12 rounded-lg w-full max-w-xl p-6 shadow-xl relative">
//           <button onClick={onClose} className="absolute top-2 right-4 hover:bg-[#e6fffa] px-2 rounded-md text-gray-400 hover:text-gray-700 text-xl">✕</button>
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-3xl font-bold text-gray-800">{editableVisitor.name}</h2>
//             <button onClick={() => setEditMode(prev => !prev)} className="px-6 py-1 rounded-md bg-[#006666] text-white ">
//               {editMode ? 'Cancel' : 'Edit'}
//             </button>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-gray-700">
//             <div className="flex items-center gap-2">
//               <Phone className="w-4 h-4" />
//               {editMode ? (
//                 <input
//                   name="phone"
//                   value={editableVisitor.phone}
//                   onChange={handleChange}
//                   className="border px-2 py-1 rounded w-full"
//                 />
//               ) : (
//                 <span>{editableVisitor.phone}</span>
//               )}
//             </div>

//             {editableVisitor.email && (
//               <div className="flex items-center gap-2">
//                 <Mail className="w-4 h-4" />
//                 {editMode ? (
//                   <input
//                     name="email"
//                     value={editableVisitor.email}
//                     onChange={handleChange}
//                     className="border px-2 py-1 rounded w-full"
//                   />
//                 ) : (
//                   <span>{editableVisitor.email}</span>
//                 )}
//               </div>
//             )}

//             <div className="flex items-center gap-2">
//               <User className="w-4 h-4" />
//               {editMode ? (
//                 <input
//                   name="host"
//                   value={editableVisitor.host}
//                   onChange={handleChange}
//                   className="border px-2 py-1 rounded w-full"
//                 />
//               ) : (
//                 <span>Host: {editableVisitor.host}</span>
//               )}
//             </div>

//             {editableVisitor.department && (
//               <div className="flex items-center gap-2">
//                 {editMode ? (
//                   <input
//                     name="department"
//                     value={editableVisitor.department}
//                     onChange={handleChange}
//                     className="border px-2 py-1 rounded w-full"
//                   />
//                 ) : (
//                   <span>Dept: {editableVisitor.department}</span>
//                 )}
//               </div>
//             )}

//             <div className="flex items-center gap-2">
//               {editMode ? (
//                 <input
//                   name="purpose"
//                   value={editableVisitor.purpose}
//                   onChange={handleChange}
//                   className="border px-2 py-1 rounded w-full"
//                 />
//               ) : (
//                 <span>Purpose: {editableVisitor.purpose}</span>
//               )}
//             </div>

//             <div className="flex items-center gap-2">
//               <Calendar className="w-4 h-4" />
//               <span>{new Date(editableVisitor.checkIn).toLocaleString()}</span>
//             </div>

//             {editableVisitor.checkOut && (
//               <div className="flex items-center gap-2">
//                 <Clock className="w-4 h-4" />
//                 <span>Duration: {formatDuration(new Date(editableVisitor.checkIn), new Date(editableVisitor.checkOut))}</span>
//               </div>
//             )}
//           </div>

//           {editMode ? (
//             <textarea
//               name="notes"
//               value={editableVisitor.notes || ''}
//               onChange={handleChange}
//               className="border px-3 py-2 rounded w-full mb-4"
//               placeholder="Notes"
//             />
//           ) : (
//             editableVisitor.notes && (
//               <div className="border-t pt-4">
//                 <p className="text-gray-600"><strong>Notes:</strong> {editableVisitor.notes}</p>
//               </div>
//             )
//           )}

//           {editMode && (
//             <button
//               onClick={handleSave}
//               className="mt-4 bg-[#006666] text-white px-4 py-2 rounded float-right"
//             >
//               Save Changes
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   };


//   return (
//     <div className="min-h-screen bg-gradient-to-br to-blue-800">
//       <div className="mx-auto">
//         {alert && (
//           <div className={`mb-6 p-4 rounded-lg font-medium ${alert.type === 'success'
//             ? 'bg-green-100 text-green-800 border border-green-200'
//             : 'bg-red-100 text-red-800 border border-red-200'
//             }`}>
//             {alert.message}
//           </div>
//         )}

//         <div className="rounded-lg pb-10">
//           <div className='grid py-4 px-6'>
//             <h2 className="text-2xl font-bold text-gray-800 mb-6">Visit History</h2>

//             <div className="flex items-center justify-between">
//               <div className="grid md:grid-cols-3 gap-4 mb-6">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">From Date</label>
//                   <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-200 rounded-md" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">To Date</label>
//                   <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} className="w-full px-4 py-2 border-2 border-gray-200 rounded-md" />
//                 </div>
//               </div>

//               <div className='flex item-center gap-3 ml-auto'>
//                 <button onClick={() => setShowAddForm(true)} className='bg-[#006666] text-white px-4 rounded-md'>+ Add Visitor</button>
//                 <div className="relative">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                     </svg>
//                   </div>
//                   <input
//                     type="text"
//                     placeholder="Search Here..."
//                     value={historySearch}
//                     onChange={(e) => setHistorySearch(e.target.value)}
//                     className="p-2 pl-10 border border-gray-300 rounded-md bg-white"
//                   />
//                 </div>
//               </div>
//             </div>

//             {showAddForm && (
//               <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="bg-white rounded-lg w-full max-w-2xl p-6 shadow-xl relative">
//                   <button onClick={() => setShowAddForm(false)} className="absolute top-2 right-4 text-xl text-gray-600 hover:text-black">✕</button>
//                   <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Visitor</h2>
//                   <form className="grid grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); handleAddVisitor(); }}>
//                     <input name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} className="border px-3 py-2 rounded" />
//                     <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="border px-3 py-2 rounded" />
//                     <input name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="border px-3 py-2 rounded" />
//                     <input name="company" placeholder="Company" value={formData.company} onChange={handleInputChange} className="border px-3 py-2 rounded" />
//                     <input name="host" placeholder="Host" value={formData.host} onChange={handleInputChange} className="border px-3 py-2 rounded" />
//                     <input name="department" placeholder="Department" value={formData.department} onChange={handleInputChange} className="border px-3 py-2 rounded" />
//                     <select name="purpose" value={formData.purpose} onChange={handleInputChange} className="border px-3 py-2 rounded">
//                       <option value="">Purpose of Visit</option>
//                       <option value="Interview">Interview</option>
//                       <option value="Meeting">Meeting</option>
//                       <option value="Delivery">Delivery</option>
//                       <option value="Maintenance">Maintenance</option>
//                       <option value="Personal">Personal</option>
//                       <option value="Other">Other</option>
//                     </select>
//                     <textarea name="notes" placeholder="Remarks" value={formData.notes} onChange={handleInputChange} className="border px-3 py-2 rounded" />

//                     {/* File input field */}
//                     <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">Submit Document</label>
//                     <input
//                       type="file"
//                       name="attachment"
//                       onChange={handleFileChange}
//                       className="border px-3 py-2 rounded"
//                     />
//                     </div>

//                     <button type="submit" className="bg-[#006666] text-white px-4 py-2 rounded col-span-2">Submit</button>
//                   </form>
//                 </div>
//               </div>
//             )}

//             <div className="flex gap-4">
//               {getFilteredHistory().length === 0 ? (
//                 <div className="text-center py-12 m-auto bg-white w-1/2 rounded-md">
//                   <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//                   <h3 className="text-xl font-semibold text-gray-500 mb-2">No visit history found</h3>
//                   <p className="text-gray-400">Visit records will appear here</p>
//                 </div>
//               ) : (
//                 getFilteredHistory().map(visitor => (
// <VisitorCard key={visitor.id} visitor={visitor} />
//                 ))
//               )}
//             </div>
//           </div>
//         </div>

//         {selectedVisitor && (
//           <VisitorDetailsModal
//             visitor={selectedVisitor}
//             onClose={() => setSelectedVisitor(null)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default VisitorManagementSystem;



///////////////////Startted Building new


import { useEffect, useState } from 'react'
import { getVisitors } from '../../features/VisitorsManagement/service';
import { Building } from 'lucide-react';

const VisitorManagement = () => {

  const [visitors, setVisitors] = useState([]);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Add formData state for the add visitor form
const [formData, setFormData] = useState<{
  fullName: string;
  phoneNumber: string;
  email: string;
  company: string;
  host: string;
  purposeOfVisit: string;
  remarks: string;
  checkInTime: string;
  checkOutTime: string;
  attachment: File | null;
}>({
  fullName: '',
  phoneNumber: '',
  email: '',
  company: '',
  host: '',
  purposeOfVisit: '',
  remarks: '',
  checkInTime: '',
  checkOutTime: '',
  attachment: null,
});

  // Handle input changes for text, select, and textarea fields
  const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};


  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      attachment: file || null,
    }));
  };
  



  const fetchVisitors = async () => {
    try {
      const response: any = await getVisitors({});
      console.log("API Response:", response.data);

      const visitors = response?.data ?? [];
      setVisitors(visitors.data);
    } catch (error) {
      console.error("Error fetching grievances:", error);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);




  const VisitorCard = ({ visitor }: { visitor: any }) => (
    <div
      className="bg-white w-full rounded-md p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
      onClick={() => setSelectedVisitor(visitor)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{visitor.fullName}</h3>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${visitor.checkOutTime ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
          {visitor.checkOutTime ? 'Completed' : 'Checked In'}
        </span>
      </div>

      {visitor.company && (
        <div className="flex items-center gap-2 text-gray-600 mb-2">
          <Building className="w-4 h-4" />
          <span>{visitor.company}</span>
        </div>
      )}
    </div>
  );

  const VisitorDetailsModal = ({ visitor, onClose }: { visitor: any; onClose: () => void }) => {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur">
        <div className="bg-white pt-12 rounded-lg w-full max-w-xl p-6 shadow-xl relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-4 hover:bg-[#e6fffa] px-2 rounded-md text-gray-400 hover:text-gray-700 text-xl"
          >
            ✕
          </button>

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-gray-800">{visitor.fullName}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-gray-700">
            <div className="flex items-center gap-2">
              <span>Phone: {visitor.phoneNumber}</span>
            </div>

            {visitor.email && (
              <div className="flex items-center gap-2">
                <span>Email: {visitor.email}</span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <span>Purpose of Visit: {visitor.purposeOfVisit}</span>
            </div>

            <div className="flex items-center gap-2">
              <span>
                Visited Date:{' '}
                {new Date(visitor.visitDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span>Check In: {visitor.checkInTime}</span>
            </div>

            {visitor.checkOutTime && (
              <div className="flex items-center gap-2">
                <span>Check Out: {visitor.checkOutTime}</span>
              </div>
            )}
          </div>

          {visitor.remarks && (
            <p className=" text-gray-600">
              <strong>Remarks:</strong> {visitor.remarks}
            </p>
          )}

          <div className="mt-6 border-t pt-4">
            <h4 className="text-lg font-semibold text-gray-800 mb-2">Attachment</h4>
            <div className="bg-gray-50 p-4 border rounded-md">
              <a
                href={visitor.attachment}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Attachment
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div>

      <div className="rounded-lg pb-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Visit History</h2>

        <div className="flex items-center justify-between">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">From Date</label>
              <input type="date" className="w-full px-4 py-2 border-2 border-gray-200 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">To Date</label>
              <input type="date" className="w-full px-4 py-2 border-2 border-gray-200 rounded-md" />
            </div>
          </div>

          <div className='flex item-center gap-3 ml-auto'>
            <button onClick={() => setShowAddForm(true)} className='bg-[#006666] text-white px-4 rounded-md'>+ Add Visitor</button>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search Here..."
                value={""}
                className="p-2 pl-10 border border-gray-300 rounded-md bg-white"
              />
            </div>
          </div>
        </div>


        <div className="grid grid-cols-2 gap-4">
          {visitors.length === 0 ? (
            <div className="text-center py-12 m-auto bg-white w-1/2 m-auto rounded-md" onClick={() => setSelectedVisitor(null)}>
              <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No visit history found</h3>
              <p className="text-gray-400">Visit records will appear here</p>
            </div>
          ) : (
            visitors?.map((visitor: any) => (
              <VisitorCard key={visitor.id} visitor={visitor} />
            ))
          )}

        </div>




      </div>



      {selectedVisitor && (
        <VisitorDetailsModal
          visitor={selectedVisitor}
          onClose={() => setSelectedVisitor(null)}
        />
      )}


      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 shadow-xl relative">
            <button onClick={() => setShowAddForm(false)} className="absolute top-2 right-4 text-xl text-gray-600 hover:text-black">✕</button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Visitor</h2>

            <form className="grid grid-cols-2 gap-4">
              <input name="name" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} className="border px-3 py-2 rounded" />
              <input name="phone" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} className="border px-3 py-2 rounded" />
              <input name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="border px-3 py-2 rounded" />
              <input name="company" placeholder="Company" value={formData.company} onChange={handleInputChange} className="border px-3 py-2 rounded" />
              <input name="host" placeholder="Host" value={formData.host} onChange={handleInputChange} className="border px-3 py-2 rounded" />

              <select name="purpose" value={formData.purposeOfVisit} onChange={handleInputChange} className="border px-3 py-2 rounded">
                <option value="">Purpose of Visit</option>
                <option value="Interview">Interview</option>
                <option value="Meeting">Meeting</option>
                <option value="Delivery">Delivery</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
              </select>

              <textarea name="notes" placeholder="Remarks" value={formData.remarks} onChange={handleInputChange} className="border px-3 py-2 rounded col-span-2" />

              {/* Check-in and Check-out time */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Check-In Time</label>
                <input
                  type="time"
                  name="checkInTime"
                  value={formData.checkInTime}
                  onChange={handleInputChange}
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Check-Out Time</label>
                <input
                  type="time"
                  name="checkOutTime"
                  value={formData.checkOutTime}
                  onChange={handleInputChange}
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

              {/* File input */}
              <div className="col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Submit Document</label>
                <input
                  type="file"
                  name="attachment"
                  onChange={handleFileChange}
                  className="border px-3 py-2 rounded w-full"
                />
              </div>

              <button type="submit" className="bg-[#006666] text-white px-4 py-2 rounded col-span-2">Submit</button>
            </form>
          </div>
        </div>
      )}


    </div>
  )
}

export default VisitorManagement