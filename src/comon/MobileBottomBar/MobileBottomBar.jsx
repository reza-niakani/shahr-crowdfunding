/* eslint-disable no-unused-vars */
import InlineSVG from 'react-inlinesvg';
import React, { useContext } from 'react';
import DataContext from 'comon/context/MainContext';
import { useLocation, useNavigate } from 'react-router-dom';
import dashboardWhite from 'asset/Pictures/Icons/homeWhite.svg';
import dashboardBlack from 'asset/Pictures/Icons/homeblack.svg';
import reportsWhite from 'asset/Pictures/Icons/reportsWhite.svg';
import reportsBlack from 'asset/Pictures/Icons/reportsBlack.svg';
import investingWhite from 'asset/Pictures/Icons/investingWhite.svg';
import investingBlack from 'asset/Pictures/Icons/investingBlack.svg';
import profileWhite from 'asset/Pictures/Icons/profileWhite.svg';
import profileBlack from 'asset/Pictures/Icons/profileBlack.svg';
import coinsHandWhite from 'asset/Pictures/Icons/coinshandWhite.svg';
import coinsHandBlack from 'asset/Pictures/Icons/coinsHandBlack.svg';

function MobileBottomBar() {
  const { role } = useContext(DataContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const items =
    role == 'legal'
      ? [
          {
            name: 'داشبورد',
            activeIcon: dashboardWhite,
            icon: dashboardBlack,
            key: 'dashboard',
            rout: '/dashboard'
          },
          {
            name: 'درخواست تامین مالی',
            activeIcon: coinsHandWhite,
            icon: coinsHandBlack,
            key: 'request_for_financing',
            rout: '/request_for_financing'
          },
          {
            name: 'گزارشات',
            activeIcon: reportsWhite,
            icon: reportsBlack,
            key: 'financial_report',
            rout: '/financial_report'
          },
          {
            name: 'سرمایه گذاری',
            activeIcon: investingWhite,
            icon: investingBlack,
            key: 'investing',
            rout: '/investing'
          },
          {
            name: 'حساب کاربری',
            activeIcon: profileWhite,
            icon: profileBlack,
            key: 'user_info',
            rout: '/user_info'
          }
        ]
      : [
          {
            name: 'داشبورد',
            activeIcon: dashboardWhite,
            icon: dashboardBlack,
            key: 'dashboard',
            rout: '/dashboard'
          },
          {
            name: 'گزارشات',
            activeIcon: reportsWhite,
            icon: reportsBlack,
            key: 'financial_report',
            rout: '/financial_report'
          },
          {
            name: 'سرمایه گذاری',
            activeIcon: investingWhite,
            icon: investingBlack,
            key: 'investing',
            rout: '/investing'
          },
          {
            name: 'حساب کاربری',
            activeIcon: profileWhite,
            icon: profileBlack,
            key: 'user_info',
            rout: '/user_info'
          }
        ];

  return (
    <div
      className={`fixed bottom-0 w-full bg-white shadow-lg transition-all duration-300 ease-in-out lg:hidden z-[100] items-center justify-center flex  `}
      style={{ height: '72px', boxShadow: '0px 0px 7px 0px rgba(0, 0, 0, 0.08)' }}>
      {/* Your content here */}
      <div className="flex justify-center gap-x-5 w-[90%]   items-center h-full  relative  flex-nowrap">
        {items?.map((item, index) => (
          <div
            key={index}
            className=" flex flex-col w-fit h-auto justify-center items-center  cursor-pointer gap-y-1"
            onClick={() => navigate(item?.rout)}>
            {' '}
            <div
              className={`w-9 h-9  items-center flex justify-center ${
                pathname?.includes(item.rout) ? ' rounded-full   bg-[#009085]   ' : '  '
              }`}>
              <InlineSVG src={pathname?.includes(item.rout) ? item.activeIcon : item?.icon} />
            </div>
            <span
              className={`text-[10px] text-nowrap ${
                pathname.includes(item?.key) ? 'text-[#009085]' : 'text-[#202020] '
              }`}>
              {item?.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MobileBottomBar;
