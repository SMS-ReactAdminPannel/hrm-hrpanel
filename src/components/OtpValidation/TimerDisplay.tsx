import React from 'react';
import { Clock } from 'lucide-react';

interface TimerDisplayProps {
  timeLeft: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ timeLeft }) => {
  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center text-bold justify-center gap-2 text-sm">
      <Clock className="w-4 h-4" />
      <span>Code expires in {formatTime(timeLeft)}</span>
    </div>
  );
};

export default TimerDisplay;