import CustomDropDown from 'comon/DropDown/CustomDropDown';
import React from 'react';

function FirstStep({ details, setDetails, goal, setGoal, setStep }) {
  const disable = !!details?.investmentPeriod && !!details?.title && !!goal;

  return (
    <div className="w-full flex flex-col items-start justify-start gap-y-10 ">
      {/* title */}
      <div className="w-full flex flex-col gap-y-1  h-auto justify-center items-center ">
        <label
          htmlFor="planTitle"
          className=" text-[#272E39] w-full text-start items-center text-xs font-medium">
          عنوان طرح را بنویسید{' '}
        </label>
        <textarea
          name="planTitle"
          placeholder="به طور مثال طرح سبد گردان در گردش بخش توسعه و تکنولوژی سبدگردانی زاگرس"
          className=" focus:border-[#E0E0E0] focus:ring-0 focus:outline-none   placeholder:text-[#CCCCCC] placeholder:text-xs placeholder:p-3 w-full h-[90px] rounded-lg  border text-sm text-gray-main  border-[#E0E0E0] resize-none"
          value={details?.title}
          onChange={(e) => setDetails((prev) => ({ ...prev, title: e.target.value }))}
        />
      </div>
      {/* monthly periiodic */}
      <div className="w-full flex flex-col gap-y-1  h-auto justify-center items-center ">
        <label
          htmlFor="goal"
          className=" text-[#272E39] w-full text-start items-center text-xs font-medium">
          مدت بازپرداخت{' '}
        </label>
        <CustomDropDown
          width="w-full bg-white h-[42px] "
          options={[
            { name: '6ماهه', key: 1 },
            { name: '12ماهه', key: 2 },
            { name: 'ماهه18', key: 3 },
            { name: 'ماهه24', key: 4 },
            { name: '48ماهه', key: 5 }
          ]}
          selectedItem={details?.investmentPeriod}
          setSelectedItem={(e) => setDetails((prev) => ({ ...prev, investmentPeriod: e }))}
        />
      </div>
      {/* goal amount */}
      <div className="w-full flex flex-col gap-y-1  h-auto justify-center items-center ">
        <label
          htmlFor="goal"
          className=" text-[#272E39] w-full text-start items-center text-xs font-medium">
          مبلغ مورد نیاز{' '}
        </label>
        <input
          name="goal"
          placeholder=""
          className=" focus:border-[#E0E0E0] focus:ring-0 focus:outline-none  pr-3  placeholder:text-[#CCCCCC] placeholder:text-xs placeholder:p-3 w-full h-[42px] rounded-lg  border text-sm text-gray-main  border-[#E0E0E0] resize-none"
          maxLength={30}
          onChange={(e) => {
            const value = e.target.value.replace(/,/g, ''); // Remove commas
            if (/^\d*$/.test(value)) {
              // Only allow digits (no other characters)
              setGoal(value); // Set the value only if it's numeric
            }
          }}
          value={goal ? Number(goal).toLocaleString() : ''}
        />
      </div>
      <button
        disabled={!disable}
        onClick={() => setStep('seccondStep')}
        className={`bg-accent-600 rounded-md text-white font-medium text-sm   flex justify-center items-center text-center w-[50%] h-[44px] ${
          !disable && 'opacity-65'
        } `}>
        ثبت و ادامه
      </button>
    </div>
  );
}

export default FirstStep;
