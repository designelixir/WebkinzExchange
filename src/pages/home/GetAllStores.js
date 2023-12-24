import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, collectionGroup, getDocs as getDocsGroup } from 'firebase/firestore';
import { db } from '../../config/firebase-config';

export const GetAllStores = () => {
  const [storeUsers, setStoreUsers] = useState([]);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        // Create a query to get user profiles where storeIsPublic is true
        const q = query(collection(db, 'userProfile'), where('storeIsPublic', '==', true));
        const querySnapshot = await getDocs(q);
        console.log(q)
        
        // Extract user data and update state
        const stores = [];
        for (const doc of querySnapshot.docs) {
          const { userID, username, userProfileImg } = doc.data();

          // Count the number of items where the user is in the "soldBy" field
          const itemsSoldByUser = await countItemsSoldByUser(userID);

          stores.push({ userID, username, userProfileImg, itemsSoldByUser });
        }

        setStoreUsers(stores);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    // Call the function to fetch stores
    fetchStores();
  }, []);

  const countItemsSoldByUser = async (userID) => {
    try {
      const itemsSoldByUserQuery = query(collectionGroup(db, 'items'), where('soldBy', 'array-contains', userID));
      const itemsSoldByUserSnapshot = await getDocsGroup(itemsSoldByUserQuery);
      return itemsSoldByUserSnapshot.size;
    } catch (error) {
      console.error('Error counting items sold by user:', error);
      return 0;
    }
  };

  return (
    <div className="store-list flex-start-start">
      {storeUsers.map((user) => (
        <div key={user.userID} className="mini-profile">
          <Link to={`/user/${user.userID}`} className="link flex-center-center flex-column">
            <img src={user.userProfileImg} alt={user.username} />
            <p>{user.username}</p>
            <span>{user.userID}</span>
            <p>Items Sold: {user.itemsSoldByUser}</p>
            <button className="centered">View Shop</button>
          </Link>
        </div>
      ))}
    </div>
  );
};


