// AddWishlist.js
import React, { useEffect, useState } from 'react';
import wishlist from '../assets/wishlist.png';
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { showTempMessage } from '../utils/tempMessageUtils';

export const AddWishlist = ({ itemID }) => {
  const { userID } = useGetUserInfo();
  const [isWanted, setIsWanted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemDoc = doc(db, 'items', itemID);
        const itemSnapshot = await getDoc(itemDoc);
        const data = itemSnapshot.data();
        setIsWanted((data?.wantedBy || []).includes(userID));
      } catch (error) {
        showTempMessage(error.message)
      }
    };

    fetchData();
  }, [itemID, userID]);

  const handleWishlistClick = async () => {
    try {
      const itemRef = doc(db, 'items', itemID);

      if (isWanted) {
        await updateDoc(itemRef, { wantedBy: arrayRemove(userID) });
        showTempMessage("Successfully removed item from My Wishlist")
      } else {
        await updateDoc(itemRef, { wantedBy: arrayUnion(userID) });
        showTempMessage("Successfully added item to My Wishlist")
      }

      setIsWanted(!isWanted);
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div onClick={handleWishlistClick} style={{ filter: isWanted ? 'grayscale(0)' : 'grayscale(1)' }}>
      {isWanted ? <img className="icon hover" src={wishlist} alt="Wishlist" /> : <img className="icon hover" src={wishlist} alt="Wishlist" />}
    </div>
  );
};
