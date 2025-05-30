import {useState,useRef,useEffect}from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

import { ChevronDown } from 'lucide-react';

const chartData = [
 { date: 'Jan',  FinancialTeam: 44, ProjectManager: 13, MarketingTeam: 11, ProductDesignTeam: 22, },
  { date: 'Feb', FinancialTeam: 55, ProjectManager: 23, MarketingTeam: 17, ProductDesignTeam: 22, },
  { date: 'Mar', FinancialTeam: 41, ProjectManager: 20, MarketingTeam: 15,ProductDesignTeam: 22, },
  { date: 'Apr', FinancialTeam: 67, ProjectManager: 8, MarketingTeam: 15, ProductDesignTeam: 22, },
  { date: 'May', FinancialTeam: 22, ProjectManager: 13, MarketingTeam: 21, ProductDesignTeam: 22, },
  { date: 'Jun', FinancialTeam: 43, ProjectManager: 27, MarketingTeam: 14,ProductDesignTeam: 22, },
  { date: 'Jul', FinancialTeam: 44, ProjectManager: 13, MarketingTeam: 11, ProductDesignTeam: 22, },
  { date: 'Aug', FinancialTeam: 55, ProjectManager: 23, MarketingTeam: 17, ProductDesignTeam: 22, },
  { date: 'Sep', FinancialTeam: 41, ProjectManager: 20, MarketingTeam: 15,ProductDesignTeam: 22, },
  { date: 'Oct', FinancialTeam: 67, ProjectManager: 8, MarketingTeam: 15,ProductDesignTeam: 22,  },
  { date: 'Nov', FinancialTeam: 22, ProjectManager: 13, MarketingTeam: 21, ProductDesignTeam: 22,  },
  { date: 'Dec', FinancialTeam: 43, ProjectManager: 27, MarketingTeam: 14, ProductDesignTeam: 8,},
];
const dateRanges = ['Weekly', 'Monthly', 'Yearly'];

const DashBoardCardBar = () => {
    const [selectedRange, setSelectedRange] = useState(''); // Set default value and will be used
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Function to get filtered data based on selected range (you can customize this logic)
  const getFilteredData = () => {
    // Add your filtering logic here based on selectedRange
    // For now, returning the same data, but you can modify this based on your needs
    switch (selectedRange) {
      case 'Weekly':
        return chartData;
      case 'Monthly':
        // You can return monthly data here
        return chartData;
      case 'Yearly':
        // You can return yearly data here
        return chartData;
      default:
        return chartData;
    }
  };

  return (
    <div className='  w-full h-full p-5 '>
        <div className="flex justify-between items-center ">
        <div className=''>
            <h2 className='text-xl font-semibold text-[#006666]'>Empolyee Performance</h2>
            <div className="flex space-x-4 text-xs mt-4">
            <div className="flex items-center space-x-1 text-blue-600">
              <span className="h-2 w-2 bg-[#93c5fd] rounded-full"></span>
              <span className='text-[#93c5fd]' >FinancialTeam</span>
            </div>
            <div className="flex items-center space-x-1 text-rose-400">
              <span className="h-2 w-2 bg-[#aac3c4] rounded-full"></span>
              <span className='text-[#aac3c4] '>ProjectManager</span>
            </div>
            <div className="flex items-center space-x-1 text-blue-600">
              <span className="h-2 w-2 bg-[#ebb8ee] rounded-full"></span>
              <span className='text-[#eca9f0]' >MarketingTeam</span>
            </div>
            <div className="flex items-center space-x-1 text-rose-400">
              <span className="h-2 w-2 bg-[#aac3c4] rounded-full"></span>
              <span className='text-[#aac3c4] '>ProductDesignTeam</span>
            </div>
          </div>
        </div>
          {/* Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center text-xs text-gray-700 border px-3 py-1.5 rounded-md bg-white hover:bg-gray-50"
          >
            
            <ChevronDown className="w-4 h-4 ]" />
          </button>
          {isOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg z-10 min-w-[100px]">
              {dateRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => {
                    setSelectedRange(range);
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 ${
                    selectedRange === range 
                      ? 'text- bg-gray-50 font-medium' 
                      : 'text-gray-700'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          )}
        </div>
        </div>
        
        <div className="-ml-10 mt-2 ">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={getFilteredData()} stackOffset="sign">
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="FinancialTeam" stackId="stack" fill="#93c5fd" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ProjectManager" stackId="stack" fill="#fda4af" radius={[4, 4, 0, 0]} />
            <Bar dataKey="MarketingTeam" stackId="stack" fill="#6ee7b7" radius={[4, 4, 0, 0]} />
            <Bar dataKey="ProductDesignTeam" stackId="stack" fill="#d8b4fe" radius={[4, 4, 0, 0]} />
            
          </BarChart>
        </ResponsiveContainer>
      </div>
      </div>
  )
}

export default DashBoardCardBar