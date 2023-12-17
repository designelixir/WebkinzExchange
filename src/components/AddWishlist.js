// AddWishlist.js
import React, { useEffect, useState } from 'react';
import wishlist from '../assets/wishlist.png';
import { doc, updateDoc, arrayRemove, arrayUnion, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { showTempMessage } from '../utils/tempMessageUtils';
import { useGlobalState } from './GlobalStateContext';

export const AddWishlist = ({ itemID }) => {
  const { userID } = useGetUserInfo();
  const { getItemState, fetchItemStates } = useGlobalState();
  const [localIsWanted, setLocalIsWanted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchItemStates(itemID);
        const { isWanted } = getItemState(itemID);
        setLocalIsWanted(isWanted);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [itemID, fetchItemStates, getItemState]);

  const handleWishlistClick = async () => {
    try {
      const itemRef = doc(db, 'items', itemID);

      if (localIsWanted) {
        await updateDoc(itemRef, { wantedBy: arrayRemove(userID) });
        showTempMessage('Successfully removed item from My Wishlist');
      } else {
        await updateDoc(itemRef, { wantedBy: arrayUnion(userID) });
        showTempMessage('Successfully added item to My Wishlist');
      }

      // Fetch and update the state for the specific itemID
      await fetchItemStates(itemID);
      setLocalIsWanted(!localIsWanted);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div onClick={handleWishlistClick} style={{ filter: localIsWanted ? 'grayscale(0)' : 'grayscale(1)' }}>
      {localIsWanted ? (
        <div className="flex-center-start">
          <img className="icon hover" src={wishlist} alt="Wishlist" />
          <p style={{ fontSize: '12px' }}>In My Wishlist</p>
        </div>
      ) : (
        <div className="flex-center-start">
          <img className="icon hover" src={wishlist} alt="Wishlist" />
          <p style={{ fontSize: '12px' }}>Add to Wishlist</p>
        </div>
      )}
    </div>
  );
};
