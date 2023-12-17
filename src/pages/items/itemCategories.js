import { useState, useEffect } from 'react';
import { db, serverTimestamp } from '../../config/firebase-config'; // Make sure to import serverTimestamp
import { query, collection, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import {ItemCard} from '../../components/ItemCard'

export const ItemCategories = () => {
  
    

  return (
    <div className="item-filters-container">
            
            <h3 className="white">Item Categories</h3>
            <div className="item-filters-list">
            
              <ul>
                <li>Show All Items</li>
                <li>Adventure Park</li>
                <li>Challenges</li>
                <li>Christmas &amp; Hanukkah</li>
                <li>Christmas Countdown</li>
                <li>Click-to-Win: Annual</li>
                <li>Click-to-Win: Non-Annual</li>
                <li>Clubhouse Events</li>
                <li>Collection Events</li>
                <li>Community Codes</li>
                <li>Curio Shop Only</li>
              </ul>
            </div>
          </div>
  );
};


