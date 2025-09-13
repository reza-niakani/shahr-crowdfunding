import React, { createContext, useContext, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PreviousLocationContext = createContext(null);

export const PreviousLocationProvider = ({ children }) => {
  const location = useLocation();
  const previousLocation = useRef(null);

  useEffect(() => {
    previousLocation.current = location;
  }, [location]);

  return (
    <PreviousLocationContext.Provider value={previousLocation.current}>
      {children}
    </PreviousLocationContext.Provider>
  );
};

export const usePreviousLocation = () => useContext(PreviousLocationContext);
