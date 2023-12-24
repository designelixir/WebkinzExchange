import React, { useState, useEffect } from 'react';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
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
    const fileHeaders = data[0];
    const itemsData = data.slice(1);
    setCsvData(itemsData);
    setHeaders(fileHeaders);
  };

  const handleAddToFirebase = async (row) => {
    const itemData = {};
    let itemId;

    headers.forEach((header, index) => {
      switch (header) {
        case 'itemID':
          itemId = row[index];
          itemData.itemId = row[index];
          break;
        case 'itemImgUrl':
          itemData.itemImgUrl = row[index];
          break;
        case 'itemName':
          itemData.itemName = row[index];
          break;
        case 'itemIntroduced':
          itemData.itemIntroduced = row[index];
          break;
        case 'lastAvailable':
          itemData.lastAvailable = row[index];
          break;
        case 'itemSendable':
          itemData.itemSendable = row[index];
          break;
        case 'itemCategory':
          itemData.itemCategory = row[index];
          break;
        case 'itemSources':
          itemData.itemSources = row[index];
          break;
        case 'itemType':
          itemData.itemType = row[index];
          break;
        case 'itemSubType':
          itemData.itemSubType = row[index];
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

    const itemRef = doc(collection(db, 'items'), itemId);
    const itemDoc = await getDoc(itemRef);

    if (itemDoc.exists()) {
      try {
        await updateDoc(itemRef, {
          itemId: itemData.itemId,
          itemImgUrl: itemData.itemImgUrl,
          itemName: itemData.itemName,
          itemIntroduced: itemData.itemIntroduced,
          lastAvailable: itemData.lastAvailable,
          itemSendable: itemData.itemSendable,
          itemCategory: itemData.itemCategory,
          itemSources: itemData.itemSources,
          itemType: itemData.itemType,
          itemSubType: itemData.itemSubType,
          ownedBy: itemData.ownedBy
            ? [...(itemDoc.data()?.ownedBy || []), itemData.ownedBy]
            : itemDoc.data()?.ownedBy,
          soldBy: itemData.soldBy
            ? [...(itemDoc.data()?.soldBy || []), itemData.soldBy]
            : itemDoc.data()?.soldBy,
          wantedBy: itemData.wantedBy
            ? [...(itemDoc.data()?.wantedBy || []), itemData.wantedBy]
            : itemDoc.data()?.wantedBy,
        });

        setCsvData((prevData) => prevData.filter((item) => item !== row));
      } catch (error) {
        console.error('Error updating item in Firestore:', error.message);
      }
    } else {
      try {
        await setDoc(itemRef, {
          soldBy: userID,
          ...itemData,
        });

        setCsvData((prevData) => prevData.filter((item) => item !== row));
      } catch (error) {
        console.error('Error adding item to Firestore:', error.message);
      }
    }
  };

  return (
    <section style={{ background: 'lightgray', borderRadius: '4px' }}>
      <CSVReader onFileLoaded={handleCSVUpload} />
      <div id="CSVOutput">
        {csvData.map((row, index) => (
          <div key={index} className="item-row flex-start-spacebetween" style={{ border: '1px solid black', padding: '10px 0px' }}>
            <div className="flex-start-start">
              <img src={row[headers.indexOf('itemImgUrl')]} alt={row[headers.indexOf('itemName')]} style={{ width: '75px', margin: '0px 10px', background: 'white' }} />
              <div>
                <p>{row[headers.indexOf('itemID')]}</p>
                <p>{row[headers.indexOf('itemName')]}</p>
                <p>{row[headers.indexOf('itemImgUrl')]}</p>
                <p>Item First Available: {row[headers.indexOf('itemIntroduced')]}</p>
                <p>Item Last Available: {row[headers.indexOf('lastAvailable')]}</p>
                <p>Item Sendable: {row[headers.indexOf('itemSendable')]}</p>
                <p>Item Category: {row[headers.indexOf('itemCategory')]}</p>
                <p>Item Sources: {row[headers.indexOf('itemSources')]}</p>
                <p>Item Type: {row[headers.indexOf('itemType')]}</p>
                <p>Item Sub-Type: {row[headers.indexOf('itemSubType')]}</p>
              </div>
            </div>
            <button onClick={() => handleAddToFirebase(row)}>Add to Firebase</button>
          </div>
        ))}
      </div>
    </section>
  );
};
