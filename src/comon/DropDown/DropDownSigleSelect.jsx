/* eslint-disable no-unused-vars */
import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useState, useRef } from 'react';
import InlineSVG from 'react-inlinesvg';
// import chevrondown from 'asset/Images/Icons/arrow-down.svg';

function DropDownSigleSelect({
  select,
  setSelect,
  items,
  height,
  title,
  width,
  disabled,
  type,
  backgroundColor,
  defaultText = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // convert array to structure that trust in this component
  const convertor = items?.map((item, index) => ({ name: item, key: index + 1 }));
  const array = type == 2 ? items : convertor;

  const HandleSelecteItem = (item) => {
    setSelect(item);
    setIsOpen(false);
  };

  const handleBlur = (e) => {
    if (!menuRef.current.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  console.log(select);

  return (
    <Menu
      as="div"
      className={`relative flex flex-col gap-y-10  ${
        height ? height : 'h-auto'
      } text-left items-center justify-start  ${width ? width : 'w-full'}`}
      ref={menuRef}
      onBlur={handleBlur}>
      {title && (
        <label
          className={`w-full flex lg:justify-start justify-center px-5  text-xs font-semibold ${
            disabled ? ' text-gray-170' : 'text-gray-170'
          }`}>
          {title}
        </label>
      )}
      <div
        className={`w-full flex items-center align-baseline border h-auto bg-gray-200  rounded-lg`}>
        <Menu.Button
          title={disabled && 'غیرفعال است '}
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`flex w-full justify-between align-baseline items-center lg:gap-x-6  px-3 h-[40px] text-sm font-semibold ${
            disabled ? ' text-gray-220' : 'text-gray-title'
          }`}>
          <div className="flex items-center justify-start w-auto gap-x-3">
            {/* {icon && <InlineSVG src={filter} />} */}
            {select ? (
              <p
                className={`text-sm ${
                  disabled ? ' text-gray-main' : 'text-gray-600 hover:text-black'
                } font-normal`}>
                {select?.name}
              </p>
            ) : (
              <p
                className={` ${
                  disabled ? ' text-gray-400' : 'text-gray-600 hover:text-black'
                } text-sm   font-normal`}>
                {defaultText ? (
                  <p className="text-sm text-neutral-200 ">{defaultText}</p>
                ) : (
                  'انتخاب کنید ... '
                )}
              </p>
            )}
          </div>
          {/* <InlineSVG
            src={chevrondown}
            className={`scale-150 text-black ${
              isOpen ? 'transform rotate-180 ease delay-10' : 'rotate-0'
            } transition-all duration-500`}
            width={30}
            height={10}
          /> */}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items
          className={`absolute bg-white ${
            array?.length > 4 && 'lg:h-[200px] h-[150px]'
          } overflow-auto lg:right-0 z-[10000] mt-12  origin-top-right rounded-md cursor-pointer flex flex-col gap-y-2 p-2 w-full left-0 shadow-lg lg:ring-1 text-sm text-right ring-black ring-opacity-5  focus:outline-none`}>
          {array?.map((item, index) => (
            <Menu.Item key={index} className="flex flex-col ">
              <a
                className={`${
                  item?.name == select?.name
                    ? 'bg-primary-500 text-white rounded-md'
                    : 'text-black bg-white'
                } hover:bg-gray-200 rounded-md block px-4 py-3 text-sm`}
                onClick={() => HandleSelecteItem(item)}>
                {item.name}
              </a>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default DropDownSigleSelect;
