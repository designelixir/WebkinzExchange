import React from 'react'
import './styles/UserSummary.css';

function UserSummary({user, rating}) {
  return (
    <div className="Trades-User">
            <img src="http://images.shoutwiki.com/webkinzpictureguide/thumb/9/92/Extravaganzamigration.png/200px-Extravaganzamigration.png" />
            <p>{user}</p>
            <div className="User__rating">
              {Array(rating)
              .fill()
              .map((_, i) => (
                <p>⭐</p>
              ))}
            </div>
            <button>View Shop</button>
        </div>
  )
}

export default UserSummary