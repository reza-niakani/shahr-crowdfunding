import React, { useEffect, useState } from 'react';

const RingLoaderBar = ({
  goalAmount,
  raisedAmount,
  size = 80,
  textColor = false,
  ringTColor = false,
  ringBColor = false
}) => {
  // Calculate percentage with 10% base fill
  const calculatedPercentage = Math.min(100, Math.max(0, (raisedAmount / goalAmount) * 100));

  // Animated progress state
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame;
    const animate = () => {
      setProgress((prev) => {
        if (prev < calculatedPercentage) {
          return prev + 1;
        } else {
          cancelAnimationFrame(animationFrame);
          return prev;
        }
      });
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [calculatedPercentage]);

  // Dimensions and circumference
  const strokeWidth = size / 10; // Adjust stroke width proportionally
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center z-[10]"
      style={{ width: `${size}px`, height: `${size}px` }}>
      <svg
        className="w-full h-full absolute top-0 left-0 transform -rotate-90"
        style={{ width: `${size}px`, height: `${size}px`, zIndex: 10000 }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#E07E37" // Gold for the  fill
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={calculatedPercentage >= 10 ? 178 : offset}
          strokeLinecap="round"
          // style={{
          //   transition: 'stroke-dashoffset 0.3s ease-in-out'
          // }}
        />
      </svg>
      {/* Base ring */}
      <svg
        className="w-full h-full transform -rotate-90"
        style={{ width: `${size}px`, height: `${size}px` }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ringBColor ? ringBColor : '#E3E3E3'} // Light gray for the base
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Filled ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={ringTColor ? ringTColor : '#034DA2'} // Gold for the dynamic fill
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 0.3s ease-in-out'
          }}
        />
      </svg>
      {/* Center percentage */}
      <div className="absolute text-center">
        <p
          className={`text-xs font-bold flex flex-col items-center justify-center  ${textColor ? textColor : 'text-gray-main'} `}
          style={{ fontSize: `${size / 5}px` }} // Font size scales with loader size
        >
          {Math.round(progress)}%
        </p>
      </div>
    </div>
  );
};

export default RingLoaderBar;
