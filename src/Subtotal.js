import React from 'react';
import "./styles/Subtotal.css";
import { useStateValue } from './StateProvider';

function Subtotal() {
  const [{ basket }, dispatch] = useStateValue();
  return (
    <div className="subtotal">
      Subtotal
      
        renderText={(value) => (
          <p>Items in cart: <strong>{basket.length}</strong></p>
        )}
      
    </div>
  )
}

export default Subtotal