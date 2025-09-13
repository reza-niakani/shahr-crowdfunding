/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import logo from 'asset/Pictures/Icons/buyUnit.svg';
import close from 'asset/Pictures/Icons/closeCircle.svg';
import InlineSVG from 'react-inlinesvg';
import { useContext } from 'react';
import DataContext from 'comon/context/MainContext';
import FirstStep from './components/FirstStep';
import SeccondStep from './components/SeccondStep';
import LastStep from './components/LastStep';

function RegisterPlan() {
  const { modal, setModal } = useContext(DataContext);
  const [step, setStep] = useState('firstStep');
  const [selectedfile, setSelectedfile] = useState();
  const [goal, setGoal] = useState();
  const [details, setDetails] = useState({
    title: '',
    unitAmount: 0,
    unitCount: 10000,
    fundingType: '',
    investmentPeriod: '',
    utilizationPlan: '',
    coverImagePaths: []
  });

  useEffect(() => {
    setSelectedfile();
    setGoal();
    setDetails({
      title: '',
      unitAmount: 0,
      unitCount: 10000,
      fundingType: '',
      investmentPeriod: '',
      utilizationPlan: '',
      coverImagePaths: []
    });
    setStep('firstStep');
  }, [modal]);

  const HandleComponents = () => {
    switch (step) {
      case 'firstStep':
        return (
          <FirstStep
            details={details}
            setDetails={setDetails}
            goal={goal}
            setGoal={setGoal}
            setStep={setStep}
          />
        );
      case 'seccondStep':
        return (
          <SeccondStep
            details={details}
            setDetails={setDetails}
            goal={goal}
            setGoal={setGoal}
            setStep={setStep}
          />
        );
      case 'thirdStep':
        return (
          <LastStep
            goal={goal}
            details={details}
            selectedfile={selectedfile}
            setDetails={setDetails}
            setModal={setModal}
            setSelectedfile={setSelectedfile}
          />
        );
      default:
        return (
          <FirstStep
            details={details}
            setDetails={setDetails}
            goal={goal}
            setGoal={setGoal}
            setStep={setStep}
          />
        );
    }
  };

  console.log('check', selectedfile);

  return (
    <div
      className="lg:w-[90%] w-full flex flex-col items-center justify-start rounded-large bg-white drop-shadow-lg h-auto min-h-[500px] py-8 gap-y-5 lg:max-w-[700px] "
      style={{
        backgroundImage:
          'radial-gradient(100% 100% at 100% 0%, #EFFCFD 30%, rgba(255, 255, 255, 0) 100%)'
      }}>
      {' '}
      <div className="w-[90%] flex justify-between items-center ">
        <InlineSVG src={logo} />
        <InlineSVG src={close} className="cursor-pointer " onClick={() => setModal()} />
      </div>
      <div className="lg:w-[80%] w-[90%] flex flex-col justify-start h-auto items-center ">
        {HandleComponents()}
      </div>
    </div>
  );
}

export default RegisterPlan;
