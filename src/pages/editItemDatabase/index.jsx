import React, { useState, useEffect } from 'react';
import { collection, addDoc, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import { useGetUserInfo } from '../../hooks/useGetUserInfo';

import CSVReader from 'react-csv-reader';

export const EditItemDatabase = ({ setPageTitle, setPageDescription }) => {
  useEffect(() => {
    setPageTitle('Edit Item Database');
    setPageDescription('This is where I will add items to the database');
  }, [setPageTitle, setPageDescription]);

  const { userID } = useGetUserInfo();
  const [csvData, setCsvData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleCSVUpload = (data, fileInfo) => {
    // Assuming your CSV file has headers like 'itemID', 'itemName', etc.
    // Adjust the keys based on your CSV structure
    const fileHeaders = data[0];

    // Remove headers from the data
    const itemsData = data.slice(1);

    // Set CSV data and headers to state
    setCsvData(itemsData);
    setHeaders(fileHeaders);
  };

  // ...

// ...

const handleAddToFirebase = async (row) => {
    const itemData = {};
    let itemId; // variable to store the value of 'itemID'
  
    // Map header IDs to corresponding keys in itemData
    headers.forEach((header, index) => {
      switch (header) {
        case 'itemID':
          itemId = row[index];
          itemData.itemId = row[index];
          break;
        case 'itemName':
          itemData.itemName = row[index];
          break;
        case 'itemImgUrl':
          itemData.itemImgUrl = row[index];
          break;
        case 'itemAvailable':
          itemData.itemAvailable = row[index];
          break;
        case 'itemDockType':
          itemData.itemDockType = row[index];
          break;
        case 'itemCategory':
          itemData.itemCategory = row[index];
          break;
        case 'itemType':
          itemData.itemType = row[index];
          break;
        case 'ownedBy':
          itemData.ownedBy = row[index];
          break;
        case 'soldBy':
          itemData.soldBy = row[index];
          break;
        case 'wantedBy':
          itemData.wantedBy = row[index];
          break;
        default:
          break;
      }
    });
  
    // Check if the document with 'itemID' exists in the Firestore database
    const itemRef = doc(collection(db, 'items'), itemId);
    const itemDoc = await getDoc(itemRef);
  
    if (itemDoc.exists()) {
      // If the document exists, update the fields excluding 'ownedBy', 'soldBy', and 'wantedBy'
      try {
        await updateDoc(itemRef, {
          itemName: itemData.itemName,
          itemImgUrl: itemData.itemImgUrl,
          itemAvailable: itemData.itemAvailable,
          itemDockType: itemData.itemDockType,
          itemCategory: itemData.itemCategory,
          itemType: itemData.itemType,
        });
  
        // Update the local state with the new item
        setCsvData((prevData) => prevData.filter((item) => item !== row));
      } catch (error) {
        console.error('Error updating item in Firestore:', error.message);
      }
    } else {
      // If the document does not exist, add the new item to Firestore
      try {
        await setDoc(itemRef, {
          soldBy: userID,
          ...itemData,
        });
  
        // Update the local state with the new item
        setCsvData((prevData) => prevData.filter((item) => item !== row));
      } catch (error) {
        console.error('Error adding item to Firestore:', error.message);
      }
    }
  };
  
  // ...
  
  
  // ...
  

  return (
    <section style={{ background: 'lightgray', borderRadius: '4px' }}>
      <CSVReader onFileLoaded={handleCSVUpload} />
      <div id="CSVOutput">
        {/* Display the CSV data with "Add to Firebase" buttons */}
        {csvData.map((row, index) => (
          <div key={index} className="item-row flex-start-spacebetween" style={{ border: '1px solid black', padding: "10px 0px" }}>
            <div className="flex-start-start">
            
            <img src={row[headers.indexOf('itemImgUrl')]} alt={row[headers.indexOf('itemName')]} style={{width: "75px", margin: "0px 10px", background: "white"}}/>
            
            <div>
                <p>{row[headers.indexOf('itemID')]}</p>
                <p>{row[headers.indexOf('itemName')]}</p>
                <p>{row[headers.indexOf('itemImgUrl')]}</p>
                <p>Item Available: {row[headers.indexOf('itemAvailable')]}</p>
                <p>Item Dock Type: {row[headers.indexOf('itemDockType')]}</p>
                <p>Item Type: {row[headers.indexOf('itemType')]}</p>
            </div>
            </div>
              
              <button onClick={() => handleAddToFirebase(row)}>Add to Firebase</button>
            
          </div>
        ))}
      </div>
    </section>
  );
  
};
