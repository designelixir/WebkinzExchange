
import {addDoc, collection, serverTimestamp} from "firebase/firestore"
import {db} from '../config/firebase-config'
import {useGetUserInfo} from "./useGetUserInfo"

export const useUserProfileRef = () => {
    const transactionCollectionRef = collection(db, "webkinzItems")
    const { userID } = useGetUserInfo();
    const addTransaction = async ({
       itemName, 
       itemImgURL, 
       
    }) => {
        await addDoc(transactionCollectionRef, {
            userID, 
            itemName, 
            itemImgURL, 
            createdAt: serverTimestamp(),
        })
    }
    return {addTransaction};
}