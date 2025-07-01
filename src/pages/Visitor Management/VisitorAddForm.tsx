import { useState } from "react";
import {FONTS} from "../../constants/uiConstants"

type AddVisitorFormProps = {
  onSubmit: (formData: FormData) => void;
  onClose: () => void;
};

const AddVisitorForm = ({ onSubmit, onClose }: AddVisitorFormProps) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    company: '',
    host: '',
    purposeOfVisit: '',
    remarks: '',
    checkInTime: '',
    checkOutTime: '',
    attachment: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, attachment: file }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = new FormData();
    const today = new Date();
    const visitDateStr = today.toISOString().split("T")[0];

    payload.append("fullName", formData.fullName);
    payload.append("phoneNumber", formData.phoneNumber);
    payload.append("email", formData.email);
    payload.append("company", formData.company);
    payload.append("host", formData.host);
    payload.append("purposeOfVisit", formData.purposeOfVisit);
    payload.append("remarks", formData.remarks);
    payload.append("visitDate", today.toISOString());

    if (formData.checkInTime) {
      payload.append("checkInTime", new Date(`${visitDateStr}T${formData.checkInTime}`).toISOString());
    }
    if (formData.checkOutTime) {
      payload.append("checkOutTime", new Date(`${visitDateStr}T${formData.checkOutTime}`).toISOString());
    }
    if (formData.attachment) {
      payload.append("attachment", formData.attachment);
    }

    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6 shadow-xl relative">
        <button onClick={onClose} className="absolute top-2 right-4 text-xl text-gray-600 hover:text-black">✕</button>
        <h2 className="text-2xl font-bold mb-4 !text-gray-800" style={{...FONTS.header}}>Add Visitor</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleInputChange} className="border px-3 py-2 rounded  !text-gray-700" style={{...FONTS.paragraph}}/>
          <input name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleInputChange} className="border px-3 py-2 rounded !text-gray-700"  style={{...FONTS.paragraph}} />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleInputChange} className="border px-3 py-2 rounded !text-gray-700"  style={{...FONTS.paragraph}} />
          <input name="company" placeholder="Company" value={formData.company} onChange={handleInputChange} className="border px-3 py-2 rounded !text-gray-700"  style={{...FONTS.paragraph}}/>
          <input name="host" placeholder="Host" value={formData.host} onChange={handleInputChange} className="border px-3 py-2 rounded !text-gray-700"  style={{...FONTS.paragraph}}/>
          <select title="purposeOfVisit" required name="purposeOfVisit" value={formData.purposeOfVisit} onChange={handleInputChange} className="border px-3 py-2 rounded !text-gray-700"  style={{...FONTS.paragraph}}>
            <option value="">Purpose of Visit</option>
            <option value="Interview">Interview</option>
            <option value="Meeting">Meeting</option>
            <option value="Delivery">Delivery</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Personal">Personal</option>
            <option value="Other">Other</option>
          </select>
          <textarea name="remarks" placeholder="Remarks" value={formData.remarks} onChange={handleInputChange} className="border px-3 py-2 rounded col-span-2 !text-gray-700" style={{...FONTS.paragraph}} />
          <div>
            <label className="block text-base font-bold text-gray-700 mb-1 !text-gray-800" style={{...FONTS.subParagraph}}>Check-In Time</label>
            <input title="chkIn" type="time" name="checkInTime" value={formData.checkInTime} onChange={handleInputChange} className="border px-3 py-2 rounded w-full !text-gray-700" style={{...FONTS.paragraph}} />
          </div>
          <div>
            <label className="block text-base font-bold text-gray-700 mb-1 !text-gray-800" style={{...FONTS.subParagraph}}>Check-Out Time</label>
            <input title="chkOut" type="time" name="checkOutTime" value={formData.checkOutTime} onChange={handleInputChange} className="border px-3 py-2 rounded w-full !text-gray-700" style={{...FONTS.paragraph}} />
          </div>
          <div className="col-span-2">
            <label className="block text-base font-bold text-gray-700 mb-2 !text-gray-800" style={{...FONTS.subParagraph}}>Submit Document</label>
            <input title="attachment" type="file" name="attachment" onChange={handleFileChange} className="border px-3 py-2 rounded w-full!text-gray-700" style={{...FONTS.paragraph}}/>
          </div>
          <button className="bg-[#006666] text-white px-4 py-2 rounded col-span-2" style={{...FONTS.button}}>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddVisitorForm;
