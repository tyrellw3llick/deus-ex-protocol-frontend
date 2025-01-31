import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Timer, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RoundTimerProps {
  endDate: string;
  roundId: number;
  className?: string;
}

export function RoundTimer({ endDate, roundId, className }: RoundTimerProps) {
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

      // Calculate percentage
      const startDate = new Date(end - (7 * 24 * 60 * 60 * 1000)); // Assuming 7-day rounds
      const totalDuration = end - startDate.getTime();
      const elapsed = end - now;
      const percentage = Math.max(0, Math.min(100, (elapsed / totalDuration) * 100));

      setPercentage(percentage);
      
      return { days, hours, minutes, seconds };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  return (
    <div className={cn("w-full max-w-4xl mx-auto bg-neutral-900/50 border border-neutral-800 rounded-xl p-6 backdrop-blur-sm", className)}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Round Info */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-lg">
            <Crown className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-neutral-200">Round #{roundId}</h3>
            <p className="text-sm text-neutral-400">Active voting period</p>
          </div>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-4">
            <TimeUnit value={timeLeft.days} label="Days" />
            <TimeUnit value={timeLeft.hours} label="Hours" />
            <TimeUnit value={timeLeft.minutes} label="Minutes" />
          </div>
          <div className="hidden md:block w-px h-12 bg-neutral-800" />
          <div className="hidden md:flex items-center gap-2">
            <Timer className="w-5 h-5 text-primary" />
            <span className="text-neutral-400">Ends in {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6 h-2 bg-neutral-800 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-neutral-200">
        {value.toString().padStart(2, '0')}
      </div>
      <div className="text-xs text-neutral-400 uppercase tracking-wide">
        {label}
      </div>
    </div>
  );
}
