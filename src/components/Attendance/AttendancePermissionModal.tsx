interface Person {
  id: string;
  name: string;
  email: string;
  status: "approved" | "pending";
}

interface AttendancePermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  dummyData: Person[];
}

export const AttendancePermissionModal: React.FC<AttendancePermissionModalProps> = ({
  isOpen,
  onClose,
  dummyData,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl mx-4 animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-[#006666]">Permission Requests</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-100">
          {dummyData.map((person) => (
            <div key={person.id} className="py-4 first:pt-0">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{person.name}</p>
                  <p className="text-sm text-gray-500">{person.email}</p>
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-1 rounded-full capitalize ${
                    person.status === "approved"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                  }`}
                >
                  {person.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#006666] text-white rounded-lg hover:bg-[#005555] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
