import DataContext from 'comon/context/MainContext';
import React, { useContext } from 'react';
import { executeMemebers } from './Enum';

function ExecuteMemebersTree() {
  const { setModal } = useContext(DataContext);
  const showHistoryFunction = (data) => {
    setModal({ type: 'workHistory', data: data });
  };

  return (
    <div className="w-full flex flex flex-col items-center justify-center gap-y-5 ">
      <div
        onClick={() => showHistoryFunction(executeMemebers[0])}
        className="lg:w-[400px] hover:drop-shadow-lg cursor-pointer  w-[90%]  min-h-[120px] flex items-center justify-center gap-x-5  drop-shadow-md rounded-lg  bg-white">
        <div className="w-[95%] flex items-center justify-between ">
          {' '}
          <img src={executeMemebers?.[0]?.pic} className="w-[70px] h-[70px] rounded-full  " />
          <div className="w-[75%] flex flex-col items-start justify-center gap-y-3 h-auto">
            <span className="w-auto text-start lg:text-lg text-base  font-bold text-accent-600">
              {executeMemebers?.[0]?.name}
            </span>
            <span className="w-auto text-start lg:text-sm text-xs font-normal text-accent-600">
              {executeMemebers?.[0]?.posotion}
            </span>
          </div>
        </div>
      </div>
      <div
        onClick={() => showHistoryFunction(executeMemebers[0])}
        className="lg:w-[400px] hover:drop-shadow-lg cursor-pointer  w-[90%]  min-h-[120px] flex items-center justify-center gap-x-5  drop-shadow-md rounded-lg  bg-white">
        <div className="w-[95%] flex items-center justify-between ">
          {' '}
          <img src={executeMemebers?.[0]?.pic} className="w-[70px] h-[70px] rounded-full  " />
          <div className="w-[75%] flex flex-col items-start justify-center gap-y-3 h-auto">
            <span className="w-auto text-start lg:text-lg text-base  font-bold text-accent-600">
              {executeMemebers?.[0]?.name}
            </span>
            <span className="w-auto text-start lg:text-sm text-xs font-normal text-accent-600">
              {executeMemebers?.[0]?.posotion}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExecuteMemebersTree;
