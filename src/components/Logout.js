import React from 'react';
// Import the functions you need from the SDKs you need
import { Link } from 'react-router-dom';
import { Auth } from '../pages/auth/index'
import { useGetUserInfo } from '../hooks/useGetUserInfo';

export const Logout = () => {
  
    const {userID, isAuth} = useGetUserInfo();
    
  return (
    <div>
        {isAuth ? (
        // Render this HTML if myVariable is true
            <div>
                <Link to='/profile' ><p>Welcome, {userID}</p></Link>
                <button>Log Out</button>
            </div>
      ) : (
        <div>
            <p>Sign In</p>
            <Auth></Auth>
        </div>
      )}
    </div>
    
    
  );
};

