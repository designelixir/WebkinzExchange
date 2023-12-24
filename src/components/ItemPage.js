import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase-config';

export const ItemPage = ({ setPageTitle, setPageDescription }) => {
  const { itemID } = useParams();
  const [itemData, setItemData] = useState(null);
  const [soldByUsers, setSoldByUsers] = useState([]);
  const [wantedByUsers, setWantedByUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('itemInfo'); // Default to 'itemInfo' tab

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const docRef = doc(db, 'items', itemID);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const {
            itemId,
            itemImgUrl,
            itemName,
            itemIntroduced,
            lastAvailable,
            itemSendable,
            itemCategory,
            itemSources,
            itemType,
            itemSubType,
            wantedBy, 
            soldBy,
          } = docSnapshot.data();
          setItemData({
            itemId,
            itemImgUrl,
            itemName,
            itemIntroduced,
            lastAvailable,
            itemSendable,
            itemCategory,
            itemSources,
            itemType,
            itemSubType,
            wantedBy, 
            soldBy,
          });
        } else {
          console.log('Document not found');
        }
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchItemData();
  }, [itemID]);

  useEffect(() => {
    const fetchUsers = async (userIds, setUserFunction) => {
      const users = [];
    
      for (const userId of userIds) {
        const userDocRef = doc(db, 'userProfile', userId);
        const userID = userId;
        const userDocSnapshot = await getDoc(userDocRef);
    
        if (userDocSnapshot.exists()) {
          // Adjust the field name here to match your Firestore document
          const {username, userProfileImg } = userDocSnapshot.data();
          users.push({username, userProfileImg, userID });
        }
      }
    
      setUserFunction(users);
    };

    if (itemData) {
      if (itemData.soldBy && itemData.soldBy.length > 0) {
        fetchUsers(itemData.soldBy, setSoldByUsers);
      }

      if (itemData.wantedBy && itemData.wantedBy.length > 0) {
        fetchUsers(itemData.wantedBy, setWantedByUsers);
      }
    }
  }, [itemData]);

  useEffect(() => {
    setPageTitle('Item Page');
    setPageDescription('This is a breakdown of an item');
  }, [setPageTitle, setPageDescription]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <section>
        <div className="tabs flex-end-start">
          <div onClick={() => handleTabClick('itemInfo')} className={activeTab === 'itemInfo' ? 'tab-button-active' : 'tab-button'}>
            Item Information
          </div>
          <div onClick={() => handleTabClick('soldBy')} className={activeTab === 'soldBy' ? 'tab-button-active' : 'tab-button'}>
            Sold By
          </div>
          <div onClick={() => handleTabClick('wantedBy')} className={activeTab === 'wantedBy' ? 'tab-button-active' : 'tab-button'}>
            Wanted By
          </div>
        </div>

        {activeTab === 'itemInfo' && itemData ? (
  <div className="flex-start-start page-container" style={{ borderRadius: '0px 8px 8px 8px' }}>
    <img className="item-page-img" src={itemData.itemImgUrl} alt={itemData.itemName} />
    <div>
      <h2>{itemData.itemName}</h2>
      {itemData.itemNonSendable ? (<h5>Non-tradeable</h5>) : (<h5>Tradeable</h5>)}
      <p><span className="gray">Category:</span> {itemData.itemCategory}</p>
      <p><span className="gray">Type:</span> {itemData.itemType}</p>
      <p><span className="gray">First Available:</span> {itemData.itemIntroduced}</p>
      <p>{itemData.lastAvailable === "Current" ? itemData.lastAvailable : `Last Available: ${itemData.lastAvailable}`}</p>

      <br></br>
      <p>Sources:</p>
      <ul>
        {itemData.itemSources && itemData.itemSources.length > 0 ? (
          itemData.itemSources.map((source, index) => (
            <li key={index}>{source}</li>
          ))
        ) : (
          <li>No sources found</li>
        )}
      </ul>
    </div>
  </div>
) : activeTab === 'soldBy' ? (
          <div className="page-container">
            <h3>Sold by:</h3>
            <div>
              {soldByUsers.map((user) => (
                <div key={user.userID} className="mini-profile ">
                  <Link to={`/user/${user.userID}`} className="link flex-center-center flex-column">
                    <img src={user.userProfileImg} alt={user.username} />
                    
                    <p>{user.username}</p>
                    {user.userId}
                    <button className="centered">View Shop</button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="page-container">
            <h3>Wanted by:</h3>
            <div>
              {wantedByUsers.map((user) => (
                <div key={user.userID} className="mini-profile ">
                <Link to={`/user/${user.userID}`} className="link flex-center-center flex-column">
                  <img src={user.userProfileImg} alt={user.username} />
                  
                  <p>{user.username}</p>
                  {user.userId}
                  <button className="centered">View Shop</button>
                </Link>
              </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  );
};
