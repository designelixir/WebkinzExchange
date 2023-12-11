import React, { useEffect } from 'react';
import GetAllItems from './getAllItems'
export const Items = ({ setPageTitle, setPageDescription }) => {
    useEffect(() => {
        setPageTitle('Webkinz Items');
        setPageDescription('This is the home page description.');
      }, [setPageTitle, setPageDescription]);
    
    return (
    <>
    <section>
        <div className="all-items-wrapper flex-start-start">
            <div className="item-filters-container">
                <h3 className="white">Item Categories</h3>
                <div className="item-filters-list">
                    <ul>
                        <li>Adventure Park</li>
                        <li>Challenges</li>
                        <li>Christmas &amp; Hanukkah</li>
                        <li>Christmas Countdown</li>
                        <li>Click-to-Win: Annual</li>
                        <li>Click-to-Win: Non-Annual</li>
                        <li>Clubhouse Events</li>
                        <li>Collection Events</li>
                        <li>Community Codes</li>
                        <li>Curio Shop Only</li>
                    </ul>
                </div>
            </div>
            <div className="items-list">
                <GetAllItems></GetAllItems>
            </div>
        </div>
        

        
        
    </section>
    
    
    </>
    
    )
}

