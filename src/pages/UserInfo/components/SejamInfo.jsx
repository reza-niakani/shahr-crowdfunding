import React, { useState } from 'react';
import Info from './Info';
import Changepassword from './Changepassword';
import BoardMembers from './BoardMember';
import BankAccounts from './BankAccounts';
import MainDocuments from './MainDocuments';
import UpdateSejami from './UpdateSejami';
import Shareholders from './Shareholders';

function SejamInfo({ userInfo, role }) {
  const [step, setStep] = useState('info');

  const TabItems =
    role == 'legal'
      ? [
          { name: 'مشخصات شرکت', key: 'info' },
          { name: 'هیات‌مدیره و مدیرعامل', key: 'boardmember' },
          { name: 'سهامداران', key: 'Shareholders' },
          { name: 'حساب بانکی', key: 'bankAccount' },
          { name: ' اسناد مالی ', key: 'documents' },
          { name: 'تغییر رمز  ', key: 'changepassword' },
          { name: 'بروزرسانی اطلاعات ', key: 'updateSejami' }
        ]
      : [
          { name: 'اطلاعات سجامی', key: 'info' },
          { name: 'تغییر رمز عبور ', key: 'changepassword' },
          { name: 'بروزرسانی اطلاعات سجامی', key: 'updateSejami' }
        ];

  const handleComponents = () => {
    switch (step) {
      case 'info':
        return <Info userInfo={userInfo} role={role} />;
      case 'changepassword':
        return <Changepassword userName={userInfo?.username} />;
      case 'boardmember':
        return <BoardMembers userInfo={userInfo} />;
      case 'Shareholders':
        return <Shareholders userInfo={userInfo} />;
      case 'bankAccount':
        return <BankAccounts userInfo={userInfo} />;
      case 'updateSejami':
        return <UpdateSejami userInfo={userInfo} />;
      case 'documents':
        return <MainDocuments />;

      default:
        break;
    }
  };

  console.log(userInfo);

  return (
    <div className="lg:w-[95%] w-full flex flex-col items-center justify-start  border border-[#E0E0E0] bg-white rounded-[20px] py-5">
      {' '}
      <div className="flex items-center justify-start  gap-x-10 w-[97%] overflow-x-auto border-b border-[#D9D9D9] px-2  ">
        {TabItems?.map((item, index) => (
          <button
            key={index}
            onClick={() => setStep(item?.key)}
            className={`${
              step == item.key
                ? ' border-b-2 border-accent-600 font-bold text-accent-600'
                : 'text-[#999999]'
            }  w-auto lg:h-[35px] h-[28px]  lg:text-sm text-xs   flex text-center text-nowrap  items-start justify-center focus:outline-none focus:ring-0`}>
            {item.name}
          </button>
        ))}
      </div>
      {/*  component  */}
      <div className="w-full flex flex-col  justify-start items-center  h-auto py-10 ">
        {' '}
        {handleComponents()}
      </div>
    </div>
  );
}

export default SejamInfo;
