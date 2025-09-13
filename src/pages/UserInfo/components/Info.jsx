/* eslint-disable no-unused-vars */
import React from 'react';

function Info({ userInfo, role }) {
  const address = userInfo?.addresses?.[0];
  const completeAddress =
    address?.country?.name +
    ' - ' +
    address?.province?.name +
    ' - ' +
    address?.city?.name +
    ' - ' +
    address?.section?.name +
    ' - ' +
    address?.alley +
    ' - ' +
    address?.remnantAddress +
    ' - پلاک:   ' +
    address?.plaque;

  const tel = address?.cityPrefix + '-' + address?.tel;

  const DataDetectore =
    role == 'real'
      ? [
          { title: 'نام', data: userInfo?.realPerson?.firstName },
          { title: ' نام‌خانوادگی', data: userInfo?.realPerson?.lastName },
          { title: 'کدملی', data: userInfo?.username },
          { title: 'کد بورسی', data: userInfo?.tradingCodes?.[0]?.code },
          { title: 'شماره همراه', data: userInfo?.phoneNumber },
          { title: 'تلفن', data: tel },
          { title: 'نشانی', data: completeAddress }
        ]
      : [
          { title: 'شناسه ملی', data: userInfo?.username },
          { title: 'نام شرکت', data: userInfo?.legalPerson?.companyName },
          { title: 'نوع شرکت', data: userInfo?.legalPerson?.companyType || '--' },
          { title: 'شماره ثبت', data: userInfo?.legalPerson?.registerNumber || ' -- ' },
          { title: ' گروه صنعت', data: ' -- ' },
          { title: 'شماره تلفن ثابت', data: tel || ' -- ' },
          { title: 'شماره همراه نماینده شرکت', data: address?.mobile || ' -- ' },
          { title: 'کد پستی', data: address?.postalCode || ' -- ' },
          { title: 'آدرس وبسایت', data: userInfo?.legalPerson?.website || ' -- ' },
          { title: 'نشانی ', data: completeAddress }
        ];

  return (
    <div className="w-[95%] flex justify-between items-center flex-wrap gap-5">
      {DataDetectore?.map((item, index) => (
        <div
          key={index}
          className={` ${
            index == DataDetectore?.length - 1 ? 'w-full' : 'lg:w-[30%] w-full'
          }  flex flex-col  items-center justify-start `}>
          <label className="w-full  text-start text-xs text-[#999999ce]">{item?.title}</label>
          <span className="w-full rounded-lg border border-[#9999996e] text-[#6d6b6b] bg-transparent text-center flex justify-center items-center  text-sm min-w-[150px] lg:mi-h-[36px] h-auto p-2">
            {item?.data}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Info;
