import React, { useContext, useState } from 'react';
import TabButtons from './TabButtons';
import Description from './Description';
import Evaluations from './Evaluations';
import Finnancial from './Finnancial';
import DataContext from 'comon/context/MainContext';
import Documents from './Documents';
import Calculatore from 'pages/PlanDetail/components/Calculatore';

function StepHandlerComponent({ data, id, documents }) {
  const { role } = useContext(DataContext);
  const [step, setStep] = useState('description');

  const EvaluationsDocs = () => documents?.filter((doc) => doc?.type == 10);
  const MainDocuments = () => documents?.filter((doc) => doc?.type !== 10);
  const FinnancialData = [
    { title: 'مبلغ مورد نیاز (ریال)  :', data: data?.goal && Number(data?.goal).toLocaleString() },
    {
      title: 'سرمایه تامین شده (ریال) :',
      data: data?.amountRaised && Number(data?.amountRaised).toLocaleString()
    },
    {
      title: 'تعداد سرمایه گذاران:',
      data: data?.totalInvestors && Number(data?.totalInvestors).toLocaleString()
    },
    { title: 'دوره ی سرمایه گذاری:', data: `  ${data?.installmentPeriod} ماهه` },
    // { title: 'شیوه پرداخت اصل سرمایه :', data: data?. },
    {
      title: 'درصد بازدهی کل',
      data: data?.totalProfitRate && `% ${Number(data?.totalProfitRate * 100).toFixed()}`
    },
    {
      title: 'درصد بازدهی ماهیانه',
      data: data?.monthlyProfitRate && `% ${Number(data?.monthlyProfitRate * 100).toFixed()}`
    },
    {
      title: 'ارزش اسمی هر گواهی:',
      data: data?.unitAmount && Number(data?.unitAmount).toLocaleString()
    },
    {
      title: 'تعداد کل گواهی ها :',
      data: data?.unitCount && Number(data?.unitCount).toLocaleString()
    },
    {
      title: 'حداکثر مبلغ سرمایه گذاری :',
      data:
        role == 'legal'
          ? data?.maxUnitPerLegalInvestor &&
            Number(data?.maxUnitPerLegalInvestor * data?.unitCount).toLocaleString()
          : data?.maxUnitPerIndividualInvestor &&
            Number(data?.maxUnitPerIndividualInvestor * data?.unitCount).toLocaleString()
    }
  ];
  const StepsHandler = () => {
    switch (step) {
      case 'description':
        return (
          <Description
            category={data?.industryGroupTitle}
            state={data?.state}
            description={data?.description}
            location={data?.executionLocation}
          />
        );
      case 'evaluations':
        return (
          <Evaluations id={id} warranty={data?.warranty} EvaluationsDocs={EvaluationsDocs()} />
        );
      case 'finnancial':
        return <Finnancial FinnancialData={FinnancialData} />;
      case 'program':
        return <Calculatore mainData={{ plandata: data }} padding={false} />;
      // return <InvestingCalender id={id} padding={false} />;
      case 'documents':
        return <Documents documents={MainDocuments()} />;
      default:
        return (
          <Description
            category={data?.industryGroupTitle}
            state={data?.state}
            description={data?.description}
            location={data?.executionLocation}
          />
        );
    }
  };
  return (
    <div className="lg:w-[90%] w-full flex  flex-col justify-start items-center gap-y-6 h-auto border border-[#E0E0E0] bg-white p-3 rounded-[20px]">
      <TabButtons step={step} setStep={setStep} />
      {StepsHandler()}
    </div>
  );
}

export default StepHandlerComponent;
