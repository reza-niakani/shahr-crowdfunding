import BouncingDotsLoader from 'comon/Loading/BouncingDotsLoader';
import React from 'react';
import InlineSVG from 'react-inlinesvg';
import rightFlash from 'asset/Pictures/Icons/flashright.svg';
import CustomDropDownMultiSelect from 'comon/DropDown/CustomDropDownMultiSelect';
import { planStatusEnum } from 'comon/DB/PlanStatusEnum';

function FilterComponent({
  plansStatus,
  setPlansStatus,
  getData,
  isloading,
  HandleClearFilters,
  setMobileModalStatus
}) {
  return (
    <div className="w-full h-auto bg-transparent flex flex-col items-center min-h-[400px] justify-start gap-y-7 pb">
      <div className="w-[90%] border-b border-gray-200 flex justify-between  gap-x-2 py-3 items-center pr-1 ">
        <div className="flex items-center justify-start gap-x-2">
          {' '}
          <InlineSVG src={rightFlash} onClick={() => setMobileModalStatus()} />
          <span className="text-sm font-medium text-gray-main">فیلتر</span>
        </div>
        <button
          onClick={HandleClearFilters}
          className=" border-0 focus:outline-none focus:ring-0 focus:border-none text-xs text-red-main ">
          حذف فیلتر ها
        </button>
      </div>
      <div className="w-[90%]">
        {' '}
        <CustomDropDownMultiSelect
          items={planStatusEnum}
          title="وضعیت طرح"
          selectedItems={plansStatus}
          setSelectedItems={setPlansStatus}
        />
      </div>
      <button
        disabled={isloading}
        onClick={getData}
        className={`h-[38px] w-[90%] flex justify-center items-center text-center rounded-lg  ${
          isloading ? 'border border-gray-600' : 'bg-gray-600 '
        }  text-sm font-medium text-white `}>
        {isloading ? <BouncingDotsLoader /> : 'اعمال فیلتر'}
      </button>
    </div>
  );
}

export default FilterComponent;
