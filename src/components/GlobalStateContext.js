// GlobalStateContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const { userID } = useGetUserInfo();

  // Store the state for each itemID in a map
  const [itemStates, setItemStates] = useState({});

  const fetchItemStates = async (itemID) => {
    try {
      const itemDoc = doc(db, 'items', itemID);
      const itemSnapshot = await getDoc(itemDoc);
      const data = itemSnapshot.data();

      // Update the itemStates map
      setItemStates((prevItemStates) => ({
        ...prevItemStates,
        [itemID]: {
          isForSale: (data?.soldBy || []).includes(userID),
          isWanted: (data?.wantedBy || []).includes(userID),
        },
      }));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // Fetch initial state for each itemID
    const itemIDs = ['exampleItemForSaleID', 'anotherExampleItemID'];
    itemIDs.forEach((itemID) => {
      fetchItemStates(itemID);
    });
  }, [userID]);

  const state = {
    getItemState: (itemID) => itemStates[itemID] || {}, // Get the state for a specific itemID
    fetchItemStates, // Function to fetch and update state for a specific itemID
  };

  return (
    <GlobalStateContext.Provider value={state}>{children}</GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
