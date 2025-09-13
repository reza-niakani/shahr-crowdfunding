/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import dashboardGreen from 'asset/Pictures/Icons/homeGreen.svg';
import dashboardBlack from 'asset/Pictures/Icons/homeblack.svg';
import reportsGreen from 'asset/Pictures/Icons/reportsGreen.svg';
import reportsBlack from 'asset/Pictures/Icons/reportsBlack.svg';
import investingGreen from 'asset/Pictures/Icons/investingGreen.svg';
import investingBlack from 'asset/Pictures/Icons/investingBlack.svg';
import profileGreen from 'asset/Pictures/Icons/profileGreen.svg';
import profileBlack from 'asset/Pictures/Icons/profileBlack.svg';
import LogOut from 'asset/Pictures/Icons/logOut.svg';
import InlineSVG from 'react-inlinesvg';
import DataContext from 'comon/context/MainContext';
import coinsHandGreen from 'asset/Pictures/Icons/coinsHandGreen.svg';
import coinsHandBlack from 'asset/Pictures/Icons/coinsHandBlack.svg';
import { useLocation, useNavigate } from 'react-router-dom';

function SideBar() {
  const { role, userInfo } = useContext(DataContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const SidebarItem =
    role == 'legal'
      ? [
          {
            name: 'داشبورد',
            activeIcon: dashboardGreen,
            icon: dashboardBlack,
            key: 'dashboard',
            rout: '/dashboard',
            func: () => navigate('/dashboard')
          },
          {
            name: 'درخواست تامین مالی',
            activeIcon: coinsHandGreen,
            icon: coinsHandBlack,
            key: 'request_for_financing',
            rout: '/request_for_financing',
            func: () => navigate('/request_for_financing')
          },
          {
            name: 'گزارشات',
            activeIcon: reportsGreen,
            icon: reportsBlack,
            key: 'financial_report',
            rout: '/financial_report',
            func: () => navigate('/financial_report')
          },
          {
            name: 'سرمایه گذاری',
            activeIcon: investingGreen,
            icon: investingBlack,
            key: 'investing',
            rout: '/investing',
            func: () => navigate('/investing')
          },
          {
            name: 'حساب کاربری',
            activeIcon: profileGreen,
            icon: profileBlack,
            key: 'user_info',
            rout: '/user_info',
            func: () => navigate('/user_info')
          },
          {
            name: 'خروج از حساب ',
            activeIcon: LogOut,
            icon: LogOut,
            key: 'exist',
            rout: null,
            func: () => logOut('/user_info')
          }
        ]
      : [
          {
            name: 'داشبورد',
            activeIcon: dashboardGreen,
            icon: dashboardBlack,
            key: 'dashboard',
            rout: '/dashboard',
            func: () => navigate('/dashboard')
          },
          {
            name: 'گزارشات',
            activeIcon: reportsGreen,
            icon: reportsBlack,
            key: 'financial_report',
            rout: '/financial_report',
            func: () => navigate('/financial_report')
          },
          {
            name: 'سرمایه گذاری',
            activeIcon: investingGreen,
            icon: investingBlack,
            key: 'investing',
            rout: '/investing',
            func: () => navigate('/investing')
          },
          {
            name: 'حساب کاربری',
            activeIcon: profileGreen,
            icon: profileBlack,
            key: 'user_info',
            rout: '/user_info',
            func: () => navigate('/user_info')
          },
          {
            name: 'خروج از حساب ',
            activeIcon: LogOut,
            icon: LogOut,
            key: 'exist',
            rout: null,
            func: () => logOut('/user_info')
          }
        ];

  const logOut = () => {
    window.location.href = '/login';
    localStorage.removeItem('token');
  };

  return (
    <div className="w-full flex flex-col gap-y-3 items-center  justify-start h-full ">
      {/*  info */}
      <div className="w-full border border-[#E0E0E0]  rounded-t-[20px] rounded-b-large h-[200px] flex flex-col   items-center justify-center bg-white gap-y-5 ">
        {/* icon */}
        <div className="w-[50px] h-[50px] rounded-full items-center justify-center flex  bg-[#01B69B1A] ">
          <InlineSVG src={profileGreen} />
        </div>
        {/* name */}
        <span className="w-full flex  justify-center items-center text-center text-[#616161] text-sm font-medium ">
          {userInfo?.title} {''}
        </span>
        <span className="w-full flex  justify-center items-center text-center text-[#616161] text-sm font-bold ">
          نام کاربری :{userInfo?.username} {''}
        </span>
      </div>
      {SidebarItem.map((item, index) => (
        <div
          key={index}
          onClick={item.func}
          className={`w-full flex justify-start gap-x-4 pr-5 cursor-pointer text-sm font-bold border items-center  rounded-lg h-[42px] ${
            !pathname.includes(item.rout)
              ? ' border-[#E0E0E0] text-gray-main  '
              : ' border-[#009085] text-[#009085]  drop-shadow-lg  bg-[#fbf9f3]'
          }`}>
          <InlineSVG src={pathname.includes(item.rout) ? item.activeIcon : item.icon} />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}

export default SideBar;
