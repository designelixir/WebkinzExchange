import React, { useState, useEffect, useRef } from 'react';
import { db, storage } from '../../config/firebase-config';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';

export const UserProfileImageUpload = () => {
  const { userID } = useGetUserInfo();
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch user profile data to check if an image already exists
    const fetchUserProfileData = async () => {
      try {
        const userProfileRef = db.collection('userProfiles').doc(userID);
        const userProfileDoc = await userProfileRef.get();

        if (userProfileDoc.exists) {
          const userData = userProfileDoc.data();
          // If the user has an image, set it in the state
          if (userData && userData.userImgUrl) {
            setImage(userData.userImgUrl);
          }
        }
      } catch (error) {
        console.error('Error fetching user profile data:', error.message);
      }
    };

    fetchUserProfileData();
  }, [userID]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadButtonClick = async () => {
    if (selectedFile) {
      try {
        const storageRef = storage.ref();
        const fileRef = storageRef.child(`userProfileImages/${userID}/${selectedFile.name}`);

        // Upload file to Firebase Storage
        const snapshot = await fileRef.put(selectedFile);
        console.log('File uploaded successfully:', snapshot);

        // Get download URL
        const downloadURL = await fileRef.getDownloadURL();

        // Update user profile with the new image URL
        const userProfileRef = db.collection('userProfiles').doc(userID);
        await userProfileRef.update({ userImgUrl: downloadURL });

        // Set the image URL in the state
        setImage(downloadURL);
        // Clear the selected file
        setSelectedFile(null);
      } catch (error) {
        console.error('Error uploading file:', error.message);
      }
    }
  };

  const handleDeleteImage = async () => {
    try {
      // Update user profile to remove the image URL
      const userProfileRef = db.collection('userProfiles').doc(userID);
      await userProfileRef.update({ userImgUrl: null });

      // Set the image URL in the state to null
      setImage(null);
    } catch (error) {
      console.error('Error deleting image:', error.message);
    }
  };

  return (
    <div>
      {image && <img src={image} alt="User Profile" style={{ maxWidth: '100px', maxHeight: '100px' }} />}
      <input
        type="file"
        id="fileInput"
        accept="image/*"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      {selectedFile && <button onClick={handleUploadButtonClick}>Upload Image</button>}
      <button onClick={handleDeleteImage}>Delete Image</button>
      <label htmlFor="fileInput">Browse for File</label>
    </div>
  );
};
