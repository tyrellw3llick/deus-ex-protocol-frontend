import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface TimeRemainingProps {
  endDate: string;
  className?: string;
}

export function TimeRemaining({ endDate, className }: TimeRemainingProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [percentage, setPercentage] = useState(100);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const end = new Date(endDate).getTime();
      const now = new Date().getTime();
      const total = end - now;

      if (total <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      }

      // Calculate time components
      const days = Math.floor(total / (1000 * 60 * 60 * 24));
      const hours = Math.floor((total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((total % (1000 * 60)) / 1000);

      // Calculate percentage for progress bar
      const duration = new Date(endDate).getTime() - new Date().getTime();
      const elapsed = duration;
      const percentage = Math.max(0, Math.min(100, (elapsed / duration) * 100));

      setPercentage(percentage);
      
      return { days, hours, minutes, seconds };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between items-center text-sm">
        <span className="text-neutral-400">Time Remaining</span>
        <span className="text-neutral-200">
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m
        </span>
      </div>
      
      <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-1000 ease-linear rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
