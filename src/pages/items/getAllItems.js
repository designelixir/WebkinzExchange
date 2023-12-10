import { useState, useEffect } from 'react';
import { db, serverTimestamp } from '../../config/firebase-config'; // Make sure to import serverTimestamp
import { query, collection, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import {ItemCard} from '../../components/ItemCard'

const GetAllItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsCollection = collection(db, 'items');
        const itemsSnapshot = await getDocs(itemsCollection);

        const itemsData = [];
        itemsSnapshot.forEach((doc) => {
          const { itemName, itemImgUrl, itemAvailable } = doc.data();
          itemsData.push({
            id: doc.id,
            itemName,
            itemImgUrl,
            itemAvailable,
          });
        });

        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching items:', error.message);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
      
      {items.map((item) => (
        <ItemCard
        itemID={item.id}
        itemName={item.itemName}
        itemImgUrl={item.itemImgUrl}
        itemAvailable = {item.itemAvailable}
       ></ItemCard>
      ))}
    </div>
  );
};

export default GetAllItems
