import React from 'react';
import "./styles/Item.css";
import { useStateValue } from "./StateProvider";

function Item( {itemid, title, user, imageurl, tags, type, quantity, tradeable }) {
  const [{ basket }, dispatch] = useStateValue();
  console.log("this is the basket", basket)
  const addToBasket = () => {
    //dispatch the action into data layer 
    dispatch({
      type: 'ADD_TO_BASKET',
      item: {
        itemid: itemid,
        title: title,
        imageurl: imageurl
      }
    });
  }
  return (
  
    <div className="Item" id={itemid}>
      <div className="Item-soldby-banner">
        <p className="Item-store">For Trade by <a href={user} target="_blank">{user}</a> </p>
      </div>
      <div className="Item-details">
          <a href={itemid}><img className="Item-image" src= {imageurl}/></a>
        
        <p className="Item-title">{title}</p>
        <span className="Item-labels">
          <h6 className="Item-type">{type}</h6>
          <h6 className="Item-type"> {tradeable}</h6>
        </span>
      </div>
      

      <span className="Item-labels">
        <h6 className="Item-tag">{tags}</h6>
        
      </span>
      <span className="Item-buttons">
        <button className="Item-basket-add">+</button>
        <button className="Item-basket-subtract">-</button>
        <button onClick={addToBasket} className="Item-basket-boolean">{quantity} Add</button>
        

      </span>
    </div>
  
    
  )
  
}

export default Item

