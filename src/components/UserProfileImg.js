import React from 'react'
import '../styles/headerStyles.css'
import { Link } from 'react-router-dom';
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import useUsername from '../hooks/useUsername';


export const UserProfileImg = () => {
    const { isAuth } = useGetUserInfo();
    const { userProfileImg } = useUsername();
    if (userProfileImg.length > 0){
        var userAvatar = userProfileImg;
    } else {
        var userAvatar = userProfileImg
    }
    
    return (
       <>{isAuth ? 
            (<img src={userAvatar}></img>)
            : 
            (<img src=""></img>)
        }
       </>
      )
}
