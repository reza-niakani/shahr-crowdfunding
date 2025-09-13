/* eslint-disable no-unused-vars */
import DateDistance from 'comon/DateComponents/DateDistance';
import React, { useState, useEffect } from 'react';

const LinearLoaderBar = ({ total, amountRaised, endDate, neededAmount, positionOfPointer }) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  // Calculate the positions
  const pointerPosition = (neededAmount / total) * 100;
  const valuePosition = (amountRaised / total) * 50;
  const pointerValidation = (total - neededAmount) / total < 0.18;

  useEffect(() => {
    const targetPercentage = (amountRaised / total) * 100;

    if (isAnimating) {
      const animationDuration = 500; // Duration of animation in ms
      const frameDuration = 16; // Approx. frame duration (60fps)
      const totalFrames = Math.ceil(animationDuration / frameDuration);
      const step = targetPercentage / totalFrames;

      let currentFrame = 0;

      const animate = () => {
        if (currentFrame < totalFrames) {
          setWidthPercentage((prev) => Math.min(prev + step, targetPercentage));
          currentFrame++;
          requestAnimationFrame(animate);
        } else {
          setWidthPercentage(targetPercentage); // Ensure final value is set
          setIsAnimating(false); // End animation
        }
      };

      animate();
    }
  }, [amountRaised, total, isAnimating]);

  // Reset animation state if needed
  useEffect(() => {
    setWidthPercentage(0);
    setIsAnimating(true);
  }, []);

  console.log('endDate', endDate);

  return (
    <div className="relative w-full flex flex-col items-center py-5 gap-2">
      <div className=" w-[98%] flex justify-between  items-center lg:text-lg text-xs font-medium text-gray-main ">
        <span className="w-auto">%{Number(widthPercentage + 10).toFixed()} تامین شده</span>
        <span className=" w-auto flex items-center  gap-x-1 ">
          <DateDistance
            endDate={endDate}
            textColor="text-gray-main"
            textSize=" lg:text-lg text-xs font-medium "
          />
          زمان باقی مانده
        </span>
      </div>
      {/* Loader Bar Container */}
      <div className="relative w-full bg-gray-200 z-10 rounded-full h-4 overflow-hidden">
        {/* First 10% of the Loader Bar */}
        <div
          className="absolute h-full rounded-r-full"
          style={{
            width: '10%',
            backgroundColor: '#4a227e',
            zIndex: 40
          }}
        />
        {/* Remaining Loader Bar */}
        <div
          className="h-full rounded-l-large  "
          style={{
            width: `${widthPercentage - 10 > 0 ? widthPercentage - 10 : 0}%`, // Remaining width after 10%
            backgroundColor: 'rgba(75, 85, 99, 1)',
            marginRight: '10%', // Start after the first 10%
            transition: isAnimating ? 'width 0.5s ease-in-out' : 'none' // Smooth animation if animating
          }}
        />
      </div>

      {/* Pointer on Loader Bar */}
      {neededAmount <= total && !pointerValidation && (
        <div
          className="absolute flex flex-col items-center justify-center"
          style={{
            right: `${pointerPosition - positionOfPointer}%`,
            top: '55%',
            transform: 'translate(-50%, -50%)',
            zIndex: 20
          }}
        />
      )}
      <div className=" w-[98%] flex lg:flex-row flex-col  lg:justify-between justify-start gap-y-2  lg:items-center items-start lg:text-lg text-xs font-medium text-gray-main ">
        <span className="w-auto">{Number(amountRaised).toLocaleString()} ریال تامین شده</span>
        <span className="w-auto">{Number(total).toLocaleString()} ریال مبلغ هدف</span>
      </div>
      {/* Value Text on Top of Loader Bar */}
    </div>
  );
};

export default LinearLoaderBar;
