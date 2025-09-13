import React from 'react';
import LoaderBarPart from './LoaderBarPart';
import Details from './Details';
import Calculatore from './Calculatore';
import InvestingLimitings from './InvestingLimitings';
import InvestingCalender from './InvestingCalender';

function PlanRelatedDetails({ mainData, id }) {
  return (
    <div className="lg:w-[46%] w-full flex flex-col justify-start items-center gap-y-10 ">
      <LoaderBarPart mainData={mainData} />
      <Details mainData={mainData} />
      <Calculatore mainData={mainData} />
      <InvestingLimitings mainData={mainData} />
      <InvestingCalender id={id} />
    </div>
  );
}

export default PlanRelatedDetails;
