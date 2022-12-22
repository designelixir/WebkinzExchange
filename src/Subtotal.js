import React from 'react';
import "./styles/Subtotal.css";


function Subtotal() {
  return (
    <div className="subtotal">
      Subtotal
      
        renderText={(value) => (
          <p>Items in cart: <strong>0</strong></p>
        )}
      
    </div>
  )
}

export default Subtotal