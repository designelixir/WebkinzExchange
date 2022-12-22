import React from 'react'
import './styles/TradesPage.css';
import TradeSummary from './TradeSummary';
function Trades() {
  return (
    <div className="TradePage">
        <h1>Your Trades</h1>
        <div className="TradesContainer">
            <div className="Trades">
                
                <TradeSummary></TradeSummary>
                <TradeSummary></TradeSummary>
            </div>
        </div>
    
    </div>
    
  )
}

export default Trades