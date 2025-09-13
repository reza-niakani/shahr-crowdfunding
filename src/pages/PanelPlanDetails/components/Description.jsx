import { plansStatusFinder } from 'comon/DB/PlanStatusEnum';
import { FormatTextWithLineBreaks } from 'comon/GlobalyTools/UseAbleFunctions';
import React from 'react';

function Description({ category, state, location, description }) {
  return (
    <div className="lg:w-[98%] w-full flex flex-col items-center justify-start gap-y-4">
      <div className="w-full flex flex-col items-center justify-start gap-y-2">
        {/* category */}
        <div className="w-full flex justify-between border-b border-[#CCCCCC] items-center py-3">
          <span className="text-sm text-[#707070] text-start">دسته بندی:</span>
          <span className="text-sm text-[#333333] text-start">{category}</span>
        </div>
        {/* state */}
        <div className="w-full flex justify-between border-b border-[#CCCCCC] items-center py-3">
          <span className="text-sm text-[#707070] text-start">وضعیت طرح :</span>
          <span className="text-sm text-[#333333] text-start">
            {plansStatusFinder(state)?.name}
          </span>
        </div>
        {/* location */}
        <div className="w-full flex justify-between items-center py-3">
          <span className="text-sm text-[#707070] text-start">محل اجرای پروژه :</span>
          <span className="text-sm text-[#333333] text-start">{location}</span>
        </div>
      </div>
      {/* descriptions */}
      <p className="lg:text-sm text-xs text-justify gap-x-2 items-center flex justify-start w-full text-[#383C41]">
        شرح پروژه : {FormatTextWithLineBreaks(description)}
      </p>
    </div>
  );
}

export default Description;
