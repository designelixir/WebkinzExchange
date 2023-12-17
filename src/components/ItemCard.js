import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AddStuff } from './AddStuff';
import { AddWishlist } from './AddWishlist';
import { AddStore } from './AddStore'
import { useGlobalState } from './GlobalStateContext'; // Import the hook

export const ItemCard = ({ itemID, itemName, itemImgUrl, itemAvailable, itemType, itemCategory }) => {
  const { isForSaleGlobal, isWantedGlobal, isOwnedGlobal } = useGlobalState(); // Use the hook to get the global states

  // Use an object to store states for each itemID
  const [itemStates, setItemStates] = useState({
    showOptions: false,
    addStuff: false,
    addWishlist: false,
    addStore: false,
  });

  const handleOptionsClick = () => {
    setItemStates((prevState) => ({ ...prevState, showOptions: !prevState.showOptions }));
  };

  const handleAddStuffClick = () => {
    setItemStates((prevState) => ({ ...prevState, addStuff: !prevState.addStuff }));
  };

  const handleAddWishlistClick = () => {
    setItemStates((prevState) => ({ ...prevState, addWishlist: !prevState.addWishlist }));
  };

  const handleAddStoreClick = () => {
    setItemStates((prevState) => ({ ...prevState, addStore: !prevState.addStore }));
  };

  var itemIs;
  if (itemType === 1) {
    itemIs = 'Food';
  } else if (itemType === 2) {
    itemIs = 'Clothing';
  } else if (itemType === 3) {
    itemIs = 'Furniture';
  } else if (itemType === 4) {
    itemIs = 'Decoration';
  }

  return (
    <>
      <div className={`Item  ${itemStates.addWishlist ? 'item-wrapper-wishlist' : ''} ${itemStates.addStore ? 'item-wrapper-store' : ''}`} id={itemID} datatype={itemCategory}>
        <div className="item-dropdown flex-start-start">
          <div className="item-options" id="itemOptions" onClick={handleOptionsClick}>
            <p style={{ margin: '-2px 10px 0px 0px', fontSize: '20px' }}>+</p>
          </div>

          {/* Dropdown with three options */}
          {itemStates.showOptions && (
            <div className="options-dropdown">
              <div className="item-card-buttons">
                <AddStuff itemID={itemID} onClick={handleAddStuffClick} isOwned={isOwnedGlobal} /> {/* Pass isOwnedGlobal as a prop */}
                <AddWishlist itemID={itemID} onClick={handleAddWishlistClick} isWanted={isWantedGlobal} /> {/* Pass isWantedGlobal as a prop */}
                <AddStore itemID={itemID} onClick={handleAddStoreClick} isForSale={isForSaleGlobal} /> {/* Pass isForSaleGlobal as a prop */}
              </div>
            </div>
          )}
        </div>
        
          <div className="item-details flex-center-center">
            <h6 className="Item-type">{itemIs}</h6>
          </div>
          
            <div className="Item-details" style={{ marginTop: '-30px' }}>
              <img className="Item-image" src={itemImgUrl} alt={itemName} />
              <Link to={`/item/${itemID}`}><p className="Item-title">{itemName}</p></Link>
            </div>
          
          <div>
            <h6 className="item-category">{itemCategory}</h6>
            <h6>{itemIs}</h6>
            <h6></h6>
          </div>
        </div>
      
    </>
  );
};
