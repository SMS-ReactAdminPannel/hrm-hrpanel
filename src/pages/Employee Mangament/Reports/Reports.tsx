import React from 'react';
import { Award } from 'lucide-react';

const Reports: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#006666] rounded-lg">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Appraisal Reports</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">Department Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Engineering</span>
                    <span className="font-semibold text-blue-900">4.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Product</span>
                    <span className="font-semibold text-blue-900">4.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Design</span>
                    <span className="font-semibold text-blue-900">4.8</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                <h4 className="font-medium text-green-900 mb-2">Completion Rate</h4>
                <div className="text-3xl font-bold text-green-900 mb-2">89%</div>
                <p className="text-green-700 text-sm">+5% from last quarter</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;