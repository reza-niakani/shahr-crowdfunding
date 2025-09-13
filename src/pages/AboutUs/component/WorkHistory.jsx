import DataContext from 'comon/context/MainContext';
import React, { useContext } from 'react';
import close from 'asset/Pictures/Icons/closeCircle.svg';
import InlineSVG from 'react-inlinesvg';

function WorkHistory({ data }) {
  const { setModal } = useContext(DataContext);

  return (
    <div className=" lg:w-[90%] w-full lg:min-w-[700px] max-w-[700px] min-h-[100px] p-3 py-6 flex flex-col items-center justify-center gap-y-8   bg-white rounded-large  border-2 border-gray-300">
      <div className="w-full flex justify-between  items-center border-b border-gray-300  ">
        {' '}
        <span className="w-full  py-2 text-accent-800 font-semibold  ">{data?.name}</span>
        <button
          onClick={() => setModal()}
          className="w-auto gap-x-2 flex  flex-nowrap justify-center items-center focus:outline-none focus:ring-0  drop-shadow-md text-sm text-gray-600 border border-gray-600 rounded-md p-1">
          بستن
          <InlineSVG src={close} className="cursor-pointer" />
        </button>
      </div>
      {data?.OnBehalf && (
        <span className="w-[98%] text-start text-accent-900 font-semibold ">{data?.OnBehalf}</span>
      )}
      <div className="w-[98%] flex  lg:flex-row flex-col justify-start gap-3 lg:items-center items-start ">
        <span className=" w-auto text-base font-semibold text-accent-900 "> سوابق تحصیلی:</span>
        <span className=" w-auto text-base font-semibold text-gray-600 "> {data?.education}</span>
      </div>
      <div className="w-full flex flex-col items-center justify-start gap-y-4 ">
        <span className="w-[98%]  text-accent-900   pb-3  text-start text-base font-semibold  ">
          سوابق کاری:{' '}
        </span>{' '}
        <ul className="w-[98%]  flex flex-col items-start gap-y-4 list-inside  list-disc  ">
          {data?.WorkHistory?.map((item, index) => (
            <li
              key={index}
              className=" text-gray-600 text-start w-full lg:whitespace-normal text-sm   ">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WorkHistory;
