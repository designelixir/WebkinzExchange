// AddStore.js
import React, { useEffect, useState } from 'react';
import store from '../assets/wshop.png';
import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { showTempMessage } from '../utils/tempMessageUtils';
import { useGlobalState } from './GlobalStateContext';

export const AddStore = ({ itemID }) => {
  const { userID } = useGetUserInfo();
  const { getItemState, fetchItemStates } = useGlobalState();
  const [localIsForSale, setLocalIsForSale] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchItemStates(itemID);
        const { isForSale } = getItemState(itemID);
        setLocalIsForSale(isForSale);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [itemID, fetchItemStates, getItemState]);

  const handleStoreByClick = async () => {
    try {
      const itemRef = doc(db, 'items', itemID);

      if (localIsForSale) {
        await updateDoc(itemRef, { soldBy: arrayRemove(userID) });
        showTempMessage('Successfully removed item from My Store');
      } else {
        await updateDoc(itemRef, { soldBy: arrayUnion(userID) });
        showTempMessage('Successfully added item to My Store');
      }

      // Fetch and update the state for the specific itemID
      await fetchItemStates(itemID);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div onClick={handleStoreByClick} style={{ filter: localIsForSale ? 'grayscale(0)' : 'grayscale(1)' }}>
      {localIsForSale ? (
        <div className="flex-center-start hover">
          <img className="icon" src={store} alt="Store" />
          <p style={{ fontSize: '12px' }}>In My Store</p>
        </div>
      ) : (
        <div className="flex-center-start hover">
          <img className="icon" src={store} alt="Store" />
          <p style={{ fontSize: '12px' }}>Add to Store</p>
        </div>
      )}
    </div>
  );
};
