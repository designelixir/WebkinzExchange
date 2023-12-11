import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { ItemCard } from '../../components/ItemCard'; // Import the ItemCard component

export const MyStore = ({ setPageTitle, setPageDescription }) => {
    useEffect(() => {
        setPageTitle('My Store');
        setPageDescription('This is where all the items that I have for trade will go');
      }, [setPageTitle, setPageDescription]);
      const { userID } = useGetUserInfo();
  const [storeItems, setStoreItems] = useState([]);

  useEffect(() => {
    const fetchStoreItems = async () => {
      try {
        // Create a query to get documents where "soldBy" array contains the userID
        const q = query(collection(db, 'items'), where('soldBy', 'array-contains', userID));
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
  }, [userID]);
    return (
    <section>
        {storeItems.map((item) => (
                <ItemCard
                key={item.id}
                itemID={item.id}
                itemName={item.itemName}
                itemImgUrl={item.itemImgUrl}
                itemAvailable={item.itemAvailable}
                itemType={item.itemType}
                itemCategory={item.itemCategory}
                />
            ))}
    </section>
    
    )
}

