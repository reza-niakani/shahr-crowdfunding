import React, { useState } from 'react';
import InlineSVG from 'react-inlinesvg';
import chevronup from 'asset/Pictures/Icons/chevronup.svg';
import searchIcon from 'asset/Pictures/Icons/search.svg';

const CustomDropDownMultiSelect = ({
  items,
  placeholder = false,
  selectedItems,
  title,
  setSelectedItems
}) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown open/close
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Handle checkbox toggle
  const handleCheckboxChange = (key) => {
    setSelectedItems((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  // Filter items based on search input
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-full flex  flex-col lg:gap-y-6 gap-y-3 items-center">
      {/* Dropdown Trigger */}
      <button
        onClick={toggleDropdown}
        className="w-full px-2 py-2 text-left flex justify-between lg:text-lg lg:font-bold text-sm font-medium items-center   rounded bg-transparent">
        {title}
        <InlineSVG
          src={chevronup}
          className={` ${
            isOpen ? 'rotate-0 ' : ' rotate-180'
          }   transition-all ease-in-out duration-500 `}
        />
      </button>

      {/* Accordion Dropdown */}
      <div
        className={`transition-all duration-300 overflow-hidden   flex flex-col gap-y-2 w-full ${
          isOpen ? 'max-h-48' : 'max-h-0'
        }`}>
        {/* Search Input */}
        <div className=" relative w-full  bg-transparent">
          <InlineSVG
            src={searchIcon}
            className="absolute inset-y-0 right-2 top-2 lg:scale-110   flex items-center pointer-events-none"
          />
          <input
            type="text"
            placeholder={placeholder || 'جستجو'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[95%] rounded-lg placeholder:pr-5 placeholder:text-sm  pr-5 h-9 border-0  lg:bg-white bg-gray-100 focus:outline-none focus:ring-0 focus:border-none"
          />
        </div>

        {/* Items */}
        <ul className="max-h-40 w-full overflow-y-auto flex flex-col gap-y-4 bg-transparent">
          {filteredItems?.length > 0 ? (
            filteredItems?.map((item) => (
              <li key={item?.key} className="flex items-center  gap-x-1 justify-start">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.key)}
                  onChange={() => handleCheckboxChange(item.key)}
                  className="mr-2 text-gray-600  focus:outline-none focus:ring-0  lg:bg-white bg-gray-100 focus:border-none rounded-[4px] p-1 border-none"
                />
                <span className="text-sm font-medium text-gray-main  ">{item.name}</span>
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-gray-main">موردی یافت نشد</li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default CustomDropDownMultiSelect;
