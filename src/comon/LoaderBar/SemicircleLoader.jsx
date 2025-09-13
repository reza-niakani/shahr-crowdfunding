import React, { useEffect, useState } from 'react';
// import InlineSVG from 'react-inlinesvg';
// import pointer from 'asset/Pictures/Icons/pointer.svg';

const SemiCircleLoaderBar = ({
  goalAmount,
  raisedAmount,
  size = 100,
  textColor = false,
  ringTColor = false,
  ringBColor = false,
  isMobile
  // minRequiredTotalValue
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

  // Dimensions and calculations
  const strokeWidth = size / 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // Semicircle circumference
  const offset = (progress / 100) * circumference; // Start from right

  return (
    <div className="w-auto flex flex-col justify-end items-center relative h-[230px] lg:h-[290px] gap-y-1 ">
      {/* <div className="w-auto flex flex-col items-center absolute lg:top-[1.4rem] top-[1.7rem] font-medium text-xs z-[3]">
        <span>حداقل مبلغ برای اجرای طرح</span>
        {minRequiredTotalValue && Number(minRequiredTotalValue).toLocaleString()}
        <InlineSVG src={pointer} className="scale-90" />
      </div> */}
      <div
        className="relative flex items-center justify-center flex-col"
        style={{ width: `${size}px`, height: `${size / 2}px` }}>
        <svg
          className="absolute top-0 left-0"
          viewBox={`0 0 ${size} ${size / 2}`}
          style={{ width: `${size}px`, height: `${size / 2}px` }}>
          {/* Base semicircle with rounded ends */}
          <path
            d={`M ${size - strokeWidth / 2},${size / 2} A ${radius} ${radius} 0 0 0 ${
              strokeWidth / 2
            },${size / 2}`}
            stroke={ringBColor ? ringBColor : '#E3E3E3'}
            strokeWidth={strokeWidth / 5}
            fill="none"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* Dynamic progress semicircle with rounded ends */}

          <path
            d={`M ${size - strokeWidth / 2},${size / 2} A ${radius} ${radius} 0 0 0 ${
              strokeWidth / 2
            },${size / 2}`}
            stroke={ringTColor ? ringTColor : '#034DA2'}
            strokeWidth={strokeWidth / 2.9}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - offset}
            strokeLinecap="round"
            strokeLinejoin="round"
            // style={{ transition: 'stroke-dashoffset 0.001s ease-in-out' }}
          />

          <path
            d={`M ${size - strokeWidth / 2},${size / 2} A ${radius} ${radius} 0 0 0 ${
              strokeWidth / 2
            },${size / 2}`}
            stroke={ringTColor ? ringTColor : '#E07E37'}
            strokeWidth={strokeWidth / 2.9}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={
              calculatedPercentage >= 10 ? (isMobile ? 325 : 509) : circumference - offset
            }
            strokeLinecap="round"
            strokeLinejoin="round"
            // style={{ transition: 'stroke-dashoffset 0.02s ease-in-out' }}
          />
        </svg>
        {/* Center percentage */}
        <div className="absolute text-center flex flex-col items-center top-[30%] lg:top-[40%] justify-center lg:gap-y-3 gap-y-1">
          <span
            className={`text-3xl lg:text-[64px] font-extrabold ${
              textColor ? textColor : 'text-gray-main'
            }`}>
            {Math.round(progress)}%
          </span>
          <span className="w-fit text-nowrap text-sm  lg:text-base font-extrabold ">
            مبلغ جمع آوری شده
          </span>
          <span className="w-fit text-nowrap text-sm  lg:text-base font-extrabold ">
            {' '}
            {raisedAmount && Number(raisedAmount).toLocaleString()}
          </span>
        </div>
      </div>
      <div className=" lg:w-[450px] w-[300px]  justify-between items-center font-medium text-xs flex   ">
        <span className="w-auto text-nowrap flex justify-start items-center  text-center ">
          10% مبلغ تامین شده
          <br />
          توسط متقاضی
        </span>
        <span className="w-auto text-nowrap flex justify-start items-center  text-center">
          سرمایه مورد نیاز(ریال)
          <br />
          {goalAmount && Number(goalAmount).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default SemiCircleLoaderBar;
