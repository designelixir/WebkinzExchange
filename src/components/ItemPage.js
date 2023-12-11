import React, { useEffect, useState } from 'react';

import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from 'firebase/firestore';
import { db } from '../config/firebase-config';



export const ItemPage = ({ itemID, setPageTitle, setPageDescription }) => {
  console.log("item id is: " + itemID)
  useEffect(() => {
    setPageTitle('Item Page');
    setPageDescription('This is a breakdown of an item');
  }, [setPageTitle, setPageDescription]);

 

  

  return (
    <section>
      <div>{itemID}</div>
    </section>
    
      
  );
};


