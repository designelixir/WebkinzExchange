import React from 'react'
import './styles/Header.css'
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="headerContainer">
      <Link to ="/">
      <img className="headerLogo" src="https://static.wikia.nocookie.net/logopedia/images/b/bc/Logo556.png" />
      </Link>
 
    
  
      <div className="headerSearchContainer">
        <input type="text" className="headerSearchInput" />
        <div className="headerSearchInputButton">Search</div>
      </div>
    
    <div className="headerNav">
      <div className="headerNavOption"><p>Welcome</p><p>Sign In</p></div>
      <div className="headerNavOption">
        <Link to="/trades">MY Trades</Link>
        <span className="tradescount">0</span>
      </div>
      <div className="headerNavOption">MY WISHLIST</div>
    </div>
  </div>    
  )
}

export default Header