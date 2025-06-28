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
  const [confirmIndex, setConfirmIndex] = useState<number | null>(null);



  const fetchannouncement = async () => {
    try {
      const response: any = await AnnouncementGetAll();
      console.log("API Response:", response.data);

      const visitors = response?.data ?? [];
      setannouncement(visitors);
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
    <div className={`overflow-x-auto min-h-screen ${announcement && announcement.length === 0 ? "rounded-lg" : "rounded-xl"} shadow mt-6`}>
      <table className="min-w-full text-center table-fixed border-collapse text-sm bg-white">
        <thead
          className="bg-[#5e59a9]/70  backdrop-blur-sm text-white  "
          style={{
            fontFamily: FONTS.tableHeader.fontFamily,
          }}
        >
          <tr>
            <th className="w-40 px-6 py-3 text-left ">Title</th>
            <th className="w-36 px-6 py-3 text-left" >Start Date</th>
            <th className="w-36 px-6 py-3 text-left" >End Date</th>
            <th className="w-20 px-6 py-3">Description</th>
            <th className="w-28 px-6 py-3 ">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white/45 backdrop-blur divide-y divide-gray-100">
          {announcement && announcement.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="text-center py-6 text-gray-500 font-medium"
              >
                No announcements found.
              </td>
            </tr>
          ) : (
            announcement && announcement.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-white/70 hover:backdrop-blur-sm cursor-pointer transition duration-200"
                style={{ fontFamily: FONTS.tableBody.fontSize }}

              >
                <td
                  className="px-6 py-4 font-semibold text-black text-left "

                >
                  {item.title_name || "no title"}
                </td>
                <td className="px-6 py-4 text-gray-900 text-left" >
                  {item.start_date || "no startdate"}
                </td>
                <td className="px-6 py-4 text-gray-900 text-left" >
                  {item.end_date || "no enddate"}
                </td>
                <td className="px-6 py-4 text-gray-900  text-center ">
                  {item.description || "no description"}
                </td>
                <td className="px-6 py-4 text-left">
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
                      onClick={() => setConfirmIndex(index)}
                    >
                      <Trash2 size={16} />
                    </button>

                    {confirmIndex === index && (
                      <div className="absolute top-8 right-0 z-20 w-60 bg-white border border-gray-300 rounded-lg shadow-lg p-3">
                        <p className="text-gray-800 text-sm mb-3">Are you sure you want to delete this data?</p>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setConfirmIndex(null)}
                            className="px-3 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              onDelete(index);
                              setConfirmIndex(null);
                            }}
                            className="px-3 py-1 text-xs bg-red-600 text-white hover:bg-red-700 rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}

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
