import DatePickerPersian from 'comon/Datepicker/Datepicker';
import React from 'react';

function SeccondStep({ details, setDetails, setStep }) {
  console.log(details);

  return (
    <div className="w-full flex flex-col items-start justify-between h-[500px]">
      <div className="w-full flex flex-col items-center  gap-y-16">
        {/* crowd funding type */}
        <div className="w-full flex flex-col gap-y-1  h-auto justify-center items-center ">
          <label
            htmlFor="descriiption"
            className=" text-[#272E39] w-full text-start items-center text-xs font-medium">
            توضیحات{' '}
          </label>
          <textarea
            name="descriiption"
            placeholder="به طور مثال طرح سبد گردان در گردش بخش توسعه و تکنولوژی سبدگردانی زاگرس"
            className=" focus:border-[#E0E0E0] focus:ring-0 focus:outline-none   placeholder:text-[#CCCCCC] placeholder:text-xs placeholder:p-3 w-full h-[90px] rounded-lg  border text-sm text-gray-main  border-[#E0E0E0] resize-none"
            value={details?.description}
            onChange={(e) => setDetails((prev) => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div className="w-full flex flex-col gap-y-1  h-auto justify-center items-center ">
          <label
            htmlFor="date"
            className=" text-[#272E39] w-full text-start items-center text-xs font-medium">
            تاریخ{' '}
          </label>
          <DatePickerPersian
            name="date"
            value={details?.date}
            onchange={(e) => setDetails((prev) => ({ ...prev, date: e }))}
          />
        </div>
      </div>
      <button
        onClick={() => setStep('thirdStep')}
        className={`bg-accent-600 rounded-md text-white font-medium text-sm   flex justify-center items-center text-center w-[50%] h-[44px]  `}>
        ثبت و ادامه
      </button>
    </div>
  );
}

export default SeccondStep;
