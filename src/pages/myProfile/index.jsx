import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import { db } from '../../config/firebase-config';
import { query, collection, where, getDocs } from 'firebase/firestore';
import './myProfile.css';
import wishIcon from '../../assets/wishlist.png';
import storeIcon from '../../assets/wshop.png';
import { StoreSetup } from '../myAccount/StoreSetup';
import { StoreGenerator } from '../myStore/StoreGenerator';

export const PublicProfile = ({ setPageTitle, setPageDescription }) => {
  const { userID } = useGetUserInfo(); // logged in user
  const { userId } = useParams(); // user profile
  const { isAuth, createdAt } = useGetUserInfo();
  const [username, setUsername] = useState('');
  const [userImgUrl, setUserImgUrl] = useState('');
  const [storeBannerImgUrl, setUserBannerImgUrl] = useState('');
  const [activeTab, setActiveTab] = useState('toggle-user-store');
  const [storeVisibility, setStoreVisibility] = useState(true);
  const [wishlistVisibility, setWishlistVisibility] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfileQuery = query(collection(db, 'userProfile'), where('userIDNumber', '==', userId));
        const userProfileSnapshot = await getDocs(userProfileQuery);

        if (userProfileSnapshot.size === 1) {
          const userProfileData = userProfileSnapshot.docs[0].data();
          setUsername(userProfileData.username || userId);
          setUserImgUrl(userProfileData.userProfileImg || '');
          setUserBannerImgUrl(userProfileData.storeBannerImgUrl || '');
          setStoreVisibility(userProfileData.storeIsPublic || false);
          setWishlistVisibility(userProfileData.wishlistIsPublic || false);

          // Set page title and description
          setPageTitle('Webkinz Exchange');
          setPageDescription('');
        } else {
          // Handle the case when user data is not found
          console.error(`User data not found for userID: ${userId}`);
        }
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserProfile();
  }, [userId, setPageTitle, setPageDescription]);

  const toggleTabs = (tab) => {
    setActiveTab(tab);
    setStoreVisibility(tab === 'toggle-user-store');
    setWishlistVisibility(tab === 'toggle-user-wishlist');
  };

  useEffect(() => {
    // Run toggleTabs('toggle-user-store') when the component mounts
    toggleTabs('toggle-user-store');
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  return (
    <>
      <section>
        {/* Use the 'username' and 'userImgUrl' variables in your component's return statement */}
        {userID === userId && (
          <div id="logged-in-page-settings">
            <h5>These settings are only visible to you.</h5>
            <StoreSetup></StoreSetup>
          </div>
        )}

        <div className="flex-center-center user-page-banner">
          <img src={storeBannerImgUrl}></img>
        </div>

        <div className="user-page-nav flex-end-spacebetween">
          <div className="flex-center-start user-page-avatar">
            <img src={userImgUrl} className="user-page-avatar-image"></img>
            <div>
              <h3>{username}'s Exchange</h3>
            </div>
          </div>
          <div className="flex-end-end">
            <div
              className={`user-page-nav-button flex-center-center hover ${activeTab === 'toggle-user-store' ? 'active-tab' : ''}`}
              onClick={() => toggleTabs('toggle-user-store')}
              id="toggle-user-store"
            >
              <img className="icon" src={storeIcon}></img>
              {username}'s Store
            </div>
            <div
              className={`user-page-nav-button flex-center-center hover ${activeTab === 'toggle-user-wishlist' ? 'active-tab' : ''}`}
              onClick={() => toggleTabs('toggle-user-wishlist')}
              id="toggle-user-wishlist"
            >
              <img className="icon" src={wishIcon}></img>
              {username}'s Wishlist
            </div>
          </div>
        </div>
        <div id="user-store" className={`user-page-window ${storeVisibility ? 'active-window' : ''}`}>
          {storeVisibility === true ? (
            <>
              <p>Filter By:</p>
              <StoreGenerator userId={userId} />
            </>
          ) : (
            <p>This store is set to private :-C</p>
          )}
        </div>
        <div id="user-wishlist" className={`user-page-window ${wishlistVisibility ? 'active-window' : ''}`}>
          {wishlistVisibility === true ? (
            <p>My Wishlist</p>
          ) : (
            <p>This wishlist is set to private :-C</p>
          )}
        </div>
      </section>
    </>
  );
};
