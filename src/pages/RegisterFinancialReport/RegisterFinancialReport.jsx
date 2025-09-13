import React, { useContext, useEffect, useState } from 'react';
import DataContext from 'comon/context/MainContext';
import InlineSVG from 'react-inlinesvg';
import logo from 'asset/Pictures/Icons/buyUnit.svg';
import close from 'asset/Pictures/Icons/closeCircle.svg';
import LastStep from './components/LastStep';
import SeccondStep from './components/SeccondStep';
import FirstStep from './components/FirstStep';

function RegisterFinancialReport() {
  const { modal, setModal } = useContext(DataContext);
  const [step, setStep] = useState('firstStep');
  const [selectedfile, setSelectedfile] = useState();
  const [details, setDetails] = useState({
    path: '',
    title: '',
    description: '',
    type: 6,
    investmentPlanId: 0,
    date: ''
  });

  useEffect(() => {
    setSelectedfile();
    setDetails({
      path: '',
      title: '',
      description: '',
      type: 6,
      investmentPlanId: 0,
      date: ''
    });
    setStep('firstStep');
  }, [modal]);

  const HandleComponents = () => {
    switch (step) {
      case 'firstStep':
        return <FirstStep details={details} setDetails={setDetails} setStep={setStep} />;
      case 'seccondStep':
        return <SeccondStep details={details} setDetails={setDetails} setStep={setStep} />;
      case 'thirdStep':
        return (
          <LastStep
            details={details}
            selectedfile={selectedfile}
            setDetails={setDetails}
            setModal={setModal}
            setSelectedfile={setSelectedfile}
          />
        );
      default:
        return <FirstStep details={details} setDetails={setDetails} setStep={setStep} />;
    }
  };

  console.log('check', selectedfile);

  return (
    <div
      className="w-[90%] flex flex-col items-center justify-start rounded-large bg-white drop-shadow-lg h-auto min-h-[500px] py-8 gap-y-5 lg:max-w-[700px] "
      style={{
        backgroundImage:
          'radial-gradient(100% 100% at 100% 0%, #EFFCFD 30%, rgba(255, 255, 255, 0) 100%)'
      }}>
      {' '}
      <div className="w-[90%] flex justify-between items-center ">
        <InlineSVG src={logo} />
        <InlineSVG src={close} className="cursor-pointer " onClick={() => setModal()} />
      </div>
      <div className="w-[80%] flex flex-col justify-start h-auto items-center ">
        {HandleComponents()}
      </div>
    </div>
  );
}

export default RegisterFinancialReport;
