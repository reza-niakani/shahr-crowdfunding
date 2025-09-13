import React from 'react';
import InlineSVG from 'react-inlinesvg';
import close from 'asset/Pictures/Icons/GreenCLose.svg';
import success from 'asset/Pictures/Icons/successIcon.svg';
import { Link, useNavigate } from 'react-router-dom';
import flash from 'asset/Pictures/Icons/flashLeftWhite.svg';

function SeccondSuccess({ text, id = null }) {
  const navigate = useNavigate();

  return (
    <div className="w-full flex gap-y-5 justify-start items-center bg-green-100 flex-col h-full ">
      <div className="w-full flex justify-end items-center p-3 ">
        <InlineSVG
          src={close}
          onClick={() => navigate(`/plan_detail/${id}`)}
          className="cursor-pointer"
        />
      </div>
      <InlineSVG src={success} />
      <span className="text-center text-green-700 text-base font-semibold  ">{text}</span>
      <Link
        to="/all_plans"
        className="bg-green-700 text-white justify-center gap-x-2 items-center text-xs font-medium flex rounded-lg lg:w-[200px] w-[80%] h-[35px] focus:outline-none focus:ring-0 focus:border-0">
        مشاهده طرح های سرمایه گذاری
        <InlineSVG src={flash} />
      </Link>
    </div>
  );
}

export default SeccondSuccess;
