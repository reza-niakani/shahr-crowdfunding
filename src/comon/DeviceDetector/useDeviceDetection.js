import { useState, useEffect } from 'react';

const useDeviceDetection = () => {
  const [isMobileSize, setIsMobileSize] = useState(false);

  useEffect(() => {
    const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const screenWidth = window.innerWidth;

      // Define breakpoints for mobile and tablet
      // const mobileBreakpoint = 768; // Typically mobile screens are <= 768px its correct but i chnage to 1024 beacus i have only one breack point
      const mobileBreakpoint = 1284;
      const tabletBreakpoint = 1024; // Typically tablets are <= 1024px

      // Check user agent for mobile or tablet
      const isMobile = /iphone|ipad|ipod|android|blackberry|windows phone|mobile/i.test(userAgent);
      const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/i.test(userAgent);

      // Determine if the screen width is within mobile or tablet range
      const isWidthMobile = screenWidth <= mobileBreakpoint;
      const isWidthTablet = screenWidth <= tabletBreakpoint && screenWidth > mobileBreakpoint;

      // Update state based on user agent and screen width
      if (isMobile || isWidthMobile) {
        setIsMobileSize(true);
      } else if (isTablet || isWidthTablet) {
        setIsMobileSize(true);
      } else {
        setIsMobileSize(false);
      }
    };

    handleDeviceDetection(); // Initial check
    window.addEventListener('resize', handleDeviceDetection); // Add resize listener

    return () => {
      window.removeEventListener('resize', handleDeviceDetection); // Cleanup listener
    };
  }, []); // Empty dependency array to run effect on mount and cleanup

  return isMobileSize;
};

export default useDeviceDetection;
