// ItemCard.js
import React, { useEffect, useState } from 'react';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { Link } from 'react-router-dom';


export const AddItemGrid = ({ itemID, itemName, itemImgUrl, itemAvailable, itemType, itemDockType, itemCategory }) => {
  const { userID } = useGetUserInfo();

  var itemIs;
  if (itemType === 1) {
    itemIs = 'Food';
  } else if (itemType === 2) {
    itemIs = 'Clothing';
  } else if (itemType === 3) {
    itemIs = 'Furniture';
  } else if (itemType === 4) {
    itemIs = 'Decoration';
  }
  console.log()

  return (
    <>
    <div className="item-row" style={{border: '1px solid black'}}>
     
      </div>
    </>
  );
};
