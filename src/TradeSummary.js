import React from 'react';
import './styles/TradeSummary.css';
import Item from './Item.js';
import UserSummary from './UserSummary';
import Subtotal from './Subtotal.js';

function TradeSummary() {
  return (
    <div className="TradeSummary-container">
        <div className="TradeSummary-individual">
        <div className="UserSection">
        <UserSummary
            user="Megan"
            rating="5"
        ></UserSummary>
        
        </div>
        
        <div className="Trades-Items">
        <Item
             itemid="1"
             title="1000 Kinzcash Coin"
             user="Megan"
             imageurl="http://images.shoutwiki.com/webkinzpictureguide/0/0a/1000kinzcashcoin.png"
             tags="coin"
             type="special"
             quantity="1"
             tradeable="sendable"
            ></Item>
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
        
    </div>
  )
}

export default TradeSummary