import React from 'react'
import '../styles/headerStyles.css'
import { Link } from 'react-router-dom';
import { Auth } from '../pages/auth/index'
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { Username } from '../components/Username'
import { UserProfileImg } from './UserProfileImg';
import './components.css';
import useUsername from '../hooks/useUsername';

export const Dock = () => {
    const {isAuth, createdAt} = useGetUserInfo();
    return (<>
    
    <div className="dock-container ">
        <div className="dock-wrapper flex-start-start flex-wrap">
            <div className="dock-nav flex-center-end">
            <div className="dock-nav-button"><Link to="/my-stuff">My Stuff</Link></div>
            <div className="dock-nav-button">My Trades</div>
                <div className="things-to-do">THINGS TO DO</div>
                
            </div>
            
            
        </div>
    </div>
    </>)
}