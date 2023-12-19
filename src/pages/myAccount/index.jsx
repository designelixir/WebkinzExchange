import React, { useEffect } from 'react';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';
import UserProfileForm from './UserProfileSetup';
import useUsername from '../../hooks/useUsername';
import { StoreSetup } from './StoreSetup';

export const MyAccount = ({ setPageTitle, setPageDescription }) => {
  useEffect(() => {
    setPageTitle('My Account');
    setPageDescription('Change your profile settings here.');
  }, [setPageTitle, setPageDescription]);

    const {userID, isAuth} = useGetUserInfo();
    const username = useUsername();
    
    return (
    <section>
      <p>Your user ID: {userID}</p>
      <h5 className="italic">This id comes from your Google Account. No other Google Account information is assosciated with this app.</h5>
    {isAuth ? (
      <>
        <div>
          <UserProfileForm></UserProfileForm>
          <StoreSetup></StoreSetup>
        </div>
      </>
      ) : (
        <div className="page-container">
          <p className="centered">Please Sign In to view this page.</p>
        </div>
        
      )}
    </section>
    )
}

