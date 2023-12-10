// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from "firebase/firestore";

//TO DO : create environment variables

const firebaseConfig = {
  apiKey: "AIzaSyCf8Qou7BvQ0LFAcKes8jln1M_m3L7t8qE",
  authDomain: "webkinz-exchange-252b5.firebaseapp.com",
  projectId: "webkinz-exchange-252b5",
  storageBucket: "webkinz-exchange-252b5.appspot.com",
  messagingSenderId: "138076705422",
  appId: "1:138076705422:web:cf5aec81c8718394dfafdf",
  measurementId: "G-Q1MNJ8B6KQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)



//Comands for logging in with firebase
//firebase login
//firebase init
//firebase deploy

