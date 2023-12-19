import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import { ItemCard } from '../../components/ItemCard'; // Import the ItemCard component
import { EditStore } from './editStore';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';

export const StoreGenerator = ({ userId, setPageTitle, setPageDescription }) => {
  const [storeItems, setStoreItems] = useState([]);
  const { userID } = useGetUserInfo(); //logged in user
  
  useEffect(() => {
    const fetchStoreItems = async () => {
      try {
        // Create a query to get documents where "soldBy" array contains the userId
        const q = query(collection(db, 'items'), where('soldBy', 'array-contains', userId));
        const querySnapshot = await getDocs(q);

        // Extract the data from the query snapshot
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setStoreItems(items);
      } catch (error) {
        console.error('Error fetching store items:', error.message);
      }
    };

    // Call the fetchStoreItems function
    fetchStoreItems();
  }, [userId]);

  useEffect(() => {
    setPageTitle('My Store');
    setPageDescription('This is where all the items for trade will go');
  }, [userId, setPageTitle, setPageDescription]);

  return (
    <section>
      
      <div className="flex-start-start flex-wrap">
        {storeItems.map((item) => (
          <ItemCard
            key={item.id}
            itemID={item.id}
            itemName={item.itemName}
            itemImgUrl={item.itemImgUrl}
            itemAvailable={item.itemAvailable}
            itemType={item.itemType}
            itemCategory={item.itemCategory}
            itemShowCartButton={userId != userID}
          />
        ))}
      </div>
    </section>
  );
};
