import React from 'react'
import "./styles/HeroHome.css"
import Item from "./Item"
import TradeTable from './TradeTable'


function HeroHome() {
  
  return (
    <div className="HeroContainer">
        <h1>Welcome to the Webkinz Exchange</h1>
        <h2>New Items From Your Wishlist</h2>
        <div className="Hero-new-items-container">
          
          <div id="Hero-new-items">
            <div className="Hero-new-items-item"> <Item itemid="2" title="Blue Agate Geode" user="A" imageurl="http://images.shoutwiki.com/webkinzpictureguide/3/30/Blueagategeode.png" tags="exclusive" type="decoration" quantity="1" tradeable="sendable" ></Item> </div>
            <div className="Hero-new-items-item"> <Item itemid="2" title="Blue Agate Geode" user="B" imageurl="http://images.shoutwiki.com/webkinzpictureguide/3/30/Blueagategeode.png" tags="exclusive" type="decoration" quantity="1" tradeable="sendable" ></Item> </div>
            <div className="Hero-new-items-item"> <Item itemid="2" title="Blue Agate Geode" user="C" imageurl="http://images.shoutwiki.com/webkinzpictureguide/3/30/Blueagategeode.png" tags="exclusive" type="decoration" quantity="1" tradeable="sendable" ></Item> </div>
            <div className="Hero-new-items-item"> <Item itemid="2" title="Blue Agate Geode" user="D" imageurl="http://images.shoutwiki.com/webkinzpictureguide/3/30/Blueagategeode.png" tags="exclusive" type="decoration" quantity="1" tradeable="sendable" ></Item> </div>
            <div className="Hero-new-items-item"> <Item itemid="2" title="Blue Agate Geode" user="E" imageurl="http://images.shoutwiki.com/webkinzpictureguide/3/30/Blueagategeode.png" tags="exclusive" type="decoration" quantity="1" tradeable="sendable" ></Item> </div>
            <div className="Hero-new-items-item"> <Item itemid="2" title="Blue Agate Geode" user="A" imageurl="http://images.shoutwiki.com/webkinzpictureguide/3/30/Blueagategeode.png" tags="exclusive" type="decoration" quantity="1" tradeable="sendable" ></Item> </div>
             
          </div>
          <button onClick={scrollNewItems} id="scroll-button">Scroll</button>
        </div>

        <div className="Hero-trade-tables">
          <TradeTable></TradeTable>
        </div>
      
    </div>
   
  )
}

function scrollNewItems(){
  document.getElementById('Hero-new-items').scrollLeft += 150;
}

export default HeroHome