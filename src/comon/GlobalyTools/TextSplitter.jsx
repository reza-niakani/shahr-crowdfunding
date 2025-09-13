import React, { useMemo, useState } from 'react';
import arrowDownBlack from 'asset/Pictures/Icons/arrowDownBlack.svg';
import arrowDownWhite from 'asset/Pictures/Icons/arrowDownWhite.svg';
import InlineSVG from 'react-inlinesvg';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';

const TextSplitter = ({ text, stepToshow = 1 }) => {
  const [currentPart, setCurrentPart] = useState(stepToshow); // Initialize with `stepToshow`
  const isMobile = useDeviceDetection();

  useMemo(() => {
    setCurrentPart(stepToshow);
  }, [text]);
  // Split the text into parts based on {" "}
  const splitText = () => {
    return text?.split('</br>'); // Split the text by {" "}
  };

  const textParts = splitText(); // Get parts of text based on {" "}

  // Show more parts
  const showMore = () => {
    if (currentPart < textParts.length) {
      setCurrentPart(currentPart + 1);
    }
  };

  // Show less parts
  const showLess = () => {
    setCurrentPart(stepToshow); // Reset to the initial `stepToshow` value
  };

  return (
    <div className="w-full flex flex-col justify-start items-center lg:gap-y-9 gap-y-6">
      {/* Display the current parts */}
      <p
        className="lg:text-xl text-xs text-gray-main text-start w-full"
        style={{ lineHeight: '40px' }}>
        {textParts?.slice(0, currentPart).map((part, index) => (
          <React.Fragment key={index}>
            {part}
            {index < currentPart - 1 && <br />} {/* Add line breaks for all but the last part */}
          </React.Fragment>
        ))}
      </p>
      <div className="w-full flex items-center justify-center h-auto">
        {currentPart < textParts.length ? (
          <button
            onClick={showMore}
            dir="ltr"
            className="lg:bg-transparent lg:w-[155px] w-[120px] lg:h-[40px] h-[38px] bg-gray-600 lg:text-gray-main text-white lg:text-xl text-xs lg:font-bold font-medium flex justify-center items-center lg:gap-x-3 gap-x-2 focus:outline-none focus:ring-0 focus:border-none rounded-lg">
            <InlineSVG src={isMobile ? arrowDownWhite : arrowDownBlack} /> مشاهده بیشتر
          </button>
        ) : (
          <button
            onClick={showLess}
            dir="ltr"
            className="lg:bg-transparent lg:w-[155px] w-[120px] lg:h-[40px] h-[38px] bg-gray-600 lg:text-gray-main text-white lg:text-xl text-xs lg:font-bold font-medium flex justify-center items-center lg:gap-x-3 gap-x-2 focus:outline-none focus:ring-0 focus:border-none rounded-lg">
            <InlineSVG
              src={isMobile ? arrowDownWhite : arrowDownBlack}
              className="transition-all transform ease-in-out rotate-180 duration-1000"
            />{' '}
            مشاهده کمتر
          </button>
        )}
      </div>
    </div>
  );
};

export default TextSplitter;
