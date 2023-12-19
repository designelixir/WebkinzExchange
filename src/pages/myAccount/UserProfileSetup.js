import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase-config';
import { query, collection, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { showTempMessage } from '../../utils/tempMessageUtils';


const UserProfileForm = () => {
  const { userID } = useGetUserInfo();
  const [username, setUsername] = useState('');
  const [userImgUrl, setUserImgUrl] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileQuery = query(collection(db, 'userProfile'), where('userIDNumber', '==', userID));
        const userProfileSnapshot = await getDocs(userProfileQuery);

        if (userProfileSnapshot.size === 1) {
          const userProfileData = userProfileSnapshot.docs[0].data();
          setUsername(userProfileData.username || '');
          setUserImgUrl(userProfileData.userProfileImg || '');
        }
      } catch (error) {
        showTempMessage(error.message)
      }
    };

    fetchUserProfile();
  }, [userID]);

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();

    try {
      const userProfileQuery = query(collection(db, 'userProfile'), where('userIDNumber', '==', userID));
      const userProfileSnapshot = await getDocs(userProfileQuery);

      if (userProfileSnapshot.size === 1) {
        const userProfileDoc = doc(db, 'userProfile', userProfileSnapshot.docs[0].id);
        await updateDoc(userProfileDoc, {
          username,
        });
        
      } else {
        const userProfileCollection = collection(db, 'userProfile');
        await addDoc(userProfileCollection, {
          userIDNumber: userID,
          username,
        });
      }

      setUsername('');
      showTempMessage("Successfully updated username - refresh the page to see changes")
      window.location.reload()
      // Reload the page
      
    } catch (error) {
      showTempMessage('Failed to update username - error:' + error.message)
    }
  };

  const handleUserImgUrlSubmit = async (e) => {
    e.preventDefault();

    try {
      const userProfileQuery = query(collection(db, 'userProfile'), where('userIDNumber', '==', userID));
      const userProfileSnapshot = await getDocs(userProfileQuery);

      if (userProfileSnapshot.size === 1) {
        const userProfileDoc = doc(db, 'userProfile', userProfileSnapshot.docs[0].id);
        await updateDoc(userProfileDoc, {
          userProfileImg: userImgUrl,
        });
        
      } else {
        const userProfileCollection = collection(db, 'userProfile');
        await addDoc(userProfileCollection, {
          userIDNumber: userID,
          userProfileImg: userImgUrl,
        });
      }

      setUserImgUrl('');
      showTempMessage("Successfully updated user profile image - refresh the page to see changes")
      window.location.reload()
      
      

      // Reload the page
      
    } catch (error) {
      showTempMessage('Failed to update user profile image -' + error.message)
    }
  };

  return (
    <div id="mySettingsContainer" className="settings-container">
      <h2>⚙️ My Profile Settings</h2>
      <form>
        <div className="flex-center-start">
          <label htmlFor="username">Username:&nbsp;</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <button type="submit" onClick={handleUsernameSubmit}>
            Update Username
          </button>
        </div>

        <div className="flex-center-start">
          <label htmlFor="userImgUrl">User Avatar Image:&nbsp;</label>
          <input
            type="text"
            id="userImgUrl"
            value={userImgUrl}
            onChange={(e) => setUserImgUrl(e.target.value)}
            required
          />

          <button type="submit" onClick={handleUserImgUrlSubmit}>
            Update Avatar Image
          </button>
        </div>
        <p style={{fontSize: "12px", fontStyle: "italic"}}>Paste a link to the photo you wish to use for your avatar.</p>
      </form>
    </div>
  );
};

export default UserProfileForm;
