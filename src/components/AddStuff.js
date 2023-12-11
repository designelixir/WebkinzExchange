// AddStuff.js
import React, { useEffect, useState } from 'react';
import stuff from '../assets/house.png';
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase-config';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { showTempMessage } from '../utils/tempMessageUtils';


export const AddStuff = ({ itemID }) => {
  const { userID } = useGetUserInfo();
  const [isOwned, setIsOwned] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemDoc = doc(db, 'items', itemID);
        const itemSnapshot = await itemDoc.get();
        const data = itemSnapshot.data();
        setIsOwned((data?.ownedBy || []).includes(userID));
      } catch (error) {
        showTempMessage(error.message)
      }
    };

    fetchData();
  }, [itemID, userID]);

  const handleStoreButtonClick = async () => {
    try {
      const itemRef = doc(db, 'items', itemID);

      if (isOwned) {
        await updateDoc(itemRef, { ownedBy: arrayRemove(userID) });
        showTempMessage("Successfully removed item from My Stuff")
      } else {
        await updateDoc(itemRef, { ownedBy: arrayUnion(userID) });
        showTempMessage("Successfully added item to My Stuff")
      }

      setIsOwned(!isOwned);
    } catch (error) {
      console.log(error.message)
    }
  };

  return (
    <div onClick={handleStoreButtonClick} style={{ filter: isOwned ? 'grayscale(0)' : 'grayscale(1)' }}>
      {isOwned ? <img className="icon hover" src={stuff} alt="Stuff" /> : <img className="icon hover" src={stuff} alt="Stuff" />}
    </div>
  );
};

