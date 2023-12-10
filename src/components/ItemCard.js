import React from 'react';


export const ItemCard = ({itemID, itemName, itemImgUrl, itemAvailable}) => {

    return (
  
        <div className="Item" id={itemID} >
          <div className="Item-soldby-banner">
          </div>
          <div className="Item-details">
              <img className="Item-image" src= {itemImgUrl}/>
            
            <p className="Item-title">{itemName}</p>
            
              <h6 className="Item-type">item type</h6>
              
            
          </div>
        </div>
      
        
      )
}
