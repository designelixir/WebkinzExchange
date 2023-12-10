import { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase-config';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';

export const useGetUserInfo = () => {
  console.log("calling useGetUserInfo");
  const [userInfo, setUserInfo] = useState({
    userID: '',
    isAuth: false,
    createdAt: '',
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is logged in
        const authInfo = {
          userID: user.uid,
          isAuth: true,
          createdAt: serverTimestamp(),
        };
        setUserInfo(authInfo);

        // Check if the user document exists in the "userProfile" collection
        const userProfileRef = doc(db, 'userProfile', user.uid);

        const docSnapshot = await getDoc(userProfileRef);

        if (!docSnapshot.exists()) {
          // If the document doesn't exist, create a new one
          await setDoc(userProfileRef, {
            userIDNumber: user.uid,
            username: '',
            userProfileImg: '',
            createdAt: serverTimestamp()
          });
        }
      } else {
        // User is not logged in
        setUserInfo({
          name: '',
          userID: '',
          isAuth: false,
          createdAt: '',
        });
      }
    });
    console.log(setUserInfo.createdAt)
    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return userInfo;
};
