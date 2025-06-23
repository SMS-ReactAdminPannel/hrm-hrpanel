const VisitorDetailsModal = ({ visitor, onClose, delVisitor }: { visitor: any; onClose: () => void; delVisitor: (id: string) => void }) => (
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
        <div className="flex gap-2">
          <button className="bg-[#006666] text-white px-4 py-1 rounded-md">Edit</button>
          <button
            className="bg-red-700 text-white px-4 py-1 rounded-md"
            onClick={() => {
              delVisitor(visitor._id);
              onClose();
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 text-gray-700">
        <div className="flex items-center gap-2"><span>Phone: {visitor.phoneNumber}</span></div>
        {visitor.email && <div className="flex items-center gap-2"><span>Email: {visitor.email}</span></div>}
        <div className="flex items-center gap-2"><span>Purpose of Visit: {visitor.purposeOfVisit}</span></div>
        <div className="flex items-center gap-2">
          <span>
            Visited Date:{' '}
            {new Date(visitor.visitDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
        <div className="flex items-center gap-2"><span>Check In: {visitor.checkInTime}</span></div>
        {visitor.checkOutTime && <div className="flex items-center gap-2"><span>Check Out: {visitor.checkOutTime}</span></div>}
      </div>
      {visitor.remarks && <p className="text-gray-600"><strong>Remarks:</strong> {visitor.remarks}</p>}
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

export default VisitorDetailsModal;
