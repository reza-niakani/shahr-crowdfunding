/* eslint-disable no-unused-vars */
import TimerLoader from 'comon/LoaderBar/TimeLoader';
import React, { useEffect, useRef } from 'react';

const CountdownTimer = ({ time, setTime }) => {
  const timerRef = useRef(null); // Ref for interval ID

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  // Manage timer based on state and props
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // useEffect(() => {
  //   if (time === 0) {
  //     setIsRunning(false);
  //   }
  //   if (time === 0) {
  //     setIsRunning(false);
  //   }
  // }, [time]);

  // const handleStartTimer = () => {
  //   setIsRunning(true);
  // };

  // const handleResetTimer = () => {
  //   setTime(initialMinutes * 60);
  //   setIsRunning(true);
  // };

  // useEffect(() => {
  //   if (startTimer) {
  //     handleStartTimer();
  //   }
  //   if (resetTimer) {
  //     handleResetTimer();
  //   }
  // }, [startTimer, resetTimer]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-x-1">
      <span className="text-sm font-medium text-[#C9B777]">{formatTime(time)}</span>
    </div>
  );
};

export default CountdownTimer;
