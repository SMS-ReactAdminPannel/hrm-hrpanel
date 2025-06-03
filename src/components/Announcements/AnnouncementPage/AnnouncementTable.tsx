import { Pencil, Trash2 } from "lucide-react";

type Announcement = {
  title: string;
  startDate: string;
  endDate: string;
  description: string;
};

type AnnouncementTableProps = {
  data: Announcement[];
  onEdit: (announcement: Announcement, index: number) => void;
  onDelete: (index: number) => void;
};

const AnnouncementTable = ({ data, onEdit, onDelete }: AnnouncementTableProps) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow my-6">
      <table className="min-w-full table-fixed border-collapse border border-gray-300 text-sm bg-white">
        <thead className="bg-gradient-to-r from-slate-800 to-teal-700 text-white">
          <tr>
            <th className="w-40 px-6 py-3 text-left">Title</th>
            <th className="w-36 px-6 py-3 text-left">Start Date</th>
            <th className="w-36 px-6 py-3 text-left">End Date</th>
            <th className="w-[30rem] px-6 py-3 text-left">Description</th>
            <th className="w-28 px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className="border-b border-slate-200/70 hover:bg-green-200 transition-all duration-200"
            >
              <td className="px-6 py-4 font-medium text-gray-700 break-words whitespace-normal">
                {item.title}
              </td>
              <td className="px-6 py-4 text-gray-600">{item.startDate}</td>
              <td className="px-6 py-4 text-gray-600">{item.endDate}</td>
              <td className="px-6 py-4 text-gray-600 break-words whitespace-normal">
                {item.description}
              </td>
              <td className="px-6 py-4 text-center">
                <div className="flex justify-center gap-3">
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                    onClick={() => onEdit(item, index)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-800" 
                    title="Delete"
                    onClick={()=>onDelete(index)}
                    >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default AnnouncementTable;
