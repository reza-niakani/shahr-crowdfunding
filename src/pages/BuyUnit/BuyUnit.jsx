import React, { useState } from 'react';
import logo from 'asset/Pictures/logo/logoalone.png';
import close from 'asset/Pictures/Icons/closeCircle.svg';
import InlineSVG from 'react-inlinesvg';
import { useContext } from 'react';
import DataContext from 'comon/context/MainContext';
import FirstRole from './components/FirstRole';
import SeccondRole from './components/SeccondRole';
import SetAmount from './components/SetAmount';
import PayMethod from './components/PayMethod';
import Gatway from './components/Gatway';
import Receipt from './components/Receipt';

function BuyUnit() {
  const { modal, setModal, role } = useContext(DataContext);
  const [step, setStep] = useState('firstRole');
  const [amount, setAmount] = useState(0);
  const [showName, setShowName] = useState(false);

  const HandleComponents = () => {
    switch (step) {
      case 'firstRole':
        return <FirstRole setStep={setStep} data={modal?.data} file={modal?.file} />;
      case 'seccondRole':
        return <SeccondRole setStep={setStep} />;
      case 'setamount':
        return (
          <SetAmount
            setStep={setStep}
            data={modal?.data}
            role={role}
            amount={amount}
            setAmount={setAmount}
            showName={showName}
            setShowName={setShowName}
          />
        );
      case 'paymethod':
        return <PayMethod setStep={setStep} data={modal?.data} role={role} />;
      case 'gatway':
        return (
          <Gatway
            setStep={setStep}
            data={modal?.data}
            role={role}
            showName={showName}
            amount={amount}
          />
        );
      case 'reciept':
        return (
          <Receipt
            setModal={setModal}
            setStep={setStep}
            data={modal?.data}
            role={role}
            showName={showName}
            amount={amount}
          />
        );

      default:
        break;
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-start rounded-large bg-white drop-shadow-lg h-auto min-h-[500px] py-8 gap-y-5 lg:max-w-[500px] "
      style={{
        backgroundImage:
          'radial-gradient(100% 100% at 100% 0%, #EFFCFD 30%, rgba(255, 255, 255, 0) 100%)'
      }}>
      {' '}
      <div className="w-[90%] flex justify-between items-center ">
        <img src={logo} className="h-[50px]" />
        <InlineSVG src={close} className="cursor-pointer " onClick={() => setModal()} />
      </div>
      <div className="w-[90%] flex flex-col justify-start h-auto items-center ">
        {HandleComponents()}
      </div>
    </div>
  );
}

export default BuyUnit;
