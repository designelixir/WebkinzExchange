import { useState, useEffect} from "react"
import { query, collection, onSnapshot, where, orberBy } from "firebase/firestore";
import {db} from "../config/firebase-config"
import { useGetUserInfo } from "./useGetUserInfo";

// Function to get items they have in their dock

export const useGetTransactions = () => {
    const [webkinzItems, setWebkinzItems  ] = useState([]);
    const {userID} = useGetUserInfo()
    const transactionCollectionRef = collection(db, "webkinzItems")
    console.log("calling useGetTransactions")
    console.log(userID)

    const getWebkinzItems = async () => {
        let unsubscribe;
        try {
 
            const queryWebkinzItems = query(transactionCollectionRef, where("userID", "==", userID));
            unsubscribe = onSnapshot(queryWebkinzItems, (snapshot) => {
                let docs = [];

                snapshot.forEach((doc)=>{
                    const data = doc.data();
                    const id = doc.id
                    
                    docs.push({...data, id})

                });
                setWebkinzItems(docs)
            });
        } catch (err) {console.error(err)}
        return () => unsubscribe();
    }
    useEffect(() => {
        getWebkinzItems()
    }, [])
    return {webkinzItems}
}