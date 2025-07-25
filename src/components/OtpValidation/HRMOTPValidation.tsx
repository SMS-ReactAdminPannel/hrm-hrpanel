import React, { useState, useEffect } from 'react';
import { Shield, Mail, ArrowLeft } from 'lucide-react';
import OTPInput from './OTPInput';
import TimerDisplay from './TimerDisplay';
import VerifiedView from './VerifiedView';

const HRMOTPValidation: React.FC = () => {
  const [otp, setOtp] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [canResend, setCanResend] = useState<boolean>(false);

  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, isVerified]);

  const handleOTPComplete = async (otpValue: string) => {
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (otpValue === '123456') {
        setIsVerified(true);
        setError('');
      } else {
        setError('Invalid OTP. Please try again.');
        setOtp('');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setError('');
    setOtp('');
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setTimeLeft(300);
      setCanResend(false);
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    console.log('Navigate back to login');
  };

  const handleContinue = () => {
    console.log('Navigate to dashboard');
  };

  if (isVerified) {
    return <VerifiedView onContinue={handleContinue} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handleGoBack}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-blue-600">
              <Shield className="w-6 h-6" />
              <span className="font-semibold">HRM System</span>
            </div>
            <div className="w-9"></div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Identity</h1>
          <p className="text-gray-600 mb-4">
            We've sent a 6-digit verification code to your registered email address
          </p>
          
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 bg-gray-50 py-2 px-4 rounded-lg">
            <Mail className="w-4 h-4" />
            <span>j***n@company.com</span>
          </div>
        </div>

        <div className="mb-6">
          <OTPInput
            value={otp}
            onChange={setOtp}
            onComplete={handleOTPComplete}
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="mb-4 text-center">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <p className="text-sm text-gray-600 mt-2">Verifying...</p>
          </div>
        )}

        <div className="text-center mb-6">
          {!canResend ? (
            <TimerDisplay timeLeft={timeLeft} />
          ) : (
            <div className="text-sm">
              <span className="text-gray-500">Didn't receive the code? </span>
              <button
                onClick={handleResendOTP}
                disabled={isLoading}
                className="text-blue-600 hover:text-blue-700 font-medium disabled:opacity-50"
              >
                Resend OTP
              </button>
            </div>
          )}
        </div>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            Having trouble? Contact IT support at{' '}
            <a href="mailto:support@company.com" className="text-blue-600 hover:underline">
              support@company.com
            </a>
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <button
            onClick={() => handleOTPComplete('123456')}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : 'Verify OTP'}
          </button>
          <p className="text-xs text-gray-400 text-center mt-2">
            Demo: Use "123456" for successful verification
          </p>
        </div>
      </div>
    </div>
  );
};

export default HRMOTPValidation;