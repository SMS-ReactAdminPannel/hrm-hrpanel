import React from 'react';
import { Award } from 'lucide-react';
import { FONTS } from '../../../constants/uiConstants';

const Reports: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className=" border-gray-200">
        <div className="max-w-full px-3 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 lg:gap-4">
              
              <h1
                className="text-2xl lg:text-3xl font-bold text-gray-900"
                style={{
                  fontFamily: FONTS.header.fontFamily,
                  fontWeight: FONTS.header.fontWeight,
                }}
              >
                Appraisal Reports
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-full px-3 py-10">
        <div className="space-y-6 lg:space-y-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:p-8">
            <h3
              className="text-lg lg:text-xl font-semibold text-gray-900 mb-4"
              style={{
                fontFamily: FONTS.paragraph.fontFamily,
                fontWeight: FONTS.paragraph.fontWeight,
              }}
            >
              Performance Analytics
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Department Performance Card */}
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 lg:p-7 rounded-lg">
                <h4
                  className="font-medium text-blue-900 mb-2 lg:text-lg"
                  style={{
                    fontFamily: FONTS.paragraph.fontFamily,
                    fontWeight: FONTS.paragraph.fontWeight,
                  }}
                >
                  Department Performance
                </h4>
                <div className="space-y-2">
                  {[
                    { name: 'Engineering', score: '4.5' },
                    { name: 'Product', score: '4.2' },
                    { name: 'Design', score: '4.8' },
                  ].map(({ name, score }) => (
                    <div className="flex justify-between" key={name}>
                      <span
                        className="text-blue-700 text-sm lg:text-base"
                        style={{
                          fontFamily: FONTS.paragraph.fontFamily,
                          fontWeight: FONTS.paragraph.fontWeight,
                        }}
                      >
                        {name}
                      </span>
                      <span
                        className="font-semibold text-blue-900 text-sm lg:text-base"
                        style={{
                          fontFamily: FONTS.paragraph.fontFamily,
                          fontWeight: FONTS.paragraph.fontWeight,
                        }}
                      >
                        {score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Completion Rate Card */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 lg:p-7 rounded-lg">
                <h4
                  className="font-medium text-green-900 mb-2 lg:text-lg"
                  style={{
                    fontFamily: FONTS.paragraph.fontFamily,
                    fontWeight: FONTS.paragraph.fontWeight,
                  }}
                >
                  Completion Rate
                </h4>
                <div
                  className="text-3xl lg:text-4xl font-bold text-green-900 mb-2"
                  style={{
                    fontFamily: FONTS.paragraph.fontFamily,
                    fontWeight: FONTS.paragraph.fontWeight,
                  }}
                >
                  89%
                </div>
                <p
                  className="text-green-700 text-sm lg:text-base"
                  style={{
                    fontFamily: FONTS.paragraph.fontFamily,
                    fontWeight: FONTS.paragraph.fontWeight,
                  }}
                >
                  +5% from last quarter
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
