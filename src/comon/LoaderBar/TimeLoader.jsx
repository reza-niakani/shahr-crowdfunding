import React, { useEffect, useState } from 'react';

const TimerLoader = ({ time = 120 }) => {
  const [progress, setProgress] = useState(100); // Start full at 100%

  useEffect(() => {
    const interval = 100; // Interval in milliseconds
    const totalIntervals = time * (3000 / interval); // Total number of updates
    const decrement = 100 / totalIntervals; // Decrement per interval

    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev - decrement;
        if (newProgress <= 0) {
          clearInterval(timer); // Stop when progress reaches 0
          return 0;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className="w-full h-2 bg-[#F3F4F6] rounded">
      <div
        className="h-2 rounded bg-[#4B5563] transition-all duration-[100ms] ease-linear"
        style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default TimerLoader;
