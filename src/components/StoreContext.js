// StoreContext.js
import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [isOwned, setIsOwned] = useState(/* initial value */);
  const [isWanted, setIsWanted] = useState(/* initial value */);
  const [isForSale, setIsForSale] = useState(/* initial value */);

  return (
    <StoreContext.Provider value={{ isOwned, setIsOwned, isWanted, setIsWanted, isForSale, setIsForSale }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
