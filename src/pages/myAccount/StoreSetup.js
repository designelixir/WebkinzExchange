import React, { useState, useEffect } from 'react';
import { db } from '../../config/firebase-config';
import { query, collection, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { showTempMessage } from '../../utils/tempMessageUtils';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';

export const StoreSetup = () => {
  const { userID } = useGetUserInfo();
  const [storeIsPublic, setStoreIsPublic] = useState(false);
  const [wishlistIsPublic, setWishlistIsPublic] = useState(false);
  const [storeBannerImgUrl, setStoreBannerImgUrl] = useState('');

  useEffect(() => {
    const fetchStoreSettings = async () => {
      try {
        const storeQuery = query(collection(db, 'userProfile'), where('userIDNumber', '==', userID));
        const storeSnapshot = await getDocs(storeQuery);

        if (storeSnapshot.size >= 1) {
          const storeData = storeSnapshot.docs[0].data();
          console.log('Fetched data:', storeData); // Log fetched data
          setStoreIsPublic(storeData.storeIsPublic || false);
          setWishlistIsPublic(storeData.wishlistIsPublic || false);
          setStoreBannerImgUrl(storeData.storeBannerImgUrl || '');
        } else {
          console.log('No matching document found for userID:', userID);
        }
      } catch (error) {
        console.error('Error fetching store settings:', error.message);
        showTempMessage(error.message);
      }
    };

    fetchStoreSettings();
  }, [userID]);

  const handleCheckboxChange = async (field) => {
    try {
      const userProfileRef = doc(db, 'userProfile', userID);
      await updateDoc(userProfileRef, { [field]: !(field === 'storeIsPublic' ? storeIsPublic : wishlistIsPublic) });

      if (field === 'storeIsPublic') {
        setStoreIsPublic(!storeIsPublic);
        showTempMessage(`Store visibility updated successfully!`);
      } else if (field === 'wishlistIsPublic') {
        setWishlistIsPublic(!wishlistIsPublic);
        showTempMessage(`Wishlist visibility updated successfully!`);
      }
    } catch (error) {
      console.error(`Error updating ${field} visibility:`, error.message);
      showTempMessage(`Error updating ${field} visibility. Please try again later.`);
    }
  };

  const handleUpdateImageUrl = async () => {
    try {
      const userProfileRef = doc(db, 'userProfile', userID);
      await updateDoc(userProfileRef, { storeBannerImgUrl });
      showTempMessage(`Store banner image URL updated successfully!`);
    } catch (error) {
      console.error('Error updating store banner image URL:', error.message);
      showTempMessage('Error updating store banner image URL. Please try again later.');
    }
  };

  return (
    <>
      <div id="myStoreSettingsContainer" className="settings-container">
        <h2>My Store Settings</h2>
        <h5>
          When switched on, your store is publicly visible under the
          link <a href={`user/${userID}`}>/user/{userID}</a>
        </h5>
        <form>
          <div className="flex-center-start">
            <label id="storeOpen">Show my store publicly:&nbsp;</label>
            <div className="flex-center-start">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={storeIsPublic}
                  onChange={() => handleCheckboxChange('storeIsPublic')}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="flex-center-start">
            <label>Show my wishlist publicly: &nbsp;</label>
            <div className="flex-center-start">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={wishlistIsPublic}
                  onChange={() => handleCheckboxChange('wishlistIsPublic')}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
          <div className="flex-center-start">
            <br></br>
            <label>Store banner image URL: &nbsp;</label>
            <input
              type="text"
              placeholder="Enter image URL"
              value={storeBannerImgUrl}
              onChange={(e) => setStoreBannerImgUrl(e.target.value)}
            />
            <button type="button" onClick={handleUpdateImageUrl}>
              Update Image URL
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
