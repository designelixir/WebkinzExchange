// AddStore.js
import React, { useEffect, useState } from 'react';

import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { showTempMessage } from '../../utils/tempMessageUtils';

export const EditStore = ({itemID}) => {
  const { userID } = useGetUserInfo();
  const [isForSale, setIsForSale] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemDoc = doc(db, 'items', itemID);
        const itemSnapshot = await getDoc(itemDoc);
        const data = itemSnapshot.data();
        setIsForSale((data?.soldBy || []).includes(userID));

      } catch (error) {
        console.log(error.message)
      }
    };

    fetchData();
  }, [itemID, userID]);

  const handleStoreByClick = async () => {
    try {
      const itemRef = doc(db, 'items', itemID);

      if (isForSale) {
        await updateDoc(itemRef, { soldBy: arrayRemove(userID) });
        showTempMessage("Successfully removed item to My Store")
        
      } else {
        await updateDoc(itemRef, { soldBy: arrayUnion(userID) });
        showTempMessage("Successfully added item from My Store")
        
      }

      setIsForSale(!isForSale);
    } catch (error) {
        console.log(error.message)
    }
  };

  return (
    
      
    <div>
        <button>Edit My Store</button>
    </div>
  );
};
