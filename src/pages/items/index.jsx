import React, { useState, useEffect } from 'react';
import GetAllItems from './getAllItems';
import { ItemCategories } from './itemCategories';

export const Items = ({ setPageTitle, setPageDescription }) => {
  const [activeTab, setActiveTab] = useState('itemsByCategory');

  useEffect(() => {
    setPageTitle('Webkinz Items');
    setPageDescription('This will be the database of all webkinz items.');
  }, [setPageTitle, setPageDescription]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
    <div className="tabs flex-end-start">
          <button
            className={activeTab === 'itemsByCategory' ? 'tab-button-active' : 'tab-button'}
            onClick={() => handleTabClick('itemsByCategory')}
          >
            Items by Category
          </button>
          <button
            className={activeTab === 'search' ? 'tab-button-active' : 'tab-button'}
            onClick={() => handleTabClick('search')}
          >
            Search for Items
          </button>
        </div>
      <section className="flex-start-start flex-wrap">
        
        
        <div className="all-items-wrapper flex-start-start" id="itemsByCategory" style={{ display: activeTab === 'itemsByCategory' ? 'block' : 'none' }}>
          <ItemCategories></ItemCategories>
        </div>
        <div id="item-search" style={{ display: activeTab === 'search' ? 'block' : 'none' }}>
          <div className="search-bar">
            <input type="search"></input>
            <button style={{ padding: "10px 25px", backgroundColor: "var(--dock-gold)" }}>Search Items</button>
          </div>
          <h2>Showing all items:</h2>
        </div>
        <div className="items-list flex-start-start">
            <GetAllItems></GetAllItems>
          </div>
      </section>
    </>
  );
};
