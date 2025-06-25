import { Pencil, Trash2 } from "lucide-react";
import { FONTS } from "../../../constants/uiConstants";

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
    <div className={`overflow-x-auto ${data.length === 0 ? "rounded-lg" : "rounded-xl"} shadow mt-6`}>
      <table className="min-w-full table-fixed border-collapse text-sm bg-white">
        <thead className="bg-[#006666] text-white"
         style={{
                            fontSize: FONTS.paragraph.fontSize
                            , fontFamily: FONTS.header.fontFamily
                      }}>
          <tr>
            <th className="w-40 px-6 py-3 text-left">Title</th>
            <th className="w-36 px-6 py-3 text-left">Start Date</th>
            <th className="w-36 px-6 py-3 text-left">End Date</th>
            <th className="w-[30rem] px-6 py-3 text-left">Description</th>
            <th className="w-28 px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-center py-6 text-gray-500 font-medium"
              >
                No announcements found.
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={index}
                className="border-b border-slate-200/70 hover:bg-[#dbdaec] transition-all duration-200"
                 style={{
                                    
                                     fontFamily: FONTS.header.fontFamily
                              }}
              >
                <td className="px-6 py-4 font-medium text-gray-700 break-words whitespace-normal"
                 style={{
                            fontSize: FONTS.paragraph.fontSize,
                            fontFamily: FONTS.header.fontFamily
                          }}>
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
                      onClick={() => onDelete(index)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AnnouncementTable;
