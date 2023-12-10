
import {addDoc, collection, serverTimestamp} from "firebase/firestore"
import {db} from '../config/firebase-config'
import {useGetUserInfo} from "./useGetUserInfo"

export const useUpdateUserProfile = () => {
    console.log("calling useUpdateUserProfile.js")
    const userProfileRef = collection(db, "userProfile")
    const { userID } = useGetUserInfo();
    const addTransaction = async ({
       userID
    }) => {
        await addDoc(useUpdateUserProfile, {
            userID, 
            createdAt: serverTimestamp(),
        })
    }
    return {addTransaction};
}