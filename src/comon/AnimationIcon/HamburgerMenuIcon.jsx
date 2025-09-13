import React, { useContext } from 'react';
import './HamburgerMenu.css'; // For custom animations that can't be replaced with Tailwind.
import DataContext from 'comon/context/MainContext';

const HamburgerMenuIcon = () => {
  const { hamburgerMenuStatus, setHamburgerMenuStatus } = useContext(DataContext);

  const toggleMenu = () => {
    if (hamburgerMenuStatus == 'sidebar') {
      setHamburgerMenuStatus(false);
    } else {
      setHamburgerMenuStatus('sidebar');
    }
  };

  return (
    <div className="flex   justify-center items-center h-auto ">
      <div
        className={`hamburger ${hamburgerMenuStatus ? 'is-active' : ''}`}
        onClick={toggleMenu}
        id="hamburger-6">
        <span className="line bg-gray-800 "></span>
        <span className="line bg-gray-800 "></span>
        <span className="line bg-gray-800 "></span>
      </div>
    </div>
  );
};

export default HamburgerMenuIcon;
