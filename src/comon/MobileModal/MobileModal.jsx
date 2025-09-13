import React, { useState, useEffect, useContext } from 'react';
import './MobileModal.css';
import DataContext from 'comon/context/MainContext';

const MobileModal = ({ component }) => {
  const { mobileModalStatus, setMobileModalStatus } = useContext(DataContext);

  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [startY, setStartY] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [modalHeight, setModalHeight] = useState('auto');

  console.log(mobileModalStatus);

  useEffect(() => {
    if (mobileModalStatus) {
      document.body.classList.add('modal-open');
      setIsAnimating(true);
    } else {
      document.body.classList.remove('modal-open');
      setIsAnimating(false);
    }

    return () => {
      document.body.classList.remove('modal-open'); // Clean up on unmount
    };
  }, [mobileModalStatus]);

  useEffect(() => {
    if (mobileModalStatus) {
      setIsAnimating(true); // Start the animation when the modal opens
    } else {
      // Trigger the closing animation
      setIsClosing(true);
      setTimeout(() => {
        // onClose(); // Call onClose after the animation duration
        setIsClosing(false);
      }, 500); // Match this to your animation duration
    }
  }, [mobileModalStatus, setMobileModalStatus]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMobileModalStatus();
      setIsClosing(false);
      setTranslateY(0);
      setModalHeight('auto');
    }, 300);
  };

  const handleTouchStart = (e) => {
    e.stopPropagation(); // Stop the event from bubbling up
    setStartY(e.touches[50].clientY);
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    e.stopPropagation(); // Stop the event from bubbling up
    const currentY = e.touches[0].clientY;
    const distanceMoved = currentY - startY;

    if (distanceMoved > 0) {
      setTranslateY(distanceMoved);
      setModalHeight(`${Math.max(100, window.innerHeight - translateY)}px`);
    }

    if (distanceMoved > window.innerHeight / 2) {
      handleClose();
    }

    e.preventDefault();
  };

  const handleTouchEnd = (e) => {
    e.stopPropagation(); // Stop the event from bubbling up
    if (translateY < window.innerHeight / 2) {
      setTranslateY(0);
      setModalHeight('auto');
    }
  };

  return (
    <>
      {mobileModalStatus && (
        <div className={`modal-backdrop ${isClosing ? 'fade-out' : 'fade-in'}`}>
          <div
            className={` flex justify-start items-center  z-[10000]  h-[550px] overflow-y-auto flex-col modal-content bg-white    ${
              isAnimating ? 'slide-up' : ''
            } ${isClosing ? 'slide-down' : ''}   `}
            style={{
              transition: 'transform 1s ease', // Ensure it matches the CSS
              height: modalHeight
              // transition: isClosing ? 'transform 0.3s ease' : 'height 0.3s ease'
            }}>
            <div
              className="bg-[#c5c3c3] w-14 h-2 rounded-large mt-5 lg:hidden block "
              onTouchStart={(e) => {
                handleTouchStart(e);
                e.stopPropagation(); // Prevent touch events from propagating
              }}
              onTouchMove={(e) => {
                handleTouchMove(e);
                e.stopPropagation(); // Prevent touch events from propagating
              }}
              onTouchEnd={(e) => {
                handleTouchEnd();
                e.stopPropagation(); // Prevent touch events from propagating
              }}
            />
            {component}
          </div>
        </div>
      )}
    </>
  );
};

export default MobileModal;
