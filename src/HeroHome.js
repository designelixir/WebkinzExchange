import React from 'react'
import "./styles/HeroHome.css"
import Item from "./Item"

function HeroHome() {
  return (
    <div className="HeroContainer">
        <h1>Welcome to the Webkinz Exchange</h1>
        <h2>New Items from Your Wishlist</h2>
        <div className="HeroRow">
        <Item
             itemid="2"
             title="Blue Agate Geode"
             user="Megan"
             imageurl="http://images.shoutwiki.com/webkinzpictureguide/3/30/Blueagategeode.png"
             tags="exclusive"
             type="decoration"
             quantity="1"
             tradeable="sendable"
            ></Item>
            
        </div>
    </div>
    
  )
}

export default HeroHome