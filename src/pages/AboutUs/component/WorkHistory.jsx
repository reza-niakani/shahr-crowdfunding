import DataContext from 'comon/context/MainContext';
import React, { useContext } from 'react';
import close from 'asset/Pictures/Icons/closeCircle.svg';
import InlineSVG from 'react-inlinesvg';

function WorkHistory({ data }) {
  const { setModal } = useContext(DataContext);

  return (
    <div className=" lg:w-[90%] lg:min-w-[700px] max-w-[700px] min-h-[100px] p-3 flex flex-col items-center justify-center gap-y-8   bg-white rounded-large  border-2 border-gold-1000">
      <div className="w-full flex justify-between  items-center ">
        {' '}
        <span className="w-full border-b border-gray-300  py-2 text-gray-700 font-semibold  ">
          سابقه کاری{' '}
        </span>
        <InlineSVG src={close} onClick={() => setModal()} className="cursor-pointer" />
      </div>
      <ul className="w-[90%]  flex flex-col items-start gap-y-4 list-inside  list-disc  ">
        {data?.map((item, index) => (
          <li
            key={index}
            className=" text-accent-1000 text-start w-full lg:whitespace-nowrap lg:text-base text-sm  ">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkHistory;
