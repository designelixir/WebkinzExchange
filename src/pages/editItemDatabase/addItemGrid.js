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
    <div>
        <div className="item-row flex-center-start">
            <Link to={`/item/${itemID}`}>
            <div className="Item-details">
            <img className="Item-image" src={itemImgUrl} alt={itemName} />
            <p className="Item-title">{itemName}</p>
            </div>
            </Link>
        </div>
    </div>
      <div className="Item" id={itemID} datatype={itemCategory}>
        <div className="item-details flex-center-center">
          <h6 className="item-category">{itemCategory}</h6>
          <h6 className="Item-type">{itemIs}</h6>
        </div>
        
        <div className="flex-center-center item-card-buttons">

        </div>
      </div>
    </>
  );
};
