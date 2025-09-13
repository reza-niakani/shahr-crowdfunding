import CustomDropDown from 'comon/DropDown/CustomDropDown';
import React from 'react';

function SeccondStep({ details, setDetails, setStep }) {
  const disable = !!details?.utilizationPlan && !!details?.fundingType;

  return (
    <div className="w-full flex flex-col items-start justify-between h-[400px]">
      <div className="w-full flex flex-col items-center  gap-y-10">
        {/* crowd funding type */}
        <div className="w-full flex flex-col gap-y-1  h-auto justify-center items-center ">
          <label
            htmlFor="type"
            className=" text-[#272E39] w-full text-start items-center text-xs font-medium">
            نوع تامین مالی{' '}
          </label>
          <CustomDropDown
            width="w-full bg-white h-[42px] "
            options={[
              { name: 'همه یا هیچ ', key: 1 },
              { name: 'شناور', key: 2 }
            ]}
            selectedItem={details?.fundingType}
            setSelectedItem={(e) => setDetails((prev) => ({ ...prev, fundingType: e }))}
          />
        </div>
        {/* crowd funding type */}
        <div className="w-full flex flex-col gap-y-1  h-auto justify-center items-center ">
          <label
            htmlFor="goal"
            className=" text-[#272E39] w-full text-start items-center text-xs font-medium">
            محل صرف سرمایه مورد نیاز{' '}
          </label>
          <CustomDropDown
            width="w-full bg-white h-[42px] "
            options={[
              { name: ' سبد گردان در گردش جهت خرید مواد اولیه', key: 1 },
              { name: ' سبد گردان در گردش جهت تولید و فروش محصولات', key: 2 },
              { name: ' سبد گردان در گردش جهت واردات کالا', key: 3 },
              { name: ' تکمیل و ساخت پروژه', key: 4 },
              { name: '  پروژه راه اندازی', key: 5 },
              { name: '  پروژه توسعه ', key: 6 }
            ]}
            selectedItem={details?.utilizationPlan}
            setSelectedItem={(e) => setDetails((prev) => ({ ...prev, utilizationPlan: e }))}
          />
        </div>
      </div>
      <button
        disabled={!disable}
        onClick={() => setStep('thirdStep')}
        className={`bg-accent-600 rounded-md text-white font-medium text-sm   flex justify-center items-center text-center w-[50%] h-[44px] ${
          !disable && 'opacity-65'
        } `}>
        ثبت و ادامه
      </button>
    </div>
  );
}

export default SeccondStep;
