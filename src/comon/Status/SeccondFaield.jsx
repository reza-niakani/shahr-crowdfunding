import React from 'react';
import InlineSVG from 'react-inlinesvg';
import close from 'asset/Pictures/Icons/redCloseIcon.svg';
import Faield from 'asset/Pictures/Icons/FaieldIcon.svg';
import refresh from 'asset/Pictures/Icons/refreshWhite.svg';
import { useNavigate } from 'react-router-dom';
function SeccondFaield({ setIsOpen, text, id }) {
  const navigate = useNavigate();

  const OnClickHandler = () => {
    if (id) {
      navigate(`/plan_detail/${id}`);
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };
  return (
    <div className="w-full flex gap-y-5 justify-start items-center bg-red-100 flex-col h-full ">
      <div className="w-full flex justify-end items-center p-3 ">
        <InlineSVG className="cursor-pointer" src={close} onClick={OnClickHandler} />
      </div>
      <InlineSVG src={Faield} />
      <span className="text-center text-red-700 text-base font-semibold  ">{text}</span>
      <button
        onClick={OnClickHandler}
        className="bg-red-700 text-white justify-center gap-x-2 items-center text-xs font-medium flex rounded-lg lg:w-[110px] w-[80%] h-[35px] focus:outline-none focus:ring-0 focus:border-0">
        تلاش مجدد <InlineSVG src={refresh} />
      </button>
    </div>
  );
}

export default SeccondFaield;
