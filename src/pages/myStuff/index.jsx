import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { ItemCard } from '../../components/ItemCard';

export const MyStuff = ({ setPageTitle, setPageDescription }) => {
  useEffect(() => {
    setPageTitle('My Stuff');
    setPageDescription('These are all the items you own');
  }, [setPageTitle, setPageDescription]);

  const { userID } = useGetUserInfo();
  const [myItems, setMyItems] = useState([]);

  useEffect(() => {
    const fetchMyItems = async () => {
      try {
        // Create a query to get documents where "ownedBy" array contains the userID
        const q = query(collection(db, 'items'), where('ownedBy', 'array-contains', userID));
        const querySnapshot = await getDocs(q);

        // Extract the data from the query snapshot
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setMyItems(items);
      } catch (error) {
        console.error('Error fetching owned items:', error.message);
      }
    };

    // Call the fetchMyItems function
    fetchMyItems();
  }, [userID]);

  return (
    <section className="flex-start-start flex-wrap">
      {myItems.map((item) => (
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
  );
};
