import { Building } from "lucide-react";

const VisitorCard = ({ visitor, onClick }: { visitor: any; onClick: () => void }) => (
  <div
    className="bg-white w-full rounded-md p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
    onClick={onClick}
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

export default VisitorCard;