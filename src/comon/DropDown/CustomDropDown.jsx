import React, { useState, useRef, useEffect } from 'react';
import arrowdown from 'asset/Pictures/Icons/arrowDown.svg';
import filterIcon from 'asset/Pictures/Icons/filterIcon.svg';
import InlineSVG from 'react-inlinesvg';
import { truncateDescription } from 'comon/GlobalyTools/UseAbleFunctions';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';

const CustomDropDown = ({ options, selectedItem, setSelectedItem, label, width }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isMobile = useDeviceDetection();

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle dropdown
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Handle item selection
  const handleSelect = (item) => {
    if (selectedItem?.key === item.key) {
      setSelectedItem(null); // Unselect if clicked again
    } else {
      setSelectedItem(item);
    }
    setIsOpen(false); // Close after selection
  };

  return (
    <div ref={dropdownRef} className={`relative inline-block ${width ? width : 'w-full'}`}>
      <div className="w-full flex justify-center gap-0 flex-nowrap items-center h-[38px] border border-[#E0E0E0] rounded-lg">
        <span className="lg:min-w-[30%] min-w-[40%] w-auto text-[#717171] flex items-center justify-center h-full text-xs gap-x-2 text-nowrap">
          <InlineSVG src={filterIcon} />
          {label}
        </span>
        <div className="border-r border-[#E0E0E0] h-full" />
        <button
          onClick={handleToggle}
          className="w-full h-full bg-transparent relative flex justify-start items-center pr-3 text-[#717171] text-xs focus:outline-none">
          {selectedItem?.name ? truncateDescription(selectedItem?.name, isMobile ? 25 : 47) : ' '}
        </button>
        <InlineSVG
          src={arrowdown}
          className={`transition-all ease-in-out duration-500 absolute top-4 left-3 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div
          className={`absolute z-[1000] left-0 right-0 mt-2 py-2 bg-white border rounded-md flex flex-col gap-y-1 items-center justify-start shadow-md transition-all duration-300 ${
            isOpen ? 'max-h-52 opacity-100' : 'max-h-0 opacity-0'
          } overflow-y-auto`}
          style={{ maxHeight: '200px' }}>
          {options?.map((item) => (
            <span
              key={item.key}
              onClick={() => handleSelect(item)}
              className={`px-4 py-2 text-xs w-[95%] h-[42px] rounded-lg cursor-pointer hover:bg-accent-100 ${
                selectedItem?.key === item.key ? 'bg-accent-100' : ''
              }`}>
              {item.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropDown;
