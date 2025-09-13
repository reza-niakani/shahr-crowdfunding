import Axios from 'comon/Axios/Axios';
import CustomDropDown from 'comon/DropDown/CustomDropDown';
import React, { useEffect, useState } from 'react';

function FirstStep({ details, setDetails, setStep }) {
  const [allPalnsName, setAllPalnsName] = useState();
  const disable = !!details?.title && !!details?.investmentPlanId;

  useEffect(() => {
    GetAllTinyByInvesteeId();
  }, []);

  const GetAllTinyByInvesteeId = async () =>
    await Axios.post('/InvesteePlans/GetAllTinyByInvesteeId', {})
      .then((res) => {
        let arr = res?.data?.map((item) => ({ name: item?.title, key: item?.id }));
        setAllPalnsName(arr);
      })
      .catch(() => setAllPalnsName([]));

  return (
    <div className="w-full flex flex-col items-start justify-between h-[400px]">
      {/* monthly periodic */}
      <div className="w-full flex flex-col items-center justify-start gap-y-10 ">
        {' '}
        <div className="w-full flex flex-col gap-y-1  h-auto justify-center items-center ">
          <label
            htmlFor="goal"
            className=" text-[#272E39] w-full text-start items-center text-xs font-medium">
            طرح موردنظر را انتخاب کنید{' '}
          </label>
          <CustomDropDown
            width="w-full bg-white h-[42px] "
            options={allPalnsName}
            selectedItem={details?.investmentPlanId}
            setSelectedItem={(e) => setDetails((prev) => ({ ...prev, investmentPlanId: e }))}
          />
        </div>
        {/* title */}
        <div className="w-full flex flex-col gap-y-1  h-auto justify-center items-center ">
          <label
            htmlFor="title"
            className=" text-[#272E39] w-full text-start items-center text-xs font-medium">
            عنوان{' '}
          </label>
          <input
            name="title"
            className=" focus:border-[#E0E0E0] focus:ring-0 focus:outline-none   placeholder:text-[#CCCCCC] placeholder:text-xs w-full h-[42px] pr-2 rounded-lg  border text-sm text-gray-main  border-[#E0E0E0] "
            value={details?.title}
            onChange={(e) => setDetails((prev) => ({ ...prev, title: e.target.value }))}
          />
        </div>
      </div>
      <button
        disabled={!disable}
        onClick={() => setStep('seccondStep')}
        className={`bg-accent-600 rounded-md text-white font-medium text-sm   flex justify-center items-center text-center w-[50%] h-[42px] ${
          !disable && 'opacity-65'
        } `}>
        ثبت و ادامه
      </button>
    </div>
  );
}

export default FirstStep;
