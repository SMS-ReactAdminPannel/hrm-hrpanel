import React from 'react';
import { CheckCircle } from 'lucide-react';

interface VerifiedViewProps {
  onContinue: () => void;
}

const VerifiedView: React.FC<VerifiedViewProps> = ({ onContinue }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verification Successful!</h1>
          <p className="text-gray-600">Welcome to HRM System</p>
        </div>
        <button
          onClick={onContinue}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
};

export default VerifiedView;