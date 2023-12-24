import React, {useState} from 'react'
import '../styles/headerStyles.css'
import { Link } from 'react-router-dom';
import { Auth } from "./Auth";
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import { Username } from '../components/Username'
import { UserProfileImg } from './UserProfileImg';
import './components.css';


import wshopIcon from '../assets/wshop.png'
import wshopEditIcon from '../assets/edit.png'
import houseIcon from '../assets/house.png';
import wishIcon from '../assets/wishlist.png'
import thingsToDoIcon from '../assets/things-to-do.png'
import webkinzItemsIcon from '../assets/guide.png'




export const Dock = () => {


    const {isAuth, createdAt} = useGetUserInfo();
    const [isMenuOpen, setMenuOpen] = useState(false);

    // Function to toggle the menu state
    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };



    return (
    <>
    <div className="dock-container ">
        <div className="dock-wrapper flex-end-start">
            <div className="dock-avatar flex-center-center">
                {isAuth ? (
                    <>
                    <div className="user-avatar" ><UserProfileImg></UserProfileImg></div>
                    <div className="profile-stats">
                        <span className="centered" style={{margin: "5px"}}><Username></Username></span>
                        <Link to="my-account"><p>My Account</p></Link>
                    </div>
                    </>
                    
                ) : (<>
                <div className="user-avatar"><UserProfileImg></UserProfileImg></div>
                <div className="profile-stats">
                    <div className="centered hover"><Username></Username></div>
                    <Auth />
                </div>
                </>)}
                
            </div>
            <div className="dock-nav flex-end-end">
                <div className="flex-end-end">
                <Link to="/my-stuff" className="link"><div className="dock-nav-button flex-center-center flex-column"><img className="icon" src={houseIcon}></img>My Stuff</div></Link>
                <Link to="/my-wishlist" className="link"><div className="dock-nav-button flex-center-center flex-column"><img className="icon" src={wishIcon}></img>My Wishlist</div></Link>
                <Link to="/my-store" className="link"><div className="dock-nav-button flex-center-center flex-column"><img className="icon" src={wshopIcon}></img>My Store</div></Link>
                </div>
            </div>
            <div id="thingsToDoMenuWrapper" >
                    <div className="top-things-to-do flex-end-end">
                        <div className={isMenuOpen ? ("logout-btn hover") : ("logout-btn hover logout-overlay")}><Auth></Auth></div>
                        <div className="things-to-do-button hover" onClick={toggleMenu}>THINGS TO DO</div>
                    </div>
                    <div id="thingsToDoMenu" className={isMenuOpen ? ("expanded-dock") : ("tucked-dock")}>
                    <div className="things-to-do-list-wrapper flex-start-start flex-wrap">
                        <div className="things-to-do-column">
                            <div className="thing-to-do-title">Trading</div>
                            <div className="things-to-do-list">
                                <Link to="/items" className="link" onClick={toggleMenu}><div className="thing-to-do flex-center-start"><img className="icon" src={webkinzItemsIcon}></img>Webkinz Items</div></Link>
                                
                                <Link to="/my-store" className="link" onClick={toggleMenu}><div className="thing-to-do flex-center-start"><img className="icon" src={wshopIcon}></img>My Store</div></Link>
                                
                                <div className="thing-to-do flex-center-start"><img className="icon" src={wshopEditIcon}></img>Edit Store</div>
                            </div>    
                        </div>
                        <div className="things-to-do-column">
                            <div className="thing-to-do-title">My Collection</div>
                            <div className="things-to-do-list">
                                <div className="thing-to-do flex-center-start"><img className="icon" src={houseIcon}></img>My Stuff</div>
                                <div className="thing-to-do flex-center-start"><img className="icon" src={wishIcon}></img>My Wishlist</div>
                            </div>
                            
                        </div>

                    </div>
                </div>
        </div>
            
            
        </div>
    </div>
    <div id="indicatorWindow"></div>
    </>)
    
}

