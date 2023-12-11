import React from 'react'
import '../styles/headerStyles.css'
import { Link } from 'react-router-dom';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import useUsername from '../hooks/useUsername';

export const Username = () => {
    const { userID, isAuth } = useGetUserInfo();
    const { username } = useUsername();
    if (username.length > 0){
        var usernameName = username;
    } else {
        var usernameName = userID;
    }
    return (
       <>{isAuth ? 
            (<Link className="link hover" to={`/user/${userID}`}>{usernameName}</Link>)
            : 
            (<p></p>)
        }
       </>
      )
}
