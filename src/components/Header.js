import React from 'react'
import '../styles/headerStyles.css'
import { Link } from 'react-router-dom';
import { Auth } from '../pages/auth/index'
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import logo from '../assets/webkinz-exchange.svg'
import { Username } from './Username';
import { UserProfileImg } from './UserProfileImg';

export const Header = () => {
  const {isAuth, createdAt} = useGetUserInfo();
    return (
        <div class="flex-center-spacebetween">
          <Link to="/"><img src={logo} style={{height: "120px", marginRight: "25px"}} className="hover"></img></Link>
          {isAuth ? (
                <div>
                    
                    <div className="dock-avatar">
                    <Link to='/profile' className="link"><p className='hover centered-text'><Username></Username></p></Link>
                        <div className="flex-start-start" style={{margin: "5px"}}>
                            <div className="user-avatar"><UserProfileImg></UserProfileImg></div>
                            <div className="profile-stats">
                                <Link to="/profile"><p>My Account</p></Link>
                                <Link to="/"><p>Logout</p></Link>

                            </div>
                        </div>
                    </div>
                    
                </div>
        ) : (
            <div>
                <p>Sign In</p>
                <Auth></Auth>
            </div>
        )}
        </div>
         
      )
}
