import InnerPageStructure from 'comon/pageStructures/InnerPageStructure';
import React from 'react';
import AssetSideDetails from '../../comon/GlobalyComponnetsUsed/AssetSideDetails';
import InlineSVG from 'react-inlinesvg';
import bannerDesktop from 'asset/Pictures/Images/InnerBannerDesktop.svg';
import bannerMobile from 'asset/Pictures/Images/InnerBannerMobile.svg';
import TransactionReportsShortList from './components/TransactionReportsShortList';
import Investing from './components/Investing';
import useDeviceDetection from 'comon/DeviceDetector/useDeviceDetection';

function Dashboard() {
  const IsMobile = useDeviceDetection();
  return (
    <InnerPageStructure>
      {/* main part  */}
      <div className="lg:w-full w-full flex flex-col items-center justify-start gap-y-5 ">
        <InlineSVG
          src={IsMobile ? bannerMobile : bannerDesktop}
          className="lg:w-[95%] lg:h-auto h-auto lg:object-contain object-cover"
        />
        {/*  investing status reports  */}
        <TransactionReportsShortList />
        {/* investing  */}
        <Investing />
      </div>
      {/*  asster sidebar  */}
      <div className=" min-w-[280px] w-auto hidden lg:flex flex-col items-center justify-start gap-y-2 ">
        <AssetSideDetails />
      </div>
    </InnerPageStructure>
  );
}

export default Dashboard;
