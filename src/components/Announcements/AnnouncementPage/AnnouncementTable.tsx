import { Pencil, Trash2 } from "lucide-react";
import { FONTS } from "../../../constants/uiConstants";
import { useEffect, useState } from "react";
import { AnnouncementGetAll } from "../../../features/announcement/services"

type AnnouncementType = {
  title_name: string;
  start_date: string;
  end_date: string;
  description: string;
};

type AnnouncementTableProps = {
  // data: AnnouncementType[];
  onEdit: (announcement: AnnouncementType, index: number) => void;
  onDelete: (index: number) => void;
};

const AnnouncementTable = ({ onEdit, onDelete }: AnnouncementTableProps) => {

  const [announcement, setannouncement] = useState<AnnouncementType[]>([]);
  

    const fetchannouncement = async () => {
      try {
        const response: any = await AnnouncementGetAll();
        console.log("API Response:", response.data);
  
        const visitors = response?.data ?? [];
        setannouncement(visitors.data);
      } catch (error) {
        console.error("Error fetching Announcement:", error);
      }
    };
  
    useEffect(() => {
      fetchannouncement();
    }, []);



  return (
    // <div className={`overflow-x-auto ${data.length === 0 ? "rounded-lg" : "rounded-xl"} shadow mt-6`}>
    //   <table className="min-w-full table-fixed border-collapse text-sm bg-white">
    //     <thead className="bg-[#5e59a9]/70 backdrop-blur-sm text-white"
    //      style={{
    //                         fontSize: FONTS.paragraph.fontSize
    //                         , fontFamily: FONTS.header.fontFamily
    //                   }}>
    //       <tr>
    //         <th className="w-40 px-6 py-3 text-left">Title</th>
    //         <th className="w-36 px-6 py-3 text-left">Start Date</th>
    //         <th className="w-36 px-6 py-3 text-left">End Date</th>
    //         <th className="w-[30rem] px-6 py-3 text-left">Description</th>
    //         <th className="w-28 px-6 py-3 text-center">Action</th>
    //       </tr>
    //     </thead>
    //     <tbody className="bg-white/45 backdrop-blur divide-y divide-gray-100">
    //       {data.length === 0 ? (
    //         <tr>
    //           <td
    //             colSpan={5}
    //             className="text-center py-6 text-gray-500 font-medium"
    //           >
    //             No announcements found.
    //           </td>
    //         </tr>
    //       ) : (
    //         data.map((item, index) => (
    //           <tr
    //             key={index}
    //             className="hover:bg-white/70 hover:backdrop-blur-sm cursor-pointer transition duration-200"
    //              style={{
                                    
    //                                  fontFamily: FONTS.header.fontFamily
    //                           }}
    //           >
    //             <td className="px-6 py-4 font-medium text-gray-700 break-words whitespace-normal"
    //              style={{
    //                         fontSize: FONTS.paragraph.fontSize,
    //                         fontFamily: FONTS.header.fontFamily
    //                       }}>
    //               {index.title || "no title"}
    //             </td>
    //             <td className="px-6 py-4 text-gray-600">{item.startDate || "no startdate"}</td>
    //             <td className="px-6 py-4 text-gray-600">{item.endDate || "no enddate"}</td>
    //             <td className="px-6 py-4 text-gray-600 break-words whitespace-normal">
    //               {item.description || "no description"}
    //             </td>
    //             <td className="px-6 py-4 text-center">
    //               <div className="flex justify-center gap-3">
    //                 <button
    //                   className="text-blue-600 hover:text-blue-800"
    //                   title="Edit"
    //                   onClick={() => onEdit(item, index)}
    //                 >
    //                   <Pencil size={16} />
    //                 </button>
    //                 <button
    //                   className="text-red-600 hover:text-red-800"
    //                   title="Delete"
    //                   onClick={() => onDelete(index)}
    //                 >
    //                   <Trash2 size={16} />
    //                 </button>
    //               </div>
    //             </td>
    //           </tr>
    //         ))
    //       )}
    //     </tbody>
    //   </table>
    // </div>
    <div className={`overflow-x-auto ${announcement.length === 0 ? "rounded-lg" : "rounded-xl"} shadow mt-6`}>
      <table className="min-w-full text-center table-fixed border-collapse text-sm bg-white">
        <thead
          className="bg-[#5e59a9]/70  backdrop-blur-sm text-white"
          style={{
            fontSize: FONTS.paragraph.fontSize,
            fontFamily: FONTS.header.fontFamily,
          }}
        >
          <tr>
            <th className="w-40 px-6 py-3 ">Title</th>
            <th className="w-36 px-6 py-3 ">Start Date</th>
            <th className="w-36 px-6 py-3 ">End Date</th>
            <th className="w-[30rem] px-6 py-3 ">Description</th>
            <th className="w-28 px-6 py-3 ">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white/45 backdrop-blur divide-y divide-gray-100">
          {announcement.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-center py-6 text-gray-500 font-medium"
              >
                No announcements found.
              </td>
            </tr>
          ) : (
            announcement.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-white/70 hover:backdrop-blur-sm cursor-pointer transition duration-200"
               style={{...FONTS.tableBody}}
                
              >
                <td
                  className="px-6 py-4 font-bold text-black  "
                 style={{...FONTS.tableBody}}
                >
                  {item.title_name || "no title"}
                </td>
                <td className="px-6 py-4 text-gray-900" style={{ ...FONTS.tableBody }}>
                  {item.start_date || "no startdate"}
                </td>
                <td className="px-6 py-4 text-gray-900" style={{ ...FONTS.tableBody }}>
                  {item.end_date || "no enddate"}
                </td>
                <td className="px-6 py-4 text-gray-900  text-center " style={{ ...FONTS.tableBody }}>
                  {item.description || "no description"}
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
