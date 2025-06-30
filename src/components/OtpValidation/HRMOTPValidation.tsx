  import React, { useState, useEffect } from 'react';
  import { Shield, Mail, ArrowLeft } from 'lucide-react';
  import OTPInput from './OTPInput';
  import TimerDisplay from './TimerDisplay';
  import VerifiedView from './VerifiedView';
  import { validateOtp } from '../../features/auth/service';
  import { useNavigate } from 'react-router-dom';
  import { useAuth } from '../../pages/auth/AuthContext';
  
  import 'react-toastify/dist/ReactToastify.css';
import { toast} from 'react-toastify';

 
  const HRMOTPValidation: React.FC = () => {
    const [otp, setOtp] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isVerified, setIsVerified] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [timeLeft, setTimeLeft] = useState<number>(600);
    const [canResend, setCanResend] = useState<boolean>(false);
    const { setIsAuthenticated } = useAuth();
    const navigate = useNavigate();


const handleOtpComplete = async (otp: string) => {
  console.log("OTP get from integration", otp);

  const userStr = localStorage.getItem("user");
  if (!userStr) {
    setError("User not found in localStorage.");
    return;
  }

  const user = JSON.parse(userStr);
  const { email, token } = user;

  if (!email || !token) {
    setError("Incomplete user information.");
    return;
  }

  try {
    
    await toast.promise(
      validateOtp({ otp, email, token }),
      {
        pending: "Verifying OTP...",
        success: {
        render() {
       setTimeout(() => {
       setIsAuthenticated(true);
        navigate("/dashboard", {
        state: { toastMessage: "Logged in successfully" }
          });
        }, 2000); // Wait for OTP toast to finish
         return "OTP verified successfully";
        },
      }
          ,
        error: {
          render({ data }) {
            setError( "OTP validation failed");
            return "OTP validation failed";
          },
        },
      },
      {
        autoClose: 2000,
         style: {
      background: "white", 
      color: "#065f46",   
    },
      }
    );  
  } catch (err: any) {
    console.error("OTP validation failed:", err);
  }
};


    useEffect(() => {
      if (timeLeft > 0 && !isVerified) {
        const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timer);
      } else if (timeLeft === 0) {
        setCanResend(true);
      }
    }, [timeLeft, isVerified]);


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

    const storedOtp = JSON.parse(localStorage.getItem("user") || "{}")?.otp;


    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4" style={{ backgroundImage: `url('/loginbg.jpg')` }}>
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

                <span className="text-2xl font-bold text-[#006666] mb-2">OTP Validation</span>
              </div>
              <div className="w-9"></div>
            </div>

            <p className="text-gray-600 mb-4">
              We've sent a 6-digit verification code to your registered email address
            </p>

            {storedOtp && (
              <p className="text-gray-500 mb-4">
                <span className="font-medium">Your OTP (for testing): </span>
                {storedOtp}
              </p>
            )}


          </div>

          <div className="mb-6">
            <OTPInput
              value={otp}
              onChange={setOtp}
              onComplete={handleOtpComplete}
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


        </div>

      </div>
    );
  };

  export default HRMOTPValidation;