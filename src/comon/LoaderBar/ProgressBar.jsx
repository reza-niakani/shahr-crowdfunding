import React from 'react';

const ProgressBar = ({ percent }) => {
  return (
    <div className="w-[60%] h-2 bg-[#CCCCCC] rounded-full overflow-hidden flex justify-start items-center">
      <div
        dir="ltr"
        className="h-full bg-[#01B69B] transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
