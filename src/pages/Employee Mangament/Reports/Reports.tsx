import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { FONTS } from '../../../constants/uiConstants';

type TabType = "dashboard" | "appraisal" | "reports";

interface ReportsProps {
  setActiveTab: (tab: TabType) => void;
}

const Reports: React.FC<ReportsProps> = ({ setActiveTab }) => {
  const paragraphStyle = {
  fontFamily: FONTS.paragraph.fontFamily,
  fontWeight: FONTS.paragraph.fontWeight,
};
  return (
    <div>
      <button
        onClick={() => setActiveTab('dashboard')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-7 "
      >
        <ArrowLeft className="w-5 h-5" />
        <span
          className="text-sm font-medium"
          style={{
            fontFamily: FONTS.paragraph.fontFamily,
            fontWeight: FONTS.paragraph.fontWeight,
          }}
        >
          Back to Dashboard
        </span>
      </button>
      <section className="  rounded-xl shadow-sm">
        <div className='flex justify-between items-center'>
          <h3
            className="text-2xl font-semibold"
            style={{
              fontFamily: FONTS.paragraph.fontFamily,
              fontWeight: FONTS.paragraph.fontWeight,
            }}
          >
            Performance Analytics
          </h3>
        </div>



<div className="flex justify-between items-center gap-6">
  {/* Department Performance Card */}
  <div className="bg-gray-50 min-h-[200px] w-1/2 p-6 rounded-lg shadow-sm mt-5">
    <h4 className="text-xl font-bold mb-3" style={paragraphStyle}>
      Department Performance
    </h4>
    <ul className="space-y-3">
      {[
        { name: 'Engineering', score: '4.5' },
        { name: 'Product', score: '4.2' },
        { name: 'Design', score: '4.8' },
      ].map(({ name, score }) => (
        <li
          key={name}
          className="flex justify-between text-gray-700 text-sm lg:text-base"
        >
          <span style={paragraphStyle}>{name}</span>
          <span style={paragraphStyle}>{score}</span>
        </li>
      ))}
    </ul>
  </div>

  {/* Completion Rate Card */}
  <div className="bg-gray-50 min-h-[200px] w-1/2 p-6 rounded-lg shadow-sm mt-5">
    <h4 className="text-xl font-bold mb-3" style={paragraphStyle}>
      Completion Rate
    </h4>
    <div className="text-4xl font-bold mb-2" style={paragraphStyle}>
      89%
    </div>
    <p className="text-sm text-gray-700 lg:text-base" style={paragraphStyle}>
      +5% from last quarter
    </p>
  </div>
</div>
      </section>

    </div>
  );
};

export default Reports;
