import { useState,useEffect } from 'react';
import { FONTS } from '../../constants/uiConstants';
import { getClockin } from '../../features/timesheet/services';


interface DailyTimeSheetProps {
  timesheet: {
    name: string;
    profilePic?: string;
    firstIn: string;
    lastOut: string;
    regular: number;
    overtime: number;
    dailyDoubleOvertime: number;
    tracked: number;
  }[];
}

const DailyTimeSheet = ({ timesheet }: DailyTimeSheetProps) => {
  const [searchTerm, setSearchTerm] = useState(''); 

 const [allCards, setAllCards] = useState<DailyTimeSheetProps[]>([]);
   const fetchTimesheet = async () => {
      try {
        const response = await  getClockin();
        console.log("filtered data",response)
        const visitors = response?.data ?? [];
        setAllCards(visitors);
        
      } catch (error) {
        console.log("Error fetching leave types:", error);
      }
    };
  
    useEffect(() => {
      fetchTimesheet();
    }, []);
  

  return (
    <div className="py-5">
      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full border-collapse text-sm shadow-lg">
          <thead className="bg-[#6f70ce] !text-white" style={{...FONTS.tableHeader}} >
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border border-gray-300 bg-[#eff4f5] !text-black rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#E6A895]"
                  style={{...FONTS.paragraph}}
                />
              </th>
              <th className="px-6 py-3 text-center"
              style={{fontSize:FONTS.paragraph.fontSize,
                fontFamily:FONTS.paragraph.fontFamily
              }}>First In</th>
              <th className="px-6 py-3 text-center"
                style={{
                  fontSize: FONTS.paragraph.fontSize,
                  fontFamily: FONTS.paragraph.fontFamily
                }}>Last Out</th>
              <th className="px-6 py-3 text-center"
                style={{
                  fontSize: FONTS.paragraph.fontSize,
                  fontFamily: FONTS.paragraph.fontFamily
                }}>Regular (hr)</th>
              <th className="px-6 py-3 text-center"
                style={{
                  fontSize: FONTS.paragraph.fontSize,
                  fontFamily: FONTS.paragraph.fontFamily
                }}>Overtime (hr)</th>
              <th className="px-6 py-3 text-center"
                style={{
                  fontSize: FONTS.paragraph.fontSize,
                  fontFamily: FONTS.paragraph.fontFamily
                }}>Double OT (hr)</th>
              <th className="px-6 py-3 text-center"
                style={{
                  fontSize: FONTS.paragraph.fontSize,
                  fontFamily: FONTS.paragraph.fontFamily
                }}>Tracked (hr)</th>
            </tr>
          </thead>
          <tbody className='bg-white' style={{...FONTS.tableBody}}>
            {timesheet.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-6 !text-gray-500" style={{...FONTS.subParagraph}}>
                  No matching timesheet found.
                </td>
              </tr>
            ) : (
              timesheet.map((user, index) => (
                <tr
                  key={index}
                  className="!bg-[#eff4f5] border-b border-slate-200/50 group cursor-pointer"
                >
                  <td className="px-6 py-4 flex  items-center gap-3 border-b border-slate-200/50">
                    <span className="font-medium !text-gray-700" style={{...FONTS.paragraph}}>{user.name}</span>
                  </td>
                  <td className="px-6 py-4 text-center !text-gray-700" style={{...FONTS.description}}>{user.firstIn}</td>
                  <td className="px-6 py-4 text-center !text-gray-700" style={{...FONTS.description}}>{user.lastOut}</td>
                  <td className="px-6 py-4 text-center !text-gray-700" style={{...FONTS.description}}>{user.regular}</td>
                  <td className="px-6 py-4 text-center !text-orange-500" style={{...FONTS.description}}>{user.overtime}</td>
                  <td className="px-6 py-4 text-center !text-red-500" style={{...FONTS.description}}>{user.dailyDoubleOvertime}</td>
                  <td className="px-6 py-4 text-center font-semibold !text-green-600" style={{...FONTS.description}}>{user.tracked}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyTimeSheet;
