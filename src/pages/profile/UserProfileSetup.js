import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase-config';
import { query, collection, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';

const UserProfileForm = () => {
  console.log("calling useProfileSetup")
  const { userID } = useGetUserInfo();
  const [username, setUsername] = useState('');
  const [userImgUrl, setUserImgUrl] = useState('');

  useEffect(() => {
    // Fetch existing user profile data and populate the form if exists
    const fetchUserProfile = async () => {
      try {
        const userProfileQuery = query(collection(db, 'userProfile'), where('userIDNumber', '==', userID));
        const userProfileSnapshot = await getDocs(userProfileQuery);

        if (userProfileSnapshot.size === 1) {
          // If a match is found, populate the form with existing data
          const userProfileData = userProfileSnapshot.docs[0].data();
          setUsername(userProfileData.username || ''); // Use default value if undefined
          setUserImgUrl(userProfileData.userProfileImg || ''); // Use default value if undefined
        }
      } catch (error) {
        console.error('Error fetching user profile:', error.message);
      }
    };

    fetchUserProfile();
  }, [userID]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const userProfileQuery = query(collection(db, 'userProfile'), where('userIDNumber', '==', userID));
      const userProfileSnapshot = await getDocs(userProfileQuery);

      if (userProfileSnapshot.size === 1) {
        // If a match is found, update the existing document
        const userProfileDoc = doc(db, 'userProfile', userProfileSnapshot.docs[0].id);
        await updateDoc(userProfileDoc, {
          username,
          userProfileImg: userImgUrl, // Update userProfileImg field
        });
      } else {
        // If no match is found, add a new document
        const userProfileCollection = collection(db, 'userProfile');
        await addDoc(userProfileCollection, {
          userIDNumber: userID,
          username,
          userProfileImg: userImgUrl,
        });
      }
      // Clear input fields after submission
      setUsername('');
      setUserImgUrl('');

      console.log('User profile added/updated successfully');
    } catch (error) {
      console.error('Error adding/updating user profile:', error.message);
    }
  };

  return (
    <div style={{width: '100%'}}>
      <h2>My Settings</h2>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username:&nbsp;</label>
        
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <p>Type your new username and click submit. </p>
      
        <label htmlFor="userImgUrl">User Image URL:&nbsp;</label>
        <input
          type="text"
          id="userImgUrl"
          value={userImgUrl}
          onChange={(e) => setUserImgUrl(e.target.value)}
          required
        />
        <p>Type a link to the photo you wish to use for your avatar.</p>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserProfileForm;
