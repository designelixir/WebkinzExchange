import { useState, useEffect } from 'react';
import { db, serverTimestamp } from '../config/firebase-config'; // Make sure to import serverTimestamp
import { query, collection, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useGetUserInfo } from './useGetUserInfo';

const useUsername = () => {
  const { userID } = useGetUserInfo();
  const [userInfo, setUserInfo] = useState({
    username: '',
    userProfileImg: '',
    createdAt: null, // Add a new field to store the creation timestamp
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Check if the user is authenticated
        if (userID) {
          const userProfileQuery = query(collection(db, 'userProfile'), where('userIDNumber', '==', userID));
          const userProfileSnapshot = await getDocs(userProfileQuery);

          if (userProfileSnapshot.size === 1) {
            // If a match is found, update the state with the username, userProfileImg, and createdAt
            const userProfileData = userProfileSnapshot.docs[0].data();
            setUserInfo({
              username: userProfileData.username || '', // Use default value if undefined
              userProfileImg: userProfileData.userProfileImg || '', // Use default value if undefined
              createdAt: userProfileData.createdAt || null, // Use default value if undefined
            });
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, [userID]);

  return userInfo;
};

export default useUsername;
