import React, { useState } from 'react';
import './RangeSlider.css'; // Ensure the path to CSS is correct

const RangeSlider = ({
  min = 0,
  max = 100,
  step = 1,
  onChange,
  separator,
  text
  // title = false
}) => {
  const [value, setValue] = useState(min);

  const handleChange = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };
  console.log(separator);

  // Calculate the fill percentage
  const fillPercentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="w-full my-4 flex flex-col items-end gap-y-5">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="range-slider w-full lg:h-3 h-[10px] appearance-none rounded-lg bg-gray-200"
        style={{
          background: `linear-gradient(to left, rgba(107, 114, 128, 1) ${fillPercentage}%, #ddd ${fillPercentage}%)`
        }}
      />
      <div className="text-xs lg:text-lg font-medium text-gray-main  flex items-center gap-x-2  w-1/2 justify-end text-end ">
        {' '}
        {separator ? Number(value).toLocaleString() : value}
        <span> {text}</span>
      </div>
    </div>
  );
};

export default RangeSlider;
