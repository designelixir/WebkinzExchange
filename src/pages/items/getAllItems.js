import { useState, useEffect } from 'react';
import { db, serverTimestamp } from '../../config/firebase-config';
import {
  collection,
  getDocs,
  doc,
  getDoc, // Import getDoc explicitly
} from 'firebase/firestore';
import { ItemCard } from '../../components/ItemCard';

const GetAllItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsCollection = collection(db, 'items');
        const itemsSnapshot = await getDocs(itemsCollection);

        // Use Promise.all to wait for all asynchronous operations to complete
        const itemsData = await Promise.all(
          itemsSnapshot.docs.map(async (itemDoc) => {
            // Use getDoc to fetch the document data
            const fullItemDoc = await getDoc(doc(db, 'items', itemDoc.id));

            return {
              id: itemDoc.id,
              ...fullItemDoc.data(),
            };
          })
        );

        setItems(itemsData);
      } catch (error) {
        console.error('Error fetching items:', error.message);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="flex-start-start flex-wrap">
      {items.map((item) => (
        <ItemCard
          key={item.id}
          itemID={item.id}
          itemName={item.itemName}
          itemImgUrl={item.itemImgUrl}
          itemAvailable={item.itemAvailable}
          itemType={item.itemType}
          itemCategory={item.itemCategory}
          itemShowCartButton={false}
        ></ItemCard>
      ))}
    </div>
  );
};

export default GetAllItems;
