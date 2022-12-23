import React from 'react';
import './styles/TradeTable.css';
import { useStateValue } from './StateProvider';

function TradeTable() {
const [{basket}, dispatch] = useStateValue();
  return (
    <div className="TradeTable">
        <div className="TradeTable-mini" onClick={showTradeTable}>
            <h3>Username</h3>
            <span className="basket-count">&nbsp;( &nbsp;{basket?.length} Items )</span>
        </div>
        <div className="TradeTable-full-container">
            <div className="TradeTable-full">
                <div className="TradeTable-navigation">
                    <h3>Your Trade with User</h3>
                    <button className="close-button">X</button>
                </div>
                <div className="TradeTable-sections">
                    <div className="TradeTable-chat">
                        <h3>Chat</h3>
                    </div>
                    <div className="TradeTable-trade">
                        <div className="TradeTable-their-items">
                            <ul>
                                <li>EGG</li>
                                <li>EGG</li>
                                <li>EGG</li>
                                <li>EGG</li>
                                <li>EGG</li>
                                <li>EGG</li>
                                <li>EGG</li>
                                <li>EGG</li>
                            </ul>
                        </div>
                        <div className="TradeTable-your-items">
egg
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        
    </div>
  )
}

function showTradeTable(){

}

export default TradeTable