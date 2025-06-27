import React, { useRef, useEffect } from 'react';
import type { OTPInputProps } from './types';

const OTPInput: React.FC<OTPInputProps> = ({ value, onChange, onComplete }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [otp, setOtp] = React.useState<string[]>(new Array(6).fill(''));

  useEffect(() => {
    if (value.length === 0) {
      setOtp(new Array(6).fill(''));
    }
  }, [value]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    const otpString = newOtp.join('');
    onChange(otpString);

    if (element.value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (otpString.length === 6) {
      onComplete(otpString);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    const pastedNumbers = pastedData.replace(/\D/g, '').slice(0, 6);
    
    if (pastedNumbers.length > 0) {
      const newOtp = new Array(6).fill('');
      for (let i = 0; i < Math.min(pastedNumbers.length, 6); i++) {
        newOtp[i] = pastedNumbers[i];
      }
      setOtp(newOtp);
      onChange(pastedNumbers);
      
      if (pastedNumbers.length === 6) {
        onComplete(pastedNumbers);
      }
    }
  };

  return (
    <div className="flex gap-3 justify-center" >
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(ref) => { inputRefs.current[index] = ref; }}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-[#006666] focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-white"
          autoFocus={index === 0}
        />
      ))}
    </div>
  );
};

export default OTPInput;